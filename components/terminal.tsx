"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { portfolioConfig } from "@/config/portfolio"

interface TerminalProps {
  onExit: () => void
}

export default function Terminal({ onExit }: TerminalProps) {
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ text: string; type: "normal" | "success" | "error" | "info" | "command" }>
  >([
    { text: `Welcome to ${portfolioConfig.personal.name}'s Terminal Portfolio`, type: "info" },
    { text: 'Type "help" for available commands or use Tab for autocomplete', type: "info" },
    { text: "", type: "normal" },
  ])
  const [currentCommand, setCurrentCommand] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const availableCommands = [
    "help",
    "about",
    "experience",
    "education",
    "projects",
    "contact",
    "clear",
    "exit",
    "whoami",
    "pwd",
    "ls",
    "date",
    "uptime",
    "history",
  ]

  // Add autocomplete functionality
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCurrentCommand(value)

    if (value.trim()) {
      const matches = availableCommands.filter((cmd) => cmd.toLowerCase().startsWith(value.toLowerCase()))
      setSuggestions(matches)
      setShowSuggestions(matches.length > 0 && matches[0] !== value)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault()
      if (suggestions.length === 1) {
        setCurrentCommand(suggestions[0])
        setShowSuggestions(false)
      } else if (suggestions.length > 1) {
        // Show all suggestions
        const newHistory = [...terminalHistory]
        newHistory.push({ text: `${portfolioConfig.terminal.whoami}@portfolio:~$ ${currentCommand}`, type: "command" })
        newHistory.push({ text: suggestions.join("  "), type: "info" })
        newHistory.push({ text: "", type: "normal" })
        setTerminalHistory(newHistory)
        setCurrentCommand("")
        setShowSuggestions(false)
      }
      return
    }

    if (e.key === "Enter") {
      handleCommand()
    }
  }

  const handleCommand = () => {
    const command = currentCommand.trim().toLowerCase()
    const newHistory = [...terminalHistory]
    newHistory.push({ text: `${currentCommand}`, type: "command" })

    switch (command) {
      case "help":
        newHistory.push({ text: "Available commands:", type: "normal" })
        newHistory.push({ text: "  about     - Learn about me", type: "normal" })
        newHistory.push({ text: "  experience - View my work experience", type: "normal" })
        newHistory.push({ text: "  education - View my educational background", type: "normal" })
        newHistory.push({ text: "  projects  - See my recent projects", type: "normal" })
        newHistory.push({ text: "  contact   - Get my contact information", type: "normal" })
        newHistory.push({ text: "  whoami    - Display current user", type: "normal" })
        newHistory.push({ text: "  pwd       - Print working directory", type: "normal" })
        newHistory.push({ text: "  ls        - List directory contents", type: "normal" })
        newHistory.push({ text: "  date      - Display current date", type: "normal" })
        newHistory.push({ text: "  uptime    - Show system uptime", type: "normal" })
        newHistory.push({ text: "  history   - Show command history", type: "normal" })
        newHistory.push({ text: "  clear     - Clear terminal", type: "normal" })
        newHistory.push({ text: "  exit      - Return to portfolio", type: "normal" })
        break
      case "about":
        newHistory.push({
          text: (portfolioConfig.about.description.concat(
            ["Some technical skills:"].concat( 
              portfolioConfig.about.skills.map((skill) => `• ${skill}`)).join("\n")
            )
          ).join("\n\n"),
          type: "info",
        })        
        break
      case "experience":
        portfolioConfig.experience.forEach((job, index) => {
          newHistory.push({
            text: `# ${job.position} at ${job.company} (${job.years})`,
            type: "info",
          })
          newHistory.push({ text: `${job.location}`, type: "info" })
          newHistory.push({ text: `${job.description}`, type: "info" })
          if (index < portfolioConfig.experience.length - 1) {
            newHistory.push({ text: "\n", type: "info" })
          }
        })
        break
      case "education":
        portfolioConfig.education.forEach((edu, index) => {
          newHistory.push({
            text: `# ${edu.degree} - ${edu.school} (${edu.years})`,
            type: "info",
          })
          newHistory.push({ text: `${edu.location}`, type: "info" })
          newHistory.push({ text: `${edu.description.join("\n")}`, type: "info" })
          if (index < portfolioConfig.education.length - 1) {
            newHistory.push({ text: "\n", type: "info" })
          }
        })
        break
      case "projects":
        newHistory.push({ text: "# Featured Projects:", type: "info" })
        newHistory.push({ text: "\n", type: "info" })
        portfolioConfig.projects.forEach((project, index) => {
          newHistory.push({
            text: `## ${index + 1}. ${project.title} (${project.year})`,
            type: "info",
          })
          newHistory.push({ text: `${project.description}`, type: "info" })
          newHistory.push({ text: `Technologies: ${project.tech.join(", ")}`, type: "info" })
          if(project.github){
            newHistory.push({ text: `GitHub: ${project.github}`, type: "info" })
          }
          if(project.read){
            newHistory.push({ text: `Read: ${project.read}`, type: "info" })
          }
          if(project.youtube){
            newHistory.push({ text: `Watch video: ${project.youtube}`, type: "info" })
          }
          if(project.live){
            newHistory.push({ text: `Live Demo: ${project.live}`, type: "info" })
          }
          if (index < portfolioConfig.projects.length - 1) {
            newHistory.push({ text: "\n", type: "info" })
          }
        })
        break
      case "contact":
        newHistory.push({ text: portfolioConfig.contact.description, type: "info" })
        newHistory.push({ text: "\n", type: "info" })
        newHistory.push({ text: `• Email: ${portfolioConfig.personal.email}`, type: "info" })
        newHistory.push({ text: `• GitHub: ${portfolioConfig.personal.github}`, type: "info" })
        newHistory.push({ text: `• LinkedIn: ${portfolioConfig.personal.linkedin}`, type: "info" })
        break
      case "whoami":
        newHistory.push({ text: portfolioConfig.terminal.whoami, type: "info" })
        break
      case "pwd":
        newHistory.push({
          text: `/home/${portfolioConfig.terminal.whoami}/portfolio`,
          type: "info",
        })
        break
      case "ls":
        newHistory.push({ text: "about.txt  projects/  skills.md  contact.info  README.md", type: "info" })
        break
      case "date":
        newHistory.push({ text: new Date().toString(), type: "info" })
        break
      case "uptime":
        newHistory.push({ text: "Portfolio has been running for: Always online! 🚀", type: "success" })
        break
      case "history":
        const commands = terminalHistory
          .filter((entry) => entry.type === "command")
          .map((entry, index) => `${index + 1}  ${entry.text.replace(`${portfolioConfig.terminal.whoami}@portfolio:~$ `, "")}`)
        commands.forEach((cmd) => newHistory.push({ text: cmd, type: "info" }))
        break
      case "clear":
        setTerminalHistory([{ text: "", type: "normal" }])
        setCurrentCommand("")
        setShowSuggestions(false)
        return
      case "exit":
        onExit()
        setCurrentCommand("")
        setShowSuggestions(false)
        return
      case "":
        break
      default:
        newHistory.push({ text: `bash: ${command}: command not found`, type: "error" })
        newHistory.push({ text: "Type 'help' for available commands.", type: "info" })
    }

    newHistory.push({ text: "", type: "normal" })
    setTerminalHistory(newHistory)
    setCurrentCommand("")
    setShowSuggestions(false)

    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 10)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <div className="h-dvh bg-black text-white font-mono p-4 overflow-hidden animate-tv-on">
      <div
        ref={terminalRef}
        className="h-dvh overflow-y-auto scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-gray-800"
      >
        <div className="mb-4">
          {terminalHistory.map((entry, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {entry.type === "command" ? (
                <div className="flex">
                  <span className="text-green-400">{portfolioConfig.terminal.whoami}</span>
                  <span className="text-white">@</span>
                  <span className="text-blue-400">portfolio</span>
                  <span className="text-white">:</span>
                  <span className="text-purple-400">~</span>
                  <span className="text-white">$ </span>
                  <span className="text-yellow-300">
                    {entry.text.replace(
                      `${portfolioConfig.terminal.whoami}@portfolio:~$ `,
                      "",
                    )}
                  </span>
                </div>
              ) : (
                <span
                  className={
                    entry.type === "success"
                      ? "text-green-400"
                      : entry.type === "error"
                        ? "text-red-400"
                        : entry.type === "info"
                          ? "text-cyan-400"
                          : "text-gray-300"
                  }
                >
                  {entry.text}
                </span>
              )}
            </div>
          ))}

          <div className="flex items-center relative">
            <span className="text-green-400">{portfolioConfig.terminal.whoami}</span>
            <span className="text-white">@</span>
            <span className="text-blue-400">portfolio</span>
            <span className="text-white">:</span>
            <span className="text-purple-400">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={currentCommand}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-yellow-300 flex-1 ml-1"
              autoComplete="off"
              spellCheck="false"
            />
            <span className="animate-pulse text-white">█</span>
          </div>

          {/* Autocomplete suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="mt-2 ml-6">
              <div className="text-gray-500 text-sm">
                Suggestions:{" "}
                {suggestions.map((suggestion, index) => (
                  <span key={suggestion} className="text-cyan-300">
                    {suggestion}
                    {index < suggestions.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              <div className="text-gray-500 text-xs mt-1">Press Tab to autocomplete</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
