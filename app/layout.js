import './globals.css'
import { ThemeProvider } from './context/ThemeContext'
import Footer from './components/Footer'

export const metadata = {
  title: 'Crypto Portfolio Monitor',
  description: 'Monitor your cryptocurrency portfolio performance',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background-light dark:bg-background-dark">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-border-light dark:border-border-dark">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="1" x2="12" y2="23"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                      </svg>
                    </div>
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white tracking-tight">
                      Crypto Portfolio
                    </h1>
                  </div>
                  <div className="flex items-center space-x-6">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Q4 2025</span>
                    <div className="h-9 w-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-white">U</span>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
