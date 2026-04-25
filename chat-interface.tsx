"use client"

import { useState, useRef, useEffect, useCallback, useMemo } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport, type UIMessage } from "ai"
import { Send, Sparkles, MessageCircle, Rocket, Heart, Copy, Check, Brain, AlertCircle, Ghost } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

function getMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

const MOODS = [
  { emoji: "😔", label: "sad", value: "sad" },
  { emoji: "😤", label: "mad", value: "angry" },
  { emoji: "😵‍💫", label: "overwhelmed", value: "overwhelmed" },
  { emoji: "😰", label: "anxious", value: "anxious" },
  { emoji: "🤔", label: "confused", value: "confused" },
  { emoji: "🤠", label: "vibing", value: "vibing" },
]

const MOOD_MESSAGES: Record<string, string> = {
  sad: "Hey... I'm feeling really down right now. Could use someone to talk to.",
  angry: "I'm so frustrated with everything. I really need to get this off my chest.",
  overwhelmed: "Everything feels like too much right now. I'm completely overwhelmed.",
  vibing: "Hey! I'm actually feeling pretty good today. Just wanted to chat!",
  anxious: "I've been feeling really anxious lately and can't seem to shake it.",
  confused: "I'm going through something and I'm not sure how I feel about it.",
}

const QUICK_PROMPTS = [
  { icon: MessageCircle, text: "just vent", prompt: "I just need to vent about something. No advice needed, just listen." },
  { icon: Sparkles, text: "relax me", prompt: "I'm stressed. Help me relax with some quick techniques?" },
  { icon: Rocket, text: "hype me", prompt: "I'm lacking motivation. Can you help pump me up?" },
  { icon: Heart, text: "self-care", prompt: "Can you do a quick self-care check-in with me?" },
  { icon: Brain, text: "brain facts", prompt: "Tell me something cool about how the brain works!" },
]

const VIBES = [
  { id: "soft", label: "Soft & Validating", emoji: "🤗", color: "#ec4899", glow: "shadow-pink-500/40" },
  { id: "mentor", label: "The Mentor", emoji: "🧠", color: "#3b82f6", glow: "shadow-blue-500/40" },
  { id: "quirky", label: "Unique & Quirky", emoji: "✨", color: "#eab308", glow: "shadow-yellow-500/40" },
]

export function ChatInterface() {
  const [input, setInput] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [vibe, setVibe] = useState("soft")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const prevMessagesLengthRef = useRef(0)

  // Load vibe from localStorage on mount
  useEffect(() => {
    const savedVibe = localStorage.getItem("kai-vibe")
    if (savedVibe && VIBES.some(v => v.id === savedVibe)) {
      setVibe(savedVibe)
    }
  }, [])

  // Save vibe to localStorage when it changes
  const handleVibeChange = useCallback((newVibe: string) => {
    setVibe(newVibe)
    localStorage.setItem("kai-vibe", newVibe)
  }, [])

  // Memoize transport to prevent infinite loops
  const transport = useMemo(
    () => new DefaultChatTransport({ 
      api: "/api/chat",
      body: { personality: vibe }
    }),
    [vibe]
  )

  const { messages, sendMessage, status, error } = useChat({
    transport,
    onError: (err) => {
      console.error("Chat error:", err)
    },
  })

  const isLoading = status === "streaming" || status === "submitted"

  // Scroll to bottom only when new messages arrive
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
    prevMessagesLengthRef.current = messages.length
  }, [messages.length])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 100)}px`
    }
  }, [input])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    
    try {
      sendMessage({ text: input })
      setInput("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    } catch (err) {
      console.error("Failed to send message:", err)
    }
  }, [input, isLoading, sendMessage])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }, [handleSubmit])

  const handleMoodSelect = useCallback((moodValue: string) => {
    if (isLoading) return
    setSelectedMood(moodValue)
    const message = MOOD_MESSAGES[moodValue]
    if (message) {
      try {
        sendMessage({ text: message })
      } catch (err) {
        console.error("Failed to send mood message:", err)
      }
    }
  }, [isLoading, sendMessage])

  const handleQuickPrompt = useCallback((prompt: string) => {
    if (isLoading) return
    try {
      sendMessage({ text: prompt })
    } catch (err) {
      console.error("Failed to send quick prompt:", err)
    }
  }, [isLoading, sendMessage])

  const handleCopy = useCallback(async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  const hasMessages = messages.length > 0

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 py-3 min-h-0">
        <div className="max-w-2xl mx-auto space-y-3 pb-4">
          {/* Welcome Header - shows when no messages */}
          {!hasMessages && (
            <WelcomeHeader />
          )}

          {/* Vibe Selector - Always visible */}
          <VibeSelector 
            currentVibe={vibe} 
            onVibeChange={handleVibeChange} 
          />

          {/* Mood & Quick Prompts - Always rendered, changes size based on chat state */}
          <MoodAndPrompts
            onMoodSelect={handleMoodSelect}
            onQuickPrompt={handleQuickPrompt}
            isLoading={isLoading}
            isCompact={hasMessages}
          />

          {/* Messages */}
          {messages.map((message, index) => (
            <MessageBubble
              key={message.id}
              id={message.id}
              role={message.role}
              content={getMessageText(message)}
              onCopy={handleCopy}
              isCopied={copiedId === message.id}
              isStreaming={isLoading && message.role === "assistant" && index === messages.length - 1}
            />
          ))}

          {/* Typing Indicator */}
          {isLoading && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
            <TypingIndicator />
          )}

          {/* Error display */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 font-medium text-xs">Something went wrong</p>
                <p className="text-red-400/70 text-[10px] mt-0.5">{error.message || "Check your API key."}</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-border/20 glass-strong px-3 py-2">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative flex items-end gap-2 glass-input rounded-xl border border-border/30 focus-within:border-primary/50 transition-all">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="share what's on your mind..."
              className="flex-1 resize-none bg-transparent px-3 py-2 text-foreground placeholder:text-muted-foreground/50 focus:outline-none min-h-[40px] max-h-[100px] text-sm"
              rows={1}
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
              className="m-1.5 rounded-lg send-btn text-white disabled:opacity-30 border-0 h-8 w-8"
            >
              <Send className="h-3.5 w-3.5" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function WelcomeHeader() {
  return (
    <div className="text-center py-2">
      <div 
        className="w-14 h-14 rounded-2xl mx-auto mb-2 flex items-center justify-center"
        style={{ 
          background: "linear-gradient(135deg, #63bbd0 0%, #b48cc8 100%)",
          boxShadow: "0 8px 24px rgba(99, 187, 208, 0.35)"
        }}
      >
        <Ghost className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-xl font-bold mb-0.5 text-gradient">
        {"hey, i'm kai"}
      </h2>
      <p className="text-[10px] text-muted-foreground">
        your hoodie ghost therapist
      </p>
      <p className="text-[9px] text-muted-foreground/50 italic mt-0.5">
        where brain science meets bad jokes
      </p>
    </div>
  )
}

function VibeSelector({
  currentVibe,
  onVibeChange,
}: {
  currentVibe: string
  onVibeChange: (vibe: string) => void
}) {
  return (
    <div className="flex justify-center mb-3">
      <div className="inline-flex items-center gap-1 p-1 rounded-xl glass-card border border-border/20">
        {VIBES.map((v) => {
          const isActive = currentVibe === v.id
          return (
            <button
              key={v.id}
              onClick={() => onVibeChange(v.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium transition-all",
                isActive
                  ? `text-white shadow-lg ${v.glow}`
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              )}
              style={isActive ? { backgroundColor: v.color } : undefined}
            >
              <span>{v.emoji}</span>
              <span>{v.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function MoodAndPrompts({
  onMoodSelect,
  onQuickPrompt,
  isLoading,
  isCompact,
}: {
  onMoodSelect: (mood: string) => void
  onQuickPrompt: (prompt: string) => void
  isLoading: boolean
  isCompact: boolean
}) {
  return (
    <motion.div 
      layout
      className={cn(
        "transition-all duration-300",
        isCompact 
          ? "glass-card rounded-xl p-2 mb-2 border border-border/20" 
          : "py-2 px-1"
      )}
    >
      {/* Mood picker */}
      <div className={cn(isCompact ? "mb-1.5" : "mb-4")}>
        {!isCompact && (
          <p className="text-center text-[10px] text-muted-foreground mb-2">
            how are you feeling?
          </p>
        )}
        <div className={cn(
          "flex justify-center gap-1.5",
          isCompact ? "gap-1" : "grid grid-cols-6 max-w-sm mx-auto"
        )}>
          {MOODS.map((mood) => (
            <button
              key={mood.value}
              onClick={() => onMoodSelect(mood.value)}
              disabled={isLoading}
              className={cn(
                "mood-card flex items-center justify-center rounded-lg transition-all disabled:opacity-50 hover:scale-105",
                isCompact 
                  ? "p-1.5 flex-row gap-1" 
                  : "flex-col gap-0.5 p-2"
              )}
            >
              <span className={isCompact ? "text-base" : "text-xl"}>{mood.emoji}</span>
              {!isCompact && (
                <span className="text-[8px] text-muted-foreground/70">{mood.label}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Quick prompts */}
      <div>
        {!isCompact && (
          <p className="text-center text-[10px] text-muted-foreground mb-2">
            or try one of these
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-1">
          {QUICK_PROMPTS.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onQuickPrompt(prompt.prompt)}
              disabled={isLoading}
              className={cn(
                "feature-card flex items-center gap-1 rounded-lg transition-all disabled:opacity-50 hover:scale-102",
                isCompact 
                  ? "px-2 py-1 text-[9px]" 
                  : "px-2.5 py-1.5 text-[10px]"
              )}
            >
              <prompt.icon className={cn(isCompact ? "h-2.5 w-2.5" : "h-3 w-3")} style={{ color: "#63bbd0" }} />
              <span className="text-foreground/80">{prompt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function MessageBubble({
  id,
  role,
  content,
  onCopy,
  isCopied,
  isStreaming,
}: {
  id: string
  role: "user" | "assistant" | string
  content: string
  onCopy: (text: string, id: string) => void
  isCopied: boolean
  isStreaming: boolean
}) {
  const isUser = role === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-2 group", isUser ? "justify-end" : "justify-start")}
    >
      {!isUser && (
        <div 
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
          style={{ 
            background: "linear-gradient(135deg, #63bbd0 0%, #b48cc8 100%)",
          }}
        >
          <Ghost className="w-4 h-4 text-white" />
        </div>
      )}
      <div className="flex flex-col gap-0.5 max-w-[80%]">
        <div
          className={cn(
            "rounded-2xl px-3 py-2 leading-relaxed text-sm relative overflow-hidden",
            isUser
              ? "user-bubble text-white rounded-br-sm"
              : "assistant-bubble text-foreground rounded-bl-sm"
          )}
        >
          {!isUser && isStreaming && (
            <div className="absolute inset-0 shimmer" />
          )}
          <p className="whitespace-pre-wrap relative z-10">{content}</p>
        </div>
        
        {!isUser && content && !isStreaming && (
          <button
            onClick={() => onCopy(content, id)}
            className="self-start flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] text-muted-foreground/40 hover:text-muted-foreground hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
          >
            {isCopied ? (
              <>
                <Check className="w-2.5 h-2.5" style={{ color: "#63bbd0" }} />
                <span>copied</span>
              </>
            ) : (
              <>
                <Copy className="w-2.5 h-2.5" />
                <span>copy</span>
              </>
            )}
          </button>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-7 h-7 rounded-lg user-bubble flex items-center justify-center text-white text-[10px] font-bold mt-0.5">
          U
        </div>
      )}
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex gap-2 justify-start"
    >
      <div 
        className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ 
          background: "linear-gradient(135deg, #63bbd0 0%, #b48cc8 100%)",
        }}
      >
        <Ghost className="w-4 h-4 text-white" />
      </div>
      <div className="assistant-bubble rounded-2xl rounded-bl-sm px-3 py-2">
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ 
                  y: [0, -3, 0],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{ 
                  duration: 0.5, 
                  repeat: Infinity, 
                  delay: i * 0.1,
                }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ 
                  background: "linear-gradient(135deg, #63bbd0, #b48cc8)",
                }}
              />
            ))}
          </div>
          <span className="text-[9px] text-muted-foreground/50 ml-1">typing...</span>
        </div>
      </div>
    </motion.div>
  )
}
