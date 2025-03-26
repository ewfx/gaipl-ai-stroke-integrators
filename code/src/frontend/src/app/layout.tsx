import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'IPE - Integrated Platform Environment',
  description: 'AI-powered platform support environment with integrated capabilities',
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    <div className="flex-shrink-0 flex items-center">
                      <span className="text-xl font-bold text-primary-600">IPE</span>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                      <a href="/" className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Dashboard
                      </a>
                      <a href="/incidents" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Incidents
                      </a>
                      <a href="/chat" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        AI Chat
                      </a>
                      <a href="/recommendations" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                        Recommendations
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
          <Toaster position="top-right" />
        </QueryClientProvider>
      </body>
    </html>
  )
} 