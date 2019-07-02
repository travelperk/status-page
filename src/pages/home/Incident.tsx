import React from 'react'
import { Incident as IncidentInterface } from '../../api'
import IncidentUpdate from './IncidentUpdate'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
const Card = styled(Link)<{ state: IncidentInterface['type'] | 'stable' }>`
  display: block;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 0 4px 2px #0003;
  padding: 1em;
  box-sizing: border-box;
  margin: 2em auto;
  width: 80vw;
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
    <Card state={state} to={`/update/${incident.id}`}>
      <h1>{incidentTimestamp.toDate().toUTCString()}</h1>
      <h2>{incident.title}</h2>
      <ServiceList>
        {incident.services.map(service => (
          <li key={service}>{service}</li>
        ))}
      </ServiceList>

      {incident.updates.map(update => (
        <IncidentUpdate key={update.timestamp.seconds} update={update} />
      ))}
    </Card>
  )
}

export default Incident
