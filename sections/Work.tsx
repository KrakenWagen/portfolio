"use client"

import { useEffect, useRef, useState } from "react"
import { Github, ExternalLink, YoutubeIcon } from "lucide-react"
import { portfolioConfig } from "@/config/portfolio"
import Reveal from "@/components/reveal"
import SectionHeader from "@/components/section-header"
import { cn } from "@/lib/utils"

function projectSummary(description: string) {
  return description
    .split(/\n+/)
    .map((part) => part.trim())
    .find(Boolean)
}

type Project = (typeof portfolioConfig.projects)[number]

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  const links = [
    project.github && { href: project.github, label: "Code", icon: Github },
    project.youtube && { href: project.youtube, label: "Video", icon: YoutubeIcon },
    project.live && { href: project.live, label: "Live", icon: ExternalLink },
    project.read && { href: project.read, label: "Paper", icon: ExternalLink },
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[]

  if (links.length === 0) return null

  return (
    <div className={cn("flex flex-wrap gap-x-4 gap-y-2", className)}>
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="type-link inline-flex items-center text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </a>
      ))}
    </div>
  )
}

export default function Work() {
  const projects = portfolioConfig.projects
  const itemRefs = useRef<(HTMLElement | null)[]>([])
  const scrollingRef = useRef(false)
  const scrollClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)
  const [scrollIndex, setScrollIndex] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const activeIndex = hoverIndex ?? scrollIndex
  const activeProject = projects[activeIndex]

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)")
    const syncDesktop = () => setIsDesktop(media.matches)
    syncDesktop()
    media.addEventListener("change", syncDesktop)
    return () => media.removeEventListener("change", syncDesktop)
  }, [])

  useEffect(() => {
    if (!isDesktop) {
      setHoverIndex(null)
      return
    }

    const items = itemRefs.current.filter(Boolean) as HTMLElement[]
    if (items.length === 0) return

    const updateActiveFromScroll = () => {
      scrollingRef.current = true
      setHoverIndex(null)

      if (scrollClearTimer.current) clearTimeout(scrollClearTimer.current)
      scrollClearTimer.current = setTimeout(() => {
        scrollingRef.current = false
      }, 120)

      const marker = window.scrollY + window.innerHeight * 0.38

      let nextIndex = 0
      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].offsetTop <= marker) {
          nextIndex = i
          break
        }
      }

      setScrollIndex((prev) => (prev === nextIndex ? prev : nextIndex))
    }

    updateActiveFromScroll()
    window.addEventListener("scroll", updateActiveFromScroll, { passive: true })
    window.addEventListener("resize", updateActiveFromScroll)

    return () => {
      window.removeEventListener("scroll", updateActiveFromScroll)
      window.removeEventListener("resize", updateActiveFromScroll)
      if (scrollClearTimer.current) clearTimeout(scrollClearTimer.current)
    }
  }, [isDesktop, projects.length])

  const handleItemEnter = (index: number) => {
    if (!isDesktop || scrollingRef.current) return
    setHoverIndex(index)
  }

  return (
    <section id="work" className="py-24 px-6 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <SectionHeader
            title="Selected Work"
            number="04"
            subtitle="Research, games, and systems I shipped when the brief was fuzzy and the constraints were not."
          />
        </Reveal>

        <div className="border-t border-gray-200 dark:border-gray-800 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.8fr)] lg:gap-14 lg:items-start">
          <div
            className="border-b border-gray-200 dark:border-gray-800 lg:border-b-0"
            onMouseLeave={() => setHoverIndex(null)}
          >
            {projects.map((project, index) => {
              const summary = projectSummary(project.description)
              const isActive = isDesktop && index === activeIndex
              const isLast = index === projects.length - 1

              return (
                <article
                  key={`${project.title}-${project.year}`}
                  ref={(el) => {
                    itemRefs.current[index] = el
                  }}
                  onMouseEnter={() => handleItemEnter(index)}
                  className={cn(
                    "py-8 lg:py-6 pl-0 lg:pl-4 lg:-ml-4 lg:border-l-2 transition-[border-color,opacity] duration-300 motion-reduce:transition-none",
                    !isLast && "border-b border-b-gray-200 dark:border-b-gray-800",
                    isDesktop
                      ? isActive
                        ? "border-l-foreground opacity-100"
                        : "border-l-transparent opacity-50"
                      : "opacity-100",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="type-label">{String(index + 1).padStart(2, "0")}</span>
                    <time className="type-label">{project.year}</time>
                  </div>

                  <h3 className="type-item-title mb-2 max-w-xl">{project.title}</h3>

                  {summary ? (
                    <p className="type-body line-clamp-3 max-w-xl mb-3">{summary}</p>
                  ) : null}

                  <p className="font-mono text-xs text-muted-foreground line-clamp-2 mb-4 lg:mb-0">
                    {project.tech.join(" · ")}
                  </p>

                  {/* Mobile: image + links live with the project */}
                  <div className="lg:hidden space-y-4">
                    <div className="relative aspect-[16/10] overflow-hidden bg-white dark:bg-gray-900">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="h-full w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <ProjectLinks project={project} />
                  </div>
                </article>
              )
            })}
          </div>

          {/* Desktop sticky preview */}
          <div className="hidden lg:block sticky top-28 pt-8">
            <div className="relative w-full overflow-hidden bg-white dark:bg-gray-900 aspect-[16/10]">
              {projects.map((project, index) => (
                <div
                  key={`${project.title}-visual`}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0",
                  )}
                  aria-hidden={index !== activeIndex}
                >
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute top-3 right-3 type-label bg-background/80 px-2 py-1 backdrop-blur-sm">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 min-h-[1.75rem]">
              <ProjectLinks project={activeProject} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
