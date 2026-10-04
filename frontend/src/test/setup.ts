import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
import { client } from '@/client/client.gen'

// Node can't build requests from relative URLs like the browser does.
client.setConfig({ baseUrl: 'http://localhost' })

afterEach(() => {
  cleanup()
})
