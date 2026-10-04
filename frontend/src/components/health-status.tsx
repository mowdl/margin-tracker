import { useQuery } from '@tanstack/react-query'
import { getHealthOptions } from '@/client/@tanstack/react-query.gen'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HealthStatus() {
  const { data, isPending, isError, isFetching, refetch } = useQuery(getHealthOptions())

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm" disabled={isFetching} onClick={() => refetch()}>
            {isFetching ? 'Checking…' : 'Check again'}
          </Button>
        </CardAction>
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
