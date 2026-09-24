import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"
import Flag from "@/components/flag"
import BasedAroundMap from "@/components/based-around-map"

const channels = [
  {
    label: "Email",
    href: `mailto:${portfolioConfig.personal.email}`,
    value: portfolioConfig.personal.email,
  },
  {
    label: "LinkedIn",
    href: portfolioConfig.personal.linkedin,
    value: portfolioConfig.personal.linkedin.replace(/^https?:\/\//, ""),
  },
  {
    label: "GitHub",
    href: portfolioConfig.personal.github,
    value: portfolioConfig.personal.github.replace(/^https?:\/\//, ""),
  },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader
            title="Get In Touch"
            number="05"
            subtitle="Open to collaborations, weird problems, and good conversations."
          />
        </Reveal>

        <Reveal delay={60}>
          <p className="text-[clamp(1.25rem,2.2vw,1.65rem)] font-sans font-medium tracking-[-0.02em] leading-[1.35] text-foreground max-w-2xl mb-14">
            {portfolioConfig.contact.description}
          </p>
        </Reveal>

        <Reveal delay={80}>
          <div className="mb-14">
            <h3 className="type-label mb-6">Channels</h3>
            <ul className="border-t border-gray-200 dark:border-gray-800">
              {channels.map((channel, index) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group grid grid-cols-[4.5rem_1fr] sm:grid-cols-[7rem_1fr] gap-4 sm:gap-8 items-baseline py-5 border-b border-gray-200 dark:border-gray-800 transition-opacity hover:opacity-80"
                  >
                    <span className="type-label tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-6 min-w-0">
                      <span className="type-item-title">{channel.label}</span>
                      <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors truncate">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h3 className="type-label mb-4">Based around</h3>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {portfolioConfig.contact.availability.map((place) => (
                <li
                  key={`${place.city}-${place.country}`}
                  className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground"
                >
                  <Flag code={place.country} className="h-3.5 w-[1.3rem]" title={place.country} />
                  <span>
                    {place.city}, {place.country}
                  </span>
                </li>
              ))}
            </ul>
            <BasedAroundMap />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
