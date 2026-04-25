"use client"

import { motion } from "framer-motion"
import { HoodieGhost } from "./hoodie-ghost"

export function KaiLogo({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <motion.div
      className="relative flex items-center gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Hoodie Ghost Mascot as logo */}
      <HoodieGhost size="md" mood="happy" />

      {/* Text branding */}
      <div className="flex flex-col">
        <motion.div 
          className="flex items-center gap-0.5"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {"kai".split("").map((letter, i) => (
            <motion.span
              key={i}
              className="text-2xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #63bbd0 0%, #8ba5c7 50%, #b48cc8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
              initial={{ opacity: 0, y: -20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: 0.4 + i * 0.08,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.15 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {showTagline && (
          <motion.p
            className="text-[9px] max-w-[140px] leading-tight hidden sm:block"
            style={{ color: "rgba(180, 140, 200, 0.7)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            where brain science meets bad jokes and good advice
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}
