import React from 'react'
import styled from 'styled-components'
import { IncidentUpdate as IncidentUpdateInterface } from '../../api'
import { color } from '../../utils/variables'

type Props = {
  update: IncidentUpdateInterface
}

const StatusLabel = styled.span<{ state: IncidentUpdateInterface['type'] }>`
  color: ${props =>
    props.state === 'resolved'
      ? color.greenDark
      : props.state === 'update'
      ? color.blackAlpha80
      : color.yellow};
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
