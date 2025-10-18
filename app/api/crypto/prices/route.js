import { NextResponse } from 'next/server'
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

// Map crypto symbols to Coinbase product IDs
const CRYPTO_PAIRS = {
  BTC: 'BTC-USD',
  ETH: 'ETH-USD',
  SOL: 'SOL-USD',
  ADA: 'ADA-USD',
  DOGE: 'DOGE-USD',
  DOT: 'DOT-USD',
  MATIC: 'MATIC-USD',
  // BNB not available on Coinbase, will fetch from alternative source
  BNB: null
}

const CRYPTO_NAMES = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  BNB: 'BNB',
  SOL: 'Solana',
  ADA: 'Cardano',
  DOGE: 'Dogecoin',
  DOT: 'Polkadot',
  MATIC: 'Polygon'
}

// Fetch BNB from Binance API (public, no auth required)
async function fetchBNBPrice() {
  try {
    // Use Binance public API for BNB price
    const response = await fetch(
      'https://api.binance.com/api/v3/ticker/24hr?symbol=BNBUSDT',
      {
        headers: {
          'Accept': 'application/json'
        },
        next: { revalidate: 30 }
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch BNB from Binance')
    }

    const data = await response.json()

    return {
      symbol: 'BNB',
      name: 'BNB',
      price: parseFloat(data.lastPrice),
      change24h: parseFloat(data.priceChangePercent),
      volume24h: parseFloat(data.volume) * parseFloat(data.lastPrice),
      lastUpdated: new Date(data.closeTime).toISOString(),
      source: 'binance'
    }
  } catch (error) {
    console.error('Error fetching BNB from Binance:', error.message)
    // Fallback to CoinGecko
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true',
        {
          headers: {
            'Accept': 'application/json'
          },
          next: { revalidate: 30 }
        }
      )

      if (!response.ok) {
        throw new Error('Failed to fetch BNB from CoinGecko')
      }

      const data = await response.json()

      return {
        symbol: 'BNB',
        name: 'BNB',
        price: data.binancecoin.usd,
        change24h: data.binancecoin.usd_24h_change,
        volume24h: data.binancecoin.usd_24h_vol,
        lastUpdated: new Date().toISOString(),
        source: 'coingecko'
      }
    } catch (geckoError) {
      console.error('Error fetching BNB from CoinGecko:', geckoError.message)
      return getMockPrice('BNB')
    }
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const symbols = searchParams.get('symbols')?.split(',') || Object.keys(CRYPTO_PAIRS)

    const prices = {}
    const sources = new Set()

    // Fetch prices from Coinbase for each symbol
    await Promise.all(
      symbols.map(async (symbol) => {
        const productId = CRYPTO_PAIRS[symbol]

        // If BNB, fetch from Binance/CoinGecko
        if (symbol === 'BNB') {
          const bnbData = await fetchBNBPrice()
          prices[symbol] = bnbData
          sources.add(bnbData.source || 'binance')
          return
        }

        // If not available on Coinbase, use mock data
        if (!productId) {
          prices[symbol] = getMockPrice(symbol)
          sources.add('mock')
          return
        }

        try {
          // Fetch ticker data from Coinbase
          const tickerResponse = await fetch(
            `https://api.coinbase.com/v2/prices/${productId}/spot`,
            {
              headers: {
                'Accept': 'application/json'
              },
              next: { revalidate: 30 } // Cache for 30 seconds
            }
          )

          if (!tickerResponse.ok) {
            throw new Error(`Failed to fetch ${symbol}`)
          }

          const tickerData = await tickerResponse.json()

          // Fetch 24h stats
          const statsResponse = await fetch(
            `https://api.exchange.coinbase.com/products/${productId}/stats`,
            {
              headers: {
                'Accept': 'application/json'
              },
              next: { revalidate: 30 }
            }
          )

          let change24h = 0
          let volume24h = 0

          if (statsResponse.ok) {
            const statsData = await statsResponse.json()
            const currentPrice = parseFloat(tickerData.data.amount)
            const open24h = parseFloat(statsData.open)

            if (open24h > 0) {
              change24h = ((currentPrice - open24h) / open24h) * 100
            }

            volume24h = parseFloat(statsData.volume) * currentPrice
          }

          prices[symbol] = {
            symbol: symbol,
            name: CRYPTO_NAMES[symbol],
            price: parseFloat(tickerData.data.amount),
            change24h: change24h,
            volume24h: volume24h,
            lastUpdated: new Date().toISOString(),
            source: 'coinbase'
          }

          sources.add('coinbase')

        } catch (error) {
          console.error(`Error fetching ${symbol}:`, error.message)
          // Use mock data as fallback
          prices[symbol] = getMockPrice(symbol)
          sources.add('mock')
        }
      })
    )

    return NextResponse.json({
      data: prices,
      sources: Array.from(sources),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error fetching crypto prices:', error)

    // Fallback to mock data
    const { searchParams } = new URL(request.url)
    const symbols = searchParams.get('symbols')?.split(',') || Object.keys(CRYPTO_PAIRS)

    const mockPrices = {}
    symbols.forEach(symbol => {
      mockPrices[symbol] = getMockPrice(symbol)
    })

    return NextResponse.json({
      data: mockPrices,
      sources: ['mock'],
      error: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

// Get mock price for a single crypto
function getMockPrice(symbol) {
  const mockData = {
    BTC: {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 48500.00,
      change24h: 2.45,
      volume24h: 35000000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    ETH: {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2650.00,
      change24h: 3.21,
      volume24h: 18000000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    BNB: {
      symbol: 'BNB',
      name: 'BNB',
      price: 385.00,
      change24h: 1.85,
      volume24h: 2100000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    SOL: {
      symbol: 'SOL',
      name: 'Solana',
      price: 105.00,
      change24h: 5.43,
      volume24h: 3200000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    ADA: {
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.52,
      change24h: 2.15,
      volume24h: 850000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    DOGE: {
      symbol: 'DOGE',
      name: 'Dogecoin',
      price: 0.095,
      change24h: -1.23,
      volume24h: 980000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    DOT: {
      symbol: 'DOT',
      name: 'Polkadot',
      price: 7.80,
      change24h: 3.67,
      volume24h: 450000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    },
    MATIC: {
      symbol: 'MATIC',
      name: 'Polygon',
      price: 0.98,
      change24h: 4.23,
      volume24h: 620000000,
      lastUpdated: new Date().toISOString(),
      source: 'mock'
    }
  }

  return mockData[symbol] || {
    symbol: symbol,
    name: symbol,
    price: 0,
    change24h: 0,
    volume24h: 0,
    lastUpdated: new Date().toISOString(),
    source: 'mock'
  }
}
