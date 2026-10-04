import { createFileRoute } from '@tanstack/react-router'
import { HealthStatus } from '@/components/health-status'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Margin Tracker</h1>
      <HealthStatus />
    </div>
  )
}
