import React from 'react'
import { IncidentUpdate as IncidentUpdateInterface } from '../../api'
import styled from 'styled-components/macro'

type Props = {
  update: IncidentUpdateInterface
}

const UpdateWrapper = styled.span<{ state: IncidentUpdateInterface['type'] }>`
  color: ${props =>
    props.state === 'resolved'
      ? '#0FA863'
      : props.state === 'update'
      ? 'rgba(0,0,0,0.8)'
      : '#FFC82C'};
  font-weight: bold;
  text-transform: capitalize;
  width: 10vw;
`

const Wrapper = styled.div`
  margin: 3rem 0;
  display: flex;
`

const AuthorWrapper = styled.div`
  color: rgba(0, 0, 0, 0.5);
  margin-top: 0.5em;
`

const TimeWrapper = styled.div`
  font-style: italic;
  color: rgba(0, 0, 0, 0.5);
`

const IncidentUpdate = (props: Props) => {
  const { update } = props
  return (
    <Wrapper>
      <UpdateWrapper state={update.type}>{update.type}</UpdateWrapper>
      <div>
        {update.description}
        <AuthorWrapper>{update.author}</AuthorWrapper>
        <TimeWrapper>{update.timestamp.toDate().toUTCString()}</TimeWrapper>
      </div>
    </Wrapper>
  )
}

export default IncidentUpdate
