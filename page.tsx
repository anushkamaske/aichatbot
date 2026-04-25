import { DisclaimerBanner } from "@/components/disclaimer-banner"
import { ChatHeader } from "@/components/chat-header"
import { ChatInterface } from "@/components/chat-interface"
import { AnimatedBackground } from "@/components/animated-background"
import { BreathingWidget } from "@/components/breathing-widget"
import { WellnessSidebar } from "@/components/wellness-sidebar"
import { HypeGenerator } from "@/components/hype-generator"

export default function Home() {
  return (
    <main className="h-screen flex flex-col overflow-hidden bg-background relative">
      <AnimatedBackground />
      <DisclaimerBanner />
      <ChatHeader />
      <ChatInterface />
      <BreathingWidget />
      <WellnessSidebar />
      <HypeGenerator />
    </main>
  )
}
