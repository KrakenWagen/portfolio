import type { ReactNode, SVGProps } from "react"
import { cn } from "@/lib/utils"

type FlagCode = "ES" | "PL" | "FI"

const flagSvgs: Record<FlagCode, (props: SVGProps<SVGSVGElement>) => ReactNode> = {
  ES: (props) => (
    <svg viewBox="0 0 3 2" aria-hidden="true" {...props}>
      <rect width="3" height="2" fill="#c60b1e" />
      <rect y="0.5" width="3" height="1" fill="#ffc400" />
    </svg>
  ),
  PL: (props) => (
    <svg viewBox="0 0 3 2" aria-hidden="true" {...props}>
      <rect width="3" height="2" fill="#fff" />
      <rect y="1" width="3" height="1" fill="#dc143c" />
    </svg>
  ),
  FI: (props) => (
    <svg viewBox="0 0 18 11" aria-hidden="true" {...props}>
      <rect width="18" height="11" fill="#fff" />
      <rect x="5" width="3" height="11" fill="#003580" />
      <rect y="4" width="18" height="3" fill="#003580" />
    </svg>
  ),
}

interface FlagProps {
  code: FlagCode
  className?: string
  title?: string
}

export default function Flag({ code, className, title }: FlagProps) {
  const Svg = flagSvgs[code]

  return (
    <span
      className={cn(
        "inline-flex shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10 dark:ring-white/15",
        className,
      )}
      title={title ?? code}
    >
      <Svg className="h-full w-full" />
    </span>
  )
}

export type { FlagCode }
