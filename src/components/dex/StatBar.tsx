interface StatBarProps {
  label: string
  value: number
  maxValue?: number
  color?: string
}

const statColors: Record<string, string> = {
  HP: '#ff5959',
  Atk: '#f5ac78',
  Def: '#fae078',
  SpA: '#9db7f5',
  SpD: '#a7db8d',
  Spe: '#fa92b2',
}

export function StatBar({ label, value, maxValue = 255, color }: StatBarProps) {
  const percentage = Math.min((value / maxValue) * 100, 100)
  const barColor = color || statColors[label] || '#6890F0'

  return (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs text-[#a0c0e0] font-medium">{label}</span>
      <span className="w-8 text-xs text-right font-mono">{value}</span>
      <div className="flex-1 stat-bar">
        <div
          className="stat-bar-fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  )
}
