export const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  TYPE_NORMAL: { bg: '#A8A878', text: '#fff', border: '#6D6D4E' },
  TYPE_FIRE: { bg: '#F08030', text: '#fff', border: '#9C531F' },
  TYPE_WATER: { bg: '#6890F0', text: '#fff', border: '#445E9C' },
  TYPE_ELECTRIC: { bg: '#F8D030', text: '#000', border: '#A1871F' },
  TYPE_GRASS: { bg: '#78C850', text: '#fff', border: '#4E8234' },
  TYPE_ICE: { bg: '#98D8D8', text: '#000', border: '#638D8D' },
  TYPE_FIGHTING: { bg: '#C03028', text: '#fff', border: '#7D1F1A' },
  TYPE_POISON: { bg: '#A040A0', text: '#fff', border: '#682A68' },
  TYPE_GROUND: { bg: '#E0C068', text: '#000', border: '#927D44' },
  TYPE_FLYING: { bg: '#A890F0', text: '#fff', border: '#6D5E9C' },
  TYPE_PSYCHIC: { bg: '#F85888', text: '#fff', border: '#A13959' },
  TYPE_BUG: { bg: '#A8B820', text: '#fff', border: '#6D7815' },
  TYPE_ROCK: { bg: '#B8A038', text: '#fff', border: '#786824' },
  TYPE_GHOST: { bg: '#705898', text: '#fff', border: '#493963' },
  TYPE_DRAGON: { bg: '#7038F8', text: '#fff', border: '#4924A1' },
  TYPE_DARK: { bg: '#705848', text: '#fff', border: '#49392F' },
  TYPE_STEEL: { bg: '#B8B8D0', text: '#000', border: '#787887' },
  TYPE_FAIRY: { bg: '#EE99AC', text: '#000', border: '#9B6470' },
}

export const categoryColors: Record<string, { bg: string; text: string }> = {
  Physical: { bg: '#C92112', text: '#fff' },
  Special: { bg: '#4F5870', text: '#fff' },
  Status: { bg: '#8C888C', text: '#fff' },
}

export function getTypeColor(type: string) {
  return typeColors[type] || typeColors.TYPE_NORMAL
}

export function getCategoryColor(category: string) {
  return categoryColors[category] || categoryColors.Status
}
