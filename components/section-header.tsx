import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  number: string
  className?: string
}

export default function SectionHeader({ title, number, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-baseline justify-between gap-6 mb-12", className)}>
      <h2 className="type-section-title">{title}</h2>
      <span className="type-label shrink-0">{number}</span>
    </div>
  )
}
