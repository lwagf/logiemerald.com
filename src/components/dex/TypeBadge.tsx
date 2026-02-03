import { getTypeColor } from '@/utils/typeColors'
import { formatTypeName } from '@/utils/formatters'

interface TypeBadgeProps {
  type: string
  size?: 'sm' | 'md'
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const colors = getTypeColor(type)
  const sizeClasses = size === 'sm' ? 'px-2 py-0 text-[10px]' : 'px-3 py-0.5 text-xs'

  return (
    <span
      className={`type-badge ${sizeClasses}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderLeft: `3px solid ${colors.border}`,
      }}
    >
      {formatTypeName(type)}
    </span>
  )
}
