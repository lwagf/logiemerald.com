export function Beepy() {
  return (
    <div className="fixed bottom-[60px] right-[80px] z-[1] animate-float">
      <img
        src="/images/beepy.png"
        alt="Beepy"
        className="scale-[2] origin-center"
        style={{
          imageRendering: 'pixelated',
          filter: 'drop-shadow(2px 4px 8px rgba(0,0,0,0.5))',
        }}
      />
    </div>
  )
}
