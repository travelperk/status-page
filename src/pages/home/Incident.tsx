import React from 'react'
import { Incident as IncidentInterface } from '../../api'
import styled from 'styled-components'

const ServiceList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  > * {
    background-color: #147cba;
    color: white;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    text-transform: uppercase;
    margin-right: 1em;
  }
`
const Card = styled.div<{ state: IncidentInterface['type'] | 'stable' }>`
  box-shadow: 0 0 4px 2px #0003;
  padding: 1em;
  margin: 2em 4em;
  border-left: 6px solid
    ${props =>
      props.state === 'down'
        ? '#CC3232'
        : props.state === 'degraded'
        ? '#FFC82C'
        : '#0FA863'};
`

const getState = (indicent: IncidentInterface) => {
  const isActive = indicent.updates.every(update => update.type !== 'resolved')
  if (!isActive) return 'stable'

  return indicent.type
}

type Props = {
  incident: IncidentInterface
}
const Incident = (props: Props) => {
  const { incident } = props
  const incidentTimestamp =
    incident.updates[incident.updates.length - 1].timestamp
  const state = getState(incident)
  return (
    <Card state={state}>
      <h1>{incidentTimestamp.toDate().toString()}</h1>
      <h3>{incident.title}</h3>
      <ServiceList>
        {incident.services.map(service => (
          <li key={service}>{service}</li>
        ))}
      </ServiceList>
      <ul>
        {incident.updates.map(update => (
          <li key={update.timestamp.seconds}>
            <p>
              {update.type} - {update.description}
            </p>
            <p>{update.timestamp.toDate().toString()}</p>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default Incident
