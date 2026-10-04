import { useQuery } from '@tanstack/react-query'
import { CheckCircle2, Loader2, RefreshCw, XCircle } from 'lucide-react'
import { getHealthOptions } from '@/client/@tanstack/react-query.gen'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function HealthStatus() {
  const { data, error, isError, isFetching, isSuccess, dataUpdatedAt, errorUpdatedAt, refetch } =
    useQuery(getHealthOptions())

  const checkedAt = isError ? errorUpdatedAt : dataUpdatedAt
  const state = isFetching ? 'pending' : isSuccess ? 'ok' : isError ? 'error' : 'pending'

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backend health</CardTitle>
        <CardAction>
          <Button variant="outline" size="sm" disabled={isFetching} onClick={() => refetch()}>
            <RefreshCw className={cn(isFetching && 'animate-spin')} />
            Call /health
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 font-mono text-sm">
          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-semibold text-blue-700">
            GET
          </span>
          <span>/api/health</span>
        </div>

        <div
          className={cn(
            'flex items-center gap-3 rounded-lg border p-4',
            state === 'ok' && 'border-green-200 bg-green-50 text-green-800',
            state === 'error' && 'border-red-200 bg-red-50 text-red-800',
            state === 'pending' && 'border-muted bg-muted/50 text-muted-foreground',
          )}
        >
          {state === 'ok' && <CheckCircle2 className="size-6 text-green-600" />}
          {state === 'error' && <XCircle className="size-6 text-red-600" />}
          {state === 'pending' && <Loader2 className="size-6 animate-spin" />}
          <div className="space-y-0.5">
            <p className="font-medium">
              {state === 'ok' && 'Backend is up'}
              {state === 'error' && 'Backend is unreachable'}
              {state === 'pending' && 'Calling backend…'}
            </p>
            {checkedAt > 0 && state !== 'pending' && (
              <p className="text-xs opacity-75">
                Checked at {new Date(checkedAt).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {state !== 'pending' && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Response</p>
            <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-xs text-zinc-100">
              {isSuccess ? JSON.stringify(data, null, 2) : String(error ?? 'No response')}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
