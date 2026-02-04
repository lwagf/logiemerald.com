interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <div className="glass-container max-w-[600px] mx-auto p-12 text-center">
      <div className="inline-block w-12 h-12 border-4 border-[#2a3a4a] border-t-[#4a9a6a] rounded-full animate-spin mb-4" />
      <p className="text-[#a0c0e0]">{message}</p>
    </div>
  )
}
