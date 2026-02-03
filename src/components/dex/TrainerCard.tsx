import { Link } from '@tanstack/react-router'
import type { Trainer } from '@/types'
import { formatTrainerId, formatSpeciesName } from '@/utils/formatters'

interface TrainerCardProps {
  trainer: Trainer
}

export function TrainerCard({ trainer }: TrainerCardProps) {
  return (
    <Link
      to="/dex/trainers/$trainerId"
      params={{ trainerId: formatTrainerId(trainer.id) }}
      className="glass-card block p-4 no-underline"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-white font-semibold">{trainer.name || '(Unknown)'}</h3>
          <p className="text-sm text-[#a0c0e0]">{trainer.trainerClass}</p>
        </div>
        <span className="text-xs text-[#7090b0]">{trainer.party.length} Pokemon</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {trainer.party.slice(0, 3).map((member, i) => (
          <span key={i} className="text-xs text-[#6080a0] bg-[rgba(20,35,55,0.5)] px-2 py-0.5 rounded">
            {formatSpeciesName(member.species)}
          </span>
        ))}
        {trainer.party.length > 3 && (
          <span className="text-xs text-[#6080a0]">+{trainer.party.length - 3}</span>
        )}
      </div>
    </Link>
  )
}
