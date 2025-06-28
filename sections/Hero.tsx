"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Terminal, ChevronDown, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { portfolioConfig } from "@/config/portfolio"

import RayMarching from "@/components/ray-marching"

interface HeroProps {
  onTerminalClick: () => void
  showNav: boolean
}

export default function Hero({ onTerminalClick, showNav }: HeroProps) {
  const [currentWord, setCurrentWord] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % portfolioConfig.hero.words.length)
    }, portfolioConfig.hero.wordChangeInterval)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }


  return (
    <section className="h-svh flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* ASCII Cloud Background
      <div className="absolute inset-0 z-0">
        <AsciiCloud />
      </div> */}

{/*
      <div className="absolute inset-0 z-0">
        <FluidArtExperience/>
      </div>*/}

      {/* Ray Marching Background */}
      <div className="absolute inset-0 z-0">
        <RayMarching/>
      </div>
      {/* Theme Toggle - Show only when nav is hidden */}
      <Button
        onClick={toggleTheme}
        variant="outline"
        size="icon"
        className={`fixed top-6 left-6 z-50 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 ${
          showNav ? "opacity-0 pointer-events-none top-0" : "opacity-100"
        }`}
        disabled={!mounted}
      >
        {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        <span className="sr-only">Toggle theme</span>
      </Button>

      {/* Terminal Button - Show only when nav is hidden */}
      <Button
        onClick={onTerminalClick}
        variant="outline"
        className={`fixed top-6 right-6 z-50 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black font-mono transition-all duration-300 ${
          showNav ? "opacity-0 pointer-events-none top-0" : "opacity-100"
        }`}
      >
        <Terminal className="w-4 h-4 mr-2" />
        Terminal
      </Button>

      <div className="text-center relative z-10">
        <h1 className="text-[12vw] font-black uppercase tracking-widest">
          <span
            key={currentWord}
            className="inline-block animate-fade-in"
            style={{
              animation: "fadeIn 0.5s ease-in-out",
              textShadow: "0 0 64px var(--background)",
            }}
          >
            {portfolioConfig.hero.words[currentWord]}
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 font-light"
        style={{
          textShadow: "0 0 6px var(--background), 0 0 32px var(--background)",
        }}>
          {portfolioConfig.personal.name} • {portfolioConfig.personal.title}
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <ChevronDown className="w-6 h-6 text-gray-400" />
      </div>
    </section>
  )
}
