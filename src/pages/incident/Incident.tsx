import React, { useEffect, useState } from 'react'
import { RouteComponentProps, Link } from 'react-router-dom'
import styled from 'styled-components'
import { Incident as IncidentInterface, getIncident } from '../../api'
import IncidentUpdate from './IncidentUpdate'
import ServiceList from '../../components/ServiceList'
import EditIcon from '../../icons/EditIcon'
import { LinkButton } from '../../components/Buttons'
import { color } from '../../utils/variables'

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

const IncidentWrapper = styled.div`
  margin: 5rem 2rem;
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
        <TitleWrapper data-testid="edit-incident">
          <span>{incident.title}</span>
          {state !== 'stable' && (
            <Link to={`${incident.id}/edit`}>
              <EditIcon size="24px" color="steel" />
            </Link>
          )}
        </TitleWrapper>
        <ServiceList services={incident.services} />
        <IncidentWrapper>
          {state !== 'stable' && (
            <LinkButton to={`/${props.match.params.id}/update`}>
              New update
            </LinkButton>
          )}
          {incident.updates.map(update => (
            <IncidentUpdate
              key={update.timestamp.seconds}
              update={update}
              incidentId={incident.id}
              canEdit={state !== 'stable'}
            />
          ))}
        </IncidentWrapper>
        <LinkButton data-testid="back-button" to="/">
          Back
        </LinkButton>
      </Card>
    </>
  )
}

export default Incident
