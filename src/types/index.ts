export interface BaseStats {
  hp: number
  attack: number
  defense: number
  speed: number
  spAttack: number
  spDefense: number
}

export interface Evolution {
  method: string
  param: number
  targetSpecies: string
  conditions?: string[]
}

export interface Location {
  map: string
  encounterType: string
  minLevel: number
  maxLevel: number
}

export interface Pokemon {
  id: string
  name: string
  types: string[]
  baseStats: BaseStats
  abilities: string[]
  eggCycles: number
  category: string
  description: string
  evolutions: Evolution[]
  moves: string[]
  locations: Location[]
  isCustom: boolean
  frontSprite: string
  frontSpriteBase64: string
}

export interface Move {
  id: string
  name: string
  type: string
  category: 'Physical' | 'Special' | 'Status'
  power: number
  accuracy: number
  pp: number
  priority: number
  description: string
  effect: string
  flags: string[]
}

export interface Ability {
  id: string
  name: string
  description: string
}

export interface TrainerPartyMember {
  species: string
  moves: string[]
  heldItem: string
  ability: string
  evs: {
    hp?: number
    attack?: number
    defense?: number
    speed?: number
    spAttack?: number
    spDefense?: number
  }
  nature: string
}

export interface Trainer {
  id: string
  name: string
  trainerClass: string
  battleType: string
  party: TrainerPartyMember[]
  gender: string
  ai?: string[]
}

export interface GameData {
  pokemon: Record<string, Pokemon>
  moves: Record<string, Move>
  abilities: Record<string, Ability>
  trainers: Record<string, Trainer>
}

export type PokemonType =
  | 'TYPE_NORMAL'
  | 'TYPE_FIRE'
  | 'TYPE_WATER'
  | 'TYPE_ELECTRIC'
  | 'TYPE_GRASS'
  | 'TYPE_ICE'
  | 'TYPE_FIGHTING'
  | 'TYPE_POISON'
  | 'TYPE_GROUND'
  | 'TYPE_FLYING'
  | 'TYPE_PSYCHIC'
  | 'TYPE_BUG'
  | 'TYPE_ROCK'
  | 'TYPE_GHOST'
  | 'TYPE_DRAGON'
  | 'TYPE_DARK'
  | 'TYPE_STEEL'
  | 'TYPE_FAIRY'

export type MoveCategory = 'Physical' | 'Special' | 'Status'
