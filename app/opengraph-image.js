import { ImageResponse } from 'next/og'

export const alt = 'NL Reporting — Finance automation built for production'
export const size = { width: 1200, height: 630 }
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
          padding: '64px 72px',
          background: 'linear-gradient(160deg, #07141f 0%, #0c2233 55%, #0a3558 100%)',
          color: '#f3f4f6',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: 'linear-gradient(180deg, #10C2A8, #3D7BFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 700,
              color: '#07141f',
            }}
          >
            nl
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, letterSpacing: -0.5 }}>NL Reporting</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5, maxWidth: 980 }}>
            Finance automation built for production.
          </div>
          <div style={{ fontSize: 26, color: '#7fbfd6', maxWidth: 860 }}>
            n8n · KNIME · on-premise AI — implemented and supported by Alexey Kobzev
          </div>
        </div>

        <div style={{ display: 'flex', gap: 40, fontSize: 20, color: '#9ca3af' }}>
          <span>140h/mo returned in AP</span>
          <span>12 → 4 day close</span>
          <span>60-day ROI guarantee</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
