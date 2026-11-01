import { CSSProperties, ElementType, ReactNode } from 'react';

export interface CardNavLink {
  label: string;
  href?: string;
  ariaLabel?: string;
}

export interface CardNavItem {
  label: string;
  description?: string;
  bgColor?: string;
  textColor?: string;
  links: CardNavLink[];
}

export interface CardNavCta {
  label: string;
  href?: string;
  onClick?: (event: React.MouseEvent) => void;
}

export interface CardNavProps {
  items?: CardNavItem[];
  logo?: string | ReactNode;
  logoAlt?: string;
  logoHref?: string;
  cta?: CardNavCta;
  theme?: 'dark' | 'light';
  surface?: 'glass' | 'solid';
  openOn?: 'click' | 'hover';
  cardEffect?: 'rise' | 'unfold' | 'fade';
  stagger?: number;
  bounce?: number;
  speed?: number;
  cardHeight?: number;
  maxWidth?: number;
  accentColor?: string;
  menuLabel?: boolean;
  intro?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  linkComponent?: ElementType;
  onLinkClick?: (link: CardNavLink, item: CardNavItem, event: React.MouseEvent) => void;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  actions?: ReactNode;
  placement?: 'top' | 'bottom';
}

declare const CardNav: React.FC<CardNavProps>;
export default CardNav;

