import { ReactNode } from 'react'
import { useRouterState } from '@tanstack/react-router'
import { Navigation } from './Navigation'
import { WaveBackground } from './WaveBackground'
import { Sparkles } from './Sparkles'
import { Beepy } from './Beepy'
import { RomPatcher } from '../patcher/RomPatcher'

interface RootLayoutProps {
  children: ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
  const router = useRouterState()
  const isPatcherRoute = router.location.pathname === '/'

  return (
    <div className="min-h-screen pb-[120px]">
      <WaveBackground />
      <Sparkles />
      <Beepy />
      <Navigation />

      <main className="relative z-10 px-4">
        {/* Keep patcher always mounted but hidden when not on patcher route */}
        {/* Sadly I think this is required due to how rom patcher js stores references to the DOM elements */}
        <div style={{ display: isPatcherRoute ? 'block' : 'none' }}>
          <RomPatcher isActive={isPatcherRoute} />
        </div>
        {/* Show other route content when not on patcher */}
        {!isPatcherRoute && children}
      </main>
    </div>
  )
}
