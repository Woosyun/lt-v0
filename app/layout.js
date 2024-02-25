import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '@/lib/components/Sidebar'
import Provider from '@/lib/components/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'dbfs',
  description: 'database file system',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className='body-container'>
            <Sidebar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  )
}
