import React, { useEffect, useState } from 'react'
import { Incident as IncidentInterface, getIncident } from '../../api'
import IncidentUpdate from './IncidentUpdate'
import styled from 'styled-components'
import { RouteComponentProps, Link } from 'react-router-dom'
import { PlusButton } from '../../components/PlusButton'
import ServiceList from '../../components/ServiceList'
import EditIcon from '../../icons/EditIcon'
import { color } from '../../utils/variables'
import { LinkButton } from '../../components/Buttons'

const Card = styled.div`
  color: inherit;
  padding: 1em;
  margin: 2em auto;
  width: 60vw;
`

type IncidentState = IncidentInterface['type'] | 'stable'
const TimeTitleWrapper = styled.div<{ state: IncidentState }>`
  margin: 1em auto;
  width: 60vw;
  background-color: ${props =>
    props.state === 'down'
      ? color.redDark
      : props.state === 'degraded'
      ? color.yellow
      : color.greenDark};
  color: white;
  text-align: center;
  padding: 1em 2em;
  font-size: 2rem;
  box-sizing: border-box;
  transition: background-color 0.3s;
`

const TitleWrapper = styled.h1`
  display: block;
  /* justify-content: space-between; */
  * {
    margin-right: 0.5em;
  }
`

const getState = (indicent: IncidentInterface) => {
  const isActive = indicent.updates.every(update => update.type !== 'resolved')
  if (!isActive) return 'stable'

  return indicent.type
}

type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams> & {}

const Incident = (props: Props) => {
  const [incident, setIncident] = useState<IncidentInterface>()

  useEffect(() => {
    const unsubscribe = getIncident(props.match.params.id, setIncident)
    return unsubscribe
  }, [props.match.params.id])

  if (!incident) {
    return <div>Loading...</div>
  }

  const incidentTimestamp =
    incident.updates[incident.updates.length - 1].timestamp
  const state = getState(incident)

  return (
    <>
      <TimeTitleWrapper state={state}>
        Incident on {incidentTimestamp.toDate().toUTCString()}
      </TimeTitleWrapper>
      <Card>
        <TitleWrapper>
          <span>{incident.title}</span>
          <Link to={`${incident.id}/edit`}>
            <EditIcon size="24px" color="steel" />
          </Link>
        </TitleWrapper>
        <ServiceList services={incident.services} />
        {incident.updates.map(update => (
          <IncidentUpdate
            key={update.timestamp.seconds}
            update={update}
            incidentId={incident.id}
          />
        ))}

        {state !== 'stable' && (
          <PlusButton to={`/${props.match.params.id}/update`}>+</PlusButton>
        )}

        <LinkButton data-testid="back-button" to="/">
          Back
        </LinkButton>
      </Card>
    </>
  )
}

export default Incident
