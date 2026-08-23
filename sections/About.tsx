import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"

export default function About() {
  return (
    <section id="about" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <Reveal className="container mx-auto max-w-4xl">
        <h2 className="type-section-title mb-12">About</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {portfolioConfig.about.description.map((paragraph, index) => (
              <p key={index} className="type-body mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h3 className="type-label mb-4">Tools</h3>
            <div className="type-body">
              {portfolioConfig.about.tools.join(', ')}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
