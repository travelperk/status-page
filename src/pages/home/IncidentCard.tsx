import React from 'react'
import { Incident as IncidentInterface } from '../../api'
import IncidentUpdate from './IncidentUpdate'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {LinkButton} from "../../components/Buttons";

const ServiceList = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  > * {
    background-color: #147cba;
    color: white;
    padding: 0.2em 0.4em;
    border-radius: 3px;
    text-transform: uppercase;
    margin-right: 1em;
    margin-bottom: 0.8em;
  }
`
const Card = styled.div<{ state: IncidentInterface['type'] | 'stable' }>`
  display: block;
  box-shadow: 0 0 4px 2px #0003;
  padding: 1em;
  box-sizing: border-box;
  margin: 2em auto;
  width: 60vw;
  border-left: 6px solid
    ${props =>
      props.state === 'down'
        ? '#CC3232'
        : props.state === 'degraded'
        ? '#FFC82C'
        : '#0FA863'};
  @media (max-width: 768px) {
    width: 90vw;
  }
`

const IncidentHeader = styled(Link)`  
  display: inline-block;  
  padding: 1em;
`

const AddUpdateButtonWrapper = styled.div`
  margin: 2rem 2rem;
`

const getState = (incident: IncidentInterface) => {
  const isActive = incident.updates.every(update => update.type !== 'resolved')
  if (!isActive) return 'stable'

  return incident.type
}

type Props = {
  incident: IncidentInterface
}
const IncidentCard = (props: Props) => {
  const { incident } = props
  const incidentTimestamp =
    incident.updates[incident.updates.length - 1].timestamp
  const state = getState(incident)
  return (
    <Card state={state}>
      <IncidentHeader to={`/edit/${incident.id}`}>
        <h1>{incidentTimestamp.toDate().toUTCString()}</h1>
        <h2>{incident.title}</h2>
        <ServiceList>
          {incident.services.map(service => (
            <li key={service}>{service}</li>
          ))}
        </ServiceList>
      </IncidentHeader>
      <AddUpdateButtonWrapper>
        <LinkButton to={`/update/${incident.id}`}>Add an update</LinkButton>
      </AddUpdateButtonWrapper>
      {incident.updates.map(update => (
        <IncidentUpdate key={update.timestamp.seconds} update={update} />
      ))}
    </Card>
  )
}

export default IncidentCard
