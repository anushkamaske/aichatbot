"use client"

import { motion } from "framer-motion"

interface KaiAvatarProps {
  size?: "sm" | "md" | "lg"
  isTyping?: boolean
  className?: string
}

export function KaiAvatar({ size = "md", isTyping = false, className = "" }: KaiAvatarProps) {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-14 h-14",
    lg: "w-24 h-24",
  }

  const innerSize = {
    sm: "inset-1",
    md: "inset-1.5",
    lg: "inset-2",
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`relative ${sizeClasses[size]} ${className}`}
    >
      {/* Outer glow */}
      <motion.div
        animate={
          isTyping
            ? {
                boxShadow: [
                  "0 0 15px rgba(99, 187, 208, 0.3), 0 0 30px rgba(180, 140, 200, 0.15)",
                  "0 0 25px rgba(99, 187, 208, 0.5), 0 0 50px rgba(180, 140, 200, 0.25)",
                  "0 0 15px rgba(99, 187, 208, 0.3), 0 0 30px rgba(180, 140, 200, 0.15)",
                ],
              }
            : {
                boxShadow: "0 0 20px rgba(99, 187, 208, 0.2), 0 0 40px rgba(180, 140, 200, 0.1)",
              }
        }
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 rounded-2xl"
      />

      {/* Border gradient ring */}
      <div 
        className="absolute inset-0 rounded-2xl p-[2px]"
        style={{
          background: "linear-gradient(135deg, #63bbd0, #8ba5c7, #b48cc8)",
        }}
      >
        <div className="w-full h-full rounded-[14px] bg-background" />
      </div>

      {/* Inner gradient background */}
      <motion.div
        className={`absolute ${innerSize[size]} rounded-xl overflow-hidden`}
        animate={{
          background: [
            "linear-gradient(135deg, #63bbd0 0%, #5aa8bd 100%)",
            "linear-gradient(135deg, #7eb8cb 0%, #b48cc8 100%)",
            "linear-gradient(135deg, #63bbd0 0%, #5aa8bd 100%)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Chat bubble with brain/heart icon */}
        <svg viewBox="0 0 40 40" className="w-full h-full p-1.5">
          {/* Chat bubble */}
          <motion.path
            d="M8 10 C8 6 12 4 20 4 C28 4 32 6 32 10 L32 24 C32 28 28 30 20 30 L14 30 L10 34 L11 30 C8 30 8 28 8 24 Z"
            fill="rgba(255,255,255,0.15)"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Simplified brain curves */}
          <motion.path
            d="M14 14 C12 14 11 16 12 18 C11 19 12 21 14 21"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            animate={isTyping ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.path
            d="M26 14 C28 14 29 16 28 18 C29 19 28 21 26 21"
            fill="none"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
            animate={isTyping ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
          
          {/* Center connection */}
          <motion.path
            d="M16 16 C18 15 22 15 24 16"
            fill="none"
            stroke="white"
            strokeWidth="1"
            strokeLinecap="round"
            animate={isTyping ? { opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
          
          {/* Small heart */}
          <motion.path
            d="M18 22 C19 21 20 21 20.5 22 C21 21 22 21 23 22 C24 24 20.5 26 20.5 26 C20.5 26 17 24 18 22 Z"
            fill="white"
            animate={
              isTyping 
                ? { scale: [1, 1.1, 1], opacity: [0.9, 1, 0.9] } 
                : { scale: [1, 1.08, 1] }
            }
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ transformOrigin: "20.5px 23.5px" }}
          />
        </svg>
      </motion.div>

      {/* Typing sparkles */}
      {isTyping && (
        <>
          <motion.div
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
              x: [0, -8],
              y: [0, -12],
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
            className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
            style={{ background: "#63bbd0", boxShadow: "0 0 8px #63bbd0" }}
          />
          <motion.div
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: [0, 6],
              y: [0, -8],
            }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
            className="absolute top-0 right-1 w-1.5 h-1.5 rounded-full"
            style={{ background: "#b48cc8", boxShadow: "0 0 6px #b48cc8" }}
          />
          <motion.div
            animate={{
              scale: [0, 0.8, 0],
              opacity: [0, 1, 0],
            }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
            className="absolute -top-2 right-2 w-1 h-1 rounded-full"
            style={{ background: "#e8b4d0", boxShadow: "0 0 4px #e8b4d0" }}
          />
        </>
      )}
    </motion.div>
  )
}
