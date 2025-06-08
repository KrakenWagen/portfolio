import { Mail, Github } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-light mb-12">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {portfolioConfig.contact.description}
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{portfolioConfig.personal.email}</span>
              </div>
              <div className="flex items-center">
                <Github className="w-5 h-5 mr-3 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-700 dark:text-gray-300">{portfolioConfig.personal.github}</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {portfolioConfig.contact.availability.map((item, index) => (
                <div key={index}>
                  {item}
                  {index < portfolioConfig.contact.availability.length - 1 && <br />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
