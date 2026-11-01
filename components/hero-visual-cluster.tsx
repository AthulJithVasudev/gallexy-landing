'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Wrench, ShieldCheck, Settings } from 'lucide-react'
import { heroCardsConfig, HeroCardConfig } from '@/lib/site-config'
import './hero-visual-cluster.css'

interface HeroVisualClusterProps {
  phoneImage?: React.ReactNode
}

const ICONS = {
  wrench: Wrench,
  'shield-check': ShieldCheck,
  settings: Settings,
}

export default function HeroVisualCluster({ phoneImage }: HeroVisualClusterProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const blobRef = useRef<HTMLDivElement>(null)

  // Card interaction layer elements and refs
  const interactionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Drag state
  const dragState = useRef<{
    activeCardId: string | null
    startX: number
    startY: number
    hasDragged: boolean
  }>({
    activeCardId: null,
    startX: 0,
    startY: 0,
    hasDragged: false,
  })

  // Parallax animation frame & visibility state
  const rafId = useRef<number | null>(null)
  const isVisible = useRef(true)

  // Rubber-band clamp helper (limit: 28px)
  const clampAxis = (val: number, limit = 28) => {
    const sign = Math.sign(val)
    const abs = Math.abs(val)
    if (abs <= limit) return val
    const overflow = abs - limit
    const damped = limit + overflow * 0.22
    return sign * Math.min(damped, limit + 8)
  }

  // Handle Drag Pointer Events (Fine pointer only)
  const handlePointerDown = (cardId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const interactionEl = interactionRefs.current[cardId]
    if (!interactionEl) return

    e.currentTarget.setPointerCapture(e.pointerId)
    dragState.current = {
      activeCardId: cardId,
      startX: e.clientX,
      startY: e.clientY,
      hasDragged: false,
    }

    interactionEl.classList.remove('is-springing')
    interactionEl.style.transition = 'none'

    const posWrapper = interactionEl.closest('.hero-card-pos')
    posWrapper?.classList.add('is-dragging')
  }

  const handlePointerMove = (cardId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.activeCardId !== cardId) return

    const dxRaw = e.clientX - dragState.current.startX
    const dyRaw = e.clientY - dragState.current.startY
    const distance = Math.hypot(dxRaw, dyRaw)

    if (distance > 4) {
      dragState.current.hasDragged = true
    }

    const dx = clampAxis(dxRaw, 28)
    const dy = clampAxis(dyRaw, 28)

    const interactionEl = interactionRefs.current[cardId]
    if (interactionEl) {
      interactionEl.style.setProperty('--drag-x', `${dx}px`)
      interactionEl.style.setProperty('--drag-y', `${dy}px`)
    }
  }

  const handlePointerUpOrCancel = (cardId: string, e: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.activeCardId !== cardId) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Ignored if capture was already released
    }

    const interactionEl = interactionRefs.current[cardId]
    if (interactionEl) {
      interactionEl.classList.add('is-springing')
      interactionEl.style.setProperty('--drag-x', '0px')
      interactionEl.style.setProperty('--drag-y', '0px')

      // Remove transition after spring completes
      setTimeout(() => {
        if (interactionEl) {
          interactionEl.classList.remove('is-springing')
        }
      }, 500)
    }

    const posWrapper = interactionEl?.closest('.hero-card-pos')
    posWrapper?.classList.remove('is-dragging')

    dragState.current.activeCardId = null
  }

  // Parallax cursor tracking across the WHOLE PAGE (Fine pointer only, single rAF, no React state updates)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || prefersReducedMotion) return

    const container = containerRef.current
    if (!container) return

    // Intersection observer to pause parallax when hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible.current = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    observer.observe(container)

    const onPointerMove = (e: MouseEvent) => {
      if (!isVisible.current) return

      if (rafId.current) cancelAnimationFrame(rafId.current)

      rafId.current = requestAnimationFrame(() => {
        const w = window.innerWidth
        const h = window.innerHeight
        const centerX = w / 2
        const centerY = h / 2

        // Normalized distance (-1 to 1) across the whole page viewport
        const nx = Math.max(-1, Math.min(1, (e.clientX - centerX) / (w / 2)))
        const ny = Math.max(-1, Math.min(1, (e.clientY - centerY) / (h / 2)))

        // Phone shift: up to 9px opposite cursor across the whole page
        if (phoneRef.current) {
          phoneRef.current.style.setProperty('--phone-px', `${-nx * 9}px`)
          phoneRef.current.style.setProperty('--phone-py', `${-ny * 9}px`)
        }

        // Blob shift: up to 12px opposite cursor
        if (blobRef.current) {
          blobRef.current.style.setProperty('--para-blob-x', `${-nx * 12}px`)
          blobRef.current.style.setProperty('--para-blob-y', `${-ny * 12}px`)
        }

        // Card parallax: up to 16px opposite cursor (staggered depths)
        const cardMultipliers: { [key: string]: number } = {
          'card-technicians': 12,
          'card-warranty': 16,
          'card-quality-parts': 14,
        }

        Object.entries(interactionRefs.current).forEach(([id, el]) => {
          if (el) {
            const mult = cardMultipliers[id] || 14
            el.style.setProperty('--para-x', `${-nx * mult}px`)
            el.style.setProperty('--para-y', `${-ny * mult}px`)
          }
        })
      })
    }

    const onPointerLeave = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        if (phoneRef.current) {
          phoneRef.current.style.setProperty('--phone-px', '0px')
          phoneRef.current.style.setProperty('--phone-py', '0px')
        }
        if (blobRef.current) {
          blobRef.current.style.setProperty('--para-blob-x', '0px')
          blobRef.current.style.setProperty('--para-blob-y', '0px')
        }
        Object.values(interactionRefs.current).forEach((el) => {
          if (el) {
            el.style.setProperty('--para-x', '0px')
            el.style.setProperty('--para-y', '0px')
          }
        })
      })
    }

    // Track across the whole window/page instead of just around the image
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('mouseleave', onPointerLeave)
    window.addEventListener('blur', onPointerLeave)

    // Mobile (<768px) IntersectionObserver to trigger animation when 25% visible
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (isMobile && containerRef.current) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
              containerRef.current?.classList.add('is-visible')
              revealObserver.disconnect()
            }
          })
        },
        { threshold: 0.25 }
      )
      revealObserver.observe(containerRef.current)
    } else if (containerRef.current) {
      containerRef.current.classList.add('is-visible')
    }

    return () => {
      observer.disconnect()
      if (rafId.current) cancelAnimationFrame(rafId.current)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('mouseleave', onPointerLeave)
      window.removeEventListener('blur', onPointerLeave)
    }
  }, [])

  // Position class for each card index
  const getCardPositionClass = (idx: number) => {
    if (idx === 0) return 'hero-card-pos-1'
    if (idx === 1) return 'hero-card-pos-2'
    return 'hero-card-pos-3'
  }

  return (
    <div
      ref={containerRef}
      className="hero-visual-cluster"
      aria-label="Galaxy repair center phone preview with feature badges"
    >
      {/* 1. SOFT RADIAL GRADIENT BLOB (Themed for light and dark) */}
      <div ref={blobRef} className="hero-cluster-blob" aria-hidden="true" />

      {/* 2. PHONE PRESENTATION WITH SLOW FLOAT & RIGHT LEAN */}
      <div ref={phoneRef} className="hero-phone-container">
        <div className="hero-phone-entrance">
          <div className="hero-phone-float-layer">
          <div className="hero-phone-rotate">
            {phoneImage ? (
              phoneImage
            ) : (
              <Image
                src="/images/hero-phone.svg"
                alt="Gallexy phone repair app showing common repairs: screen replacement, battery replacement, charging port repair and water damage service"
                width={657}
                height={942}
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 80vw, 420px"
                className="hero-phone-img"
              />
            )}
          </div>
        </div>
        </div>
      </div>

      {/* 3. THREE FLOATING BADGES (Non-clickable, floats & tracks mouse) */}
      {heroCardsConfig.map((card: HeroCardConfig, idx: number) => {
        const IconComponent = ICONS[card.icon] || Wrench

        return (
          <div
            key={card.id}
            className={`hero-card-pos ${getCardPositionClass(idx)}`}
          >
            {/* LAYER 1b: ENTRANCE LAYER */}
            <div className={`hero-card-entrance hero-card-entrance-${idx + 1}`}>
              {/* LAYER 2: FLOAT LAYER (Infinite float keyframe) */}
              <div className={`hero-card-float hero-card-float-${idx + 1}`}>
              {/* LAYER 3: INTERACTION LAYER (Drag & Parallax) */}
              <div
                ref={(el) => {
                  interactionRefs.current[card.id] = el
                }}
                className="hero-card-interaction"
              >
                {/* LAYER 4: BADGE ELEMENT (Does nothing when clicked) */}
                <div
                  className="hero-card-btn hero-card-badge"
                  role="region"
                  aria-label={`${card.title}: ${card.subtitle}`}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onPointerDown={(e) => handlePointerDown(card.id, e)}
                  onPointerMove={(e) => handlePointerMove(card.id, e)}
                  onPointerUp={(e) => handlePointerUpOrCancel(card.id, e)}
                  onPointerCancel={(e) => handlePointerUpOrCancel(card.id, e)}
                >
                  <div className="hero-card-icon-wrap" aria-hidden="true">
                    <IconComponent />
                  </div>
                  <div className="hero-card-text">
                    <span className="hero-card-title">
                      {card.title}
                    </span>
                    <span className="hero-card-sub">{card.subtitle}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
