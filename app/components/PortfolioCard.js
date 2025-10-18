export default function PortfolioCard({ title, value, change, subtext, icon }) {
  const isPositive = change >= 0

  return (
    <div className="group bg-card-light dark:bg-card-dark rounded-xl border border-border-light dark:border-border-dark p-6 card-hover smooth-transition hover:border-blue-500/50 dark:hover:border-blue-500/50">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
        <span className="text-2xl opacity-70 group-hover:opacity-100 smooth-transition">{icon}</span>
      </div>
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
        {change !== undefined && (
          <div className="flex items-center space-x-1.5">
            <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-md ${
              isPositive 
                ? 'bg-green-50 dark:bg-green-950/30' 
                : 'bg-red-50 dark:bg-red-950/30'
            }`}>
              <span className={`text-xs font-semibold ${
                isPositive 
                  ? 'text-green-700 dark:text-green-400' 
                  : 'text-red-700 dark:text-red-400'
              }`}>
                {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
              </span>
            </div>
          </div>
        )}
        {subtext && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{subtext}</p>
        )}
      </div>
    </div>
  )
}
