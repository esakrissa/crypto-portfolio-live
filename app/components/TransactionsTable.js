import CryptoIcon from './CryptoIcon'

export default function TransactionsTable({ transactions }) {
  return (
    <div className="overflow-x-auto -mx-8">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-border-light dark:border-border-dark">
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Asset
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Total
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => {
            const isBuy = transaction.type === 'BUY'
            return (
              <tr 
                key={index} 
                className="border-b border-border-light dark:border-border-dark hover:bg-gray-50/50 dark:hover:bg-gray-800/50 smooth-transition"
              >
                <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {transaction.date}
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-lg ${
                    isBuy 
                      ? 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400' 
                      : 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                  }`}>
                    {transaction.type}
                  </span>
                </td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <CryptoIcon symbol={transaction.symbol} size="sm" />
                    <div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{transaction.symbol}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{transaction.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium text-gray-900 dark:text-white">
                  {transaction.amount}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right text-sm text-gray-600 dark:text-gray-400">
                  ${transaction.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
                <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-bold text-gray-900 dark:text-white">
                  ${transaction.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
