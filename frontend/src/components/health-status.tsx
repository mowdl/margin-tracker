import { useQuery } from '@tanstack/react-query'
import { getHealthOptions } from '@/client/@tanstack/react-query.gen'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HealthStatus() {
  const { data, isPending, isError } = useQuery(getHealthOptions())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Badge variant="secondary">Checking…</Badge>
        ) : isError ? (
          <Badge variant="destructive">Unreachable</Badge>
        ) : (
          <Badge>{data.status}</Badge>
        )}
      </CardContent>
    </Card>
  )
}
