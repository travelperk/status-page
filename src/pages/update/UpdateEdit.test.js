import React from 'react'
import { render, waitForElement, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'

import { getIncident, updateIncidentUpdate } from '../../api'
import UpdateEdit from './UpdateEdit'

jest.mock('../../api/index', () => {
  const originalModule = jest.requireActual('../../api/index')
  return {
    ...originalModule,
    getIncident: jest.fn(),
    updateIncident: jest.fn(),
    updateIncidentUpdate: jest.fn(),
  }
})

const incident = {
  services: ['flights', 'cars'],
  title: 'Flights not working, it is raining cars',
  type: 'down',
  updates: [
    {
      id: 'asdfasf87a8s7df',
      description: 'this in the official update',
      type: 'Resolved',
    },
  ],
  id: 'twX4qgDbBZI0ZKtUgmN8',
}

describe('UpdateEdit', () => {
  it('should render the right information in the update form', async () => {
    getIncident.mockImplementationOnce((id, setter) => {
      setTimeout(() => {
        act(() => {
          setter(incident)
        })
      }, 0)
    })

    const { getByText } = render(
      <MemoryRouter>
        <UpdateEdit
          match={{
            params: {
              incidentId: incident.id,
              updateId: incident.updates[0].id,
            },
          }}
        />
      </MemoryRouter>
    )
    expect(getByText('Loading ...')).toBeInTheDocument()

    await waitForElement(() => getByText(incident.updates[0].description))
    expect(getByText(incident.updates[0].type).toBeInTheDocument)
    expect(getIncident).toHaveBeenCalledTimes(1)
  })

  it('should call updateIncidentUpdate with the entered values', async () => {
    getIncident.mockImplementationOnce((id, setter) => {
      setTimeout(() => {
        act(() => {
          setter(incident)
        })
      }, 0)
    })

    const history = { replace: jest.fn() }
    const { getByText, getByDisplayValue, getByLabelText } = render(
      <MemoryRouter>
        <UpdateEdit
          match={{
            params: {
              incidentId: incident.id,
              updateId: incident.updates[0].id,
            },
          }}
          history={history}
        />
      </MemoryRouter>
    )

    expect(getByText('Loading ...')).toBeInTheDocument()
    await waitForElement(() =>
      getByDisplayValue(incident.updates[0].description)
    )

    const defaultUser = { email: '' }
    const updatedDescription = 'this is another official update'
    userEvent.type(getByLabelText('Description'), updatedDescription)

    userEvent.click(getByText('Update', { selector: 'button' }))
    expect(updateIncidentUpdate).toBeCalledTimes(1)

    expect(updateIncidentUpdate).toBeCalledWith(
      defaultUser,
      incident.updates[0].id,
      updatedDescription
    )

    await wait(() => expect(history.replace).toHaveBeenCalledTimes(1))
    expect(history.replace).toHaveBeenCalledWith(`/${incident.id}`)
  })
})
