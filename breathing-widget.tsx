"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Wind, X } from "lucide-react"

const BREATH_PHASES = [
  { name: "breathe in", duration: 4000 },
  { name: "hold", duration: 4000 },
  { name: "breathe out", duration: 4000 },
  { name: "hold", duration: 2000 },
]

export function BreathingWidget() {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [cycles, setCycles] = useState(0)

  useEffect(() => {
    if (!isActive) return

    const timer = setTimeout(() => {
      const nextPhase = (phase + 1) % BREATH_PHASES.length
      setPhase(nextPhase)
      if (nextPhase === 0) {
        setCycles(c => c + 1)
      }
    }, BREATH_PHASES[phase].duration)

    return () => clearTimeout(timer)
  }, [isActive, phase])

  const handleClose = useCallback(() => {
    setIsExpanded(false)
    setIsActive(false)
    setPhase(0)
    setCycles(0)
  }, [])

  const handleOpen = useCallback(() => {
    setIsExpanded(true)
  }, [])

  const toggleActive = useCallback(() => {
    if (!isActive) {
      setIsActive(true)
      setPhase(0)
      setCycles(0)
    } else {
      setIsActive(false)
      setPhase(0)
    }
  }, [isActive])

  const currentPhase = BREATH_PHASES[phase]
  const isBreathingIn = phase === 0
  const isBreathingOut = phase === 2

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-16 right-3 z-40 w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:scale-105 transition-transform"
      >
        <Wind className="h-4 w-4" style={{ color: "#63bbd0" }} />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: "rgba(10, 12, 20, 0.95)", backdropFilter: "blur(20px)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative glass-card rounded-2xl p-6 w-[85vw] max-w-xs"
            >
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1.5 rounded-full hover:bg-white/5"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="text-center">
                <h3 className="text-lg font-bold text-gradient mb-1">take a breather</h3>
                <p className="text-[10px] text-muted-foreground mb-4">
                  {isActive ? `cycle ${cycles + 1}` : "a quick reset"}
                </p>

                {/* Breathing circle */}
                <div className="relative w-36 h-36 mx-auto mb-4">
                  <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(99, 187, 208, 0.15)" }} />
                  
                  <motion.div
                    animate={isActive ? { scale: isBreathingIn ? 1 : isBreathingOut ? 0.55 : undefined } : { scale: 0.75 }}
                    transition={{ duration: currentPhase.duration / 1000, ease: "easeInOut" }}
                    className="absolute inset-4 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #63bbd0 0%, #b48cc8 100%)",
                      boxShadow: isActive ? "0 0 40px rgba(99, 187, 208, 0.4)" : "0 0 20px rgba(99, 187, 208, 0.2)",
                    }}
                  >
                    <span className="text-white font-semibold text-sm">
                      {isActive ? currentPhase.name : "ready?"}
                    </span>
                  </motion.div>

                  {isActive && (
                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke="url(#breathGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: currentPhase.duration / 1000, ease: "linear" }}
                        key={phase}
                      />
                      <defs>
                        <linearGradient id="breathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#63bbd0" />
                          <stop offset="100%" stopColor="#b48cc8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  )}
                </div>

                <button
                  onClick={toggleActive}
                  className="gradient-btn text-white font-medium px-6 py-2 rounded-full text-sm"
                >
                  {isActive ? "pause" : "start"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
