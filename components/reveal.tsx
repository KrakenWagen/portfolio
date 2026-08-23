"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: ReactNode
  className?: string
  /** Delay in ms before the animation starts once visible */
  delay?: number
}

export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        !visible && "translate-y-10 opacity-0",
        visible && "animate-reveal-up",
        className,
      )}
      style={
        visible && delay > 0
          ? ({ animationDelay: `${delay}ms` } as CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  )
}
