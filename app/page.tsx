"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Terminal, Moon, Sun, Menu, X } from "lucide-react"
import TerminalComponent from "@/components/terminal"
import { useTheme } from "next-themes"
import { portfolioConfig } from "@/config/portfolio"

// Import sections
import Hero from "@/sections/Hero"
import About from "@/sections/About"
import Experience from "@/sections/Experience"
import Education from "@/sections/Education"
import Work from "@/sections/Work"
import Contact from "@/sections/Contact"

export default function Portfolio() {
  const [showTerminal, setShowTerminal] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showNav, setShowNav] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  // Refs for all sections
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  useEffect(() => {
    setMounted(true)
  }, [])

  // Improved section detection using scroll position
  useEffect(() => {
    // Store references to all sections
    portfolioConfig.navigation.forEach((item) => {
      sectionRefs.current[item.id] = document.getElementById(item.id)
    })

    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setShowNav(window.scrollY > heroHeight - 100)

      // Close mobile menu on scroll
      setMobileMenuOpen(false)

      // Determine active section based on scroll position
      const scrollPosition = window.scrollY + 150 // Offset for better UX

      // Find the section that is currently in view
      let currentSection = ""

      // Check sections in reverse order (bottom to top)
      // This ensures that when scrolling down, we highlight the section as soon as it comes into view
      for (let i = portfolioConfig.navigation.length - 1; i >= 0; i--) {
        const section = sectionRefs.current[portfolioConfig.navigation[i].id]
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = portfolioConfig.navigation[i].id
          break
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [activeSection])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for sticky nav height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false) // Close mobile menu after navigation
  }

  const handleTerminalClick = () => {
    setIsAnimating(false)
    setShowTerminal(true)
  }

  const handleExitTerminal = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsAnimating(false)
    }, 350)
    setShowTerminal(false)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (showTerminal) {
    return <TerminalComponent onExit={handleExitTerminal} />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          showNav ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Theme Toggle - Inside Nav */}
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="icon"
              className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              disabled={!mounted}
            >
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center flex-1">
              <div className="flex space-x-8">
                {portfolioConfig.navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-black dark:hover:text-white ${
                      activeSection === item.id
                        ? "text-black dark:text-white border-b-2 border-black dark:border-white pb-1"
                        : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Terminal Button - Inside Nav */}
            <Button
              onClick={handleTerminalClick}
              variant="outline"
              className="border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-mono"
              disabled={isAnimating}
            >
              <Terminal className="w-4 h-4 mr-2" />
              Terminal
            </Button>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <Button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                variant="ghost"
                size="icon"
                className="text-black dark:text-white md:hidden ml-2"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col space-y-4">
                {portfolioConfig.navigation.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left text-sm font-medium transition-colors duration-200 hover:text-black dark:hover:text-white ${
                      activeSection === item.id ? "text-black dark:text-white" : "text-gray-600 dark:text-gray-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <Hero onTerminalClick={handleTerminalClick} showNav={showNav} />

      {/* All Sections */}
      <About />
      <Experience />
      <Education />
      <Work />
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto max-w-4xl">
        {portfolioConfig.footer}
        </div>
      </footer>
    </div>
  )
}
