export interface HeroCardConfig {
  id: string
  icon: 'wrench' | 'shield-check' | 'settings'
  title: string
  subtitle: string
  description: string
  actionLabel: string
  actionType: 'whatsapp' | 'scroll'
  actionTarget: string
  whatsappMessage?: string
}

export interface BrandLogo {
  src: string
  alt: string
  title: string
  width: number
  height: number
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  query: string
  icon: 'smartphone' | 'battery' | 'plug-zap' | 'droplets' | 'unlock' | 'mic-2' | 'wrench' | 'camera'
}

export interface FaqItem {
  q: string
  a: string
}

export const siteConfig = {
  name: 'Galaxy Services',
  legalName: 'Galaxy Services',
  tagline: 'Phone repairs, made simple.',
  description:
    'Galaxy Services in Chalakudy provides expert screen, battery, and charging port repairs. Call or WhatsApp us today for a reliable phone repair estimate.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gallexyservices.com',
  phone: '+919496696934',
  phoneDisplay: '+91 94966 96934',
  whatsappNumber: '919496696934',
  whatsappUrl: 'https://wa.me/919496696934',
  email: 'contact@gallexyservices.com',

  address: {
    street: 'First Floor, Swarnam Arcade, KSRTC Bus Stand Rd',
    landmark: 'Opposite Reliance Fresh & Surabhi Theatre, South Junction',
    subLocality: 'South Chalakudy',
    locality: 'Chalakudy',
    region: 'Kerala',
    postalCode: '680307',
    country: 'IN',
    countryName: 'India',
    full: 'First Floor, Swarnam Arcade, KSRTC Bus Stand Rd, Opposite Reliance Fresh & Surabhi Theatre, South Junction, Chalakudy, Kerala 680307',
  },

  geo: {
    latitude: 10.3021022,
    longitude: 76.3361788,
  },

  maps: {
    url: 'https://www.google.com/maps/place/Galaxy+services/@10.3022082,76.3356451,19.62z/data=!4m6!3m5!1s0x3b0803a3a3458ead:0x5d92b40509f9c5e2!8m2!3d10.3021022!4d76.3361788!16s%2Fg%2F11gjqp92bm?entry=ttu',
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.7!2d76.3356451!3d10.3022082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0803a3a3458ead%3A0x5d92b40509f9c5e2!2sGalaxy%20services!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin',
  },

  hours: {
    displayDays: 'Monday – Saturday',
    displayTime: '10:30 AM – 7:00 PM',
    displayClosed: 'Sunday: Closed',
    specifications: [
      {
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:30',
        closes: '19:00',
      },
    ],
  },

  socialLinks: {
    whatsapp: 'https://wa.me/919496696934',
    maps: 'https://www.google.com/maps/place/Galaxy+services/@10.3022082,76.3356451,19.62z/data=!4m6!3m5!1s0x3b0803a3a3458ead:0x5d92b40509f9c5e2!8m2!3d10.3021022!4d76.3361788!16s%2Fg%2F11gjqp92bm?entry=ttu',
    phone: 'tel:+919496696934',
  },

  assets: {
    logo: '/images/galaxy-logo-trimmed.webp',
    wordmark: '/images/galaxy-logo-trimmed.webp',
    emblem: '/images/galaxy-emblem.webp',
  },
}

export const brandLogos: BrandLogo[] = [
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi', width: 32, height: 32 },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi', width: 80, height: 23 },
  { src: '/images/logos/POCO-Emblem.png', alt: 'POCO', title: 'POCO', width: 75, height: 23 },
  { src: '/images/logos/motorola.svg', alt: 'Motorola', title: 'Motorola', width: 96, height: 22 },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF', width: 48, height: 32 },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing', width: 100, height: 18 },
  { src: '/images/logos/xiaomi.svg', alt: 'Xiaomi', title: 'Xiaomi', width: 32, height: 32 },
  { src: '/images/logos/redmi.svg', alt: 'Redmi', title: 'Redmi', width: 80, height: 23 },
  { src: '/images/logos/POCO-Emblem.png', alt: 'POCO', title: 'POCO', width: 75, height: 23 },
  { src: '/images/logos/motorola.svg', alt: 'Motorola', title: 'Motorola', width: 96, height: 22 },
  { src: '/images/logos/cmf.svg', alt: 'CMF', title: 'CMF', width: 48, height: 32 },
  { src: '/images/logos/nothing.svg', alt: 'Nothing', title: 'Nothing', width: 100, height: 18 },
]

export const servicesConfig: ServiceItem[] = [
  {
    id: 'screen-replacement',
    icon: 'smartphone',
    title: 'Screen Replacement',
    description: 'Cracked, damaged, or unresponsive screens.',
    query: 'Hi Galaxy Services, I would like to enquire about screen replacement for my phone.',
  },
  {
    id: 'battery-issues',
    icon: 'battery',
    title: 'Battery Issues',
    description: 'Battery draining quickly or struggling to hold charge.',
    query: 'Hi Galaxy Services, I would like to enquire about battery issues with my phone.',
  },
  {
    id: 'charging-problems',
    icon: 'plug-zap',
    title: 'Charging Problems',
    description: 'Charging port issues and charging faults.',
    query: 'Hi Galaxy Services, I would like to enquire about charging problems with my phone.',
  },
  {
    id: 'water-damage',
    icon: 'droplets',
    title: 'Water Damage',
    description: 'Assessment for liquid-related phone damage.',
    query: 'Hi Galaxy Services, I would like to enquire about water damage assessment for my phone.',
  },
  {
    id: 'software-issues',
    icon: 'unlock',
    title: 'Software Issues',
    description: 'Troubleshooting, updates, and software problems.',
    query: 'Hi Galaxy Services, I would like to enquire about software troubleshooting for my phone.',
  },
  {
    id: 'speaker-mic',
    icon: 'mic-2',
    title: 'Speaker & Microphone',
    description: 'Sound, call audio, and microphone issues.',
    query: 'Hi Galaxy Services, I would like to enquire about speaker or microphone issues with my phone.',
  },
  {
    id: 'back-glass',
    icon: 'wrench',
    title: 'Back Glass Damage',
    description: 'Cracked or damaged rear glass.',
    query: 'Hi Galaxy Services, I would like to enquire about back glass damage repair for my phone.',
  },
  {
    id: 'camera-problems',
    icon: 'camera',
    title: 'Camera Problems',
    description: 'Camera faults, focusing issues, or damaged lenses.',
    query: 'Hi Galaxy Services, I would like to enquire about camera problems on my phone.',
  },
]

export const faqsConfig: FaqItem[] = [
  {
    q: 'How much does a phone repair cost?',
    a: 'Repair costs depend on your phone model, the issue, and the parts required. Contact us to discuss an estimate.',
  },
  {
    q: 'How long will a repair take?',
    a: 'Repair times depend on the fault, device model, and parts availability. We’ll discuss the expected timeline once we understand the problem.',
  },
  {
    q: 'Can I walk in for a repair?',
    a: 'Yes, walk-ins are welcome during our business hours.',
  },
  {
    q: 'What if my phone cannot be repaired?',
    a: 'We’ll explain what we find during the assessment and discuss the available options. Whether a repair is possible depends on the device and the nature of the damage.',
  },
]

export const heroCardsConfig: HeroCardConfig[] = [
  {
    id: 'card-technicians',
    icon: 'wrench',
    title: 'Expert Technicians',
    subtitle: 'Professional Repairs',
    description: 'Experienced technicians equipped for component-level mobile repair and diagnostics.',
    actionLabel: 'Talk to a Technician',
    actionType: 'whatsapp',
    actionTarget: 'https://wa.me/919496696934',
    whatsappMessage: 'Hi Galaxy Services, I would like to speak with a technician about my phone repair.',
  },
  {
    id: 'card-warranty',
    icon: 'shield-check',
    title: 'Warranty Included',
    subtitle: 'On Every Repair',
    description: 'Service warranty coverage provided on replacement parts and repair work.',
    actionLabel: 'Ask About Warranty',
    actionType: 'whatsapp',
    actionTarget: 'https://wa.me/919496696934',
    whatsappMessage: 'Hi Galaxy Services, I have a question regarding warranty coverage for phone repairs.',
  },
  {
    id: 'card-quality-parts',
    icon: 'settings',
    title: 'Quality-Tested Parts',
    subtitle: 'Reliable and Checked',
    description: 'Carefully sourced replacement components tested for reliability and compatibility.',
    actionLabel: 'See Repair Prices',
    actionType: 'scroll',
    actionTarget: '#services',
  },
]
