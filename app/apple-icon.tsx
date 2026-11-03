import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'

export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#DC2626',
          borderRadius: 38,
        }}
      >
        <span
          style={{
            color: '#FFFFFF',
            fontSize: 112,
            fontWeight: 900,
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            lineHeight: 1,
            marginTop: -6,
          }}
        >
          G
        </span>
      </div>
    ),
    {
      ...size,
    }
  )
}
