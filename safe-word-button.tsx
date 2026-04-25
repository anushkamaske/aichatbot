"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Hand, X, Leaf, Music, Image, Gamepad2, Coffee } from "lucide-react"
import { Button } from "@/components/ui/button"

const LIGHTER_TOPICS = [
  { icon: Leaf, label: "ground me", action: "let's do a quick grounding exercise" },
  { icon: Music, label: "comfort songs", action: "recommend me some comfort songs" },
  { icon: Image, label: "cute animals", action: "show me something wholesome" },
  { icon: Gamepad2, label: "brain break", action: "let's play a simple word game" },
  { icon: Coffee, label: "random chat", action: "tell me a random fun fact" },
]

interface SafeWordButtonProps {
  onTopicChange: (prompt: string) => void
}

export function SafeWordButton({ onTopicChange }: SafeWordButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (action: string) => {
    onTopicChange(action)
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating safe word button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs text-muted-foreground hover:text-foreground transition-all"
        style={{ 
          border: "1px solid rgba(232, 180, 208, 0.2)",
          boxShadow: "0 0 15px rgba(232, 180, 208, 0.1)"
        }}
      >
        <Hand className="w-3.5 h-3.5" style={{ color: "#e8b4d0" }} />
        <span>too much, change topic</span>
      </motion.button>

      {/* Topic selector modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10, 12, 20, 0.9)", backdropFilter: "blur(16px)" }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="glass-card rounded-3xl p-6 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">need a breather?</h3>
                  <p className="text-xs text-muted-foreground">totally valid, pick something lighter</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full hover:bg-white/5"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {LIGHTER_TOPICS.map((topic, i) => (
                  <motion.button
                    key={topic.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(topic.action)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl mood-card text-left transition-all hover:border-primary/30"
                  >
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: "linear-gradient(135deg, rgba(99, 187, 208, 0.2), rgba(180, 140, 200, 0.2))"
                      }}
                    >
                      <topic.icon className="w-5 h-5" style={{ color: "#63bbd0" }} />
                    </div>
                    <span className="text-sm text-foreground/80">{topic.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
