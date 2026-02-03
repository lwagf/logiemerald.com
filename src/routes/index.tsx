import { createFileRoute } from '@tanstack/react-router'
import { RomPatcher } from '@/components/patcher/RomPatcher'

export const Route = createFileRoute('/')({
  component: PatcherPage,
})

function PatcherPage() {
  return <RomPatcher />
}
