"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { ArrowUpRight, ChevronLeft } from "lucide-react"

export interface WorkItem {
  id?: string | number
  title: string
  subtitle?: string
  image: string
  href?: string
}

export interface WorksWheelProps {
  items?: WorkItem[]
  centerTitle?: string
  viewLabel?: string
  dir?: "rtl" | "ltr"
  initialMode?: "wheel" | "focus"
  height?: string
  onItemClick?: (item: WorkItem, index: number) => void
  className?: string
}

export const JAAFAR_APPS: WorkItem[] = [
  {
    id: "tools-hub",
    title: "بيئة الادوات",
    subtitle: "حزمة الأدوات الذكية المتكاملة",
    image: "/apps/tools-env.jpg",
    href: "#",
  },
  {
    id: "pda4",
    title: "PDA4",
    subtitle: "نظام إدارة ومعالجة المستندات الرقمية",
    image: "/apps/pda4.png",
    href: "#",
  },
  {
    id: "media-compressor",
    title: "بيئة الضغط",
    subtitle: "ضاغط الوسائط الرسمية - ضغط وتحويل الوثائق الحكومية",
    image: "/apps/compression-env.jpg",
    href: "#",
  },
  {
    id: "voice-env",
    title: "بيئة الصوت",
    subtitle: "Voice Environment - استوديو الصوت والذكاء الاصطناعي",
    image: "/apps/sound-env.png",
    href: "#",
  },
  {
    id: "bayah-cv",
    title: "بيئة CV",
    subtitle: "Bayah-CV - منشئ السير الذاتية الاحترافي",
    image: "/apps/bayah-cv.png",
    href: "#",
  },
  {
    id: "offline-translator",
    title: "مترجم اوفلاين الذكي",
    subtitle: "مترجم فوري ذكي يعمل بدون اتصال بالإنترنت",
    image: "/apps/offline-translator.png",
    href: "#",
  },
  {
    id: "download-organizer",
    title: "منظم التنزيلات",
    subtitle: "تنظيم تلقائي ذكي للملفات والتنزيلات بضغطة واحدة مع كشف المكررات وتراجع آمن",
    image: "/apps/download-organizer/logo.png",
    href: "#download-organizer",
  },
]

export interface CardTransformResult {
  rel: number
  x: number
  y: number
  z: number
  rotX: number
  rotY: number
  rotZ: number
  scale: number
  opacity: number
  zIndex: number
  isCenterFocused: boolean
}

export function computeWheelCardTransform(
  idx: number,
  pos: number,
  count: number,
  m: number
): CardTransformResult {
  let rel = (idx - pos) % count
  if (rel > count / 2) rel -= count
  if (rel < -count / 2) rel += count

  // 1. Wheel Mode (m = 0): tight geometric polygon ring around the center
  const angleStep = (2 * Math.PI) / count
  const wheelAngle = rel * angleStep - Math.PI / 2
  const wheelRadius = 210
  const wx = Math.cos(wheelAngle) * wheelRadius
  const wy = Math.sin(wheelAngle) * wheelRadius
  const wRotZ = (wheelAngle * 180) / Math.PI + 90
  const wScale = 0.46

  // 2. Helical 3D Spiral Ribbon Transition (0 < m < 1)
  // Vanishes at m = 0 and m = 1, peaks at m = 0.5 to create the sweeping 3D spiral ribbon from the video
  const twist = Math.sin(m * Math.PI)
  const spiralX = -Math.sin(rel * 0.85 + 0.35) * 185 * twist
  const spiralY = Math.sin(rel * 0.65) * 55 * twist
  const spiralZ = -Math.abs(rel) * 155 * twist
  const spiralRotX = 18 * twist
  const spiralRotY = (rel * -34 - 16) * twist
  const spiralRotZ = (rel * 22 - 12) * twist

  // 3. Focus Mode (m = 1): 3D vertical revolving cylinder / drum
  const absRel = Math.abs(rel)
  const fy = rel * 265
  const fz = -Math.pow(absRel, 1.35) * 165
  const fRotX = Math.max(-60, Math.min(60, -rel * 50))
  const fScale = Math.max(0.62, 1 - absRel * 0.2)

  const x = wx * (1 - m) + spiralX
  const y = wy * (1 - m) + spiralY + fy * m
  const z = spiralZ + fz * m
  const rotX = spiralRotX + fRotX * m
  const rotY = spiralRotY
  const rotZ = wRotZ * (1 - m) + spiralRotZ
  const scale = wScale * (1 - m) + fScale * m

  const focusOpacity =
    absRel <= 1.25 ? 1 : Math.max(0, 1 - (absRel - 1.25) * 1.45)
  const opacity = (1 - m) * 1 + m * focusOpacity
  const isCenterFocused = m > 0.75 && absRel < 0.35

  return {
    rel,
    x,
    y,
    z,
    rotX,
    rotY,
    rotZ,
    scale,
    opacity,
    zIndex: Math.round(100 - absRel * 20),
    isCenterFocused,
  }
}

export function isPointerInWheelAppsZone(
  clientX: number,
  rectLeft: number,
  rectWidth: number,
  morphTarget: number,
  isOverCardElement: boolean,
  isOverSideControl: boolean
): boolean {
  if (isOverSideControl) return false
  if (isOverCardElement) return true
  if (rectWidth <= 0) return false
  const centerX = rectLeft + rectWidth / 2
  const distFromCenterX = Math.abs(clientX - centerX)
  const maxHalfWidth =
    morphTarget < 0.5
      ? Math.min(310, rectWidth * 0.32)
      : Math.min(250, rectWidth * 0.26)
  return distFromCenterX <= maxHalfWidth
}

export default function WorksWheel({
  items = JAAFAR_APPS,
  centerTitle = "تطبيقاتي",
  viewLabel = "فتح التطبيق",
  dir = "rtl",
  initialMode = "wheel",
  height = "100svh",
  onItemClick,
  className = "",
}: WorksWheelProps) {
  const count = items.length || 1
  const [mode, setMode] = useState<"wheel" | "focus">(initialMode)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [, setTick] = useState<number>(0)

  const containerRef = useRef<HTMLDivElement | null>(null)
  const stateRef = useRef({
    pos: 0,
    targetPos: 0,
    vel: 0,
    morph: initialMode === "focus" ? 1 : 0,
    targetMorph: initialMode === "focus" ? 1 : 0,
    dragging: false,
    startY: 0,
    startX: 0,
    lastY: 0,
    moved: false,
    wheelAccum: 0,
    lastWheelTime: 0,
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const selectIndex = useCallback(
    (idx: number, nextMode?: "wheel" | "focus") => {
      const s = stateRef.current
      const normalizedIdx = ((idx % count) + count) % count
      let diff = (normalizedIdx - (s.targetPos % count)) % count
      if (diff > count / 2) diff -= count
      if (diff < -count / 2) diff += count
      s.targetPos = Math.round(s.targetPos + diff)
      setActiveIndex(normalizedIdx)
      if (nextMode) {
        s.targetMorph = nextMode === "focus" ? 1 : 0
        setMode(nextMode)
      }
    },
    [count]
  )

  const toggleMode = useCallback(() => {
    const s = stateRef.current
    const next = mode === "wheel" ? "focus" : "wheel"
    s.targetMorph = next === "focus" ? 1 : 0
    if (next === "focus") {
      s.targetPos = Math.round(s.pos)
    }
    setMode(next)
  }, [mode])

  useEffect(() => {
    let rafId = 0
    let lastTime = performance.now()
    const step = (now: number) => {
      const dt = Math.min(0.1, Math.max(0.001, (now - lastTime) / 1000))
      lastTime = now
      const frameScale = dt * 60
      const s = stateRef.current
      if (!s.dragging) {
        if (s.targetMorph < 0.5) {
          // Gentle continuous rotation when in wheel mode
          s.targetPos += 0.002 * frameScale
        } else if (now - s.lastWheelTime > 160) {
          // Soft magnetic snap to nearest card after scrolling stops in focus mode
          s.targetPos += (Math.round(s.targetPos) - s.targetPos) * (1 - Math.pow(1 - 0.18, frameScale))
        }
        const dp = s.targetPos - s.pos
        const posLerp = 1 - Math.pow(1 - 0.13, frameScale)
        s.pos += dp * posLerp
      } else {
        s.pos += s.vel * frameScale
        s.vel *= Math.pow(0.92, frameScale)
        s.targetPos = s.pos
      }

      const dm = s.targetMorph - s.morph
      const morphLerp = 1 - Math.pow(1 - 0.095, frameScale)
      s.morph += dm * morphLerp

      const refPos = !s.dragging && s.targetMorph >= 0.5 ? s.targetPos : s.pos
      const currentIdx = ((Math.round(refPos) % count) + count) % count
      setActiveIndex((prev) => (prev !== currentIdx ? currentIdx : prev))
      setTick((t) => (t + 1) % 1000000)
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [count])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onNativeWheel = (e: WheelEvent) => {
      const s = stateRef.current
      const rect = el.getBoundingClientRect()
      const targetEl = e.target as HTMLElement | null
      const isOverCard = Boolean(
        targetEl?.closest('[data-wheel-card="true"]') ||
          targetEl?.closest('[data-wheel-center="true"]')
      )
      const isOverSideControl = Boolean(
        targetEl?.closest('[data-wheel-nav="true"]') ||
          targetEl?.closest('[data-wheel-collapse="true"]')
      )

      const inMiddleApps = isPointerInWheelAppsZone(
        e.clientX,
        rect.left,
        rect.width,
        s.targetMorph,
        isOverCard,
        isOverSideControl
      )

      // Outside the middle applications area (e.g., on the right/far-right or left):
      // allow the browser page to scroll naturally without flipping apps.
      if (!inMiddleApps) {
        return
      }

      // Inside the middle applications area: prevent page scrolling and flip through apps.
      e.preventDefault()

      const now = performance.now()
      const timeSinceLastWheel = now - s.lastWheelTime
      if (timeSinceLastWheel > 240) {
        s.wheelAccum = 0
      }
      s.lastWheelTime = now

      if (s.targetMorph < 0.5) {
        if (Math.abs(e.deltaY) > 4) {
          s.targetMorph = 1
          s.targetPos = Math.round(s.pos)
          s.wheelAccum = 0
          setMode("focus")
        }
        return
      }

      const normalizedDelta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY

      // Discrete mouse wheel notch (>= 40px) vs continuous trackpad scroll
      if (Math.abs(normalizedDelta) >= 40 && timeSinceLastWheel > 55) {
        const direction = Math.sign(normalizedDelta)
        s.targetPos = Math.round(s.targetPos) + direction
        s.wheelAccum = 0
      } else {
        s.targetPos += normalizedDelta / 220
      }

      const nextIdx = ((Math.round(s.targetPos) % count) + count) % count
      setActiveIndex(nextIdx)
    }

    el.addEventListener("wheel", onNativeWheel, { passive: false })
    return () => {
      el.removeEventListener("wheel", onNativeWheel)
    }
  }, [count])

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const targetEl = e.target as HTMLElement | null
    if (
      targetEl?.closest('[data-wheel-nav="true"]') ||
      targetEl?.closest('[data-wheel-collapse="true"]')
    ) {
      return
    }
    const s = stateRef.current
    s.dragging = true
    s.startY = e.clientY
    s.startX = e.clientX
    s.lastY = e.clientY
    s.vel = 0
    s.moved = false
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = stateRef.current
    if (!s.dragging) return
    const dy = e.clientY - s.lastY
    if (Math.abs(e.clientY - s.startY) > 6 || Math.abs(e.clientX - s.startX) > 6) {
      s.moved = true
    }
    s.lastY = e.clientY
    const delta = -dy / (isMobile ? 140 : 180)
    s.pos += delta
    s.targetPos = s.pos
    s.vel = delta * 0.3
  }

  const handlePointerUp = () => {
    const s = stateRef.current
    if (!s.dragging) return
    s.dragging = false
    if (s.targetMorph > 0.5) {
      s.targetPos = Math.round(s.pos)
    }
  }

  const s = stateRef.current
  const m = s.morph
  const activeItem = items[activeIndex] ?? items[0]
  const mobileScale = isMobile ? 0.68 : 1

  return (
    <section
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onClick={() => {
        if (!stateRef.current.moved) {
          toggleMode()
        }
      }}
      style={{ height }}
      className={`relative w-full overflow-hidden bg-[#050507] text-white select-none ${className}`}
    >
      {/* Top Seamless Blend Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 md:h-36 bg-gradient-to-b from-[#050507] via-[#050507]/70 to-transparent"
      />
      {/* Bottom Seamless Blend Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 md:h-36 bg-gradient-to-t from-[#050507] via-[#050507]/70 to-transparent"
      />

      {/* Subtle Side Collapse Chevron (<) in Focus Mode — matches video far-left arrow on desktop, accessible top-left button on mobile */}
      <button
        type="button"
        data-wheel-collapse="true"
        aria-label="العودة إلى العجلة الدائرية"
        onClick={(e) => {
          e.stopPropagation()
          const st = stateRef.current
          st.targetMorph = 0
          setMode("wheel")
        }}
        style={{
          opacity: Math.max(0, Math.min(1, (m - 0.45) * 2.2)),
          pointerEvents: m > 0.6 ? "auto" : "none",
        }}
        className="absolute left-4 top-[17%] -translate-y-1/2 md:left-7 md:top-1/2 z-30 flex h-10 w-10 md:h-9 md:w-9 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 backdrop-blur-md md:border-0 md:bg-transparent md:text-white/40 md:backdrop-blur-none hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Active App Clean Title in Focus Mode — top-centered on mobile to avoid card collision, left-aligned on desktop */}
      <div
        dir="auto"
        style={{
          opacity: Math.max(0, Math.min(1, (m - 0.35) * 2.2)),
          transform: isMobile
            ? `translate3d(-50%, ${(1 - m) * -12 - 50}%, 0)`
            : `translate3d(${(1 - m) * -18}px, -50%, 0)`,
          pointerEvents: "none",
        }}
        className="absolute left-1/2 top-[17%] w-[calc(100%-6.5rem)] text-center md:w-auto md:text-start md:left-16 md:top-1/2 z-30 max-w-xs"
      >
        <h3 className="text-xl sm:text-2xl md:text-4xl font-medium tracking-tight text-white truncate md:whitespace-nowrap">
          {activeItem?.title}
        </h3>
      </div>

      {/* Center Wheel Title ("تطبيقاتي") — clean minimal text in the center of the wheel */}
      <div
        data-wheel-center="true"
        style={{
          opacity: Math.max(0, 1 - m * 2.2),
          transform: `translate(-50%, -50%) scale(${(1 - m * 0.15).toFixed(3)})`,
          pointerEvents: m > 0.5 ? "none" : "auto",
        }}
        className="absolute left-1/2 top-1/2 z-20 flex items-center justify-center text-center"
      >
        <span className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white whitespace-nowrap">
          {centerTitle}
        </span>
      </div>

      {/* Navigation List — Sleek Horizontal Scrollable Bar on Mobile (<768px), Top-Right Minimal Index List on Desktop (>=768px) */}
      <nav
        dir={dir}
        data-wheel-nav="true"
        aria-label="قائمة تطبيقات جعفر العبادي"
        onClick={(e) => e.stopPropagation()}
        className="
          absolute top-5 inset-x-3 z-30 flex flex-row items-center gap-1.5 overflow-x-auto rounded-full border border-white/10 bg-black/55 px-3 py-2 backdrop-blur-md [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          md:inset-x-auto md:top-10 md:right-12 md:flex-col md:items-start md:gap-1.5 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none
        "
      >
        {items.map((item, idx) => {
          const isCurrent = idx === activeIndex
          return (
            <button
              key={item.id ?? idx}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                selectIndex(idx, "focus")
              }}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] sm:text-xs md:rounded-none md:px-0 md:py-0 md:text-sm tracking-tight transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                isCurrent
                  ? "bg-white/15 text-white font-semibold md:bg-transparent"
                  : "text-white/50 hover:text-white/80 md:text-white/35 md:hover:text-white/75"
              }`}
            >
              {item.title}
            </button>
          )
        })}
      </nav>

      {/* 3D Wheel / Unfolded Cylinder Roller Stage */}
      <div
        className="relative flex h-full w-full items-center justify-center pt-8 md:pt-0"
        style={{
          perspective: isMobile ? "950px" : "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((item, idx) => {
          const tf = computeWheelCardTransform(idx, s.pos, count, m)
          const { rel, x, y, z, rotX, rotY, rotZ, scale, opacity, zIndex, isCenterFocused } = tf

          // Smoothly morph aspect ratio from square wheel tile (310x310) to landscape roller card (390x260) on desktop;
          // proportionally scaled on mobile so cards fit comfortably within 320px-430px screens.
          const cardWidth = Math.round((310 + m * 80) * (isMobile ? 0.72 : 1))
          const cardHeight = Math.round((310 - m * 50) * (isMobile ? 0.72 : 1))
          const dispX = x * mobileScale
          const dispY = y * mobileScale
          const dispZ = z * mobileScale

          return (
            <div
              key={item.id ?? idx}
              data-wheel-card="true"
              onClick={(e) => {
                e.stopPropagation()
                if (mode === "wheel") {
                  selectIndex(idx, "focus")
                } else if (Math.abs(rel) < 0.35) {
                  if (onItemClick) onItemClick(item, idx)
                  else toggleMode()
                } else {
                  selectIndex(idx, "focus")
                }
              }}
              style={{
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                opacity,
                zIndex,
                pointerEvents: opacity > 0.15 ? "auto" : "none",
                transform: `translate3d(${dispX.toFixed(1)}px, ${dispY.toFixed(1)}px, ${dispZ.toFixed(1)}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
              }}
              className="group absolute overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 cursor-pointer will-change-transform shadow-[0_24px_60px_rgba(0,0,0,0.75)]"
            >
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

              {/* Bottom-Right Action Pill ("فتح التطبيق ↗") — always visible on mobile touch screens, appears on hover on desktop */}
              {isCenterFocused && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onItemClick?.(item, idx)
                  }}
                  className="absolute bottom-3 right-3 md:bottom-3.5 md:right-3.5 flex items-center gap-1.5 rounded-full bg-black/80 md:bg-black/75 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md border border-white/20 md:border-white/15 opacity-100 translate-y-0 md:opacity-0 md:translate-y-1 md:group-hover:opacity-100 md:group-hover:translate-y-0 focus-visible:opacity-100 transition-all duration-200 hover:bg-black/90 cursor-pointer shadow-lg"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  <span>{viewLabel}</span>
                </button>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
