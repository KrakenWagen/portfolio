import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  number: string
  subtitle?: string
  className?: string
}

export default function SectionHeader({ title, number, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="type-section-title">{title}</h2>
        <span className="type-label shrink-0">{number}</span>
      </div>
      {subtitle ? (
        <p className="type-body mt-4 max-w-2xl">{subtitle}</p>
      ) : null}
    </div>
  )
}
