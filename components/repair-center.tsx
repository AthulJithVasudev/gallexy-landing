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
import {
  siteConfig,
  brandLogos,
  servicesConfig,
} from '@/lib/site-config'

const serviceIconMap: Record<string, React.ComponentType<{ 'aria-hidden'?: boolean | 'true' | 'false'; className?: string }>> = {
  smartphone: Smartphone,
  battery: Battery,
  'plug-zap': PlugZap,
  droplets: Droplets,
  unlock: Unlock,
  'mic-2': Mic2,
  wrench: Wrench,
  camera: Camera,
}

const services = servicesConfig.map((service) => ({
  ...service,
  icon: serviceIconMap[service.icon] || Smartphone,
}))
const easeOutCustom = [0.22, 1, 0.36, 1] as const

const SectionHeading = memo(function SectionHeading({
  eyebrow,
  title,
  id,
  children,
}: {
  eyebrow: string
  title: string
  id?: string
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
      <h2 id={id}>{title}</h2>
      {children}
    </motion.div>
  )
})

export default function RepairCenter({ heroPhoneImage }: { heroPhoneImage?: React.ReactNode } = {}) {
  const [dark, setDark] = useState(true)
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
          { label: `Call: ${siteConfig.phoneDisplay}`, href: `tel:${siteConfig.phone}` },
          { label: 'Chat on WhatsApp', href: siteConfig.whatsappUrl },
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
          logo={siteConfig.assets.wordmark}
          logoAlt={siteConfig.name}
          logoHref="#top"
          items={cardNavItems}
          cta={{
            label: 'Call Now',
            href: `tel:${siteConfig.phone}`,
            ariaLabel: `Call ${siteConfig.name}`,
          }}
          activeHref={activeHref}
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

      <main id="main">
        <div id="top" />
        {/* HERO PAGE: HERO CONTENT + AUTHORIZED SERVICE PARTNER AT BOTTOM (VISIBLE AT FIRST GLANCE) */}
        <div className="hero-page">
          <section className="hero section-wrap" aria-labelledby="hero-title">
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
              <h1 className="hero-h1" id="hero-title">
                <span className="hero-h1-line hero-h1-line-1">Phone repairs,</span>
                <span className="hero-h1-line hero-h1-line-2">
                  <em>made simple.</em>
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
                  href={`tel:${siteConfig.phone}`}
                  aria-label={`Call ${siteConfig.name}`}
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
                  href={siteConfig.whatsappUrl}
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
              <ul className="trust-row" aria-label="Key service highlights">
                <li className="hero-anim-tick-1">
                  <Check aria-hidden="true" />
                  <span>Repair Estimates</span>
                </li>
                <li className="hero-anim-tick-2">
                  <Check aria-hidden="true" />
                  <span>Repair Options</span>
                </li>
                <li className="hero-anim-tick-3">
                  <Check aria-hidden="true" />
                  <span>Personalised Service</span>
                </li>
              </ul>
            </div>

            <div className="hero-visual-wrap desktop-only">
              <HeroVisualCluster phoneImage={heroPhoneImage} />
            </div>
          </section>

          {/* AUTHORIZED SERVICE PARTNER (BOTTOM OF HERO PAGE) */}
          <section
            className="brand-strip section-wrap"
            aria-labelledby="brand-strip-label"
          >
            <span className="strip-label hero-anim-brand-label" id="brand-strip-label">
              Authorized service partner for
            </span>
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
              ariaLabel="Brands we service: Xiaomi, Redmi, POCO, Motorola, CMF, Nothing"
            />
          </section>
        </div>

                {/* 3. WHAT WE FIX SECTION */}
        <section className="section-wrap section-space" id="services" aria-labelledby="services-heading">
          <SectionHeading eyebrow="Our Expertise" title="What We Fix" id="services-heading">
            <p>From cracked glass to charging troubles, our technicians know their way around your device.</p>
          </SectionHeading>

          <motion.ul
            className="service-grid"
            role="list"
            variants={servicesContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {services.map((service) => {
              const Icon = service.icon
              const waLink = `${siteConfig.whatsappUrl}?text=${encodeURIComponent(service.query)}`
              return (
                <motion.li
                  key={service.title}
                  variants={serviceCardVariants}
                  className="service-card-wrapper"
                  style={{ listStyle: 'none' }}
                >
                  <motion.a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="service-card"
                    style={{ height: '100%' }}
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
                </motion.li>
              )
            })}
          </motion.ul>

          <motion.div
            className="services-footer-cta"
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.15, ease: easeOutCustom }}
          >
            <span className="services-cta-prompt">Not sure what’s wrong?</span>
            <a
              href={`${siteConfig.whatsappUrl}?text=${encodeURIComponent("Hi Galaxy Services, I'm not sure what's wrong with my phone and would like to ask about repair options.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="services-cta-link"
            >
              Ask us about your phone <ArrowRight aria-hidden="true" />
            </a>
          </motion.div>
        </section>



        {/* 5. LOCATION AND CONTACT SECTION */}
        <section className="section-wrap section-space" id="location" aria-labelledby="location-heading">
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
              <SectionHeading eyebrow="Come Say Hello" title="Your Phone Is in Good Hands" id="location-heading">
                <p>Have a phone problem? Get in touch to discuss your device or plan your visit.</p>
              </SectionHeading>

              {/* Desktop-only details & actions inside location-copy */}
              <div className="location-desktop-details">
                <div className="contact-detail">
                  <MapPin aria-hidden="true" />
                  <div>
                    <strong><span translate="no">{siteConfig.name}</span></strong>
                    <p>
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.landmark}
                      <br />
                      {siteConfig.address.subLocality}, <span translate="no">{siteConfig.address.locality}</span>, {siteConfig.address.region} {siteConfig.address.postalCode}
                    </p>
                    <p className="contact-address-phone">
                      <a href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.name} at ${siteConfig.phoneDisplay}`}>
                        <Phone aria-hidden="true" />
                        <span>{siteConfig.phoneDisplay}</span>
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail">
                  <Clock3 aria-hidden="true" />
                  <div>
                    <strong>Working Hours</strong>
                    <p>
                      {siteConfig.hours.displayDays}: {siteConfig.hours.displayTime}
                      <br />
                      <span style={{ color: 'var(--red)', fontSize: '11px', fontWeight: 600 }}>
                        {siteConfig.hours.displayClosed}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="location-actions">
                  <a
                    className="button button-red button-prominent"
                    href={`tel:${siteConfig.phone}`}
                    aria-label={`Call ${siteConfig.name}`}
                  >
                    <Phone aria-hidden="true" /> Call Now
                  </a>
                  <a
                    className="button button-whatsapp"
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp Us (opens in a new tab)"
                  >
                    <WhatsAppIcon /> WhatsApp Us
                  </a>
                  <a
                    className="button button-outline button-with-arrow location-directions-desktop"
                    href={siteConfig.maps.url}
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
                <h3 className="mobile-map-title">Visit <span translate="no">{siteConfig.name}</span></h3>
                <p className="mobile-map-desc">
                  We’re easy to find, right near the KSRTC Bus Stand in <span translate="no">Chalakudy</span>.
                </p>
              </div>

              {/* 4: Interactive Google Map */}
              <div className="map-frame">
                <iframe
                  title="Galaxy Services Location Map - Chalakudy"
                  src={siteConfig.maps.embedUrl}
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
                    <strong><span translate="no">{siteConfig.name}</span></strong>
                    <p>
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.landmark}
                      <br />
                      {siteConfig.address.subLocality}, <span translate="no">{siteConfig.address.locality}</span>, {siteConfig.address.region} {siteConfig.address.postalCode}
                    </p>
                    <p className="contact-address-phone">
                      <a href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.name} at ${siteConfig.phoneDisplay}`}>
                        <Phone aria-hidden="true" />
                        <span>{siteConfig.phoneDisplay}</span>
                      </a>
                    </p>
                  </div>
                </div>

                <div className="contact-detail">
                  <Clock3 aria-hidden="true" />
                  <div>
                    <strong>Working Hours</strong>
                    <p>
                      {siteConfig.hours.displayDays}: {siteConfig.hours.displayTime}
                      <br />
                      <span style={{ color: 'var(--red)', fontSize: '11px', fontWeight: 600 }}>
                        {siteConfig.hours.displayClosed}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* 7: Full-width "Open in Google Maps" button */}
              <a
                href={siteConfig.maps.url}
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
            <a href="#top" className="footer-brand" aria-label={`${siteConfig.name} home`}>
              <img
                className="footer-logo-emblem"
                src={siteConfig.assets.emblem}
                alt=""
                width={32}
                height={32}
                loading="lazy"
              />
              <img
                className="footer-logo-wordmark"
                src={siteConfig.assets.wordmark}
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
              <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)">
                <WhatsAppIcon />
              </a>
              <a href={siteConfig.maps.url} target="_blank" rel="noopener noreferrer" aria-label="Google Maps (opens in a new tab)">
                <MapPin aria-hidden="true" />
              </a>
              <a href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.name}`}>
                <Phone aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2 — Explore */}
          <div className="footer-col footer-col-nav">
            <h3 className="footer-heading">Explore</h3>
            <ul className="footer-links">
              <li><a href="#top" aria-current={activeHref === '#top' ? 'page' : undefined}>Home</a></li>
              <li><a href="#services" aria-current={activeHref === '#services' ? 'true' : undefined}>Services</a></li>
              <li><a href="#location" aria-current={activeHref === '#location' ? 'true' : undefined}>Location</a></li>
              <li><a href="#faqs" aria-current={activeHref === '#faqs' ? 'true' : undefined}>FAQs</a></li>
            </ul>
          </div>

          {/* Column 3 — Visit Us */}
          <div className="footer-col footer-col-visit">
            <h3 className="footer-heading">Visit Us</h3>
            <address className="footer-address">
              <strong><span translate="no">Galaxy Services</span></strong>
              <span>First Floor, Swarnam Arcade</span>
              <span>KSRTC Bus Stand Rd, South Junction</span>
              <span>South <span translate="no">Chalakudy</span>, Kerala 680307</span>
              <a href={`tel:${siteConfig.phone}`} className="footer-phone-link" aria-label={`Call ${siteConfig.name} at ${siteConfig.phoneDisplay}`}>
                <Phone aria-hidden="true" />
                <span>{siteConfig.phoneDisplay}</span>
              </a>
            </address>
            <div className="footer-hours">
              <strong>Opening Hours</strong>
              <span>Mon – Sat: 10:30 AM – 7:00 PM</span>
              <span className="footer-closed">Sunday: Closed</span>
            </div>
            <div className="footer-action">
              <a
                href={siteConfig.maps.url}
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
      <nav className="mobile-bottom-bar" aria-label="Quick contact">
        <a className="button button-red" href={`tel:${siteConfig.phone}`} aria-label={`Call ${siteConfig.name}`}>
          <Phone aria-hidden="true" /> Call Now
        </a>
        <a
          className="button button-whatsapp"
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Us (opens in a new tab)"
        >
          <WhatsAppIcon /> WhatsApp
        </a>
      </nav>
    </div>
  )
}
