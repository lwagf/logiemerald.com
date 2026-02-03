export function formatPokemonId(id: string): string {
  return id.replace('SPECIES_', '').toLowerCase()
}

export function formatMoveId(id: string): string {
  return id.replace('MOVE_', '').toLowerCase().replace(/_/g, '-')
}

export function formatAbilityId(id: string): string {
  return id.replace('ABILITY_', '').toLowerCase().replace(/_/g, '-')
}

export function formatTrainerId(id: string): string {
  return id.replace('TRAINER_', '').toLowerCase().replace(/_/g, '-')
}

export function formatTypeName(type: string): string {
  return type.replace('TYPE_', '').charAt(0) + type.replace('TYPE_', '').slice(1).toLowerCase()
}

export function formatSpeciesName(species: string): string {
  return species
    .replace('SPECIES_', '')
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatMoveName(move: string): string {
  return move
    .replace('MOVE_', '')
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatAbilityName(ability: string): string {
  return ability
    .replace('ABILITY_', '')
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatItemName(item: string): string {
  return item
    .replace('ITEM_', '')
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ')
}

export function formatNatureName(nature: string): string {
  return nature.replace('NATURE_', '').charAt(0) + nature.replace('NATURE_', '').slice(1).toLowerCase()
}

export function formatEvolutionMethod(method: string, param: number, conditions?: string[]): string {
  const conditionText = conditions?.map(c => {
    if (c.startsWith('IF_KNOWS_MOVE:')) {
      return `while knowing ${formatMoveName(c.replace('IF_KNOWS_MOVE:', ''))}`
    }
    return c
  }).join(', ')

  switch (method) {
    case 'EVO_LEVEL':
      if (param === 0 && conditionText) {
        return `Level up ${conditionText}`
      }
      return `Level ${param}${conditionText ? ` ${conditionText}` : ''}`
    case 'EVO_TRADE':
      return 'Trade'
    case 'EVO_ITEM':
      return `Use item`
    case 'EVO_FRIENDSHIP':
      return 'High Friendship'
    case 'EVO_LEVEL_ATK_GT_DEF':
      return `Level ${param} with Atk > Def`
    case 'EVO_LEVEL_ATK_LT_DEF':
      return `Level ${param} with Atk < Def`
    case 'EVO_LEVEL_ATK_EQ_DEF':
      return `Level ${param} with Atk = Def`
    default:
      return method.replace('EVO_', '').replace(/_/g, ' ')
  }
}

export function calculateStatTotal(stats: {
  hp: number
  attack: number
  defense: number
  speed: number
  spAttack: number
  spDefense: number
}): number {
  return stats.hp + stats.attack + stats.defense + stats.speed + stats.spAttack + stats.spDefense
}
