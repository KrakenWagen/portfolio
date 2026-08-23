import { portfolioConfig } from "@/config/portfolio"

const channels = [
  {
    label: "Email",
    href: `mailto:${portfolioConfig.personal.email}`,
  },
  {
    label: "LinkedIn",
    href: portfolioConfig.personal.linkedin,
  },
  {
    label: "GitHub",
    href: portfolioConfig.personal.github,
  },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gray-200 dark:border-gray-800 pt-10">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <p className="type-meta flex-1 min-w-0 sm:pr-8 md:pr-16">
            Made with <span className="text-red-500">❤</span> in T2, Adolfo Suárez Madrid-Barajas
          </p>

          <nav aria-label="Contact channels" className="flex shrink-0 flex-wrap gap-x-6 gap-y-2">
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={channel.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="type-nav text-muted-foreground hover:text-foreground transition-colors"
              >
                {channel.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div
        className="overflow-hidden pointer-events-none select-none text-[clamp(4.5rem,18vw,12rem)]"
        aria-hidden="true"
      >
        <div className="mx-auto h-[0.72em] overflow-hidden">
          <p className="text-center font-mono text-[1em] font-bold uppercase tracking-wide leading-none text-foreground/[0.08] dark:text-white/[0.1]">
            XILEF
          </p>
        </div>
      </div>
    </footer>
  )
}
