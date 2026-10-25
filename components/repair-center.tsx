'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Battery,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  ExternalLink,
  MapPin,
  MessageCircle,
  Mic2,
  Navigation,
  Phone,
  PlugZap,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Unlock,
  Wrench,
} from 'lucide-react'
import PillNav from './PillNav'
import LogoLoop from './LogoLoop'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

const phone = '+919876543210'
const whatsapp = 'https://wa.me/919876543210'
const mapsUrl =
  'https://www.google.com/maps/place/Galaxy+services/@10.3022082,76.3356451,19.62z/data=!4m6!3m5!1s0x3b0803a3a3458ead:0x5d92b40509f9c5e2!8m2!3d10.3021022!4d76.3361788!16s%2Fg%2F11gjqp92bm?entry=ttu'
const mapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.7!2d76.3356451!3d10.3022082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0803a3a3458ead%3A0x5d92b40509f9c5e2!2sGalaxy%20services!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'
const galaxyLogo = '/images/gallexy-logo-trimmed.png'
const galaxyWordmark = '/images/gallexy-logo-trimmed.png'
const galaxyEmblem = '/images/galaxy-emblem.png'

const brandLogos = [
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi' },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi' },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF' },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing' },
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi' },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi' },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF' },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing' },
]

const services = [
  {
    icon: Smartphone,
    title: 'Screen Replacement',
    description: 'Cracked, damaged, or unresponsive screens.',
    query: 'Hi Gallexy Services, I would like to enquire about screen replacement for my phone.',
  },
  {
    icon: Battery,
    title: 'Battery Issues',
    description: 'Battery draining quickly or struggling to hold charge.',
    query: 'Hi Gallexy Services, I would like to enquire about battery issues with my phone.',
  },
  {
    icon: PlugZap,
    title: 'Charging Problems',
    description: 'Charging port issues and charging faults.',
    query: 'Hi Gallexy Services, I would like to enquire about charging problems with my phone.',
  },
  {
    icon: Droplets,
    title: 'Water Damage',
    description: 'Assessment for liquid-related phone damage.',
    query: 'Hi Gallexy Services, I would like to enquire about water damage assessment for my phone.',
  },
  {
    icon: Unlock,
    title: 'Software Issues',
    description: 'Troubleshooting, updates, and software problems.',
    query: 'Hi Gallexy Services, I would like to enquire about software troubleshooting for my phone.',
  },
  {
    icon: Mic2,
    title: 'Speaker & Microphone',
    description: 'Sound, call audio, and microphone issues.',
    query: 'Hi Gallexy Services, I would like to enquire about speaker or microphone issues with my phone.',
  },
  {
    icon: Wrench,
    title: 'Back Glass Damage',
    description: 'Cracked or damaged rear glass.',
    query: 'Hi Gallexy Services, I would like to enquire about back glass damage repair for my phone.',
  },
  {
    icon: Camera,
    title: 'Camera Problems',
    description: 'Camera faults, focusing issues, or damaged lenses.',
    query: 'Hi Gallexy Services, I would like to enquire about camera problems on my phone.',
  },
]



export interface VerifiedReview {
  id: string
  name: string
  rating: number
  text: string
  date?: string
  source?: string
}

// Configured verified customer reviews. Keep empty when no verified reviews have been provided.
const verifiedReviews: VerifiedReview[] = []

const faqs = [
  {
    q: 'How much does a phone repair cost?',
    a: 'Repair costs depend on your phone model, the issue, and the parts required. Contact us to discuss an estimate.',
  },
  {
    q: 'How long will a repair take?',
    a: "Repair times depend on the fault, device model, and parts availability. We'll discuss the expected timeline once we understand the problem.",
  },
  {
    q: 'Can I walk in for a repair?',
    a: 'Yes, walk-ins are welcome during our business hours',
  },
  {
    q: 'Do you provide a warranty on repairs?',
    a: 'Contact us to discuss the warranty terms applicable to your repair.',
  },
  {
    q: 'What if my phone cannot be repaired?',
    a: "We'll explain what we find during the assessment and discuss the available options. Whether a repair is possible depends on the device and the nature of the damage.",
  },
]

const easeOutCustom = [0.22, 1, 0.36, 1] as const

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.div
      className="section-heading"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: easeOutCustom }}
    >
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children}
    </motion.div>
  )
}

export default function RepairCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [dark, setDark] = useState(false)
  const [activeHref, setActiveHref] = useState('#top')
  const shouldReduceMotion = useReducedMotion()

  const heroActionsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.38,
      },
    },
  }

  const heroButtonVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOutCustom },
    },
  }

  const heroTrustVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.48,
      },
    },
  }

  const heroTrustItemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: easeOutCustom },
    },
  }

  const servicesContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  }

  const serviceCardVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: 18, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: easeOutCustom,
      },
    },
  }

  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme
      ? savedTheme === 'dark'
      : document.documentElement.classList.contains('dark') || prefersDark
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [])

  useEffect(() => {
    const sectionIds = ['top', 'services', 'location', 'reviews', 'faqs']
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveHref(`#${id}`)
            return
          }
        }
      }
      setActiveHref('#top')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Location', href: '#location' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
  ]

  return (
    <div className="site-shell">
      <motion.header
        className="top-dock"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutCustom }}
      >
        <PillNav
          logo={galaxyLogo}
          logoAlt="Gallexy"
          logoHref="#top"
          items={navItems}
          activeHref={activeHref}
          itemStyle="plain"
          hoverEffect="glide"
          indicator="pill"
          bounce={0.31}
          stretch={0.78}
          collapse="auto"
          theme={dark ? 'dark' : 'light'}
        />
        <div className="dock-actions">
          <AnimatedThemeToggler
            className="nav-action-btn"
            theme={dark ? 'dark' : 'light'}
            onThemeChange={(newTheme) => setDark(newTheme === 'dark')}
          />
          <a className="nav-call-btn" href={`tel:${phone}`} aria-label="Call Now">
            <Phone /> <span>Call Now</span>
          </a>
        </div>
      </motion.header>

      <main id="top">
        {/* 1. HERO SECTION */}
        <section className="hero section-wrap">
          <div className="hero-copy">
            <motion.div
              className="status-pill"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: easeOutCustom }}
            >
              <span className="pulse-dot" /> Open: Mon – Sat 10:30 AM – 7:00 PM{' '}
              <span className="status-separator">•</span> Chalakudy
            </motion.div>
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.58, delay: 0.16, ease: easeOutCustom }}
            >
              Phone repairs,<br />
              <em>made simple.</em>
            </motion.h1>
            <motion.p
              className="hero-lede"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: easeOutCustom }}
            >
              From cracked screens to battery and charging issues, we help get your phone working again.
              Tell us what&apos;s wrong, and we&apos;ll help you figure out the next step.
            </motion.p>
            <motion.div
              className="hero-actions"
              variants={heroActionsVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                variants={heroButtonVariants}
                className="button button-red"
                href={`tel:${phone}`}
              >
                <Phone /> Call Now
              </motion.a>
              <motion.a
                variants={heroButtonVariants}
                className="button button-whatsapp"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle /> WhatsApp Us
              </motion.a>
            </motion.div>
            <motion.div
              className="trust-row"
              variants={heroTrustVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={heroTrustItemVariants}>
                <Check /> Repair Estimates
              </motion.span>
              <motion.span variants={heroTrustItemVariants}>
                <Check /> Repair Options
              </motion.span>
              <motion.span variants={heroTrustItemVariants}>
                <Check /> Personalised Service
              </motion.span>
            </motion.div>
          </div>

          <div className="hero-visual" aria-label="Phone repair service illustration">
            <motion.div
              className="hero-orbit orbit-one"
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.2, ease: easeOutCustom }}
            />
            <motion.div
              className="hero-orbit orbit-two"
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.26, ease: easeOutCustom }}
            />
            <motion.div
              className="phone-frame"
              initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 22, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.32, ease: easeOutCustom }}
            >
              <div className="phone-speaker" />
              <div className="phone-screen">
                <span>09:41</span>
                <div className="screen-glow" />
                <Smartphone />
              </div>
            </motion.div>
            <motion.div
              className="floating-note note-top"
              initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.62, ease: easeOutCustom }}
            >
              <div className="floating-note-inner">
                <ShieldCheck />
                <span>
                  <strong>Assessment &amp; Care</strong>
                  <small>Device-specific advice</small>
                </span>
              </div>
            </motion.div>
            <motion.div
              className="floating-note note-bottom"
              initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.74, ease: easeOutCustom }}
            >
              <div className="floating-note-inner">
                <Sparkles />
                <span>
                  <strong>Clear Estimates</strong>
                  <small>Upfront discussion</small>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. BRANDS SECTION */}
        <motion.section
          className="brand-strip section-wrap"
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: easeOutCustom }}
        >
          <span className="strip-label">Brands we service</span>
          <LogoLoop
            className="brand-loop"
            logos={brandLogos}
            speed={48}
            direction="left"
            logoHeight={26}
            gap={68}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutWidth={0.12}
            ariaLabel="Brands we service: Xiaomi, Redmi, CMF, Nothing"
          />
        </motion.section>

        {/* 3. WHAT WE FIX SECTION */}
        <section className="section-wrap section-space" id="services">
          <SectionHeading eyebrow="Our expertise" title="What we fix">
            <p>From cracked glass to charging troubles, our technicians know their way around your device.</p>
          </SectionHeading>

          <motion.div
            className="service-grid"
            variants={servicesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {services.map((service) => {
              const Icon = service.icon
              const waLink = `${whatsapp}?text=${encodeURIComponent(service.query)}`
              return (
                <motion.a
                  key={service.title}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-card"
                  variants={serviceCardVariants}
                  whileHover={shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2, ease: easeOutCustom } }}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                  aria-label={`Enquire about ${service.title} on WhatsApp`}
                >
                  <div className="service-card-top">
                    <div className="service-icon">
                      <Icon />
                    </div>
                    <span className="service-wa-indicator" title="Enquire on WhatsApp">
                      <MessageCircle />
                    </span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </motion.a>
              )
            })}
          </motion.div>

          <motion.div
            className="services-footer-cta"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOutCustom }}
          >
            <span className="services-cta-prompt">Not sure what&apos;s wrong?</span>
            <a
              href={`${whatsapp}?text=${encodeURIComponent("Hi Gallexy Services, I'm not sure what's wrong with my phone and would like to ask about repair options.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta-link"
            >
              Ask us about your phone <ArrowRight />
            </a>
          </motion.div>
        </section>



        {/* 5. LOCATION AND CONTACT SECTION */}
        <section className="section-wrap section-space" id="location">
          <motion.div
            className="location-card"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: easeOutCustom }}
          >
            <motion.div
              className="location-copy"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, delay: 0.1, ease: easeOutCustom }}
            >
              <SectionHeading eyebrow="Come say hello" title="Your phone is in good hands.">
                <p>Have a phone problem? Get in touch to discuss your device or plan your visit.</p>
              </SectionHeading>

              <div className="contact-detail">
                <MapPin />
                <div>
                  <strong>Gallexy Services</strong>
                  <p>
                    First Floor, Swarnam Arcade, KSRTC Bus Stand Rd
                    <br />
                    Opposite Reliance Fresh &amp; Surabhi Theatre, South Junction
                    <br />
                    South Chalakudy, Chalakudy, Kerala 680307
                  </p>
                </div>
              </div>

              <div className="contact-detail">
                <Clock3 />
                <div>
                  <strong>Working Hours</strong>
                  <p>
                    Monday – Saturday: 10:30 AM – 7:00 PM
                    <br />
                    <span style={{ color: 'var(--red)', fontSize: '11px', fontWeight: 600 }}>
                      Sunday: Closed
                    </span>
                  </p>
                </div>
              </div>

              <div className="location-actions">
                <a className="button button-red button-prominent" href={`tel:${phone}`}>
                  <Phone /> Call Now
                </a>
                <a
                  className="button button-whatsapp"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle /> WhatsApp Us
                </a>
                <a
                  className="button button-outline"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation /> Get Directions
                </a>
              </div>
            </motion.div>

            <motion.div
              className="map-container"
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.22, ease: easeOutCustom }}
            >
              <iframe
                title="Gallexy Services Location Map - Chalakudy"
                src={mapsEmbedUrl}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="map-badge">
                <MapPin />
                <span>Gallexy Services · Chalakudy</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* 6. CUSTOMER REVIEWS SECTION */}
        <section className="section-wrap section-space" id="reviews">
          <SectionHeading eyebrow="Real words. Real experiences." title="Real words. Real experiences.">
            <p>See what customers have shared about their experience with us.</p>
          </SectionHeading>

          {verifiedReviews.length > 0 ? (
            <motion.div
              className="reviews-carousel-wrap"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: easeOutCustom }}
            >
              <div className="reviews-track">
                {verifiedReviews.map((rev) => (
                  <article key={rev.id} className="review-card">
                    <div className="review-rating" aria-label={`${rev.rating} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          className={starIdx < rev.rating ? 'star-filled' : 'star-empty'}
                        />
                      ))}
                    </div>
                    <p className="review-body">&ldquo;{rev.text}&rdquo;</p>
                    <div className="review-meta">
                      <strong className="review-author">{rev.name}</strong>
                      {rev.date && <span className="review-date">{rev.date}</span>}
                      {rev.source && <span className="review-source">{rev.source}</span>}
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="reviews-empty-state"
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: easeOutCustom }}
            >
              <div className="reviews-empty-inner">
                <div className="reviews-empty-icon">
                  <MessageCircle />
                </div>
                <h3>Customer reviews will appear here.</h3>
                <p>
                  We value genuine customer feedback. Real reviews from Google will be presented here as they are published.
                </p>
                <div className="reviews-empty-actions">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button button-outline read-all-reviews-btn"
                  >
                    Read All Reviews on Google <ExternalLink />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS SECTION */}
        <section className="faq-section section-space" id="faqs">
          <div className="narrow-wrap">
            <SectionHeading eyebrow="Need to know" title="Questions, answered." />
            <motion.div
              className="faq-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.07,
                  },
                },
              }}
            >
              {faqs.map((faq, i) => (
                <motion.div
                  className={`faq-item ${openFaq === i ? 'is-open' : ''}`}
                  key={faq.q}
                  variants={{
                    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: easeOutCustom },
                    },
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        className="faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }
                        }
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <motion.footer
        className="footer-wrap"
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.12 }}
        transition={{ duration: 0.55, ease: easeOutCustom }}
      >
        <div className="section-wrap footer-grid">
          {/* Column 1 — Brand */}
          <div className="footer-col footer-col-brand">
            <a href="#top" className="footer-brand" aria-label="Gallexy Services home">
              <img className="footer-logo-emblem" src={galaxyEmblem} alt="Gallexy" />
              <img className="footer-logo-wordmark" src={galaxyWordmark} alt="Gallexy Services" />
            </a>
            <p className="footer-tagline">Phone repairs, made simple.</p>
            <p className="footer-subtext">
              Mobile repair and service center in Chalakudy, Kerala.
            </p>
            <div className="footer-social-links">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle />
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Maps">
                <MapPin />
              </a>
              <a href={`tel:${phone}`} aria-label="Call Gallexy Services">
                <Phone />
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="footer-col footer-col-nav">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-links">
              <li><a href="#top">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#location">Location</a></li>
              <li><a href="#reviews">Customer Reviews</a></li>
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Column 3 — Visit Us */}
          <div className="footer-col footer-col-visit">
            <h4 className="footer-heading">Visit Us</h4>
            <address className="footer-address">
              <strong>Gallexy Services</strong>
              <span>First Floor, Swarnam Arcade</span>
              <span>KSRTC Bus Stand Rd, South Junction</span>
              <span>South Chalakudy, Kerala 680307</span>
            </address>
            <div className="footer-hours">
              <strong>Opening Hours</strong>
              <span>Mon – Sat: 10:30 AM – 7:00 PM</span>
              <span className="footer-closed">Sunday: Closed</span>
            </div>
            <div className="footer-action">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-directions-btn"
              >
                <Navigation /> Get Directions
              </a>
            </div>
          </div>
        </div>

        <div className="section-wrap footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-flex">
            <p className="copyright">
              © {new Date().getFullYear()} Gallexy Services. All rights reserved.
            </p>
            <span className="footer-badge">Chalakudy, Kerala</span>
          </div>
        </div>
      </motion.footer>

      {/* PERSISTENT MOBILE BOTTOM BAR */}
      <div className="mobile-bottom-bar" role="navigation" aria-label="Quick contact">
        <a className="button button-red" href={`tel:${phone}`}>
          <Phone /> Call Now
        </a>
        <a
          className="button button-whatsapp"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle /> WhatsApp
        </a>
      </div>
    </div>
  )
}
