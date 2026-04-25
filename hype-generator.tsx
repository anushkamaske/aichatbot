"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Rocket, X, Sparkles, RefreshCw, Ghost } from "lucide-react"

const HYPE_SPEECHES = [
  { text: "Listen up bestie - you are literally built different. Whatever you're facing? You've survived 100% of your worst days. That's YOU being unstoppable.", emoji: "🔥" },
  { text: "Real talk - do you realize how hard you've been working? Most people would've given up but here you are, still showing up. That's EVERYTHING.", emoji: "💪" },
  { text: "Hey, you're not falling behind - you're on your own timeline. Stop comparing your chapter 3 to someone else's chapter 20.", emoji: "⭐" },
  { text: "EXCUSE ME but did anyone give you permission to doubt yourself today? No? Then stop. You've got more potential than you know.", emoji: "👑" },
  { text: "Quick reminder: you make the world more interesting just by existing. Whatever's got you down is temporary, but your impact? Permanent.", emoji: "✨" },
]

export function HypeGenerator() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentHype, setCurrentHype] = useState(0)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [])

  const getNewHype = useCallback(() => {
    setCurrentHype((prev) => (prev + 1) % HYPE_SPEECHES.length)
  }, [])

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={openModal}
        className="fixed bottom-16 left-3 z-40 w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:scale-105 transition-transform"
        style={{ boxShadow: "0 0 12px rgba(232, 180, 208, 0.2)" }}
      >
        <Rocket className="h-4 w-4" style={{ color: "#e8b4d0" }} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(10, 12, 20, 0.95)", backdropFilter: "blur(20px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative glass-card rounded-2xl p-5 w-full max-w-xs"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/5"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="text-center">
                <div 
                  className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #63bbd0, #b48cc8)" }}
                >
                  <Ghost className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-lg font-bold mb-1">
                  <span className="text-gradient">hype time</span>{" "}
                  <span className="text-xl">{HYPE_SPEECHES[currentHype].emoji}</span>
                </h3>
                
                <p className="text-[9px] text-muted-foreground mb-3">
                  your pep talk from kai
                </p>

                <div className="feature-card rounded-xl p-3 mb-3">
                  <p className="text-foreground/90 leading-relaxed text-[11px]">
                    {HYPE_SPEECHES[currentHype].text}
                  </p>
                </div>

                <div className="flex justify-center gap-2">
                  <button
                    onClick={getNewHype}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full mood-card text-[10px] text-muted-foreground hover:text-foreground"
                  >
                    <RefreshCw className="w-3 h-3" />
                    another
                  </button>
                  
                  <button
                    onClick={closeModal}
                    className="flex items-center gap-1.5 gradient-btn text-white font-medium px-3 py-1.5 rounded-full text-[10px]"
                  >
                    <Sparkles className="w-3 h-3" />
                    {"i'm hyped!"}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
