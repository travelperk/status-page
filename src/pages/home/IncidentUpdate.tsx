import React from 'react'
import { IncidentUpdate as IncidentUpdateInterface } from '../../api'
import styled from 'styled-components'

type Props = {
  update: IncidentUpdateInterface
}

const StatusLabel = styled.span<{ state: IncidentUpdateInterface['type'] }>`
  color: ${props =>
    props.state === 'resolved'
      ? '#0FA863'
      : props.state === 'update'
      ? 'rgba(0,0,0,0.8)'
      : '#FFC82C'};
  font-weight: bold;
  text-transform: capitalize;
`

const StatusWrapper = styled.div`
  margin: 2em 0;
`

const AuthorWrapper = styled.div`
  color: rgba(0, 0, 0, 0.5);
`

const TimeWrapper = styled.div`
  font-style: italic;
  color: rgba(0, 0, 0, 0.5);
`

const IncidentUpdate = (props: Props) => {
  const { update } = props
  return (
    <StatusWrapper>
      <StatusLabel state={update.type}>{update.type}</StatusLabel> -{' '}
      {update.description}
      <AuthorWrapper>{update.author}</AuthorWrapper>
      <TimeWrapper>{update.timestamp.toDate().toUTCString()}</TimeWrapper>
    </StatusWrapper>
  )
}

export default IncidentUpdate
