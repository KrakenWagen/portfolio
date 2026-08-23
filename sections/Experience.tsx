import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader title="Experience" number="02" />
        </Reveal>
        <div className="space-y-12">
          {portfolioConfig.experience.map((job, index) => (
            <Reveal key={index} delay={index * 80}>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="type-item-title">{job.position}</h3>
                  <p className="type-meta mt-1">{job.company}</p>
                  <p className="type-meta mt-1">{job.location}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="type-body mb-2">{job.description}</p>
                  <p className="type-meta">{job.years}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
