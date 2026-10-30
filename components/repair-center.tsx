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
  ShieldCheck,
  Smartphone,
  Sparkles,
  Unlock,
  Wrench,
} from 'lucide-react'
import PillNav from './PillNav'
import LogoLoop from './LogoLoop'
import FaqSection from './faq-section'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import { WhatsAppIcon } from './whatsapp-icon'

const phone = '+919496696934'
const whatsapp = 'https://wa.me/919496696934'
const mapsUrl =
  'https://www.google.com/maps/place/Galaxy+services/@10.3022082,76.3356451,19.62z/data=!4m6!3m5!1s0x3b0803a3a3458ead:0x5d92b40509f9c5e2!8m2!3d10.3021022!4d76.3361788!16s%2Fg%2F11gjqp92bm?entry=ttu'
const mapsEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.7!2d76.3356451!3d10.3022082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0803a3a3458ead%3A0x5d92b40509f9c5e2!2sGalaxy%20services!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'
const galaxyLogo = '/images/gallexy-logo-trimmed.webp'
const galaxyWordmark = '/images/gallexy-logo-trimmed.webp'
const galaxyEmblem = '/images/galaxy-emblem.webp'

const brandLogos = [
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi', width: 32, height: 32 },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi', width: 80, height: 23 },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF', width: 48, height: 32 },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing', width: 100, height: 18 },
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi', width: 32, height: 32 },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi', width: 80, height: 23 },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF', width: 48, height: 32 },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing', width: 100, height: 18 },
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

export default function RepairCenter() {
  const [dark, setDark] = useState(false)
  const [activeHref, setActiveHref] = useState('#top')
  const [isNavVisible, setIsNavVisible] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMenuOpenRef = useRef(isMenuOpen)
  isMenuOpenRef.current = isMenuOpen
  const shouldReduceMotion = useReducedMotion()

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

  const navItems = [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Location', href: '#location' },
    { label: 'FAQs', href: '#faqs' },
  ]

  return (
    <div className="site-shell">
      <motion.header
        className={`top-dock ${!isNavVisible ? 'is-nav-hidden' : ''}`}
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
        animate={{
          opacity: isNavVisible ? 1 : 0,
          y: isNavVisible ? 0 : (shouldReduceMotion ? 0 : -80),
        }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.28, ease: easeOutCustom }
        }
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
          onMenuToggle={setIsMenuOpen}
        />
        <div className="dock-actions">
          <AnimatedThemeToggler
            className="nav-action-btn"
            theme={dark ? 'dark' : 'light'}
            onThemeChange={(newTheme) => setDark(newTheme === 'dark')}
          />
          <a className="nav-call-btn" href={`tel:${phone}`} aria-label="Call Now">
            <Phone aria-hidden="true" /> <span>Call Now</span>
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
              <span className="status-separator">•</span> <span translate="no">Chalakudy</span>
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
              Tell us what’s wrong, and we’ll help you figure out the next step.
            </motion.p>
            <motion.div
              className="hero-actions"
              variants={heroActionsVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                variants={heroButtonVariants}
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
                variants={heroButtonVariants}
                className="button button-whatsapp"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
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
                <WhatsAppIcon /> WhatsApp Us
              </motion.a>
            </motion.div>
            <motion.div
              className="trust-row"
              variants={heroTrustVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.span variants={heroTrustItemVariants}>
                <Check aria-hidden="true" /> Repair Estimates
              </motion.span>
              <motion.span variants={heroTrustItemVariants}>
                <Check aria-hidden="true" /> Repair Options
              </motion.span>
              <motion.span variants={heroTrustItemVariants}>
                <Check aria-hidden="true" /> Personalised Service
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
                <Smartphone aria-hidden="true" />
              </div>
            </motion.div>
            <motion.div
              className="floating-note note-top"
              initial={shouldReduceMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.62, ease: easeOutCustom }}
            >
              <div className="floating-note-inner">
                <ShieldCheck aria-hidden="true" />
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
                <Sparkles aria-hidden="true" />
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
              href={`${whatsapp}?text=${encodeURIComponent("Hi Gallexy Services, I'm not sure what's wrong with my phone and would like to ask about repair options.")}`}
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
              <SectionHeading eyebrow="Come say hello" title="Your phone is in good hands.">
                <p>Have a phone problem? Get in touch to discuss your device or plan your visit.</p>
              </SectionHeading>

              {/* Desktop-only details & actions inside location-copy */}
              <div className="location-desktop-details">
                <div className="contact-detail">
                  <MapPin aria-hidden="true" />
                  <div>
                    <strong><span translate="no">Gallexy Services</span></strong>
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
                <span className="mobile-map-label">FIND OUR LOCATION</span>
                <h2 className="mobile-map-title">Visit <span translate="no">Gallexy Services</span></h2>
                <p className="mobile-map-desc">
                  We’re easy to find, right near the KSRTC Bus Stand in <span translate="no">Chalakudy</span>.
                </p>
              </div>

              {/* 4: Interactive Google Map */}
              <div className="map-frame">
                <iframe
                  title="Gallexy Services Location Map - Chalakudy"
                  src={mapsEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="map-badge">
                  <MapPin aria-hidden="true" />
                  <span><span translate="no">Gallexy Services</span> · <span translate="no">Chalakudy</span></span>
                </div>
              </div>

              {/* 5 & 6: Address and Working Hours beneath Map on Mobile */}
              <div className="location-mobile-details">
                <div className="contact-detail">
                  <MapPin aria-hidden="true" />
                  <div>
                    <strong><span translate="no">Gallexy Services</span></strong>
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
                aria-label="Open Gallexy Services in Google Maps (opens in a new tab)"
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
            <a href="#top" className="footer-brand" aria-label="Gallexy Services home">
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
                width={118}
                height={20}
                loading="lazy"
              />
            </a>
            <p className="footer-tagline">Phone repairs, made simple.</p>
            <p className="footer-subtext">
              Mobile repair and service center in <span translate="no">Chalakudy</span>, Kerala.
            </p>
            <div className="footer-social-links">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)">
                <WhatsAppIcon />
              </a>
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Maps (opens in a new tab)">
                <MapPin aria-hidden="true" />
              </a>
              <a href={`tel:${phone}`} aria-label="Call Gallexy Services">
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
                Get Directions <ArrowRight className="arrow-icon" />
              </a>
            </div>
          </div>
        </div>

        <div className="section-wrap footer-bottom">
          <div className="footer-divider" />
          <div className="footer-bottom-flex">
            <p className="copyright">
              © {new Date().getFullYear()} <span translate="no">Gallexy Services</span>. All rights reserved.
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
