import { render, cleanup, waitForElement } from '@testing-library/react'
import React from 'react'
import 'jest-dom/extend-expect'
import Home from './Home'
import { getAllIncidents } from '../../api/index'

jest.mock('../../api/index')

beforeEach(cleanup)
beforeEach(jest.clearAllMocks)

const incidentFabricator = type => {
  return {
    services: ['flights', 'cars'],
    title: 'Flights not working',
    type,
    updates: [
      {
        description: 'Shit happened',
        timestamp: {
          seconds: 1560851458,
          nanoseconds: 593000000,
        },
        type: 'investigating',
      },
    ],
    id: 'twX4qgDbBZI0ZKtUgmN8',
  }
}

const resolvedIncidentFabricator = () => {
  return {
    services: ['flights', 'cars'],
    title: 'Flights not working',
    type: 'down',
    updates: [
      {
        description: 'Shit happened',
        timestamp: {
          seconds: 1560851458,
          nanoseconds: 593000000,
        },
        type: 'resolved',
      },
    ],
    id: 'twX4qgDbBZI0ZKtUgmN8',
  }
}

describe('Home', () => {
  it.each([['degraded'], ['down']])(
    'should show banner with status %s',
    async state => {
      getAllIncidents.mockImplementationOnce(fn =>
        setTimeout(() => fn([incidentFabricator(state)]), 0)
      )
      const { getByText } = render(<Home />)
      expect(getByText('Loading ...')).toBeInTheDocument()
      await waitForElement(() => getByText(`Service is: ${state}`))

      expect(getAllIncidents).toHaveBeenCalledTimes(1)
    }
  )

  it('should show banner with status stable', async () => {
    getAllIncidents.mockImplementationOnce(fn =>
      setTimeout(() => fn([resolvedIncidentFabricator()]), 0)
    )
    const { getByText } = render(<Home />)
    expect(getByText('Loading ...')).toBeInTheDocument()
    await waitForElement(() => getByText(`Service is: stable`))

    expect(getAllIncidents).toHaveBeenCalledTimes(1)
  })
})