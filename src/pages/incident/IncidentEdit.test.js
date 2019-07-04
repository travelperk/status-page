import { render, waitForElement, wait } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import IncidentEdit from './IncidentEdit'
import { getIncident, updateIncident, Services } from '../../api'

jest.mock('../../api/index', () => {
  const originalModule = jest.requireActual('../../api/index')
  return {
    ...originalModule,
    getIncident: jest.fn(),
    updateIncident: jest.fn(),
  }
})

const incident = {
  services: ['flights', 'cars'],
  title: 'Flights not working, it is raining cars',
  type: 'down',
  updates: [
    {
      id: 'asdfasf87a8s7df',
    },
  ],
  id: 'twX4qgDbBZI0ZKtUgmN8',
}

describe('IncidentEdit', () => {
  it('should render existing values of IncidentCard in form', async () => {
    getIncident.mockImplementationOnce((id, setter) => {
      setTimeout(() => {
        act(() => {
          setter(incident)
        })
      }, 0)
    })
    const { getByDisplayValue, getByText, getByLabelText } = render(
      <MemoryRouter>
        <IncidentEdit match={{ params: { id: incident.id } }} />
      </MemoryRouter>
    )
    expect(getByText('Loading ...')).toBeInTheDocument()
    await waitForElement(() => getByDisplayValue(incident.title))
    incident.services.forEach(service => {
      const serviceCheckbox = getByLabelText(service)
      expect(serviceCheckbox).toBeInTheDocument()
      expect(serviceCheckbox.checked).toEqual(true)
    })
    expect(getIncident).toHaveBeenCalledTimes(1)
  })

  it('should call updateIncident with an edited incident', async () => {
    getIncident.mockImplementationOnce((id, setter) => {
      setTimeout(() => {
        act(() => {
          setter(incident)
        })
      }, 0)
    })
    const history = { replace: jest.fn() }
    const { getByDisplayValue, getByLabelText, getByText } = render(
      <MemoryRouter>
        <IncidentEdit
          match={{ params: { id: incident.id } }}
          history={history}
        />
      </MemoryRouter>
    )
    await waitForElement(() => getByDisplayValue(incident.title))

    const updatedTitle = 'Updated title'
    const updatedServices = ['hotels']

    userEvent.type(getByLabelText('Title'), updatedTitle)

    Services.forEach(service => {
      const checkbox = getByLabelText(service)
      if (updatedServices.includes(service)) {
        if (!checkbox.checked) {
          userEvent.click(checkbox)
        }
      } else {
        if (checkbox.checked) {
          userEvent.click(checkbox)
        }
      }
    })

    userEvent.click(getByText('Update incident', { selector: 'button' }))
    expect(updateIncident).toBeCalledTimes(1)
    expect(updateIncident).toBeCalledWith(
      incident.id,
      updatedTitle,
      updatedServices
    )
    await wait(() => expect(history.replace).toHaveBeenCalledTimes(1))
    expect(history.replace).toHaveBeenCalledWith('/')
  })
})
