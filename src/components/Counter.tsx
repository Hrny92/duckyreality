'use client'
/**
 * Counter — animates a number from 0 → target when it enters the viewport.
 * Renders an inline <span>.
 *
 * Usage:
 *   <Counter to={150} suffix="+" />
 *   <Counter to={98}  suffix="%" delay={200} />
 *   <Counter to={12}  duration={1000} />
 */
import { useEffect, useRef, useState } from 'react'

interface CounterProps {
  to:        number
  suffix?:   string
  prefix?:   string
  duration?: number   // ms, default 1400
  delay?:    number   // ms before counting starts (after entering view)
  className?: string
}

export default function Counter({
  to,
  suffix   = '',
  prefix   = '',
  duration = 1400,
  delay    = 0,
  className,
}: CounterProps) {
  const ref       = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)
  const fired     = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !fired.current) {
        fired.current = true
        obs.disconnect()

        setTimeout(() => {
          const start = performance.now()
          const tick  = (now: number) => {
            const p     = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)   // ease-out cubic
            setVal(Math.round(eased * to))
            if (p < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }, delay)
      }
    }, { threshold: 0.2 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [to, duration, delay])

  return (
    <span ref={ref} className={className}>
      {prefix}{val}{suffix}
    </span>
  )
}
