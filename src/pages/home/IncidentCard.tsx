import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Incident as IncidentInterface } from '../../api'
import IncidentUpdate from './IncidentUpdate'
import { Button } from '../../components/Buttons'
import ServiceList from '../../components/ServiceList';
import { color } from '../../utils/variables'

const Card = styled(Link)<{ state: IncidentInterface['type'] | 'stable' }>`
  display: block;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 0 4px 2px #0003;
  padding: 1em 2em;
  box-sizing: border-box;
  margin: 2em auto;
  width: 60vw;
  border-left: 6px solid
    ${props =>
      props.state === 'down'
        ? color.redDark
        : props.state === 'degraded'
        ? color.yellow
        : color.greenDark};
  @media (max-width: 768px) {
    width: 90vw;
  }
`

const CardTitle = styled.h1`
  display: flex;
  justify-content: space-between;
`

const CollapseCard = styled.div<{ isOpened: boolean }>`
  overflow: ${props => (props.isOpened ? 'visible' : 'hidden')};
  height: ${props => (props.isOpened ? 'auto' : 0)};
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
  const [expanded, setExpanded] = useState(state !== 'stable')
  return (
    <Card state={state} to={`/${incident.id}`}>
      <CardTitle>
        <span>{incidentTimestamp.toDate().toUTCString()}</span>
        <Button
          onClick={evt => {
            evt.preventDefault()
            setExpanded(!expanded)
          }}
        >
          {expanded ? '▲' : '▼'}
        </Button>
      </CardTitle>
      <h2>{incident.title}</h2>

      <CollapseCard isOpened={expanded}>
        <ServiceList services={incident.services} />
        {incident.updates.map(update => (
          <IncidentUpdate key={update.timestamp.seconds} update={update} />
        ))}
      </CollapseCard>
    </Card>
  )
}

export default IncidentCard
