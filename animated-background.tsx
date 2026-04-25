"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  // Memoize particle positions to prevent recreation on re-render
  const tealParticles = useMemo(() => 
    Array.from({ length: 8 }).map((_, i) => ({
      id: `teal-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 20 + Math.random() * 10,
      delay: Math.random() * 5,
    })), []
  )

  const lavenderParticles = useMemo(() =>
    Array.from({ length: 6 }).map((_, i) => ({
      id: `lavender-${i}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 22 + Math.random() * 10,
      delay: Math.random() * 5,
    })), []
  )

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Main ambient gradient orbs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99, 187, 208, 0.1) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(180, 140, 200, 0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(232, 180, 208, 0.06) 0%, transparent 60%)",
          filter: "blur(50px)",
        }}
      />

      {/* Floating particles - teal */}
      {tealParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0.3 }}
          animate={{
            y: [`${particle.y}%`, `${(particle.y + 30) % 100}%`],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "#63bbd0",
            boxShadow: "0 0 6px rgba(99, 187, 208, 0.4)",
          }}
        />
      ))}

      {/* Floating particles - lavender */}
      {lavenderParticles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0.2 }}
          animate={{
            y: [`${particle.y}%`, `${(particle.y + 25) % 100}%`],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: "#b48cc8",
            boxShadow: "0 0 6px rgba(180, 140, 200, 0.3)",
          }}
        />
      ))}

      {/* Vignette effect */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, rgba(10, 12, 20, 0.5) 100%)",
        }}
      />
    </div>
  )
}
