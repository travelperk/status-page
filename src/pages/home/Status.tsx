import React from 'react'
import styled from 'styled-components'
import { Incident } from '../../api'
import { color } from '../../utils/variables'

type Props = {
  incidentList: Array<Incident>
}

// eslint-disable-next-line no-unexpected-multiline
const StatusWrapper = styled.div<{
  state: Incident['type'] | 'stable'
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  height: 20rem;
  max-height: 40vh;
  background-color: ${props =>
    props.state === 'down'
      ? color.redDark
      : props.state === 'degraded'
      ? color.yellow
      : color.greenDark};
  color: white;
  font-size: 2.5rem;
  transition: background-color 0.3s;
  text-align: center;
  box-shadow: 0 0 4px 2px #0003;
`

const currentState = (incidentList: Array<Incident>) => {
  const activeIncidents = incidentList.filter(incident =>
    incident.updates.every(update => update.type !== 'resolved')
  )

  const states = activeIncidents.map(incident => incident.type)

  if (states.includes('down')) {
    return 'down'
  }

  if (states.includes('degraded')) {
    return 'degraded'
  }

  return 'stable'
}

const Status = (props: Props) => {
  const state = currentState(props.incidentList)
  return <StatusWrapper state={state}>Service is {state}</StatusWrapper>
}

export default Status
