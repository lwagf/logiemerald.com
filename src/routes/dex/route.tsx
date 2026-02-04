import { createFileRoute, Outlet } from '@tanstack/react-router'
import { GameDataProvider, useGameData } from '@/context/GameDataContext'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const Route = createFileRoute('/dex')({
  component: DexLayout,
})

function DexLayout() {
  return (
    <GameDataProvider>
      <DexContent />
    </GameDataProvider>
  )
}

function DexContent() {
  const { isLoading, error } = useGameData()

  if (isLoading) {
    return <LoadingSpinner message="Loading game data..." />
  }

  if (error) {
    return (
      <div className="glass-container max-w-[600px] mx-auto p-6 text-center text-red-400">
        Error loading game data: {error}
      </div>
    )
  }

  return <Outlet />
}
