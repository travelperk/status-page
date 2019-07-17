import { render } from '@testing-library/react'
import React from 'react'
import IncidentUpdate from './IncidentUpdate'

const incidentUpdateFabricator = (incidentResolved = false) => {
  return {
    canEdit: !incidentResolved,
    update: {
      description: 'Shit happened',
      timestamp: {
        seconds: 1560851458,
        nanoseconds: 593000000,
        toDate: () => new Date(1560851458),
      },
      type: incidentResolved ? 'resolved' : 'investigating',
    },
    incidentId: 'twX4qgDbBZI0ZKtUgmN8',
  }
}

describe('IncidentUpdate', () => {
  it('should render the update properly', async () => {
    const incidentUpdateAttributes = incidentUpdateFabricator()
    const { getByText } = render(
      <IncidentUpdate
        update={incidentUpdateAttributes.update}
        incidentId={incidentUpdateAttributes.incidentId}
        canEdit={incidentUpdateAttributes.canUpdate}
      />
    )

    expect(getByText('Shit happened')).toBeInTheDocument()
    expect(getByText('investigating')).toBeInTheDocument()
  })

  it('should not allow edit links in a resolved incident', async () => {
    const incidentUpdateAttributes = incidentUpdateFabricator(true)
    const { getByTestId } = render(
      <IncidentUpdate
        update={incidentUpdateAttributes.update}
        incidentId={incidentUpdateAttributes.incidentId}
        canEdit={incidentUpdateAttributes.canUpdate}
      />
    )

    expect(getByTestId('edit-update').getElementsByTagName('a').length).toBe(0)
  })
})
