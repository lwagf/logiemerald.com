import { createFileRoute, Link } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { TypeBadge } from '@/components/dex/TypeBadge'
import { StatBar } from '@/components/dex/StatBar'
import {
  formatPokemonId,
  formatAbilityName,
  formatMoveName,
  formatMoveId,
  formatAbilityId,
  formatEvolutionMethod,
  formatSpeciesName,
  calculateStatTotal,
} from '@/utils/formatters'

export const Route = createFileRoute('/dex/pokemon/$pokemonId')({
  component: PokemonDetailPage,
})

function PokemonDetailPage() {
  const { pokemonId } = Route.useParams()
  const { pokemon, getPokemonById, getMoveById, getAbilityById } = useGameData()

  // Find the Pokemon by matching the formatted ID
  const mon = pokemon.find(p => formatPokemonId(p.id) === pokemonId)

  if (!mon) {
    return (
      <GlassContainer className="max-w-[800px] mx-auto text-center">
        <p className="text-[#ff6b6b]">Pokemon not found</p>
        <Link to="/dex/pokemon" className="text-[#60b0ff] hover:underline mt-4 inline-block">
          Back to Pokemon list
        </Link>
      </GlassContainer>
    )
  }

  const statTotal = calculateStatTotal(mon.baseStats)

  return (
    <GlassContainer className="max-w-[800px] mx-auto">
      <Link to="/dex/pokemon" className="text-[#60b0ff] hover:underline text-sm mb-4 inline-block">
        &larr; Back to Pokemon list
      </Link>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <div className="w-32 h-32 flex items-center justify-center bg-[rgba(20,35,55,0.5)] rounded-lg">
            <img
              src={mon.frontSpriteBase64}
              alt={mon.name}
              className="max-w-full max-h-full scale-150"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white mb-1">{mon.name}</h2>
          <p className="text-sm text-[#7090b0] mb-2">{mon.category} Pokemon</p>
          <div className="flex gap-2 mb-4">
            {mon.types.map(type => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
          <p className="text-[#a0c0e0] text-sm">{mon.description}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Base Stats */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Base Stats</h3>
          <div className="space-y-2">
            <StatBar label="HP" value={mon.baseStats.hp} />
            <StatBar label="Atk" value={mon.baseStats.attack} />
            <StatBar label="Def" value={mon.baseStats.defense} />
            <StatBar label="SpA" value={mon.baseStats.spAttack} />
            <StatBar label="SpD" value={mon.baseStats.spDefense} />
            <StatBar label="Spe" value={mon.baseStats.speed} />
            <div className="flex items-center gap-2 pt-2 border-t border-[#2a3a4a]">
              <span className="w-8 text-xs text-[#a0c0e0] font-medium">Total</span>
              <span className="w-8 text-xs text-right font-mono font-bold">{statTotal}</span>
            </div>
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Abilities</h3>
          <div className="space-y-2">
            {mon.abilities.map((abilityId, i) => {
              const ability = getAbilityById(abilityId)
              return (
                <Link
                  key={abilityId}
                  to="/dex/abilities/$abilityId"
                  params={{ abilityId: formatAbilityId(abilityId) }}
                  className="block p-2 bg-[rgba(20,35,55,0.5)] rounded hover:bg-[rgba(30,45,65,0.5)] transition-colors"
                >
                  <span className="text-white">{formatAbilityName(abilityId)}</span>
                  {i === mon.abilities.length - 1 && mon.abilities.length > 1 && (
                    <span className="text-xs text-[#6080a0] ml-2">(Hidden)</span>
                  )}
                  {ability && (
                    <p className="text-xs text-[#7090b0] mt-0.5">{ability.description}</p>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Evolutions */}
      {mon.evolutions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Evolutions</h3>
          <div className="flex flex-wrap gap-3">
            {mon.evolutions.map((evo, i) => {
              const targetPokemon = getPokemonById(evo.targetSpecies)
              return (
                <Link
                  key={i}
                  to="/dex/pokemon/$pokemonId"
                  params={{ pokemonId: formatPokemonId(evo.targetSpecies) }}
                  className="flex items-center gap-3 p-3 bg-[rgba(20,35,55,0.5)] rounded-lg hover:bg-[rgba(30,45,65,0.5)] transition-colors"
                >
                  {targetPokemon && (
                    <img
                      src={targetPokemon.frontSpriteBase64}
                      alt={targetPokemon.name}
                      className="w-12 h-12"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  )}
                  <div>
                    <p className="text-white font-medium">{formatSpeciesName(evo.targetSpecies)}</p>
                    <p className="text-xs text-[#7090b0]">
                      {formatEvolutionMethod(evo.method, evo.param, evo.conditions)}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Locations */}
      {mon.locations.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Locations</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {mon.locations.map((loc, i) => (
              <div key={i} className="p-2 bg-[rgba(20,35,55,0.5)] rounded text-sm">
                <span className="text-white">{loc.map}</span>
                <span className="text-[#7090b0] ml-2">
                  {loc.encounterType} (Lv. {loc.minLevel}
                  {loc.maxLevel !== loc.minLevel && `-${loc.maxLevel}`})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Moves */}
      {mon.moves.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-3">Moves ({mon.moves.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-[300px] overflow-y-auto">
            {mon.moves.map(moveId => {
              const move = getMoveById(moveId)
              return (
                <Link
                  key={moveId}
                  to="/dex/moves/$moveId"
                  params={{ moveId: formatMoveId(moveId) }}
                  className="p-2 bg-[rgba(20,35,55,0.5)] rounded text-sm text-[#a0c0e0] hover:bg-[rgba(30,45,65,0.5)] hover:text-white transition-colors truncate"
                >
                  {move?.name || formatMoveName(moveId)}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </GlassContainer>
  )
}
