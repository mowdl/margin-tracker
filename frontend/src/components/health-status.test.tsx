import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { HealthStatus } from './health-status'

function renderWithClient() {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={queryClient}>
      <HealthStatus />
    </QueryClientProvider>,
  )
}

afterEach(() => {
  vi.unstubAllGlobals()
})

test('shows the backend status', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => Response.json({ status: 'ok' })),
  )
  renderWithClient()
  expect(await screen.findByText('Backend is up')).toBeInTheDocument()
  expect(fetch).toHaveBeenCalledOnce()
})

test('shows when the backend is unreachable', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => new Response(null, { status: 500 })),
  )
  renderWithClient()
  expect(await screen.findByText('Backend is unreachable')).toBeInTheDocument()
  expect(fetch).toHaveBeenCalledOnce()
})

test('calls the backend again when clicking the button', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => Response.json({ status: 'ok' })),
  )
  renderWithClient()
  await screen.findByText('Backend is up')
  fireEvent.click(screen.getByRole('button', { name: 'Call /health' }))
  await vi.waitFor(() => expect(fetch).toHaveBeenCalledTimes(2))
})
