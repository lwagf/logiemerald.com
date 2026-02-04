import { createFileRoute } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { useSearch } from '@/hooks/useSearch'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { SearchBar } from '@/components/dex/SearchBar'
import { AbilityCard } from '@/components/dex/AbilityCard'
import { Pagination } from '@/components/dex/Pagination'
import type { Ability } from '@/types'

export const Route = createFileRoute('/dex/abilities/')({
  component: AbilitiesListPage,
})

function AbilitiesListPage() {
  const { abilities } = useGameData()

  const {
    searchQuery,
    setSearchQuery,
    paginatedItems,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
  } = useSearch<Ability>({
    items: abilities,
    searchFields: ['name', 'description'],
  })

  return (
    <GlassContainer className="max-w-[1000px] mx-auto">
      <div className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search abilities..."
        />

        <div className="text-sm text-[#7090b0]">
          Showing {paginatedItems.length} of {totalItems} abilities
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {paginatedItems.map(ability => (
            <AbilityCard key={ability.id} ability={ability} />
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
