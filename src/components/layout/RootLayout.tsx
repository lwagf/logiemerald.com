import { ReactNode } from 'react'
import { Navigation } from './Navigation'
import { WaveBackground } from './WaveBackground'
import { Sparkles } from './Sparkles'
import { Beepy } from './Beepy'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen pb-[120px]">
      <WaveBackground />
      <Sparkles />
      <Beepy />
      <Navigation />

      <main className="relative z-10 px-4">
        {children}
      </main>
    </div>
  )
}
