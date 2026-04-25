"use client"

import { motion } from "framer-motion"

export type PersonalityMode = "soft" | "tough" | "chaotic"

interface PersonalitySliderProps {
  mode: PersonalityMode
  onChange: (mode: PersonalityMode) => void
}

const MODES = [
  { 
    id: "soft" as const, 
    label: "soft & validating", 
    emoji: "🫂",
    description: "gentle, understanding vibes",
    color: "#e8b4d0"
  },
  { 
    id: "tough" as const, 
    label: "tough-love sib", 
    emoji: "💪",
    description: "real talk, with love",
    color: "#63bbd0"
  },
  { 
    id: "chaotic" as const, 
    label: "chaotic but kind", 
    emoji: "✨",
    description: "unhinged support",
    color: "#b48cc8"
  },
]

export function PersonalitySlider({ mode, onChange }: PersonalitySliderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-muted-foreground">kai&apos;s vibe</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <motion.button
            key={m.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(m.id)}
            className={`
              relative p-3 rounded-xl text-center transition-all
              ${mode === m.id 
                ? "glass-card" 
                : "mood-card hover:border-border/30"
              }
            `}
            style={{
              borderColor: mode === m.id ? `${m.color}50` : undefined,
              boxShadow: mode === m.id ? `0 0 20px ${m.color}20` : undefined,
            }}
          >
            {mode === m.id && (
              <motion.div
                layoutId="personality-indicator"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${m.color}10, ${m.color}05)`,
                  border: `1px solid ${m.color}30`,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            <div className="relative z-10">
              <span className="text-xl block mb-1">{m.emoji}</span>
              <span 
                className="text-[10px] font-medium block"
                style={{ color: mode === m.id ? m.color : "rgba(255,255,255,0.6)" }}
              >
                {m.label}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
