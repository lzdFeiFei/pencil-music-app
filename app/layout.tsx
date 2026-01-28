import type { Metadata } from 'next'
import { Inter, Instrument_Serif, DM_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'
import PlayerBar from '@/components/layout/PlayerBar'
import { QueryProvider } from '@/lib/providers/QueryProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  title: 'Cloud Music - 网易云音乐风格应用',
  description: '基于 Pencil 设计的现代音乐流媒体应用',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${instrumentSerif.variable} ${dmMono.variable} ${inter.className}`}>
        <QueryProvider>
          <Sidebar />
          <main className="ml-60 mb-20">
            {children}
          </main>
          <PlayerBar />
        </QueryProvider>
      </body>
    </html>
  )
}
