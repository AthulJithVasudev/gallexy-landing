import Link from 'next/link'
import { ArrowLeft, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { WhatsAppIcon } from '@/components/whatsapp-icon'

export const metadata = {
  title: 'Page Not Found',
  description: 'The requested page could not be found.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[var(--background)] text-[var(--foreground)] px-4 py-8">
      {/* Header */}
      <header className="mx-auto w-full max-w-4xl flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2.5 font-bold tracking-tight text-lg text-[var(--foreground)] no-underline outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--red)] text-sm font-black text-white">
            G
          </span>
          <span>{siteConfig.name}</span>
        </Link>
      </header>

      {/* Main 404 card */}
      <main id="main" className="mx-auto w-full max-w-lg my-auto py-12 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-red-500/10 px-3.5 py-1 text-xs font-bold tracking-widest uppercase text-[var(--red)]">
          404 Error
        </div>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--muted)]">
          Sorry, we couldn’t find the page you’re looking for. It may have been moved, or the link might be broken.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--foreground)] text-[var(--background)] px-6 py-3 text-sm font-semibold transition hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to home
          </Link>

          <a
            href={`tel:${siteConfig.phone}`}
            aria-label={`Call ${siteConfig.name}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--red)] text-white px-6 py-3 text-sm font-semibold transition hover:bg-[var(--red-hover)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call Now
          </a>

          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Us (opens in a new tab)"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] text-white px-6 py-3 text-sm font-semibold transition hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mx-auto w-full max-w-4xl text-center text-xs text-[var(--muted)]">
        <p>
          {siteConfig.name} • {siteConfig.address.locality}, {siteConfig.address.region}
        </p>
      </footer>
    </div>
  )
}

