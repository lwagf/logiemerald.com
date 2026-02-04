import { Link } from '@tanstack/react-router'
import type { Move } from '@/types'
import { TypeBadge } from './TypeBadge'
import { formatMoveId } from '@/utils/formatters'
import { getCategoryColor } from '@/utils/typeColors'

interface MoveCardProps {
  move: Move
}

export function MoveCard({ move }: MoveCardProps) {
  const categoryColor = getCategoryColor(move.category)

  return (
    <Link
      to="/dex/moves/$moveId"
      params={{ moveId: formatMoveId(move.id) }}
      className="glass-card block p-4 no-underline"
    >
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-white font-semibold truncate">{move.name}</h3>
          <div className="flex gap-1 mt-1 flex-wrap items-center">
            <TypeBadge type={move.type} size="sm" />
            <span
              className="px-2 py-0 text-[10px] font-semibold rounded uppercase"
              style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
            >
              {move.category}
            </span>
          </div>
        </div>
        <div className="text-right text-xs text-[#7090b0] whitespace-nowrap">
          {move.power > 0 && <div>Pow: {move.power}</div>}
          {move.accuracy > 0 && <div>Acc: {move.accuracy}%</div>}
        </div>
      </div>
    </Link>
  )
}
