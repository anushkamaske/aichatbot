"use client"

import { motion } from "framer-motion"

interface HoodieGhostProps {
  size?: "sm" | "md" | "lg"
  isTyping?: boolean
  mood?: "happy" | "thinking" | "excited" | "chill"
  className?: string
}

export function HoodieGhost({ 
  size = "md", 
  isTyping = false, 
  mood = "happy",
  className = "" 
}: HoodieGhostProps) {
  const sizeMap = {
    sm: 40,
    md: 56,
    lg: 80,
  }

  const s = sizeMap[size]

  const getMouthPath = () => {
    switch (mood) {
      case "thinking":
        return "M18 28 Q22 26 26 28"
      case "excited":
        return "M16 27 Q22 32 28 27"
      case "chill":
        return "M17 28 L27 28"
      default:
        return "M17 27 Q22 31 27 27"
    }
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`relative ${className}`}
      style={{ width: s, height: s }}
    >
      {/* Outer glow */}
      <motion.div
        animate={
          isTyping
            ? {
                boxShadow: [
                  "0 0 20px rgba(99, 187, 208, 0.3), 0 0 40px rgba(180, 140, 200, 0.2)",
                  "0 0 35px rgba(99, 187, 208, 0.5), 0 0 60px rgba(180, 140, 200, 0.3)",
                  "0 0 20px rgba(99, 187, 208, 0.3), 0 0 40px rgba(180, 140, 200, 0.2)",
                ],
              }
            : {}
        }
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl"
      />

      <svg viewBox="0 0 44 44" className="w-full h-full" style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))" }}>
        <defs>
          <linearGradient id="ghostBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#b48cc8" />
            <stop offset="50%" stopColor="#9f7ab8" />
            <stop offset="100%" stopColor="#8a6aa8" />
          </linearGradient>
          <linearGradient id="hoodieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#63bbd0" />
            <stop offset="100%" stopColor="#4d9aad" />
          </linearGradient>
          <linearGradient id="speechBubble" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8b4d0" />
            <stop offset="100%" stopColor="#d4a5c9" />
          </linearGradient>
          <filter id="ghostGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Ghost body - rounded with wavy bottom */}
        <motion.path
          d="M10 18 
             C10 8 18 4 22 4 
             C26 4 34 8 34 18 
             L34 32 
             C34 34 32 36 30 34 
             C28 32 26 34 24 36 
             C22 38 20 36 18 34 
             C16 32 14 34 12 36 
             C10 38 10 36 10 34 
             Z"
          fill="url(#ghostBody)"
          stroke="rgba(30, 20, 40, 0.5)"
          strokeWidth="1"
          filter="url(#ghostGlow)"
          animate={
            isTyping
              ? { y: [0, -2, 0] }
              : { y: [0, -3, 0] }
          }
          transition={{ 
            duration: isTyping ? 0.8 : 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Hoodie */}
        <motion.path
          d="M12 12 
             C12 8 16 6 22 6 
             C28 6 32 8 32 12 
             L32 16 
             C32 18 28 20 22 20 
             C16 20 12 18 12 16 
             Z"
          fill="url(#hoodieGradient)"
          stroke="rgba(20, 30, 40, 0.4)"
          strokeWidth="1"
          animate={
            isTyping
              ? { y: [0, -2, 0] }
              : { y: [0, -3, 0] }
          }
          transition={{ 
            duration: isTyping ? 0.8 : 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />

        {/* Hood edge highlight */}
        <motion.path
          d="M14 15 C14 17 18 19 22 19 C26 19 30 17 30 15"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          strokeLinecap="round"
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Eyes */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Left eye */}
          <motion.ellipse
            cx="17"
            cy="23"
            rx="2.5"
            ry={isTyping ? "1.5" : "2.5"}
            fill="#1a1525"
            animate={
              isTyping
                ? { ry: [2.5, 1, 2.5] }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity }}
          />
          <circle cx="16" cy="22" r="0.8" fill="white" opacity="0.8" />

          {/* Right eye */}
          <motion.ellipse
            cx="27"
            cy="23"
            rx="2.5"
            ry={isTyping ? "1.5" : "2.5"}
            fill="#1a1525"
            animate={
              isTyping
                ? { ry: [2.5, 1, 2.5] }
                : {}
            }
            transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
          />
          <circle cx="26" cy="22" r="0.8" fill="white" opacity="0.8" />

          {/* Mouth */}
          <motion.path
            d={getMouthPath()}
            fill="none"
            stroke="#1a1525"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.g>

        {/* Blush marks */}
        <motion.g
          animate={{ y: [0, -3, 0], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ellipse cx="13" cy="25" rx="2" ry="1" fill="#e8b4d0" opacity="0.5" />
          <ellipse cx="31" cy="25" rx="2" ry="1" fill="#e8b4d0" opacity="0.5" />
        </motion.g>

        {/* Speech bubble */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <path
            d="M34 8 C34 5 37 4 39 4 C41 4 42 6 42 8 C42 10 41 12 39 12 L36 12 L35 14 L35 12 C34 12 34 10 34 8 Z"
            fill="url(#speechBubble)"
            stroke="rgba(30, 20, 40, 0.3)"
            strokeWidth="0.5"
          />
          {/* Dots in speech bubble */}
          <motion.g
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <circle cx="37" cy="8" r="0.8" fill="#1a1525" />
            <circle cx="39" cy="8" r="0.8" fill="#1a1525" />
            <circle cx="41" cy="8" r="0.8" fill="#1a1525" />
          </motion.g>
        </motion.g>
      </svg>

      {/* Sparkles when typing */}
      {isTyping && (
        <>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0],
                y: [-5, -15],
                x: [0, (i - 1) * 8],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
              className="absolute -top-1 right-0 w-1.5 h-1.5 rounded-full"
              style={{ 
                background: i === 0 ? "#63bbd0" : i === 1 ? "#b48cc8" : "#e8b4d0",
                boxShadow: `0 0 6px ${i === 0 ? "#63bbd0" : i === 1 ? "#b48cc8" : "#e8b4d0"}`
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}
