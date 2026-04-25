"use client"

import { Ghost, Sparkles, Zap } from "lucide-react"

export function ChatHeader() {
  return (
    <header className="flex-shrink-0 border-b border-border/20 glass-strong px-3 py-2">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo Section - Ghost icon + Kai text */}
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ 
              background: "linear-gradient(135deg, #63bbd0 0%, #b48cc8 100%)",
              boxShadow: "0 4px 12px rgba(99, 187, 208, 0.3)"
            }}
          >
            <Ghost className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span 
              className="text-lg font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg, #63bbd0 0%, #8ba5c7 50%, #b48cc8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              kai
            </span>
            <span className="text-[8px] text-muted-foreground/60 -mt-0.5 hidden sm:block">
              brain science + bad jokes
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* AI Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full glass border border-border/30">
            <Zap className="w-3 h-3" style={{ color: "#b48cc8" }} />
            <span className="text-[9px] uppercase tracking-wider text-muted-foreground">ai</span>
          </div>

          {/* Online Status */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full glass-card">
            <span className="relative flex h-2 w-2">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: "#63bbd0" }}
              />
              <span 
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ 
                  background: "linear-gradient(135deg, #63bbd0, #7ec8d8)",
                  boxShadow: "0 0 6px rgba(99, 187, 208, 0.6)"
                }}
              />
            </span>
            <span className="text-[10px] font-medium text-gradient">online</span>
          </div>
        </div>
      </div>
    </header>
  )
}
