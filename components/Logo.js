'use client'

import { useId } from 'react'

const TEAL = '#10C2A8'
const BLUE = '#3D7BFF'
const INK_TOP = '#16233B'
const INK_BOTTOM = '#0E1726'
const PAPER = '#F4F7FA'

/**
 * NL Reporting mark — "nl" with rising signal line on dark tile.
 * Inline version of /public/nl-icon.svg.
 */
export default function Logo({ size = 40, className = '', ...props }) {
  const uid = useId().replace(/:/g, '')

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="NL Reporting"
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
      {...props}
    >
      <defs>
        <linearGradient id={`${uid}-gv`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={TEAL} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
        <linearGradient id={`${uid}-gh`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={TEAL} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor={INK_TOP} />
          <stop offset="1" stopColor={INK_BOTTOM} />
        </linearGradient>
        <linearGradient id={`${uid}-sweep`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={TEAL} stopOpacity="0.07" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0.20" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#7FFFE0" stopOpacity="0.55" />
          <stop offset="0.5" stopColor={TEAL} stopOpacity="0.22" />
          <stop offset="1" stopColor={TEAL} stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${uid}-bc`}>
          <rect width="120" height="120" rx="30" />
        </clipPath>
      </defs>
      <rect width="120" height="120" rx="30" fill={`url(#${uid}-bg)`} />
      <g clipPath={`url(#${uid}-bc)`}>
        {/* gridlines */}
        <g stroke={PAPER} strokeOpacity="0.055" strokeWidth="1.6">
          <line x1="14" y1="42" x2="106" y2="42" />
          <line x1="14" y1="66" x2="106" y2="66" />
          <line x1="14" y1="90" x2="106" y2="90" />
        </g>
        {/* rising area chart */}
        <path
          d="M 0,120 L 0,103 C 36,99 64,71 87,35 C 93,25.5 104,16 120,9 L 120,120 Z"
          fill={`url(#${uid}-sweep)`}
        />
        <path
          d="M -2,103.2 C 36,99 64,71 87,35 C 93,25.5 104,16 122,8"
          fill="none"
          stroke={`url(#${uid}-gh)`}
          strokeWidth="2.6"
          strokeOpacity="0.55"
        />
        {/* endpoint glow */}
        <circle cx="87" cy="35" r="22" fill={`url(#${uid}-glow)`} />
        {/* n */}
        <path
          d="M 35,90 L 35,61 C 35,50 61,50 61,61 L 61,90"
          fill="none"
          stroke={PAPER}
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* l : the signal */}
        <rect x="82" y="30" width="10" height="65" rx="5" fill={`url(#${uid}-gv)`} />
        {/* endpoint */}
        <circle cx="87" cy="35" r="3.1" fill={PAPER} />
      </g>
    </svg>
  )
}
