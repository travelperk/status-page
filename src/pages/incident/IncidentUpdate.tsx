import React from 'react'
import { IncidentUpdate as IncidentUpdateInterface } from '../../api'
import styled from 'styled-components/macro'
import { color } from '../../utils/variables'
import { Link } from 'react-router-dom'
import EditIcon from '../../icons/EditIcon'

type Props = {
  update: IncidentUpdateInterface
  incidentId: string
}

const UpdateWrapper = styled.span<{ state: IncidentUpdateInterface['type'] }>`
  color: ${props =>
    props.state === 'resolved'
      ? color.greenDark
      : props.state === 'update'
      ? color.blackAlpha80
      : color.yellow};
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

const StyledEditIcon = styled(EditIcon)`
  font-size: 1em;
  color: steel;
  margin-left: 10px;
`

const IncidentUpdate = (props: Props) => {
  const { incidentId, update } = props
  return (
    <Wrapper>
      <UpdateWrapper state={update.type}>{update.type}</UpdateWrapper>
      <div>
        {update.description}
        <Link to={`${incidentId}/${update.id}/edit`}>
          <StyledEditIcon />
        </Link>
        <AuthorWrapper>{update.author}</AuthorWrapper>
        <TimeWrapper>{update.timestamp.toDate().toUTCString()}</TimeWrapper>
      </div>
    </Wrapper>
  )
}

export default IncidentUpdate
