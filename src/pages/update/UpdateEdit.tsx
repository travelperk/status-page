import React, { useState, useContext, useEffect } from 'react'
import UserContext from '../../contexts/UserContext'
import { RouteComponentProps } from 'react-router-dom'

import { History } from 'history'
import { FormWrapper } from '../../components/FormWrapper'
import { FormItem } from '../../components/FormItem'
import {
  Incident,
  IncidentUpdate,
  updateIncidentUpdate,
  getIncident,
} from '../../api'
import { Button, LinkButton, ButtonWrapper } from '../../components/Buttons'

type MatchParams = {
  incidentId: string
  updateId: string
}

type Props = RouteComponentProps<MatchParams> & { history: History }
const UpdateEdit = (props: Props) => {
  const user = useContext(UserContext)
  const [update, setUpdate] = useState()

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    await updateIncidentUpdate(
      user,
      props.match.params.updateId,
      update.description
    )
    props.history.replace(`/${props.match.params.incidentId}`)
  }

  useEffect(() => {
    getIncident(props.match.params.incidentId, (incident: Incident) => {
      const foundUpdate = incident.updates.findIndex(
        (upd: IncidentUpdate) => upd.id === props.match.params.updateId
      )
      if (foundUpdate !== -1) {
        setUpdate(incident.updates[foundUpdate])
      } else {
        props.history.replace(`/${props.match.params.incidentId}`)
      }
    })
  }, [
    props.history,
    props.match.params.updateId,
    props.match.params.incidentId,
  ])

  if (!update) return <div>Loading ...</div>

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Edit incident update</h1>
        <FormItem>
          <label css="margin-bottom: 0.5em" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            onChange={evt => setUpdate({ description: evt.target.value })}
            value={update.description}
          />
        </FormItem>
        <FormItem>
          <label css="margin-bottom: 0.5em" htmlFor="type">
            Type
          </label>
          <select id="type" value={update.type} disabled>
            <option value="update">Update</option>
            <option value="resolved">Resolved</option>
          </select>
        </FormItem>
        <ButtonWrapper>
          <Button>Update</Button>
          <LinkButton to={`/${props.match.params.incidentId}`}>
            Cancel
          </LinkButton>
        </ButtonWrapper>
      </form>
    </FormWrapper>
  )
}

export default UpdateEdit
