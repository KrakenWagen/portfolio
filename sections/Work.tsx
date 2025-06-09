import { Github, ExternalLink, YoutubeIcon } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"

export default function Work() {
  return (
    <section id="work" className="py-20 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-light mb-12">Selected Work</h2>
        <div className="space-y-16">
          {portfolioConfig.projects.map((project, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-8 items-center">
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
                  <h3 className="text-2xl font-medium">{project.title}</h3>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">{project.year}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.github && <a
                    href={project.github}
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-1"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </a>}
                 {project.youtube && <a
                    href={project.youtube}
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-1"
                  >
                    <YoutubeIcon className="w-4 h-4 mr-2" />
                    Watch video
                  </a>}
                 {project.live && <a
                    href={project.live}
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>}
                 {project.read && <a
                    href={project.read}
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors border-b border-transparent hover:border-black dark:hover:border-white pb-1"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Read
                  </a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
