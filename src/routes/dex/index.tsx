import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dex/')({
  beforeLoad: () => {
    throw redirect({ to: '/dex/pokemon' })
  },
})
