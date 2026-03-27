import type { Metadata, Viewport } from 'next'
import { Lora, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/lib/locale-context'
import { GameProvider } from '@/lib/game-context'
import './globals.css'

const lora = Lora({ 
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
})

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: '3-Minute Game',
  description: 'A practice of touch and consent by Betty Martin',
  generator: 'v0.app',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '3-Minute Game',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f0eb' },
    { media: '(prefers-color-scheme: dark)', color: '#2d2520' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`${lora.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        <LocaleProvider>
          <GameProvider>
            {children}
          </GameProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
