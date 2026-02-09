import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OpenClaw Life Console',
  description: 'Personal Life Operating System Dashboard'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
