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

export const heroCardsConfig: HeroCardConfig[] = [
  {
    id: 'card-technicians',
    icon: 'wrench',
    title: 'Expert Technicians',
    subtitle: 'Professional Repairs',
    description: '[CONFIRM: Experienced technicians equipped for component-level mobile repair and diagnostics.]',
    actionLabel: 'Talk to a Technician',
    actionType: 'whatsapp',
    actionTarget: 'https://wa.me/919496696934',
    whatsappMessage: '[CONFIRM: Hi Galaxy Services, I would like to speak with a technician about my phone repair.]',
  },
  {
    id: 'card-warranty',
    icon: 'shield-check',
    title: 'Warranty Included',
    subtitle: 'On Every Repair',
    description: '[CONFIRM: Service warranty coverage provided on replacement parts and repair work.]',
    actionLabel: 'Ask About Warranty',
    actionType: 'whatsapp',
    actionTarget: 'https://wa.me/919496696934',
    whatsappMessage: '[CONFIRM: Hi Galaxy Services, I have a question regarding warranty coverage for phone repairs.]',
  },
  {
    id: 'card-quality-parts',
    icon: 'settings',
    title: 'Quality-Tested Parts',
    subtitle: 'Reliable and Checked',
    description: '[CONFIRM: Carefully sourced replacement components tested for reliability and compatibility.]',
    actionLabel: 'See Repair Prices',
    actionType: 'scroll',
    actionTarget: '#services',
  },
]

