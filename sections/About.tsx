import { portfolioConfig } from "@/config/portfolio"

export default function About() {
  return (
    <section id="about" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-light mb-12">About</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            {portfolioConfig.about.description.map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4">Skills</h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              {portfolioConfig.about.skills.map((skill, index) => (
                <div key={index}>{skill}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
