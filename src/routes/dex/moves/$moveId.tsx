import { createFileRoute, Link } from '@tanstack/react-router'
import { useGameData } from '@/context/GameDataContext'
import { GlassContainer } from '@/components/ui/GlassContainer'
import { TypeBadge } from '@/components/dex/TypeBadge'
import { PokemonCard } from '@/components/dex/PokemonCard'
import { formatMoveId } from '@/utils/formatters'
import { getCategoryColor } from '@/utils/typeColors'

export const Route = createFileRoute('/dex/moves/$moveId')({
  component: MoveDetailPage,
})

function MoveDetailPage() {
  const { moveId } = Route.useParams()
  const { moves, pokemon } = useGameData()

  // Find the move by matching the formatted ID
  const move = moves.find(m => formatMoveId(m.id) === moveId)

  if (!move) {
    return (
      <GlassContainer className="max-w-[800px] mx-auto text-center">
        <p className="text-[#ff6b6b]">Move not found</p>
        <Link to="/dex/moves" className="text-[#60b0ff] hover:underline mt-4 inline-block">
          Back to Moves list
        </Link>
      </GlassContainer>
    )
  }

  const categoryColor = getCategoryColor(move.category)

  // Find Pokemon that can learn this move
  const learnablePokemon = pokemon.filter(p => p.moves.includes(move.id))

  return (
    <GlassContainer className="max-w-[800px] mx-auto">
      <Link to="/dex/moves" className="text-[#60b0ff] hover:underline text-sm mb-4 inline-block">
        &larr; Back to Moves list
      </Link>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{move.name}</h2>
        <div className="flex gap-2 mb-4">
          <TypeBadge type={move.type} />
          <span
            className="px-3 py-0.5 text-xs font-semibold rounded uppercase"
            style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
          >
            {move.category}
          </span>
        </div>
        <p className="text-[#a0c0e0]">{move.description}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-[rgba(20,35,55,0.5)] rounded-lg p-3 text-center">
          <div className="text-xs text-[#7090b0] mb-1">Power</div>
          <div className="text-xl font-bold text-white">{move.power || '—'}</div>
        </div>
        <div className="bg-[rgba(20,35,55,0.5)] rounded-lg p-3 text-center">
          <div className="text-xs text-[#7090b0] mb-1">Accuracy</div>
          <div className="text-xl font-bold text-white">{move.accuracy ? `${move.accuracy}%` : '—'}</div>
        </div>
        <div className="bg-[rgba(20,35,55,0.5)] rounded-lg p-3 text-center">
          <div className="text-xs text-[#7090b0] mb-1">PP</div>
          <div className="text-xl font-bold text-white">{move.pp}</div>
        </div>
        <div className="bg-[rgba(20,35,55,0.5)] rounded-lg p-3 text-center">
          <div className="text-xs text-[#7090b0] mb-1">Priority</div>
          <div className="text-xl font-bold text-white">{move.priority > 0 ? `+${move.priority}` : move.priority}</div>
        </div>
      </div>

      {move.flags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">Flags</h3>
          <div className="flex flex-wrap gap-2">
            {move.flags.map(flag => (
              <span
                key={flag}
                className="px-2 py-1 text-xs bg-[rgba(20,35,55,0.5)] text-[#a0c0e0] rounded"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      {learnablePokemon.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">
            Pokemon that can learn this move ({learnablePokemon.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
            {learnablePokemon.map(mon => (
              <PokemonCard key={mon.id} pokemon={mon} />
            ))}
          </div>
        </div>
      )}
    </GlassContainer>
  )
}
