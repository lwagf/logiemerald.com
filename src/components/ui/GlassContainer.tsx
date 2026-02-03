import { ReactNode } from 'react'

interface GlassContainerProps {
  children: ReactNode
  className?: string
}

export function GlassContainer({ children, className = '' }: GlassContainerProps) {
  return (
    <div className={`glass-container p-6 ${className}`}>
      {children}
    </div>
  )
}
