import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import type { GameData, Pokemon, Move, Ability, Trainer } from '@/types'

interface GameDataContextType {
  data: GameData | null
  isLoading: boolean
  error: string | null
  pokemon: Pokemon[]
  moves: Move[]
  abilities: Ability[]
  trainers: Trainer[]
  getPokemonById: (id: string) => Pokemon | undefined
  getMoveById: (id: string) => Move | undefined
  getAbilityById: (id: string) => Ability | undefined
  getTrainerById: (id: string) => Trainer | undefined
}

const GameDataContext = createContext<GameDataContextType | null>(null)

export function GameDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<GameData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/game_data.json')
        if (!response.ok) {
          throw new Error('Failed to load game data')
        }
        const jsonData = await response.json()
        setData(jsonData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setIsLoading(false)
      }
    }
    loadData()
  }, [])

  const pokemon = data ? Object.values(data.pokemon) : []
  const moves = data ? Object.values(data.moves) : []
  const abilities = data ? Object.values(data.abilities) : []
  const trainers = data ? Object.values(data.trainers).filter(t => t.party.length > 0) : []

  const getPokemonById = (id: string) => data?.pokemon[id]
  const getMoveById = (id: string) => data?.moves[id]
  const getAbilityById = (id: string) => data?.abilities[id]
  const getTrainerById = (id: string) => data?.trainers[id]

  return (
    <GameDataContext.Provider
      value={{
        data,
        isLoading,
        error,
        pokemon,
        moves,
        abilities,
        trainers,
        getPokemonById,
        getMoveById,
        getAbilityById,
        getTrainerById,
      }}
    >
      {children}
    </GameDataContext.Provider>
  )
}

export function useGameData() {
  const context = useContext(GameDataContext)
  if (!context) {
    throw new Error('useGameData must be used within a GameDataProvider')
  }
  return context
}
