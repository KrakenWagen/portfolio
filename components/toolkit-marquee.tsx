import type { CSSProperties } from "react"
import { Binary, Bug, Gauge, Martini, type LucideIcon } from "lucide-react"
import { techMarks } from "@/components/tech-marks"
import { cn } from "@/lib/utils"

const conceptIcons: Record<string, LucideIcon> = {
  Assembly: Binary,
  Profilers: Gauge,
  Debuggers: Bug,
  Bartending: Martini,
}

type ToolGroup = {
  label: string
  items: string[]
}

function uniqueNames(groups: ToolGroup[]) {
  const seen = new Set<string>()
  const names: string[] = []

  for (const group of groups) {
    for (const item of group.items) {
      if (seen.has(item)) continue
      seen.add(item)
      names.push(item)
    }
  }

  return names
}

function TechMark({ name }: { name: string }) {
  const mark = techMarks[name]

  if (mark) {
    return (
      <svg viewBox={mark.viewBox} className="size-5 shrink-0 text-foreground" aria-hidden="true">
        <path fill="currentColor" d={mark.path} />
      </svg>
    )
  }

  const Icon = conceptIcons[name]
  if (Icon) {
    return <Icon className="size-5 shrink-0 text-foreground" strokeWidth={1.5} aria-hidden="true" />
  }

  return (
    <span
      aria-hidden="true"
      className="grid size-5 shrink-0 place-items-center font-mono text-[9px] leading-none text-foreground"
    >
      {name.slice(0, 2).toUpperCase()}
    </span>
  )
}

function TechCard({ name }: { name: string }) {
  return (
    <li className="flex shrink-0 items-center gap-2.5 rounded-md border border-foreground/10 bg-foreground/[0.03] px-3.5 py-2.5 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06]">
      <TechMark name={name} />
      <span className="whitespace-nowrap font-mono text-sm text-foreground">{name}</span>
    </li>
  )
}

function MarqueeRow({ names, direction }: { names: string[]; direction: "left" | "right" }) {
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-visible motion-reduce:px-6 motion-reduce:[mask-image:none]">
      <div
        className={cn(
          "flex w-max group-hover:[animation-play-state:paused] motion-reduce:mx-auto motion-reduce:w-full motion-reduce:max-w-5xl motion-reduce:animate-none motion-reduce:justify-center",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ "--marquee-duration": `${Math.max(names.length, 8) * 3.4}s` } as CSSProperties}
      >
        <ul className="flex shrink-0 items-center gap-3 pr-3 motion-reduce:max-w-5xl motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:pr-0">
          {names.map((name) => (
            <TechCard key={name} name={name} />
          ))}
        </ul>
        <ul aria-hidden="true" className="flex shrink-0 items-center gap-3 pr-3 motion-reduce:hidden">
          {names.map((name) => (
            <TechCard key={name} name={name} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ToolkitMarquee({ groups }: { groups: ToolGroup[] }) {
  const names = uniqueNames(groups)
  const towardLeft = names.filter((_, index) => index % 2 === 0)
  const towardRight = names.filter((_, index) => index % 2 === 1)

  return (
    <div className="flex flex-col gap-3" role="region" aria-label="Toolkit">
      <MarqueeRow names={towardLeft} direction="left" />
      <MarqueeRow names={towardRight} direction="right" />
    </div>
  )
}
