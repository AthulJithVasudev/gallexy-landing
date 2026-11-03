'use client'

import { useId, useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { siteConfig, faqsConfig, FaqItem as Faq } from '@/lib/site-config'

const CSS = `
@keyframes faq-word {
  from {
    opacity: 0;
    filter: blur(4px);
  }
  to {
    opacity: 1;
    filter: blur(0);
  }
}
.faq-open .faq-word {
  animation: faq-word 0.35s ease-out both;
}
@media (prefers-reduced-motion: reduce) {
  .faq-open .faq-word {
    animation: none !important;
  }
}
`

function FaqItemComponent({
  faq,
  open,
  onToggle,
}: {
  faq: Faq
  open: boolean
  onToggle: () => void
}) {
  const id = useId()
  const icon =
    'absolute inset-0 size-6 transition-[transform,opacity] duration-200 motion-reduce:transition-none'

  return (
    <div
      className={`mb-9 rounded-lg shadow-sm ring-1 ring-black/5 transition-colors duration-200 dark:shadow-none dark:ring-0 ${
        open
          ? 'faq-open bg-neutral-100 dark:bg-[var(--background,#0B0B0D)]'
          : 'bg-white dark:bg-[var(--background,#0B0B0D)]'
      }`}
    >
      <h3>
        <button
          id={`${id}-b`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-p`}
          onClick={onToggle}
          className="flex w-full items-start gap-4 rounded-lg p-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
        >
          <span
            className="relative mt-0.5 size-6 shrink-0 text-[var(--muted)]"
            aria-hidden="true"
          >
            <ChevronUp
              className={`${icon} ${
                open ? 'scale-0 rotate-90' : 'scale-100 rotate-0'
              }`}
            />
            <ChevronDown
              className={`${icon} ${
                open ? 'scale-100 rotate-0' : 'scale-0 rotate-90'
              }`}
            />
          </span>
          <span className="text-lg font-medium leading-7 text-[var(--foreground)]">
            {faq.q}
          </span>
        </button>
      </h3>
      <div
        id={`${id}-p`}
        role="region"
        aria-labelledby={`${id}-b`}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="pr-4 pb-4 pl-14 leading-relaxed text-[var(--muted)]">
            <span className="sr-only">{faq.a}</span>
            <span aria-hidden="true">
              {faq.a.split(' ').map((w, k) => (
                <span
                  key={k}
                  className="faq-word inline-block"
                  style={{
                    animationDelay: `${k * 25}ms`,
                    marginRight: '0.25em',
                  }}
                >
                  {w}
                </span>
              ))}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faqs"
      aria-labelledby="faq-heading"
      className="mx-auto w-full max-w-7xl px-4 py-20 md:px-8 md:py-32"
    >
      <style>{CSS}</style>
      <div className="text-center">
        <span className="eyebrow inline-block">Common Queries</span>
      </div>
      <h2
        id="faq-heading"
        className="text-center text-4xl leading-[1.1] font-bold tracking-tight text-[var(--foreground)] md:text-5xl"
      >
        Frequently Asked Questions
      </h2>
      <p className="mx-auto mt-4 max-w-lg text-center text-[var(--muted)]">
        We are here to help you with any questions you may have. If you can’t
        find what you need, please{' '}
        <a
          href={`tel:${siteConfig.phone}`}
          aria-label={`Call ${siteConfig.name}`}
          className="font-medium text-[var(--red)] underline underline-offset-4 decoration-[var(--red)] hover:opacity-85 focus-visible:rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
        >
          Call
        </a>{' '}
        or{' '}
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Galaxy Services (opens in a new tab)"
          className="font-medium text-[var(--red)] underline underline-offset-4 decoration-[var(--red)] hover:opacity-85 focus-visible:rounded-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--red)]"
        >
          WhatsApp Us
        </a>
        .
      </p>
      <div className="mx-auto mt-12 w-full max-w-3xl">
        {faqsConfig.map((faq, i) => (
          <FaqItemComponent
            key={faq.q}
            faq={faq}
            open={openIndex === i}
            onToggle={() =>
              setOpenIndex(openIndex === i ? null : i)
            }
          />
        ))}
      </div>
    </section>
  )
}
