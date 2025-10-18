export function generateDummyData() {
  // Cryptocurrency holdings data in USD
  const holdings = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      avgCost: 42000,
      currentPrice: 48500,
      totalValue: 24250,
      gainLoss: 3250,
      gainLossPercent: 15.48
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 5,
      avgCost: 2200,
      currentPrice: 2650,
      totalValue: 13250,
      gainLoss: 2250,
      gainLossPercent: 20.45
    },
    {
      symbol: 'BNB',
      name: 'Binance Coin',
      amount: 20,
      avgCost: 320,
      currentPrice: 385,
      totalValue: 7700,
      gainLoss: 1300,
      gainLossPercent: 20.31
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      amount: 50,
      avgCost: 85,
      currentPrice: 105,
      totalValue: 5250,
      gainLoss: 1000,
      gainLossPercent: 23.53
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      amount: 2000,
      avgCost: 0.45,
      currentPrice: 0.52,
      totalValue: 1040,
      gainLoss: 140,
      gainLossPercent: 15.56
    },
    {
      symbol: 'DOGE',
      name: 'Dogecoin',
      amount: 10000,
      avgCost: 0.12,
      currentPrice: 0.095,
      totalValue: 950,
      gainLoss: -250,
      gainLossPercent: -20.83
    },
    {
      symbol: 'DOT',
      name: 'Polkadot',
      amount: 100,
      avgCost: 6.5,
      currentPrice: 7.8,
      totalValue: 780,
      gainLoss: 130,
      gainLossPercent: 20.00
    },
    {
      symbol: 'MATIC',
      name: 'Polygon',
      amount: 500,
      avgCost: 0.85,
      currentPrice: 0.98,
      totalValue: 490,
      gainLoss: 65,
      gainLossPercent: 15.29
    }
  ]

  // Transactions data
  const transactions = [
    {
      date: '2025-12-15',
      type: 'BUY',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.1,
      price: 48200,
      total: 4820
    },
    {
      date: '2025-12-10',
      type: 'SELL',
      symbol: 'DOGE',
      name: 'Dogecoin',
      amount: 5000,
      price: 0.098,
      total: 490
    },
    {
      date: '2025-12-05',
      type: 'BUY',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 2,
      price: 2600,
      total: 5200
    },
    {
      date: '2025-11-28',
      type: 'BUY',
      symbol: 'SOL',
      name: 'Solana',
      amount: 25,
      price: 102,
      total: 2550
    },
    {
      date: '2025-11-20',
      type: 'BUY',
      symbol: 'BNB',
      name: 'Binance Coin',
      amount: 10,
      price: 375,
      total: 3750
    },
    {
      date: '2025-11-15',
      type: 'SELL',
      symbol: 'ADA',
      name: 'Cardano',
      amount: 1000,
      price: 0.50,
      total: 500
    },
    {
      date: '2025-11-05',
      type: 'BUY',
      symbol: 'DOT',
      name: 'Polkadot',
      amount: 50,
      price: 7.5,
      total: 375
    },
    {
      date: '2025-10-25',
      type: 'BUY',
      symbol: 'MATIC',
      name: 'Polygon',
      amount: 300,
      price: 0.95,
      total: 285
    },
    {
      date: '2025-10-15',
      type: 'BUY',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.2,
      price: 43500,
      total: 8700
    },
    {
      date: '2025-10-08',
      type: 'BUY',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 3,
      price: 2150,
      total: 6450
    }
  ]

  // Chart data for Q4 2025 (October - December) in USD
  const chartData = {
    labels: [
      'Oct 1', 'Oct 8', 'Oct 15', 'Oct 22', 'Oct 29',
      'Nov 5', 'Nov 12', 'Nov 19', 'Nov 26',
      'Dec 3', 'Dec 10', 'Dec 17'
    ],
    values: [
      42000, 43500, 45200, 44800, 46500,
      48000, 49200, 50500, 51200,
      52000, 52800, 53710
    ]
  }

  // Calculate summary
  const totalValue = holdings.reduce((sum, h) => sum + h.totalValue, 0)
  const totalCost = holdings.reduce((sum, h) => sum + (h.avgCost * h.amount), 0)
  const totalGainLoss = totalValue - totalCost
  const gainLossPercent = (totalGainLoss / totalCost) * 100

  const summary = {
    totalValue: totalValue,
    totalChange: 27.88, // Q4 change
    totalGainLoss: totalGainLoss,
    gainLossPercent: gainLossPercent,
    dayChange: 910,
    dayChangePercent: 1.72,
    totalHoldings: holdings.length,
    totalCoins: holdings.reduce((sum, h) => sum + h.amount, 0).toFixed(2)
  }

  return {
    summary,
    holdings,
    transactions,
    chartData
  }
}
