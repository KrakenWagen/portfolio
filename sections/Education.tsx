import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"

export default function Education() {
  return (
    <section id="education" className="py-24 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader
            title="Education"
            number="03"
            subtitle="Mostly spent deep in AI, computer vision, and making pixels behave."
          />
        </Reveal>

        <div className="border-t border-gray-200 dark:border-gray-800">
          {portfolioConfig.education.map((edu, index) => (
            <Reveal key={`${edu.degree}-${edu.years}`} delay={index * 60}>
              <article className="grid grid-cols-1 md:grid-cols-[8.5rem_1fr] gap-3 md:gap-10 py-8 border-b border-gray-200 dark:border-gray-800">
                <time className="type-label pt-1">{edu.years}</time>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className="type-item-title">{edu.degree}</h3>
                    <span className="type-meta">·</span>
                    <span className="font-sans text-base font-medium tracking-[-0.01em] text-foreground/80">
                      {edu.school}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
                    <p className="type-meta">{edu.location}</p>
                    {"tags" in edu &&
                      edu.tags?.map((tag) => (
                        <span key={tag} className="type-label text-foreground/70">
                          {tag}
                        </span>
                      ))}
                  </div>

                  <div className="space-y-1 max-w-2xl">
                    {edu.description.map((paragraph, idx) => (
                      <p key={idx} className="type-body">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
