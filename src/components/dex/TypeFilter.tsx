import { getTypeColor } from '@/utils/typeColors'
import { formatTypeName } from '@/utils/formatters'

const types = [
  'TYPE_NORMAL',
  'TYPE_FIRE',
  'TYPE_WATER',
  'TYPE_ELECTRIC',
  'TYPE_GRASS',
  'TYPE_ICE',
  'TYPE_FIGHTING',
  'TYPE_POISON',
  'TYPE_GROUND',
  'TYPE_FLYING',
  'TYPE_PSYCHIC',
  'TYPE_BUG',
  'TYPE_ROCK',
  'TYPE_GHOST',
  'TYPE_DRAGON',
  'TYPE_DARK',
  'TYPE_STEEL',
  'TYPE_FAIRY',
]

interface TypeFilterProps {
  selectedType: string
  onTypeChange: (type: string) => void
}

export function TypeFilter({ selectedType, onTypeChange }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-1">
      <button
        onClick={() => onTypeChange('')}
        className={`px-2 py-1 text-xs rounded transition-colors ${
          !selectedType
            ? 'bg-[rgba(255,255,255,0.2)] text-white'
            : 'bg-[rgba(20,35,55,0.5)] text-[#7090b0] hover:bg-[rgba(255,255,255,0.1)]'
        }`}
      >
        All
      </button>
      {types.map(type => {
        const colors = getTypeColor(type)
        const isSelected = selectedType === type

        return (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-2 py-1 text-xs rounded transition-opacity ${
              isSelected ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            style={{
              backgroundColor: colors.bg,
              color: colors.text,
            }}
          >
            {formatTypeName(type)}
          </button>
        )
      })}
    </div>
  )
}
