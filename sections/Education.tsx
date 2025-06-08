import { portfolioConfig } from "@/config/portfolio"

export default function Education() {
  return (
    <section id="education" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-light mb-12">Education</h2>
        <div className="space-y-12">
          {portfolioConfig.education.map((edu, index) => (
            <div key={index} className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-medium">{edu.degree}</h3>
                <p className="text-gray-600 dark:text-gray-400">{edu.school}</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-1">{edu.location}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-700 dark:text-gray-300 mb-2">{edu.description}</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">{edu.years}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
