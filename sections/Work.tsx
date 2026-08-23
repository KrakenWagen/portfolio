import { Github, ExternalLink, YoutubeIcon } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"

export default function Work() {
  return (
    <section id="work" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <Reveal>
          <SectionHeader title="Selected Work" number="04" />
        </Reveal>
        <div className="space-y-16">
          {portfolioConfig.projects.map((project, index) => (
            <Reveal key={index} delay={60}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="type-card-title">{project.title}</h3>
                    <span className="type-meta">{project.year}</span>
                  </div>
                  <p className="type-body mb-6">
                    {project.description.split("\n").map((e, i) => (
                      <span key={i}>
                        {e}
                        <br />
                      </span>
                    ))}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="type-label bg-muted px-3 py-1 rounded-full normal-case tracking-normal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    )}
                    {project.youtube && (
                      <a
                        href={project.youtube}
                        className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
                      >
                        <YoutubeIcon className="w-4 h-4 mr-2" />
                        Watch video
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                    {project.read && (
                      <a
                        href={project.read}
                        className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Read
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
