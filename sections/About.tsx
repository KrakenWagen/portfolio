import { Bot, BrainCircuit, Gamepad2, ScanBox, ScanEye, Server, type LucideIcon } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"
import ToolkitMarquee from "@/components/toolkit-marquee"
import { cn } from "@/lib/utils"

const focusIcons: Record<string, LucideIcon> = {
  "Artificial Intelligence": BrainCircuit,
  "Computer Vision": ScanEye,
  Robotics: Bot,
  Graphics: ScanBox,
  "Backend & full-stack": Server,
  Videogames: Gamepad2,
}

export default function About() {
  const { lead, description, focus, toolGroups } = portfolioConfig.about

  return (
    <section id="about" className="py-24 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader title="About" number="01" className="mb-10" />
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[clamp(1.35rem,2.4vw,1.85rem)] font-sans font-medium tracking-[-0.02em] leading-[1.35] text-foreground max-w-3xl mb-8">
            {lead}
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-2xl mb-16">
            {description.map((paragraph, index) => (
              <p key={index} className="type-body">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-16">
            <h3 className="type-label mb-6">Focus</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-3">
              {focus.map((field, index) => {
                const Icon = focusIcons[field.title]
                const lastRowStart = focus.length - (focus.length % 3 || 3)
                return (
                  <li
                    key={field.title}
                    className={cn(
                      "px-5 py-6 border-gray-200 dark:border-gray-800",
                      index < focus.length - 1 && "max-sm:border-b",
                      index % 3 !== 2 && "sm:border-r",
                      index < lastRowStart && "sm:border-b",
                    )}
                  >
                    {Icon ? (
                      <Icon className="mb-8 ml-auto block size-12 sm:size-8 lg:size-10 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
                    ) : null}
                    <h4 className="font-sans text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground">
                      {field.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{field.description}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <h3 className="type-label mb-6">Toolkit</h3>
        </Reveal>
      </div>

      <Reveal delay={80} className="-mx-6">
        <ToolkitMarquee groups={toolGroups} />
      </Reveal>
    </section>
  )
}
