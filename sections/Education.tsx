import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <h2 className="type-section-title mb-12">Education</h2>
        </Reveal>
        <div className="space-y-12">
          {portfolioConfig.education.map((edu, index) => (
            <Reveal key={index} delay={index * 80}>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h3 className="type-item-title">{edu.degree}</h3>
                  <p className="type-meta mt-1">{edu.school}</p>
                  <p className="type-meta mt-1">{edu.location}</p>
                </div>
                <div className="md:col-span-2">
                  {edu.description.map((paragraph, idx) => (
                    <p key={idx} className="type-body mb-2">
                      {paragraph}
                    </p>
                  ))}
                  <p className="type-meta">{edu.years}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
