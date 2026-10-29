'use client'

import Link from 'next/link'

const variants = {
  primary:
    'text-white bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg shadow-primary-500/25 hover:opacity-90',
  secondary:
    'text-dark-200 bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] hover:text-white',
  ghost: 'text-primary-400 hover:text-primary-300',
}

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  external = false,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all ${variants[variant]} ${className}`

  if (href?.startsWith('#')) {
    return (
      <a
        href={href}
        className={classes}
        onClick={e => {
          const id = href.slice(1)
          const el = typeof document !== 'undefined' ? document.getElementById(id) : null
          if (!el) return
          e.preventDefault()
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          window.history.replaceState(null, '', href)
        }}
        {...props}
      >
        {children}
      </a>
    )
  }

  if (href && external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    )
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
