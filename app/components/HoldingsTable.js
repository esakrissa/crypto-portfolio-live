import CryptoIcon from './CryptoIcon'

export default function HoldingsTable({ holdings }) {
  return (
    <div className="overflow-x-auto -mx-8">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-border-light dark:border-border-dark">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Avg Cost
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Current Price
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total Value
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Gain/Loss
            </th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => {
            const isPositive = holding.gainLossPercent >= 0
            return (
              <tr 
                key={index} 
                className="border-b border-border-light dark:border-border-dark hover:bg-gray-50/50 dark:hover:bg-gray-800/50 smooth-transition group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2.5">
                    <CryptoIcon symbol={holding.symbol} size="sm" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{holding.symbol}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{holding.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                  {holding.amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">
                  ${holding.avgCost.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                  ${holding.currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-white">
                  ${holding.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex flex-col items-end gap-1">
                    <span className={`font-semibold ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${holding.gainLoss.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                      isPositive 
                        ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400' 
                        : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                    }`}>
                      {isPositive ? '↑' : '↓'} {Math.abs(holding.gainLossPercent).toFixed(2)}%
                    </span>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
