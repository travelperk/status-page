import React from 'react'
import { Incident } from '../../api'
import styled from 'styled-components'

type Props = {
  incidentList: Array<Incident>
}

const StatusWrapper = styled.div<{ state: Incident['type'] | 'stable' }>`
  margin: 1em auto;
  width: 80vw;
  background-color: ${props =>
    props.state === 'down'
      ? '#CC3232'
      : props.state === 'degraded'
      ? '#FFC82C'
      : '#0FA863'};
  color: white;
  text-align: center;
  padding: 1em 2em;
  font-size: 2rem;
  box-sizing: border-box;
  transition: background-color 0.3s;
`

const currentState = (indicentList: Array<Incident>) => {
  const activeIncidents = indicentList.filter(indicent =>
    indicent.updates.every(update => update.type !== 'resolved')
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
  return <StatusWrapper state={state}>Service is: {state}</StatusWrapper>
}

export default Status
