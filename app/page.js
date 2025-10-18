'use client'

import { useEffect, useState } from 'react'
import PortfolioCard from './components/PortfolioCard'
import PortfolioChart from './components/PortfolioChart'
import HoldingsTable from './components/HoldingsTable'
import TransactionsTable from './components/TransactionsTable'
import CryptoIcon from './components/CryptoIcon'
import { generateDummyData } from './utils/dummyData'
import { useCryptoPrices } from './hooks/useCryptoPrices'

export default function Home() {
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch real-time prices
  const cryptoSymbols = ['BTC', 'ETH', 'BNB', 'SOL', 'ADA', 'DOGE', 'DOT', 'MATIC']
  const { prices, loading: pricesLoading, sources } = useCryptoPrices(cryptoSymbols, 60000)

  useEffect(() => {
    // Generate initial portfolio data
    const data = generateDummyData()
    setPortfolioData(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    // Update portfolio with real-time prices
    if (portfolioData && Object.keys(prices).length > 0) {
      const updatedHoldings = portfolioData.holdings.map(holding => {
        const livePrice = prices[holding.symbol]
        if (livePrice) {
          const currentPrice = livePrice.price
          const totalValue = holding.amount * currentPrice
          const gainLoss = totalValue - (holding.amount * holding.avgCost)
          const gainLossPercent = (gainLoss / (holding.amount * holding.avgCost)) * 100

          return {
            ...holding,
            currentPrice,
            totalValue,
            gainLoss,
            gainLossPercent,
            change24h: livePrice.change24h
          }
        }
        return holding
      })

      // Recalculate summary
      const totalValue = updatedHoldings.reduce((sum, h) => sum + h.totalValue, 0)
      const totalCost = updatedHoldings.reduce((sum, h) => sum + (h.avgCost * h.amount), 0)
      const totalGainLoss = totalValue - totalCost
      const gainLossPercent = (totalGainLoss / totalCost) * 100

      const updatedSummary = {
        ...portfolioData.summary,
        totalValue,
        totalGainLoss,
        gainLossPercent
      }

      setPortfolioData({
        ...portfolioData,
        holdings: updatedHoldings,
        summary: updatedSummary
      })
    }
  }, [prices])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-800 border-t-blue-600 dark:border-t-blue-400 mx-auto"></div>
          <p className="mt-6 text-base text-gray-600 dark:text-gray-400 font-medium">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  const { summary, holdings, transactions, chartData } = portfolioData

  // Top performers
  const topPerformers = [...holdings].sort((a, b) => b.gainLossPercent - a.gainLossPercent).slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Portfolio Overview
          </h2>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-900 border border-border-light dark:border-border-dark">
            <div className={`w-2 h-2 rounded-full ${pricesLoading ? 'bg-yellow-500' : 'bg-green-500'} animate-pulse`}></div>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
              {sources.includes('coinbase') || sources.includes('binance') ? 'Live Prices' : 'Demo Data'}
            </span>
          </div>
        </div>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Monitoring Q4 2025 (October - December) • All values in USD
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <PortfolioCard
          title="Total Value"
          value={`$${summary.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={summary.totalChange}
          icon="💰"
        />
        <PortfolioCard
          title="Total Gain/Loss"
          value={`$${summary.totalGainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={summary.gainLossPercent}
          icon="📈"
        />
        <PortfolioCard
          title="Day Change"
          value={`$${summary.dayChange.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          change={summary.dayChangePercent}
          icon="📊"
        />
        <PortfolioCard
          title="Total Assets"
          value={summary.totalHoldings.toString()}
          subtext={`${summary.totalCoins} coins`}
          icon="🪙"
        />
      </div>

      {/* Top Performers */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark p-8 mb-12">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          🏆 Top Performers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((crypto, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-900 border border-border-light dark:border-border-dark hover:border-blue-500/50 smooth-transition"
            >
              <CryptoIcon symbol={crypto.symbol} size="lg" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900 dark:text-white">{crypto.symbol}</span>
                  <span className="text-xs font-semibold px-2 py-1 rounded bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400">
                    +{crypto.gainLossPercent.toFixed(2)}%
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{crypto.name}</div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                  ${crypto.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark p-8 mb-12 card-hover">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Portfolio Performance Q4 2025
        </h3>
        <PortfolioChart data={chartData} />
      </div>

      {/* Holdings Table */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark p-8 mb-12 card-hover">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Current Holdings
        </h3>
        <HoldingsTable holdings={holdings} />
      </div>

      {/* Recent Transactions */}
      <div className="bg-card-light dark:bg-card-dark rounded-2xl border border-border-light dark:border-border-dark p-8 card-hover">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Transactions
        </h3>
        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  )
}
