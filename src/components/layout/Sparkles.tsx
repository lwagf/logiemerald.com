const sparklePositions = [
  { left: '10%', bottom: '30%', delay: '0s' },
  { left: '25%', bottom: '45%', delay: '0.5s' },
  { left: '45%', bottom: '25%', delay: '1s' },
  { left: '70%', bottom: '35%', delay: '1.5s' },
  { left: '85%', bottom: '50%', delay: '0.3s' },
]

export function Sparkles() {
  return (
    <>
      {sparklePositions.map((pos, i) => (
        <div
          key={i}
          className="fixed w-1 h-1 bg-white rounded-full pointer-events-none animate-sparkle"
          style={{
            left: pos.left,
            bottom: pos.bottom,
            animationDelay: pos.delay,
          }}
        />
      ))}
    </>
  )
}
