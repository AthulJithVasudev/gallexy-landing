import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Galaxy Services | Phone Repairs, Made Simple',
  description:
    'Galaxy Services provides reliable mobile phone repair assistance in Chalakudy, Kerala. Contact us to discuss your device and get a repair estimate.',
  metadataBase: new URL('https://gallexyservices.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Galaxy Services | Phone Repairs, Made Simple',
    description:
      'Galaxy Services provides reliable mobile phone repair assistance in Chalakudy, Kerala. Contact us to discuss your device and get a repair estimate.',
    url: 'https://gallexyservices.com',
    siteName: 'Galaxy Services',
    locale: 'en_IN',
    type: 'website',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9FAFB' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0B0D' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        <a href="#top" className="skip-link">
          Skip to main content
        </a>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
