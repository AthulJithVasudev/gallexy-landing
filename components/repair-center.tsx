'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight, Battery, Camera, Check, ChevronDown, Clock3, Droplets,
  MapPin, MessageCircle, Mic2, Navigation, Phone, PlugZap, ShieldCheck,
  Smartphone, Sparkles, Unlock, Wrench, Zap
} from 'lucide-react'
import PillNav from './PillNav'
import LogoLoop from './LogoLoop'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'

const phone = '+919876543210'
const whatsapp = 'https://wa.me/919876543210'
const mapsUrl = 'https://www.google.com/maps/place/Galaxy+services/@10.3022082,76.3356451,19.62z/data=!4m6!3m5!1s0x3b0803a3a3458ead:0x5d92b40509f9c5e2!8m2!3d10.3021022!4d76.3361788!16s%2Fg%2F11gjqp92bm?entry=ttu'
const mapsEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.7!2d76.3356451!3d10.3022082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0803a3a3458ead%3A0x5d92b40509f9c5e2!2sGalaxy%20services!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin'
const galaxyLogo = '/images/gallexy-logo-trimmed.png'
const galaxyWordmark = '/images/gallexy-logo-trimmed.png'
const galaxyEmblem = '/images/galaxy-emblem.png'

const brandLogos = [
  { src: '/logos/apple.svg', alt: 'Apple', title: 'Apple' },
  { src: '/logos/samsung.svg', alt: 'Samsung', title: 'Samsung' },
  { src: '/logos/pixel.svg', alt: 'Google Pixel', title: 'Google Pixel' },
  { src: '/logos/oneplus.svg', alt: 'OnePlus', title: 'OnePlus' },
  { src: '/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi' },
  { src: '/logos/vivo.svg', alt: 'vivo', title: 'vivo' },
  { src: '/logos/oppo.svg', alt: 'OPPO', title: 'OPPO' },
  { src: '/logos/realme.svg', alt: 'realme', title: 'realme' },
  { src: '/logos/motorola.svg', alt: 'Motorola', title: 'Motorola' },
]

const services = [
  [Smartphone, 'Screen Replacement', 'Crisp display and touch glass replacements.'],
  [Battery, 'Battery Replacement', 'Fresh batteries for phones that drain fast.'],
  [PlugZap, 'Charging Port', "Fixing loose connectors and phones that won't charge."],
  [Droplets, 'Water Damage', 'Internal cleaning and short-circuit recovery.'],
  [Unlock, 'Software & Unlocking', 'Fixing bootloops, crashes, and updates.'],
  [Mic2, 'Speaker & Mic', 'Clear up muffled audio and mic issues.'],
  [Wrench, 'Back Glass', 'Clean replacement for cracked rear panels.'],
  [Camera, 'Camera Repair', 'Fixing blurry focus and cracked lenses.'],
] as const

const reviews = [
  ['“They fixed my iPhone screen while I waited. Looks brand new and the staff was genuinely helpful.”', 'Ananya R.'],
  ['“Fast, transparent, and no pressure. My battery was replaced in under an hour.”', 'Rahul M.'],
  ['“Best repair shop in the area. They diagnosed the issue for free and saved my phone.”', 'Priya K.'],
]

const faqs = [
  ['How long does a typical screen or battery repair take?', 'Usually 30 to 60 minutes on the same day.'],
  ['Will I lose my photos or data during the repair?', 'No, your data stays completely safe and untouched for hardware repairs.'],
  ['Do I need to book an appointment before visiting?', 'No appointment needed—you can walk right in during opening hours or message us on WhatsApp.'],
  ['Do you provide a warranty on repairs?', 'Yes, all our part replacements come with a repair warranty for your peace of mind.'],
  ['What if my phone cannot be repaired?', "Our diagnosis is 100% free. If we can't fix it, you don't pay anything."],
]

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{children}</div>
}

export default function RepairCenter() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [dark, setDark] = useState(false)
  const [activeHref, setActiveHref] = useState('#top')

  useEffect(() => {
    const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark =
      typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme ? savedTheme === 'dark' : (document.documentElement.classList.contains('dark') || prefersDark)
    setDark(isDark)
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [])

  useEffect(() => {
    const sectionIds = ['top', 'services', 'reviews', 'faqs', 'location']
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
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Location', href: '#location' },
  ]

  return <div className="site-shell">
    <header className="top-dock">
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
        <a className="button button-red button-small nav-call-btn" href={`tel:${phone}`} aria-label="Call Now">
          <Phone /> <span>Call Now</span>
        </a>
      </div>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <div className="hero-copy">
          <div className="status-pill"><span className="pulse-dot" /> Open: Mon – Sat 10:30 AM – 7:00 PM <span className="status-separator">•</span> Chalakudy</div>
          <h1>Phone repairs,<br /><em>done the same day.</em></h1>
          <p className="hero-lede">Broken screen, battery issue, or water damage? Walk in or message us for fast, reliable repairs using quality-tested parts.</p>
          <div className="hero-actions"><a className="button button-red" href={`tel:${phone}`}><Phone /> Call Now</a><a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp Us</a></div>
          <div className="trust-row"><span><Check /> Same-Day Service</span><span><Check /> Warranty on Parts</span><span><Check /> Free Diagnosis</span></div>
        </div>
        <div className="hero-visual" aria-label="Phone repair service illustration"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="phone-frame"><div className="phone-speaker" /><div className="phone-screen"><span>09:41</span><div className="screen-glow" /><Smartphone /></div></div><div className="floating-note note-top"><ShieldCheck /><span><strong>Warranty backed</strong><small>On every part</small></span></div><div className="floating-note note-bottom"><Sparkles /><span><strong>Repair ready</strong><small>Most fixes in 60 min</small></span></div></div>
      </section>

      <section className="brand-strip section-wrap">
        <span className="strip-label">Brands we repair</span>
        <LogoLoop
          className="brand-loop"
          logos={brandLogos}
          speed={55}
          direction="left"
          logoHeight={26}
          gap={52}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutWidth={0.08}
          ariaLabel="Brands we repair"
        />
      </section>

      <section className="section-wrap section-space" id="services"><SectionHeading eyebrow="Our expertise" title="What we fix"><p>From cracked glass to charging troubles, our technicians know their way around your device.</p></SectionHeading><div className="service-grid">{services.map(([Icon, title, description], i) => <motion.article key={title} className="service-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ y: -4 }}><div className="service-icon"><Icon /></div><h3>{title}</h3><p>{description}</p></motion.article>)}</div></section>

      <section className="process-section"><div className="section-wrap"><SectionHeading eyebrow="Simple process" title="Back to normal in three steps." /><div className="process-grid">{[['01', 'Bring your phone', 'Walk into our shop or message us on WhatsApp first.'], ['02', 'Free check & estimate', 'We inspect the phone in front of you and tell you what’s needed.'], ['03', 'Same-day pickup', 'Most repairs are done while you wait.']].map(([number, title, text]) => <div className="process-step" key={number}><span className="step-number">{number}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div><div className="why-grid">{[['Same-Day Repair', 'Most common issues fixed in under an hour.'], ['Warranty Included', 'Solid warranty coverage on replaced parts.'], ['Quality-Tested Parts', 'Genuine and high-grade components that last.'], ['Free Diagnosis', 'We check your device for free before you decide.']].map(([title, text]) => <div className="why-item" key={title}><Check /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

      <section className="section-wrap section-space" id="reviews"><SectionHeading eyebrow="Real people, real repairs" title="Trusted by your neighbours." /><div className="review-layout"><div className="before-after"><div className="repair-photo cracked"><span>Before</span><div className="mock-phone cracked-phone" /></div><div className="repair-photo restored"><span>After</span><div className="mock-phone restored-phone"><Sparkles /></div></div><div className="repair-caption"><strong>From cracked screen</strong><ArrowRight /><strong>to restored like new.</strong></div></div><div className="review-list"><div className="google-rating"><span className="google-g">G</span><div><strong>Excellent</strong><span className="stars">★★★★★</span></div><small>Based on Google reviews</small></div>{reviews.map(([quote, name]) => <blockquote key={name}><div className="stars">★★★★★</div><p>{quote}</p><cite>{name}</cite></blockquote>)}</div></div></section>

      <section className="faq-section section-space" id="faqs"><div className="narrow-wrap"><SectionHeading eyebrow="Need to know" title="Questions, answered." /> <div className="faq-list">{faqs.map(([question, answer], i) => <div className={`faq-item ${openFaq === i ? 'is-open' : ''}`} key={question}><button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}><span>{question}</span><ChevronDown /></button><AnimatePresence initial={false}>{openFaq === i && <motion.div className="faq-answer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}</div></div></section>

      <section className="section-wrap section-space" id="location">
        <div className="location-card">
          <div className="location-copy">
            <SectionHeading eyebrow="Come say hello" title="Your phone is in good hands." />
            <div className="contact-detail">
              <MapPin />
              <div>
                <strong>Galaxy Services</strong>
                <p>
                  First Floor, Swarnam Arcade, KSRTC Bus Stand Rd<br />
                  Opposite Reliance Fresh &amp; Surabhi Theatre, South Junction<br />
                  South Chalakudy, Chalakudy, Kerala 680307
                </p>
              </div>
            </div>
            <div className="contact-detail">
              <Clock3 />
              <div>
                <strong>Working Hours</strong>
                <p>
                  Monday – Saturday: 10:30 AM – 7:00 PM<br />
                  <span style={{ color: 'var(--red)', fontSize: '11px', fontWeight: 600 }}>Sunday: Closed</span>
                </p>
              </div>
            </div>
            <div className="location-actions">
              <a className="button button-red" href={`tel:${phone}`}><Phone /> Call Now</a>
              <a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a>
              <a className="button button-outline" href={mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation /> Directions</a>
            </div>
          </div>
          <div className="map-container">
            <iframe
              title="Galaxy Services Location Map - Chalakudy"
              src={mapsEmbedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-badge">
              <MapPin />
              <span>Galaxy Services · Chalakudy</span>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer className="footer section-wrap">
      <div className="footer-brand">
        <a href="#top" className="brand" aria-label="Gallexy home">
          <img className="brand-logo" src={galaxyEmblem} alt="Gallexy galaxy logo" />
          <img className="brand-wordmark" src={galaxyWordmark} alt="Gallexy" />
        </a>
        <p>Mobile Repair &amp; Service Center<br />in Chalakudy, Kerala</p>
      </div>
      <div className="footer-contact">
        <span>Need a quick fix?</span>
        <a href={`tel:${phone}`}>{phone}</a>
      </div>
      <div className="footer-social">
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle /></a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Camera /></a>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Google Maps"><MapPin /></a>
      </div>
      <p className="copyright">© 2024 Gallexy. Built for better repairs.</p>
    </footer>
    <div className="mobile-bottom-bar"><a className="button button-red" href={`tel:${phone}`}><Phone /> Call Now</a><a className="button button-whatsapp" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a></div>
  </div>
}
