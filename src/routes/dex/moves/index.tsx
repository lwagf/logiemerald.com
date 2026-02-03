import { createFileRoute } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { useSearch } from '@/hooks/useSearch'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SearchBar } from '@/components/dex/SearchBar'
import { TypeFilter } from '@/components/dex/TypeFilter'
import { MoveCard } from '@/components/dex/MoveCard'
import { Pagination } from '@/components/dex/Pagination'
import type { Move } from '@/types'

export const Route = createFileRoute('/dex/moves/')({
  component: MovesListPage,
})

function MovesListPage() {
  const { moves } = useGameData()

  const {
    searchQuery,
    setSearchQuery,
    filters,
    setFilter,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useSearch<Move>({
    items: moves,
    searchFields: ['name', 'id'],
    filterFn: (item, filters) => {
      if (filters.type && item.type !== filters.type) {
        return false
      }
      return true
    },
  })

  return (
    <GlassContainer className="max-w-[1000px] mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search moves..."
            />
          </div>
        </div>

        <TypeFilter
          selectedType={filters.type || ''}
          onTypeChange={type => setFilter('type', type)}
        />

        <div className="text-sm text-[#7090b0]">
          Showing {paginatedItems.length} of {totalItems} moves
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paginatedItems.map(move => (
            <MoveCard key={move.id} move={move} />
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
