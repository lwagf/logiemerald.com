import { Link } from '@tanstack/react-router'
import type { Pokemon } from '@/types'
import { TypeBadge } from './TypeBadge'
import { formatPokemonId } from '@/utils/formatters'

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link
      to="/dex/pokemon/$pokemonId"
      params={{ pokemonId: formatPokemonId(pokemon.id) }}
      className="glass-card block p-4 no-underline"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 flex items-center justify-center">
          <img
            src={pokemon.frontSpriteBase64}
            alt={pokemon.name}
            className="max-w-full max-h-full"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold truncate">{pokemon.name}</h3>
          <div className="flex gap-1 mt-1 flex-wrap">
            {pokemon.types.map(type => (
              <TypeBadge key={type} type={type} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
