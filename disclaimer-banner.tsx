"use client"

import { useState, useCallback } from "react"
import { X, ExternalLink, Heart, Ghost } from "lucide-react"

export function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true)

  const handleDismiss = useCallback(() => {
    setIsVisible(false)
  }, [])

  if (!isVisible) return null

  return (
    <div className="flex-shrink-0 glass-strong border-b border-border/20 px-3 py-1.5">
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <div 
          className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #63bbd0, #b48cc8)" }}
        >
          <Ghost className="w-3 h-3 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-foreground/70 flex items-center gap-1 flex-wrap">
            <span className="font-semibold text-gradient">reminder</span>
            <Heart className="w-2.5 h-2.5 inline flex-shrink-0" style={{ color: "#e8b4d0" }} />
            <span className="text-foreground/50">
              {"i'm here to listen, not replace professional care"}
            </span>
            <span className="text-muted-foreground/40">|</span>
            <a
              href="https://988lifeline.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium hover:underline"
              style={{ color: "#63bbd0" }}
            >
              988 Lifeline
              <ExternalLink className="w-2 h-2" />
            </a>
          </p>
        </div>
        
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded hover:bg-white/5 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-3 w-3 text-muted-foreground/40 hover:text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
