'use client'
/**
 * Reveal — scroll-triggered fade + slide wrapper.
 * Uses IntersectionObserver; animates once when element enters viewport.
 *
 * Usage:
 *   <Reveal>              ← defaults: direction="up", delay=0
 *   <Reveal direction="left" delay={200}>
 *   <Reveal direction="right" delay={100} duration={700}>
 */
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale'

interface RevealProps {
  children:   ReactNode
  direction?: RevealDirection
  delay?:     number    // ms
  duration?:  number    // ms
  distance?:  number    // px
  threshold?: number    // 0–1
  style?:     CSSProperties
  className?: string
}

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function initialTransform(dir: RevealDirection, dist: number): string {
  switch (dir) {
    case 'up':    return `translateY(${dist}px)`
    case 'down':  return `translateY(-${dist}px)`
    case 'left':  return `translateX(-${dist}px)`
    case 'right': return `translateX(${dist}px)`
    case 'scale': return `scale(0.93) translateY(${dist * 0.5}px)`
  }
}

export default function Reveal({
  children,
  direction  = 'up',
  delay      = 0,
  duration   = 650,
  distance   = 26,
  threshold  = 0.12,
  style,
  className,
}: RevealProps) {
  const ref     = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    vis ? 1 : 0,
        transform:  vis ? 'none' : initialTransform(direction, distance),
        transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
        willChange: vis ? 'auto' : 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
