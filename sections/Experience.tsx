import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader
            title="Experience"
            number="02"
            subtitle="From games and health tools to client builds — messy problems, real systems."
          />
        </Reveal>

        <div className="border-t border-gray-200 dark:border-gray-800">
          {portfolioConfig.experience.map((job, index) => (
            <Reveal key={`${job.company}-${job.years}`} delay={index * 60}>
              <article className="group grid grid-cols-1 md:grid-cols-[8.5rem_1fr] gap-3 md:gap-10 py-8 border-b border-gray-200 dark:border-gray-800">
                <time className="type-label pt-1">{job.years}</time>

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <h3 className="type-item-title">{job.position}</h3>
                    <span className="type-meta">·</span>
                    <span className="font-sans text-base font-medium tracking-[-0.01em] text-foreground/80">
                      {job.company}
                    </span>
                  </div>
                  <p className="type-meta mb-3">{job.location}</p>
                  <p className="type-body max-w-2xl">{job.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
