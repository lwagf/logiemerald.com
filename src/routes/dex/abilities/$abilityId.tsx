import { createFileRoute, Link } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { PokemonCard } from '@/components/dex/PokemonCard'
import { formatAbilityId } from '@/utils/formatters'

export const Route = createFileRoute('/dex/abilities/$abilityId')({
  component: AbilityDetailPage,
})

function AbilityDetailPage() {
  const { abilityId } = Route.useParams()
  const { abilities, pokemon } = useGameData()

  // Find the ability by matching the formatted ID
  const ability = abilities.find(a => formatAbilityId(a.id) === abilityId)

  if (!ability) {
    return (
      <GlassContainer className="max-w-[800px] mx-auto text-center">
        <p className="text-[#ff6b6b]">Ability not found</p>
        <Link to="/dex/abilities" className="text-[#60b0ff] hover:underline mt-4 inline-block">
          Back to Abilities list
        </Link>
      </GlassContainer>
    )
  }

  // Find Pokemon with this ability
  const pokemonWithAbility = pokemon.filter(p => p.abilities.includes(ability.id))

  return (
    <GlassContainer className="max-w-[800px] mx-auto">
      <Link to="/dex/abilities" className="text-[#60b0ff] hover:underline text-sm mb-4 inline-block">
        &larr; Back to Abilities list
      </Link>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{ability.name}</h2>
        <p className="text-[#a0c0e0]">{ability.description}</p>
      </div>

      {pokemonWithAbility.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Pokemon with this ability ({pokemonWithAbility.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto">
            {pokemonWithAbility.map(mon => (
              <PokemonCard key={mon.id} pokemon={mon} />
            ))}
          </div>
        </div>
      )}
    </GlassContainer>
  )
}
