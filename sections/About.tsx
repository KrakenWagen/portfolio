import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"

export default function About() {
  const { lead, description, domains, toolGroups } = portfolioConfig.about

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
            <ul className="border-t border-gray-200 dark:border-gray-800">
              {domains.map((domain, index) => (
                <li
                  key={domain}
                  className="group flex items-baseline gap-4 md:gap-8 py-4 border-b border-gray-200 dark:border-gray-800"
                >
                  <span className="type-label w-8 shrink-0 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="type-item-title font-medium transition-colors group-hover:text-foreground">
                    {domain}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div>
            <h3 className="type-label mb-6">Toolkit</h3>
            <div className="space-y-5">
              {toolGroups.map((group) => (
                <div
                  key={group.label}
                  className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-2 sm:gap-6 items-baseline"
                >
                  <span className="type-label">{group.label}</span>
                  <p className="font-mono text-sm leading-relaxed text-muted-foreground">
                    {group.items.join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
