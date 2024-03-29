import { render, waitForElement } from '@testing-library/react'
import React from 'react'
import { MemoryRouter, Route } from 'react-router-dom'
import Incident from './Incident'
import { getIncident } from '../../api/index'

jest.mock('../../api/index')

const incidentFabricator = (resolved = false) => {
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
        type: resolved ? 'resolved' : 'investigating',
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
    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/twX4qgDbBZI0ZKtUgmN8']}>
        <Route path="/:id" component={Incident} />
      </MemoryRouter>
    )
    await waitForElement(() => getByText('Shit happened'))

    expect(getIncident).toHaveBeenCalledTimes(1)

    expect(getByText('New update').getAttribute('href')).toBe(
      '/twX4qgDbBZI0ZKtUgmN8/update'
    )
    expect(getByTestId('back-button').getAttribute('href')).toBe('/')
  })

  it('should not allow to update a resolved incident', async () => {
    const resolved = true
    getIncident.mockImplementationOnce((id, setter) =>
      setter(incidentFabricator(resolved))
    )
    const { getByText, queryByText } = render(
      <MemoryRouter initialEntries={['/twX4qgDbBZI0ZKtUgmN8']}>
        <Route path="/:id" component={Incident} />
      </MemoryRouter>
    )
    await waitForElement(() => getByText('Shit happened'))

    expect(getIncident).toHaveBeenCalledTimes(1)

    expect(queryByText('+')).toBeNull()
  })

  it('should not allow edit links in a resolved incident', async () => {
    const resolved = true

    getIncident.mockImplementationOnce((id, setter) =>
      setter(incidentFabricator(resolved))
    )

    const { getByText, getByTestId } = render(
      <MemoryRouter initialEntries={['/twX4qgDbBZI0ZKtUgmN8']}>
        <Route path="/:id" component={Incident} />
      </MemoryRouter>
    )
    await waitForElement(() => getByText('Shit happened'))

    expect(getIncident).toHaveBeenCalledTimes(1)

    expect(getByTestId('edit-incident').getElementsByTagName('a').length).toBe(
      0
    )
  })
})
