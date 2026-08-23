import { Mail, Github, LinkedinIcon } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h2 className="type-section-title mb-12">Get In Touch</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <p className="type-body mb-8">
              {portfolioConfig.contact.description}
            </p>
            <div className="space-y-4" >
              <a className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1" href={`mailto:${portfolioConfig.personal.email}`}>
                <Mail className="w-5 h-5 mr-3 text-muted-foreground/80" />
                <span>{portfolioConfig.personal.email}</span>
              </a>
              <a className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1" href={portfolioConfig.personal.linkedin}>
                <LinkedinIcon className="w-5 h-5 mr-3 text-muted-foreground/80"/>
                <span>{portfolioConfig.personal.linkedin.replaceAll('https://', '')}</span>
              </a>
              <a className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1" href={portfolioConfig.personal.github}>
                <Github className="w-5 h-5 mr-3 text-muted-foreground/80"/>
                <span>{portfolioConfig.personal.github.replaceAll('https://', '')}</span>
              </a>
            </div>
          </div>
          <div>
            <div className="type-body">
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
