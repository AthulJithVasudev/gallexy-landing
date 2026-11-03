import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site-config'

export const dynamic = 'force-static'

export const alt = `${siteConfig.name} | Mobile Phone Repair in Chalakudy`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0B0B0D',
          padding: '64px 80px',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          position: 'relative',
        }}
      >
        {/* Subtle red accent glow */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(220, 38, 38, 0.28) 0%, rgba(11, 11, 13, 0) 70%)',
          }}
        />

        {/* Top bar: Brand emblem + Name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              backgroundColor: '#DC2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '34px',
                fontWeight: 900,
                lineHeight: 1,
              }}
            >
              G
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              {siteConfig.name}
            </span>
            <span
              style={{
                color: '#A1A1AA',
                fontSize: '15px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              Mobile Repair Center • Chalakudy
            </span>
          </div>
        </div>

        {/* Center: Main Headline + Subtitle */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '920px',
          }}
        >
          <h1
            style={{
              fontSize: '68px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Phone repairs,{' '}
            <span style={{ color: '#EF4444' }}>made simple.</span>
          </h1>
          <p
            style={{
              fontSize: '24px',
              lineHeight: 1.4,
              color: '#D4D4D8',
              margin: 0,
            }}
          >
            Expert screen, battery, and charging port repairs in Chalakudy.
            Call or WhatsApp us for a reliable estimate.
          </p>
        </div>

        {/* Bottom bar: Trust pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <span>📍 KSRTC Stand Rd, Chalakudy</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <span>⚡ Screen • Battery • Charging</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(220, 38, 38, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.35)',
              color: '#EF4444',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            <span>📞 +91 94966 96934</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
