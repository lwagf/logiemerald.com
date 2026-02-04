import { createFileRoute } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { useSearch } from '@/hooks/useSearch'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SearchBar } from '@/components/dex/SearchBar'
import { TrainerCard } from '@/components/dex/TrainerCard'
import { Pagination } from '@/components/dex/Pagination'
import type { Trainer } from '@/types'

export const Route = createFileRoute('/dex/trainers/')({
  component: TrainersListPage,
})

function TrainersListPage() {
  const { trainers } = useGameData()

  const {
    searchQuery,
    setSearchQuery,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useSearch<Trainer>({
    items: trainers,
    searchFields: ['name', 'trainerClass', 'id'],
  })

  return (
    <GlassContainer className="max-w-[1000px] mx-auto">
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search trainers..."
        />

        <div className="text-sm text-[#7090b0]">
          Showing {paginatedItems.length} of {totalItems} trainers
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paginatedItems.map(trainer => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </GlassContainer>
  )
}
