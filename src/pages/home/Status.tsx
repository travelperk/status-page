import React from 'react'
import { Incident } from '../../api'
import styled from 'styled-components'

type Props = {
  incidentList: Array<Incident>
}

const StatusWrapper = styled.div<{ state: Incident['type'] | 'stable' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-bottom: 2em;
  width: 60vw;
  height: 40vh;
  background-color: ${props =>
    props.state === 'down'
      ? '#CC3232'
      : props.state === 'degraded'
      ? '#FFC82C'
      : '#0FA863'};
  color: white;
  font-size: 2.5rem;
  transition: background-color 0.3s;
  text-align: center;
  box-shadow: 0 0 4px 2px #0003;

  @media (max-width: 768px) {
    margin-bottom: 1em;
    width: 100vw;
  }
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
  return <StatusWrapper state={state}>Service is {state}</StatusWrapper>
}

export default Status
