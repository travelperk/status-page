import { render, waitForElement, fireEvent, wait } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Incident } from '../../api'
import Home from './Home'
import * as api from '../../api'

jest.mock('../../api')
jest.mock('lodash/debounce', () => (fn: any) => fn)

const mockedApi = api as jest.Mocked<typeof api>

const incidentFabricator = (type: Incident['type']): Incident => {
  return {
    services: ['flights', 'cars'],
    title: 'Flights not working',
    type,
    updates: [
      {
        id: Math.random().toString(),
        author: 'test@travelperk.com',
        description: 'Shit happened',
        timestamp: {
          seconds: 1560851458,
          toDate: () => new Date(1560851458),
        },
        type: 'investigating',
      },
    ],
    id: Math.random().toString(),
  }
}

const resolvedIncidentFabricator = (): Incident => {
  return {
    services: ['flights', 'cars'],
    title: 'Flights not working',
    type: 'down',
    updates: [
      {
        id: Math.random().toString(),
        author: 'test@travelperk.com',
        description: 'Shit happened',
        timestamp: {
          seconds: 1560851458,
          toDate: () => new Date(1560851458),
        },
        type: 'resolved',
      },
    ],
    id: Math.random().toString(),
  }
}

describe('Home', () => {
  it.each([['degraded'], ['down']])(
    'should show banner with status %s',
    async status => {
      mockedApi.getIncidents.mockImplementationOnce((amount, fn) => {
        setTimeout(
          () => fn([incidentFabricator(status as Incident['type'])]),
          0
        )
        return jest.fn()
      })
      const { getByText } = render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      )
      expect(getByText('Loading ...')).toBeInTheDocument()
      await waitForElement(() => getByText(`Service is ${status}`))

      expect(mockedApi.getIncidents).toHaveBeenCalledTimes(1)
    }
  )

  it('should show banner with status stable', async () => {
    mockedApi.getIncidents.mockImplementationOnce((amount, fn) => {
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

    expect(mockedApi.getIncidents).toHaveBeenCalledTimes(1)
  })

  it('should filter incidents by title', async () => {
    mockedApi.getIncidents.mockImplementation((amount, fn) => {
      const firstIncident = resolvedIncidentFabricator()
      firstIncident.title = 'Test text to be found'
      const secondIncident = resolvedIncidentFabricator()
      secondIncident.title = "This doesn't match"

      setTimeout(() => fn([firstIncident, secondIncident]), 0)
      return jest.fn()
    })
    const { getByText, getByRole, queryByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(getByText('Loading ...')).toBeInTheDocument()
    await waitForElement(() => getByText(`Service is stable`))

    fireEvent.change(getByRole('search'), { target: { value: 'test' } })

    await wait(() => expect(queryByText("This doesn't match")).toBeNull())
    expect(getByText('Test text to be found')).toBeInTheDocument()

    expect(mockedApi.getIncidents).toHaveBeenCalledTimes(2)
  })
})
