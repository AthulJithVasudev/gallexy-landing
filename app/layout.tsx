import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gallexy Services | Phone Repairs, Made Simple',
  description:
    'Gallexy Services provides reliable mobile phone repair assistance in Chalakudy, Kerala. Contact us to discuss your device and get a repair estimate.',
  metadataBase: new URL('https://gallexyservices.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Gallexy Services | Phone Repairs, Made Simple',
    description:
      'Gallexy Services provides reliable mobile phone repair assistance in Chalakudy, Kerala. Contact us to discuss your device and get a repair estimate.',
    url: 'https://gallexyservices.com',
    siteName: 'Gallexy Services',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
