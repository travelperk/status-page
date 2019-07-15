import { render, waitForElement } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'
import { getIncidents } from '../../api/index'

jest.mock('../../api/index')

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
          toDate: () => new Date(1560851458),
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
          toDate: () => new Date(1560851458),
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
      getIncidents.mockImplementationOnce(fn => {
        setTimeout(() => fn([incidentFabricator(state)]), 0)
        return jest.fn()
      })
      const { getByText } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )
      expect(getByText('Loading ...')).toBeInTheDocument()
      await waitForElement(() => getByText(`Service is ${state}`))

      expect(getIncidents).toHaveBeenCalledTimes(1)
    }
  )

  it('should show banner with status stable', async () => {
    getIncidents.mockImplementationOnce(fn => {
      setTimeout(() => fn([resolvedIncidentFabricator()]), 0)
      return jest.fn()
    })
    const { getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(getByText('Loading ...')).toBeInTheDocument()
    await waitForElement(() => getByText(`Service is stable`))

    expect(getIncidents).toHaveBeenCalledTimes(1)
  })
})
