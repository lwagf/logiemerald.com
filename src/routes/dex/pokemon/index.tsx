import { createFileRoute } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { useSearch } from '@/hooks/useSearch'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SearchBar } from '@/components/dex/SearchBar'
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
      if (filters.customOnly === 'true' && !item.isCustom) {
        return false
      }
      return true
    },
  })

  const isCustomOnly = filters.customOnly === 'true'

  return (
    <GlassContainer className="max-w-[1000px] mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Pokemon..."
            />
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isCustomOnly}
              onChange={e => setFilter('customOnly', e.target.checked ? 'true' : '')}
              className="w-4 h-4 rounded border-2 border-[#2a3a4a] bg-[rgba(20,35,55,0.9)] checked:bg-[#4a9a6a] checked:border-[#4a9a6a] cursor-pointer"
            />
            <span className="text-sm text-[#a0c0e0]">Show new!</span>
          </label>
        </div>

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
