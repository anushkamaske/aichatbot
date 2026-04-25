"use client"

import { useState, useCallback } from "react"
import { 
  ChevronLeft,
  ChevronRight,
  Brain,
  Sparkles,
  Lightbulb,
  Zap,
  Music,
  Gamepad2,
  Wind,
  Heart
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const PSYCH_FACTS = [
  "Your brain uses 20% of your total energy - no wonder thinking is tiring!",
  "The brain can't tell the difference between real and imagined scenarios. Visualization actually works!",
  "Deep breathing activates your vagus nerve and literally tells your brain to chill.",
  "Your brain produces enough electricity to power a small lightbulb. You're electric!",
  "Anxiety temporarily shrinks your prefrontal cortex - that's why decisions feel harder when stressed.",
  "The placebo effect works even when you know it's a placebo. Mind over matter is real.",
  "Your brain rewires itself every time you learn something. Neuroplasticity is wild.",
  "Mirror neurons make you literally feel what others feel. Empathy is built into your hardware.",
  "Dopamine isn't about pleasure - it's about anticipation. The craving is the reward.",
  "Your gut has 100 million neurons. 'Gut feeling' is real neuroscience.",
  "Sleep deprivation mimics being legally drunk. Your brain needs rest to function.",
  "Stress hormones can literally rewrite your memories. Perception shapes reality.",
]

const CHAOS_FACTS = [
  "A butterfly flapping its wings can theoretically cause a tornado weeks later. Small actions matter.",
  "Your heartbeat follows chaotic patterns - perfect regularity would actually be unhealthy.",
  "The same initial conditions can lead to wildly different outcomes. That's not randomness, that's chaos.",
  "Fractals appear everywhere: coastlines, broccoli, your lungs. Nature loves self-similarity.",
  "Weather predictions fail after ~10 days because chaos multiplies tiny errors exponentially.",
  "Your brain operates at the 'edge of chaos' - the sweet spot between order and randomness.",
]

const AFFIRMATIONS = [
  "Your feelings are valid data, not just noise.",
  "Progress isn't linear - and that's mathematically normal.",
  "Small perturbations can lead to big changes. Keep going.",
  "Chaos isn't bad - it's where creativity lives.",
  "Your brain is literally rewiring itself right now. Growth is happening.",
]

const BRAIN_HACKS = [
  { title: "Box Breathing", desc: "4 sec in, 4 hold, 4 out, 4 hold. Repeat 4x.", icon: Wind },
  { title: "5-4-3-2-1 Grounding", desc: "5 things you see, 4 hear, 3 touch, 2 smell, 1 taste.", icon: Heart },
  { title: "Cold Water Splash", desc: "Splash cold water on face - activates dive reflex, slows heart.", icon: Zap },
  { title: "Bilateral Tapping", desc: "Tap alternate knees 20x. Calms the amygdala.", icon: Brain },
]

const CHILL_SONGS = [
  { title: "Weightless", artist: "Marconi Union", note: "Scientifically proven to reduce anxiety by 65%" },
  { title: "Electra", artist: "Airstream", note: "Lo-fi beats for focus" },
  { title: "Strawberry Swing", artist: "Coldplay", note: "Nostalgic calm vibes" },
  { title: "Sunset Lover", artist: "Petit Biscuit", note: "Chill electronic escape" },
  { title: "Re: Stacks", artist: "Bon Iver", note: "For when you need to feel feelings" },
]

const MINI_GAMES = [
  { title: "Color Breathe", desc: "Imagine breathing in blue calm, breathing out red stress." },
  { title: "Body Scan Race", desc: "Notice 10 body sensations in 60 seconds. Go!" },
  { title: "Gratitude Speed Run", desc: "Name 5 things you're grateful for in 10 seconds." },
  { title: "Opposite Action", desc: "Feeling low? Do ONE tiny opposite thing (stand up, smile, stretch)." },
]

export function WellnessSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFact, setCurrentFact] = useState(0)
  const [currentChaos, setCurrentChaos] = useState(0)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)
  const [currentHack, setCurrentHack] = useState(0)
  const [currentSong, setCurrentSong] = useState(0)
  const [currentGame, setCurrentGame] = useState(0)
  const [factType, setFactType] = useState<"psych" | "chaos">("psych")
  const [activeTab, setActiveTab] = useState<"facts" | "hacks" | "songs" | "games">("facts")

  const rotateFact = useCallback(() => {
    if (factType === "psych") {
      setCurrentFact((prev) => (prev + 1) % PSYCH_FACTS.length)
    } else {
      setCurrentChaos((prev) => (prev + 1) % CHAOS_FACTS.length)
    }
  }, [factType])

  const rotateAffirmation = useCallback(() => {
    setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length)
  }, [])

  const rotateHack = useCallback(() => {
    setCurrentHack((prev) => (prev + 1) % BRAIN_HACKS.length)
  }, [])

  const rotateSong = useCallback(() => {
    setCurrentSong((prev) => (prev + 1) % CHILL_SONGS.length)
  }, [])

  const rotateGame = useCallback(() => {
    setCurrentGame((prev) => (prev + 1) % MINI_GAMES.length)
  }, [])

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const HackIcon = BRAIN_HACKS[currentHack].icon

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 right-0 -translate-y-1/2 z-40 p-1.5 rounded-l-lg glass-card hover:translate-x-[-2px] transition-transform"
      >
        {isOpen ? (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-72 z-30 glass-strong border-l border-border/30 overflow-y-auto"
          >
            <div className="p-3 flex flex-col gap-2.5">
              {/* Header */}
              <div className="flex items-center gap-2 pb-2 border-b border-border/20">
                <div 
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #63bbd0, #b48cc8)" }}
                >
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-foreground">brain corner</h3>
                  <p className="text-[9px] text-muted-foreground">nerdy self-care toolkit</p>
                </div>
              </div>

              {/* Tab Navigation */}
              <div className="grid grid-cols-4 gap-1 p-0.5 rounded-lg bg-muted/20">
                <button
                  onClick={() => setActiveTab("facts")}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-md transition-all text-[8px] ${
                    activeTab === "facts" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Lightbulb className="w-3 h-3" />
                  facts
                </button>
                <button
                  onClick={() => setActiveTab("hacks")}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-md transition-all text-[8px] ${
                    activeTab === "hacks" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  hacks
                </button>
                <button
                  onClick={() => setActiveTab("songs")}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-md transition-all text-[8px] ${
                    activeTab === "songs" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Music className="w-3 h-3" />
                  songs
                </button>
                <button
                  onClick={() => setActiveTab("games")}
                  className={`flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-md transition-all text-[8px] ${
                    activeTab === "games" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Gamepad2 className="w-3 h-3" />
                  games
                </button>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "facts" && (
                  <motion.div
                    key="facts"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2"
                  >
                    {/* Fact Type Toggle */}
                    <div className="flex gap-1 p-0.5 rounded-lg bg-muted/30">
                      <button
                        onClick={() => setFactType("psych")}
                        className={`flex-1 text-[9px] py-1 px-2 rounded-md transition-all ${
                          factType === "psych" ? "bg-primary/20 text-primary" : "text-muted-foreground"
                        }`}
                      >
                        psychology
                      </button>
                      <button
                        onClick={() => setFactType("chaos")}
                        className={`flex-1 text-[9px] py-1 px-2 rounded-md transition-all ${
                          factType === "chaos" ? "bg-primary/20 text-primary" : "text-muted-foreground"
                        }`}
                      >
                        chaos theory
                      </button>
                    </div>

                    {/* Fun Fact Card */}
                    <div className="mood-card rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        {factType === "psych" ? (
                          <Lightbulb className="w-3 h-3" style={{ color: "#63bbd0" }} />
                        ) : (
                          <Zap className="w-3 h-3" style={{ color: "#b48cc8" }} />
                        )}
                        <span className="text-[9px] font-medium text-muted-foreground">
                          {factType === "psych" ? "brain science" : "chaos theory"}
                        </span>
                      </div>
                      <p className="text-[10px] text-foreground/80 leading-relaxed mb-2">
                        {factType === "psych" ? PSYCH_FACTS[currentFact] : CHAOS_FACTS[currentChaos]}
                      </p>
                      <button
                        onClick={rotateFact}
                        className="text-[8px] text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        nerd me up more
                      </button>
                    </div>

                    {/* Affirmation Card */}
                    <div className="feature-card rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Sparkles className="w-3 h-3" style={{ color: "#e8b4d0" }} />
                        <span className="text-[9px] font-medium text-muted-foreground">science-backed affirmation</span>
                      </div>
                      <p className="text-[10px] text-foreground/90 leading-relaxed italic mb-2">
                        {`"${AFFIRMATIONS[currentAffirmation]}"`}
                      </p>
                      <button
                        onClick={rotateAffirmation}
                        className="text-[8px] text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        another one
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeTab === "hacks" && (
                  <motion.div
                    key="hacks"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="mood-card rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <HackIcon className="w-3.5 h-3.5" style={{ color: "#63bbd0" }} />
                        <span className="text-[10px] font-semibold text-foreground">{BRAIN_HACKS[currentHack].title}</span>
                      </div>
                      <p className="text-[10px] text-foreground/70 leading-relaxed mb-3">
                        {BRAIN_HACKS[currentHack].desc}
                      </p>
                      <button
                        onClick={rotateHack}
                        className="text-[8px] text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        next hack
                      </button>
                    </div>
                    <p className="text-[8px] text-muted-foreground/60 text-center">
                      {currentHack + 1} of {BRAIN_HACKS.length} hacks
                    </p>
                  </motion.div>
                )}

                {activeTab === "songs" && (
                  <motion.div
                    key="songs"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="mood-card rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Music className="w-3 h-3" style={{ color: "#b48cc8" }} />
                        <span className="text-[9px] font-medium text-muted-foreground">chill recommendation</span>
                      </div>
                      <p className="text-[11px] font-semibold text-foreground mb-0.5">
                        {CHILL_SONGS[currentSong].title}
                      </p>
                      <p className="text-[9px] text-muted-foreground mb-1">
                        by {CHILL_SONGS[currentSong].artist}
                      </p>
                      <p className="text-[9px] text-foreground/60 italic mb-3">
                        {CHILL_SONGS[currentSong].note}
                      </p>
                      <button
                        onClick={rotateSong}
                        className="text-[8px] text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        next track
                      </button>
                    </div>
                    <p className="text-[8px] text-muted-foreground/60 text-center">
                      {currentSong + 1} of {CHILL_SONGS.length} songs
                    </p>
                  </motion.div>
                )}

                {activeTab === "games" && (
                  <motion.div
                    key="games"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-2"
                  >
                    <div className="mood-card rounded-xl p-3">
                      <div className="flex items-center gap-1.5 mb-2">
                        <Gamepad2 className="w-3.5 h-3.5" style={{ color: "#e8b4d0" }} />
                        <span className="text-[10px] font-semibold text-foreground">{MINI_GAMES[currentGame].title}</span>
                      </div>
                      <p className="text-[10px] text-foreground/70 leading-relaxed mb-3">
                        {MINI_GAMES[currentGame].desc}
                      </p>
                      <button
                        onClick={rotateGame}
                        className="text-[8px] text-primary hover:text-primary/80 transition-colors font-medium"
                      >
                        next game
                      </button>
                    </div>
                    <p className="text-[8px] text-muted-foreground/60 text-center">
                      {currentGame + 1} of {MINI_GAMES.length} mini-games
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  )
}
