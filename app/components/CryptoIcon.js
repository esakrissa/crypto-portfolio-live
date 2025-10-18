export default function CryptoIcon({ symbol, size = 'md' }) {
  const sizes = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const cryptoData = {
    BTC: {
      name: 'Bitcoin',
      colors: 'from-orange-400 to-orange-600',
      bgLight: 'bg-orange-100',
      bgDark: 'bg-orange-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#F7931A"/>
            <path fill="#FFF" fillRule="nonzero" d="M23.189 14.02c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z"/>
          </g>
        </svg>
      )
    },
    ETH: {
      name: 'Ethereum',
      colors: 'from-blue-400 to-purple-600',
      bgLight: 'bg-blue-100',
      bgDark: 'bg-blue-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <circle cx="16" cy="16" r="16" fill="#627EEA"/>
            <g fill="#FFF" fillRule="nonzero">
              <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
              <path d="M16.498 4L9 16.22l7.498-3.35z"/>
              <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
              <path d="M16.498 27.995v-6.028L9 17.616z"/>
              <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
              <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
            </g>
          </g>
        </svg>
      )
    },
    BNB: {
      name: 'Binance Coin',
      colors: 'from-yellow-400 to-yellow-600',
      bgLight: 'bg-yellow-100',
      bgDark: 'bg-yellow-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#F3BA2F"/>
            <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z"/>
          </g>
        </svg>
      )
    },
    SOL: {
      name: 'Solana',
      colors: 'from-purple-400 to-pink-600',
      bgLight: 'bg-purple-100',
      bgDark: 'bg-purple-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="url(#solana-gradient)"/>
            <defs>
              <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9945FF"/>
                <stop offset="100%" stopColor="#14F195"/>
              </linearGradient>
            </defs>
            <path fill="#FFF" d="M7.5 19.5l3-3h14l-3 3h-14zm0-7.5l3-3h14l-3 3h-14zm17 11l-3 3h-14l3-3h14z"/>
          </g>
        </svg>
      )
    },
    ADA: {
      name: 'Cardano',
      colors: 'from-blue-500 to-blue-700',
      bgLight: 'bg-blue-100',
      bgDark: 'bg-blue-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#0033AD"/>
            <path fill="#FFF" d="M16 7.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-10 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5 5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
          </g>
        </svg>
      )
    },
    DOGE: {
      name: 'Dogecoin',
      colors: 'from-yellow-300 to-yellow-500',
      bgLight: 'bg-yellow-100',
      bgDark: 'bg-yellow-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#C2A633"/>
            <path fill="#FFF" d="M13 11v10h4.5c2.5 0 4.5-2 4.5-4.5S20 12 17.5 12H13zm0-2h4.5C20.538 9 24 12.462 24 16.5S20.538 24 17.5 24H13c-1.105 0-2-.895-2-2V11c0-1.105.895-2 2-2zm7 7.5h-4v1h4v-1z"/>
          </g>
        </svg>
      )
    },
    DOT: {
      name: 'Polkadot',
      colors: 'from-pink-400 to-pink-600',
      bgLight: 'bg-pink-100',
      bgDark: 'bg-pink-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#E6007A"/>
            <path fill="#FFF" d="M16 10a2 2 0 100-4 2 2 0 000 4zm0 16a2 2 0 100-4 2 2 0 000 4zm0-8a2 2 0 100-4 2 2 0 000 4zm-6-3a2 2 0 10-4 0 2 2 0 004 0zm16 0a2 2 0 10-4 0 2 2 0 004 0z"/>
          </g>
        </svg>
      )
    },
    MATIC: {
      name: 'Polygon',
      colors: 'from-purple-500 to-purple-700',
      bgLight: 'bg-purple-100',
      bgDark: 'bg-purple-950/30',
      icon: (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none">
            <circle cx="16" cy="16" r="16" fill="#8247E5"/>
            <path fill="#FFF" d="M20.5 12.5l-2.5-1.5-2.5 1.5v3l-2.5 1.5-2.5-1.5v-3l2.5-1.5V8l-5 3v6l5 3 5-3v-6l-2.5-1.5v3l2.5 1.5v3l2.5-1.5v-3l-2.5-1.5v-3l2.5 1.5v3l2.5-1.5v-6l-5-3v3.5z"/>
          </g>
        </svg>
      )
    }
  }

  const crypto = cryptoData[symbol] || {
    name: symbol,
    colors: 'from-gray-400 to-gray-600',
    bgLight: 'bg-gray-100',
    bgDark: 'bg-gray-800',
    icon: null
  }

  return (
    <div 
      className={`${sizes[size]} rounded-full flex items-center justify-center overflow-hidden flex-shrink-0`}
      title={crypto.name}
    >
      {crypto.icon ? (
        <div className="w-full h-full">
          {crypto.icon}
        </div>
      ) : (
        <div className={`w-full h-full bg-gradient-to-br ${crypto.colors} flex items-center justify-center`}>
          <span className="text-white font-bold text-xs">
            {symbol.substring(0, 2)}
          </span>
        </div>
      )}
    </div>
  )
}

export function getCryptoColor(symbol) {
  const colors = {
    BTC: { light: 'bg-orange-100', dark: 'bg-orange-950/30', text: 'text-orange-600 dark:text-orange-400', border: 'border-orange-200 dark:border-orange-900' },
    ETH: { light: 'bg-blue-100', dark: 'bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-900' },
    BNB: { light: 'bg-yellow-100', dark: 'bg-yellow-950/30', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-900' },
    SOL: { light: 'bg-purple-100', dark: 'bg-purple-950/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-900' },
    ADA: { light: 'bg-blue-100', dark: 'bg-blue-950/30', text: 'text-blue-600 dark:text-blue-400', border: 'border-blue-200 dark:border-blue-900' },
    DOGE: { light: 'bg-yellow-100', dark: 'bg-yellow-950/30', text: 'text-yellow-600 dark:text-yellow-400', border: 'border-yellow-200 dark:border-yellow-900' },
    DOT: { light: 'bg-pink-100', dark: 'bg-pink-950/30', text: 'text-pink-600 dark:text-pink-400', border: 'border-pink-200 dark:border-pink-900' },
    MATIC: { light: 'bg-purple-100', dark: 'bg-purple-950/30', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-200 dark:border-purple-900' }
  }
  return colors[symbol] || { light: 'bg-gray-100', dark: 'bg-gray-800', text: 'text-gray-600 dark:text-gray-400', border: 'border-gray-200 dark:border-gray-800' }
}
