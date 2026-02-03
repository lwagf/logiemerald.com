export function WaveBackground() {
  return (
    <>
      <div
        className="fixed left-0 right-0 h-[120px] bottom-[60px] pointer-events-none z-0 animate-wave"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23ffffff20' d='M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z'/%3E%3C/svg%3E")`,
          backgroundSize: '1200px 120px',
          backgroundRepeat: 'repeat-x',
        }}
      />
      <div
        className="fixed left-0 right-0 h-[120px] bottom-0 pointer-events-none z-0 animate-wave-reverse"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 120'%3E%3Cpath fill='%23ffffff15' d='M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,120 L0,120 Z'/%3E%3C/svg%3E")`,
          backgroundSize: '1200px 120px',
          backgroundRepeat: 'repeat-x',
        }}
      />
    </>
  )
}
