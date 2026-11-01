'use client'

import { memo, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Battery,
  Camera,
  Check,
  ChevronDown,
  Clock3,
  Droplets,
  Map,
  MapPin,
  Mic2,
  Phone,
  PlugZap,
  Smartphone,
  Unlock,
  Wrench,
} from 'lucide-react'
import CardNav, { CardNavItem } from './CardNav'
import LogoLoop from './LogoLoop'
import FaqSection from './faq-section'
import HeroVisualCluster from './hero-visual-cluster'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import { WhatsAppIcon } from './whatsapp-icon'

const phone = '+919496696934'
const whatsapp = 'https://wa.me/919496696934'
const mapsUrl =
  'https://www.google.com/maps/place/Galaxy+services/@10.3022082,76.3356451,19.62z/data=!4m6!3m5!1s0x3b0803a3a3458ead:0x5d92b40509f9c5e2!8m2!3d10.3021022!4d76.3361788!16s%2Fg%2F11gjqp92bm?entry=ttu'
const mapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.7!2d76.3356451!3d10.3022082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0803a3a3458ead%3A0x5d92b40509f9c5e2!2sGalaxy%20services!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'
const galaxyLogo = '/images/galaxy-logo-trimmed.webp'
const galaxyWordmark = '/images/galaxy-logo-trimmed.webp'
const galaxyEmblem = '/images/galaxy-emblem.webp'

const brandLogos = [
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi', width: 32, height: 32 },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi', width: 80, height: 23 },
  { src: '/images/logos/motorola.svg', alt: 'Motorola', title: 'Motorola', width: 96, height: 22 },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF', width: 48, height: 32 },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing', width: 100, height: 18 },
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi', width: 32, height: 32 },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi', width: 80, height: 23 },
  { src: '/images/logos/motorola.svg', alt: 'Motorola', title: 'Motorola', width: 96, height: 22 },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF', width: 48, height: 32 },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing', width: 100, height: 18 },
]

const services = [
  {
    icon: Smartphone,
    title: 'Screen Replacement',
    description: 'Cracked, damaged, or unresponsive screens.',
    query: 'Hi Galaxy Services, I would like to enquire about screen replacement for my phone.',
  },
  {
    icon: Battery,
    title: 'Battery Issues',
    description: 'Battery draining quickly or struggling to hold charge.',
    query: 'Hi Galaxy Services, I would like to enquire about battery issues with my phone.',
  },
  {
    icon: PlugZap,
    title: 'Charging Problems',
    description: 'Charging port issues and charging faults.',
    query: 'Hi Galaxy Services, I would like to enquire about charging problems with my phone.',
  },
  {
    icon: Droplets,
    title: 'Water Damage',
    description: 'Assessment for liquid-related phone damage.',
    query: 'Hi Galaxy Services, I would like to enquire about water damage assessment for my phone.',
  },
  {
    icon: Unlock,
    title: 'Software Issues',
    description: 'Troubleshooting, updates, and software problems.',
    query: 'Hi Galaxy Services, I would like to enquire about software troubleshooting for my phone.',
  },
  {
    icon: Mic2,
    title: 'Speaker & Microphone',
    description: 'Sound, call audio, and microphone issues.',
    query: 'Hi Galaxy Services, I would like to enquire about speaker or microphone issues with my phone.',
  },
  {
    icon: Wrench,
    title: 'Back Glass Damage',
    description: 'Cracked or damaged rear glass.',
    query: 'Hi Galaxy Services, I would like to enquire about back glass damage repair for my phone.',
  },
  {
    icon: Camera,
    title: 'Camera Problems',
    description: 'Camera faults, focusing issues, or damaged lenses.',
    query: 'Hi Galaxy Services, I would like to enquire about camera problems on my phone.',
  },
]




const easeOutCustom = [0.22, 1, 0.36, 1] as const

const SectionHeading = memo(function SectionHeading({
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
})

const ROTATING_PHRASES = [
  'made simple.',
  'done right.',
  'without the wait.',
  'with warranty.',
]

export default function RepairCenter({ heroPhoneImage }: { heroPhoneImage?: React.ReactNode } = {}) {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [dark, setDark] = useState(true)
  const [activeHref, setActiveHref] = useState('#top')
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMenuOpenRef = useRef(isMenuOpen)
  isMenuOpenRef.current = isMenuOpen
  const shouldReduceMotion = useReducedMotion()

  // Rotating red phrase cycling: starts after sequence (~2.2s), pauses when tab hidden
  useEffect(() => {
    if (shouldReduceMotion) return

    let intervalId: ReturnType<typeof setInterval> | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const startCycling = () => {
      if (intervalId) clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (document.visibilityState === 'visible') {
          setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length)
        }
      }, 3000)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
      } else {
        startCycling()
      }
    }

    timeoutId = setTimeout(() => {
      startCycling()
    }, 2200)

    document.addEventListener('visibilitychange', onVisibilityChange)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (intervalId) clearInterval(intervalId)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [shouldReduceMotion])

  const heroActionsVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.08,
          delayChildren: shouldReduceMotion ? 0 : 0.38,
        },
      },
    }),
    [shouldReduceMotion]
  )

  const heroButtonVariants = useMemo(
    () => ({
      hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeOutCustom },
      },
    }),
    [shouldReduceMotion]
  )

  const heroTrustVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.07,
          delayChildren: shouldReduceMotion ? 0 : 0.48,
        },
      },
    }),
    [shouldReduceMotion]
  )

  const heroTrustItemVariants = useMemo(
    () => ({
      hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, ease: easeOutCustom },
      },
    }),
    [shouldReduceMotion]
  )

  const servicesContainerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.07,
          delayChildren: shouldReduceMotion ? 0 : 0.05,
        },
      },
    }),
    [shouldReduceMotion]
  )

  const serviceCardVariants = useMemo(
    () => ({
      hidden: shouldReduceMotion
        ? { opacity: 1, y: 0 }
        : { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: easeOutCustom,
        },
      },
    }),
    [shouldReduceMotion]
  )

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
    const sectionIds = ['top', 'services', 'location', 'faqs']
    let rafId: number | null = null

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      let nextActive = '#top'

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const element = document.getElementById(id)
        if (element && scrollPosition >= element.offsetTop) {
          nextActive = `#${id}`
          break
        }
      }

      setActiveHref((prev) => (prev === nextActive ? prev : nextActive))
      rafId = null
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(handleScroll)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    handleScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  // Floating navbar: scroll-direction detection with threshold & mobile menu awareness
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0
    let lastDirection: 'up' | 'down' = 'up'
    let rafId: number | null = null

    const SCROLL_THRESHOLD = 20
    const TOP_THRESHOLD = 50

    const updateNavVisibility = () => {
      const currentScrollY = window.scrollY

      // 1. Keep navbar visible if mobile navigation menu is open or at top of the page
      if (isMenuOpenRef.current || currentScrollY <= TOP_THRESHOLD) {
        setIsNavVisible(true)
        lastScrollY = Math.max(0, currentScrollY)
        rafId = null
        return
      }

      // Ignore negative scroll values (iOS rubber-band effect)
      if (currentScrollY < 0) {
        rafId = null
        return
      }

      // Avoid jitter at the very bottom of the document
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll > 0 && currentScrollY > maxScroll) {
        rafId = null
        return
      }

      const diff = currentScrollY - lastScrollY

      // Ignore zero movement
      if (Math.abs(diff) < 1) {
        rafId = null
        return
      }

      const currentDirection: 'up' | 'down' = diff > 0 ? 'down' : 'up'

      // Reset baseline when scroll direction reverses to prevent accidental triggers
      if (currentDirection !== lastDirection) {
        lastDirection = currentDirection
        lastScrollY = currentScrollY
        rafId = null
        return
      }

      // Check threshold in current direction
      if (Math.abs(diff) >= SCROLL_THRESHOLD) {
        if (currentDirection === 'down') {
          setIsNavVisible(false)
        } else {
          setIsNavVisible(true)
        }
        lastScrollY = currentScrollY
      }

      rafId = null
    }

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateNavVisibility)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId !== null) window.cancelAnimationFrame(rafId)
    }
  }, [])

  // Keep navbar visible when mobile menu is opened
  useEffect(() => {
    if (isMenuOpen) {
      setIsNavVisible(true)
    }
  }, [isMenuOpen])

  const cardNavItems: CardNavItem[] = useMemo(
    () => [
      {
        label: 'Navigation',
        description: 'Jump to key sections across our service center.',
        links: [
          { label: 'Home', href: '#top' },
          { label: 'What We Fix', href: '#services' },
          { label: 'Location & Hours', href: '#location' },
          { label: 'Common FAQs', href: '#faqs' },
        ],
      },
      {
        label: 'Our Repairs',
        description: 'Professional hardware & component diagnostics.',
        links: [
          { label: 'Screen Replacement', href: '#services' },
          { label: 'Battery Issues', href: '#services' },
          { label: 'Charging & Water Damage', href: '#services' },
          { label: 'Camera & Back Glass', href: '#services' },
        ],
      },
      {
        label: 'Visit & Connect',
        description: 'Chalakudy town center. Open Mon–Sat 10:30 AM–7:00 PM.',
        links: [
          { label: 'Call: +91 94966 96934', href: `tel:${phone}` },
          { label: 'Chat on WhatsApp', href: whatsapp },
          { label: 'Find Us on Maps', href: '#location' },
        ],
      },
    ],
    []
  )

  return (
    <div className="site-shell">
      <header
        className={`card-nav-header ${!isNavVisible ? 'is-nav-hidden' : ''}`}
      >
        <CardNav
          logo={galaxyLogo}
          logoAlt="Galaxy Services"
          logoHref="#top"
          items={cardNavItems}
          cta={{ label: 'Call Now', href: `tel:${phone}` }}
          accentColor="#e11d2e"
          theme={dark ? 'dark' : 'light'}
          surface="glass"
          cardEffect="rise"
          openOn="click"
          intro={false}
          maxWidth={840}
          onOpenChange={setIsMenuOpen}
          actions={
            <AnimatedThemeToggler
              className="nav-action-btn"
              theme={dark ? 'dark' : 'light'}
              onThemeChange={(newTheme) => setDark(newTheme === 'dark')}
            />
          }
          onLinkClick={(link, _item, event) => {
            if (link.href?.startsWith('#')) {
              event.preventDefault()
              const target = document.querySelector(link.href)
              if (target) {
                target.scrollIntoView({ behavior: 'smooth' })
              }
            }
          }}
        />
      </header>

      <main id="top">
        {/* HERO PAGE: HERO CONTENT + AUTHORIZED SERVICE PARTNER AT BOTTOM (VISIBLE AT FIRST GLANCE) */}
        <div className="hero-page">
          <section className="hero section-wrap" aria-label="Galaxy repair center overview">
            {/* Optional Hero Corner Accents */}
            <div className="hero-corner-mark hero-corner-tl" aria-hidden="true">+</div>
            <div className="hero-corner-mark hero-corner-tr" aria-hidden="true">+</div>
            <div className="hero-corner-mark hero-corner-bl" aria-hidden="true">+</div>
            <div className="hero-corner-mark hero-corner-br" aria-hidden="true">+</div>

            <div className="hero-copy">

              {/* 70ms: Opening-hours badge (180ms) */}
              <div className="status-pill hero-anim-badge">
                <span className="pulse-dot" /> Open: Mon – Sat 10:30 AM – 7:00 PM{' '}
                <span className="status-separator">•</span> <span translate="no">Chalakudy</span>
              </div>

              {/* 150ms & 270ms: h1 lines 1 & 2 */}
              <h1 className="hero-h1">
                <span className="sr-only">Phone repairs, made simple.</span>
                <span aria-hidden="true">
                  <span className="hero-h1-line hero-h1-line-1">Phone repairs,</span>
                  <span className="hero-h1-line hero-h1-line-2">
                    <span className="hero-rotator-grid">
                      {ROTATING_PHRASES.map((phrase, idx) => (
                        <span
                          key={phrase}
                          className={`hero-rotator-item ${idx === phraseIndex ? 'is-active' : ''}`}
                        >
                          <em>{phrase}</em>
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>

              {/* 390ms: Subtext */}
              <p className="hero-lede hero-anim-subtext">
                From cracked screens to battery and charging issues, we help get your phone working again.
                Tell us what’s wrong, and we’ll help you figure out the next step.
              </p>

              {/* 510ms: CTA buttons (clickable from frame 0) */}
              <div className="hero-actions hero-anim-actions">
                <motion.a
                  className="button button-red hero-call-btn"
                  href={`tel:${phone}`}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.97, transition: { duration: 0.08 } }
                  }
                >
                  <Phone aria-hidden="true" /> Call Now
                </motion.a>
                <motion.a
                  className="button button-whatsapp"
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Us (opens in a new tab)"
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -2, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.97, transition: { duration: 0.08 } }
                  }
                >
                  <WhatsAppIcon /> <span translate="no">WhatsApp</span> Us
                </motion.a>
              </div>

              {/* 900ms / 1000ms / 1100ms: Tick items fade up 8px */}
              <div className="trust-row">
                <span className="hero-anim-tick-1">
                  <Check aria-hidden="true" /> Repair Estimates
                </span>
                <span className="hero-anim-tick-2">
                  <Check aria-hidden="true" /> Repair Options
                </span>
                <span className="hero-anim-tick-3">
                  <Check aria-hidden="true" /> Personalised Service
                </span>
              </div>
            </div>

            <div className="hero-visual-wrap">
              <HeroVisualCluster phoneImage={heroPhoneImage} />
            </div>
          </section>

          {/* AUTHORIZED SERVICE PARTNER (BOTTOM OF HERO PAGE) */}
          <section
            className="brand-strip section-wrap"
            aria-label="Authorized service partner"
          >
            <span className="strip-label hero-anim-brand-label">Authorized service partner for</span>
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
              intro={false}
              startDelay={900}
              ariaLabel="Brands we service: Xiaomi, Redmi, Motorola, CMF, Nothing"
            />
          </section>
        </div>

                {/* 3. WHAT WE FIX SECTION */}
        <section className="section-wrap section-space" id="services">
          <SectionHeading eyebrow="Our Expertise" title="What We Fix">
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
                  aria-label={`Enquire about ${service.title} on WhatsApp (opens in a new tab)`}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }
                  }
                  whileTap={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 0.98, transition: { duration: 0.08 } }
                  }
                >
                  <div className="service-card-top">
                    <div className="service-icon">
                      <Icon aria-hidden="true" />
                    </div>
                    <span className="service-wa-indicator" aria-hidden="true">
                      <WhatsAppIcon />
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
            <span className="services-cta-prompt">Not sure what’s wrong?</span>
            <a
              href={`${whatsapp}?text=${encodeURIComponent("Hi Galaxy Services, I'm not sure what's wrong with my phone and would like to ask about repair options.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta-link"
            >
              Ask us about your phone <ArrowRight aria-hidden="true" />
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
              <SectionHeading eyebrow="Come Say Hello" title="Your Phone Is in Good Hands">
                <p>Have a phone problem? Get in touch to discuss your device or plan your visit.</p>
              </SectionHeading>

              {/* Desktop-only details & actions inside location-copy */}
              <div className="location-desktop-details">
                <div className="contact-detail">
                  <MapPin aria-hidden="true" />
                  <div>
                    <strong><span translate="no">Galaxy Services</span></strong>
                    <p>
                      First Floor, Swarnam Arcade, KSRTC Bus Stand Rd
                      <br />
                      Opposite Reliance Fresh &amp; Surabhi Theatre, South Junction
                      <br />
                      South <span translate="no">Chalakudy</span>, <span translate="no">Chalakudy</span>, Kerala 680307
                    </p>
                    <p className="contact-address-phone">
                      <a href={`tel:${phone}`} aria-label={`Call us at ${phone}`}>
                        <Phone aria-hidden="true" />
                        <span>+91 94966 96934</span>
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail">
                  <Clock3 aria-hidden="true" />
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
                    <Phone aria-hidden="true" /> Call Now
                  </a>
                  <a
                    className="button button-whatsapp"
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Us (opens in a new tab)"
                  >
                    <WhatsAppIcon /> WhatsApp Us
                  </a>
                  <a
                    className="button button-outline button-with-arrow location-directions-desktop"
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get Directions in Google Maps (opens in a new tab)"
                  >
                    Get Directions <ArrowRight aria-hidden="true" className="arrow-icon" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Subtle Divider (Mobile only) */}
            <div className="location-mobile-divider" aria-hidden="true" />

            <motion.div
              className="map-container"
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.22, ease: easeOutCustom }}
            >
              {/* 1, 2, 3: Mobile Location Header */}
              <div className="mobile-map-header">
                <span className="mobile-map-label">Find Our Location</span>
                <h2 className="mobile-map-title">Visit <span translate="no">Galaxy Services</span></h2>
                <p className="mobile-map-desc">
                  We’re easy to find, right near the KSRTC Bus Stand in <span translate="no">Chalakudy</span>.
                </p>
              </div>

              {/* 4: Interactive Google Map */}
              <div className="map-frame">
                <iframe
                  title="Galaxy Services Location Map - Chalakudy"
                  src={mapsEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="map-badge">
                  <MapPin aria-hidden="true" />
                  <span><span translate="no">Galaxy Services</span> · <span translate="no">Chalakudy</span></span>
                </div>
              </div>

              {/* 5 & 6: Address and Working Hours beneath Map on Mobile */}
              <div className="location-mobile-details">
                <div className="contact-detail">
                  <MapPin aria-hidden="true" />
                  <div>
                    <strong><span translate="no">Galaxy Services</span></strong>
                    <p>
                      First Floor, Swarnam Arcade, KSRTC Bus Stand Rd
                      <br />
                      Opposite Reliance Fresh &amp; Surabhi Theatre, South Junction
                      <br />
                      South <span translate="no">Chalakudy</span>, <span translate="no">Chalakudy</span>, Kerala 680307
                    </p>
                    <p className="contact-address-phone">
                      <a href={`tel:${phone}`} aria-label={`Call us at ${phone}`}>
                        <Phone aria-hidden="true" />
                        <span>+91 94966 96934</span>
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail">
                  <Clock3 aria-hidden="true" />
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
              </div>

              {/* 7: Full-width "Open in Google Maps" button */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-map-btn"
                aria-label="Open Galaxy Services in Google Maps (opens in a new tab)"
              >
                <Map aria-hidden="true" className="mobile-map-btn-icon" />
                <span>Open in Google Maps</span>
                <ArrowUpRight aria-hidden="true" className="mobile-map-btn-arrow" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS SECTION */}
        <FaqSection />
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
            <a href="#top" className="footer-brand" aria-label="Galaxy Services home">
              <img
                className="footer-logo-emblem"
                src={galaxyEmblem}
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
              <img
                className="footer-logo-wordmark"
                src={galaxyWordmark}
                alt=""
                width={88}
                height={26}
                loading="lazy"
              />
            </a>
            <p className="footer-tagline">Phone repairs, made simple.</p>
            <p className="footer-subtext">
              Authorized mobile service center in <span translate="no">Chalakudy</span>, Kerala.
            </p>
            <div className="footer-social-links">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)">
                <WhatsAppIcon />
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Maps (opens in a new tab)">
                <MapPin aria-hidden="true" />
              </a>
              <a href={`tel:${phone}`} aria-label="Call Galaxy Services">
                <Phone aria-hidden="true" />
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
              <li><a href="#faqs">FAQs</a></li>
            </ul>
          </div>

          {/* Column 3 — Visit Us */}
          <div className="footer-col footer-col-visit">
            <h4 className="footer-heading">Visit Us</h4>
            <address className="footer-address">
              <strong><span translate="no">Galaxy Services</span></strong>
              <span>First Floor, Swarnam Arcade</span>
              <span>KSRTC Bus Stand Rd, South Junction</span>
              <span>South <span translate="no">Chalakudy</span>, Kerala 680307</span>
              <a href={`tel:${phone}`} className="footer-phone-link" aria-label={`Call us at ${phone}`}>
                <Phone aria-hidden="true" />
                <span>+91 94966 96934</span>
              </a>
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
                Get Directions <ArrowRight className="arrow-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="section-wrap footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-flex">
            <p className="copyright">
              © {new Date().getFullYear()} <span translate="no">Galaxy Services</span>. All rights reserved.
            </p>
            <span className="footer-badge"><span translate="no">Chalakudy</span>, Kerala</span>
          </div>
        </div>
      </motion.footer>

      {/* PERSISTENT MOBILE BOTTOM BAR */}
      <div className="mobile-bottom-bar" role="navigation" aria-label="Quick contact">
        <a className="button button-red" href={`tel:${phone}`}>
          <Phone aria-hidden="true" /> Call Now
        </a>
        <a
          className="button button-whatsapp"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon /> WhatsApp
        </a>
      </div>
    </div>
  )
}
