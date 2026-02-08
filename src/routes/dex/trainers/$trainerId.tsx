import { createFileRoute, Link } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { TypeBadge } from '@/components/dex/TypeBadge'
import {
  formatTrainerId,
  formatSpeciesName,
  formatMoveName,
  formatMoveId,
  formatAbilityName,
  formatAbilityId,
  formatItemName,
  formatNatureName,
  formatPokemonId,
} from '@/utils/formatters'

export const Route = createFileRoute('/dex/trainers/$trainerId')({
  component: TrainerDetailPage,
})

function TrainerDetailPage() {
  const { trainerId } = Route.useParams()
  const { trainers, getPokemonById } = useGameData()

  // Find the trainer by matching the formatted ID
  const trainer = trainers.find(t => formatTrainerId(t.id) === trainerId)

  if (!trainer) {
    return (
      <GlassContainer className="max-w-[800px] mx-auto text-center">
        <p className="text-[#ff6b6b]">Trainer not found</p>
        <Link to="/dex/trainers" className="text-[#60b0ff] hover:underline mt-4 inline-block">
          Back to Trainers list
        </Link>
      </GlassContainer>
    )
  }

  return (
    <GlassContainer className="max-w-[800px] mx-auto">
      <Link to="/dex/trainers" className="text-[#60b0ff] hover:underline text-sm mb-4 inline-block">
        &larr; Back to Trainers list
      </Link>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-1">{trainer.name || '(Unknown)'}</h2>
      </div>

      <h3 className="text-lg font-semibold text-white mb-3">Party ({trainer.party.length})</h3>
      <div className="space-y-4">
        {trainer.party.map((member, i) => {
          const pokemon = getPokemonById(member.species)

          return (
            <div key={i} className="bg-[rgba(20,35,55,0.5)] rounded-lg p-4">
              <div className="flex items-start gap-4">
                <Link
                  to="/dex/pokemon/$pokemonId"
                  params={{ pokemonId: formatPokemonId(member.species) }}
                  className="flex-shrink-0"
                >
                  {pokemon && (
                    <div className="w-16 h-16 flex items-center justify-center bg-[rgba(15,25,40,0.5)] rounded">
                      <img
                        src={pokemon.frontSpriteBase64}
                        alt={pokemon.name}
                        className="max-w-full max-h-full"
                        style={{ imageRendering: 'pixelated' }}
                      />
                    </div>
                  )}
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      to="/dex/pokemon/$pokemonId"
                      params={{ pokemonId: formatPokemonId(member.species) }}
                      className="text-white font-semibold hover:text-[#60b0ff] transition-colors"
                    >
                      {pokemon?.name || formatSpeciesName(member.species)}
                    </Link>
                    {pokemon && pokemon.types.map(type => (
                      <TypeBadge key={type} type={type} size="sm" />
                    ))}
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    <div>
                      <span className="text-[#6080a0]">Item: </span>
                      <span className="text-[#a0c0e0]">{formatItemName(member.heldItem)}</span>
                    </div>
                    <div>
                      <span className="text-[#6080a0]">Nature: </span>
                      <span className="text-[#a0c0e0]">{formatNatureName(member.nature)}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[#6080a0]">Ability: </span>
                      <Link
                        to="/dex/abilities/$abilityId"
                        params={{ abilityId: formatAbilityId(member.ability ?? 'ABILITY_NONE') }}
                        className="text-[#a0c0e0] hover:text-[#60b0ff] transition-colors"
                      >
                        {formatAbilityName(member.ability ?? 'ABILITY_NONE')}
                      </Link>
                    </div>
                  </div>

                  {/* EVs */}
                  <div className="mt-2">
                    <span className="text-xs text-[#6080a0]">EVs: </span>
                    <span className="text-xs text-[#7090b0]">
                      {Object.entries(member.evs)
                        .filter(([, v]) => v && v > 0)
                        .map(([stat, value]) => {
                          const statNames: Record<string, string> = {
                            hp: 'HP',
                            attack: 'Atk',
                            defense: 'Def',
                            spAttack: 'SpA',
                            spDefense: 'SpD',
                            speed: 'Spe',
                          }
                          return `${value} ${statNames[stat] || stat}`
                        })
                        .join(' / ')}
                    </span>
                  </div>

                  {/* Moves */}
                  <div className="mt-2 flex flex-wrap gap-1">
                    {member.moves.map((moveId, i) => (
                      <Link
                        key={`${moveId}-${i}`}
                        to="/dex/moves/$moveId"
                        params={{ moveId: formatMoveId(moveId) }}
                        className="text-xs px-2 py-0.5 bg-[rgba(15,25,40,0.5)] text-[#7090b0] rounded hover:text-white hover:bg-[rgba(30,45,65,0.5)] transition-colors"
                      >
                        {formatMoveName(moveId)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </GlassContainer>
  )
}
