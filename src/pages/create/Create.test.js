import React from 'react'
import { wait, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router'
import Create from './Create'
import { createIncident } from '../../api/index'
import UserContext from '../../contexts/UserContext'

jest.mock('../../api/index', () => {
  const originalModule = jest.requireActual('../../api/index')
  return {
    ...originalModule,
    createIncident: jest.fn(),
  }
})

describe('Create', () => {
  it('should allow the user to create a new IncidentCard', async () => {
    const history = { replace: jest.fn() }
    const user = { email: 'test@test.com' }
    const { getByLabelText, getByText } = render(
      <UserContext.Provider value={user}>
        <MemoryRouter>
          <Create history={history} />
        </MemoryRouter>
      </UserContext.Provider>
    )
    userEvent.type(getByLabelText('Title'), 'Whoo hoo!')
    userEvent.type(getByLabelText('Description'), 'Dancing Elvis')
    userEvent.click(getByLabelText('flights'))
    createIncident.mockResolvedValueOnce()

    userEvent.click(getByText('Create incident', { selector: 'button' }))
    expect(createIncident).toHaveBeenCalledTimes(1)
    expect(createIncident).toHaveBeenCalledWith(user, {
      description: 'Dancing Elvis',
      services: ['flights'],
      title: 'Whoo hoo!',
      type: 'degraded',
    })
    await wait(() => expect(history.replace).toHaveBeenCalledWith('/'))
    expect(history.replace).toHaveBeenCalledTimes(1)
  })
})
