import React from 'react';

export type LogoItem =
  | {
      node: React.ReactNode;
      title?: string;
      href?: string;
      hoverColor?: string;
      ariaLabel?: string;
    }
  | {
      src: string;
      alt?: string;
      srcSet?: string;
      sizes?: string;
      width?: number | string;
      height?: number | string;
      title?: string;
      href?: string;
      hoverColor?: string;
    };

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutWidth?: number;
  scaleOnHover?: boolean;
  layout?: 'line' | 'wave' | 'arc' | 'orbit';
  bend?: number;
  focus?: number;
  magnify?: number;
  tiltX?: number;
  tiltY?: number;
  step?: boolean;
  muted?: number;
  labels?: 'none' | 'inline' | 'below' | 'hover';
  draggable?: boolean;
  scrollBoost?: number;
  intro?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

export declare const LogoLoop: React.NamedExoticComponent<LogoLoopProps>;
export default LogoLoop;
