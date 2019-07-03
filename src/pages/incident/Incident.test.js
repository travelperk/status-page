import { render, waitForElement } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import Incident from './Incident'
import { getIncident } from '../../api/index'

jest.mock('../../api/index')

const incidentFabricator = () => {
  return {
    services: ['flights', 'cars'],
    title: 'Flights not working',
    type: 'degraded',
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

describe('Incident', () => {
  it('should render the incident', async () => {
    getIncident.mockImplementationOnce((id, setter) =>
      setter(incidentFabricator())
    )
    const { getByText } = render(
      <MemoryRouter initialEntries={['/twX4qgDbBZI0ZKtUgmN8']}>
        <Route path="/:id" component={Incident} />
      </MemoryRouter>
    )
    await waitForElement(() => getByText('Shit happened'))

    expect(getIncident).toHaveBeenCalledTimes(1)

    expect(getByText('+').getAttribute('href')).toBe(
      '/twX4qgDbBZI0ZKtUgmN8/update'
    )
    expect(getByText('< Current status').getAttribute('href')).toBe('/')
  })
})
