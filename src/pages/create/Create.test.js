import React from 'react'
import { wait, render } from '@testing-library/react'
import Create from './Create'
import userEvent from '@testing-library/user-event'
import { createIncident } from '../../api/index'

jest.mock('../../api/index', () => {
    const originalModule = jest.requireActual('../../api/index')
    return {
        ...originalModule,
        createIncident: jest.fn()
    }
})

describe('Create', () =>{
    it('should allow the user to create a new Incident', async () => {
        const history = {replace: jest.fn()}
        const {getByLabelText, getByText} = render(<Create history={history}/>)
        userEvent.type(getByLabelText('Title'), 'Whoo hoo!')
        userEvent.type(getByLabelText('Description'), 'Dancing Elvis')
        userEvent.click(getByLabelText('flights'))
        createIncident.mockResolvedValueOnce()

        userEvent.click(getByText('Create incident'))
        expect(createIncident).toHaveBeenCalledTimes(1)
        expect(createIncident).toHaveBeenCalledWith(
            {
                "description": "Dancing Elvis",
                "services": ["flights"],
                "title": "Whoo hoo!",
                "type": "degraded"
            })
        await wait(() => expect(history.replace).toHaveBeenCalledWith('/'))
        expect(history.replace).toHaveBeenCalledTimes(1)
    })
})