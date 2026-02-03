import { createFileRoute } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { useSearch } from '@/hooks/useSearch'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SearchBar } from '@/components/dex/SearchBar'
import { TypeFilter } from '@/components/dex/TypeFilter'
import { PokemonCard } from '@/components/dex/PokemonCard'
import { Pagination } from '@/components/dex/Pagination'
import type { Pokemon } from '@/types'

export const Route = createFileRoute('/dex/pokemon/')({
  component: PokemonListPage,
})

function PokemonListPage() {
  const { pokemon } = useGameData()

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
  } = useSearch<Pokemon>({
    items: pokemon,
    searchFields: ['name', 'id'],
    filterFn: (item, filters) => {
      if (filters.type && !item.types.includes(filters.type)) {
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
              placeholder="Search Pokemon..."
            />
          </div>
        </div>

        <TypeFilter
          selectedType={filters.type || ''}
          onTypeChange={type => setFilter('type', type)}
        />

        <div className="text-sm text-[#7090b0]">
          Showing {paginatedItems.length} of {totalItems} Pokemon
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paginatedItems.map(mon => (
            <PokemonCard key={mon.id} pokemon={mon} />
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
