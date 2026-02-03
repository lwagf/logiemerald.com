import { Link } from '@tanstack/react-router'
import type { Ability } from '@/types'
import { formatAbilityId } from '@/utils/formatters'

interface AbilityCardProps {
  ability: Ability
}

export function AbilityCard({ ability }: AbilityCardProps) {
  return (
    <Link
      to="/dex/abilities/$abilityId"
      params={{ abilityId: formatAbilityId(ability.id) }}
      className="glass-card block p-4 no-underline"
    >
      <h3 className="text-white font-semibold">{ability.name}</h3>
      <p className="text-sm text-[#7090b0] mt-1 line-clamp-2">{ability.description}</p>
    </Link>
  )
}
