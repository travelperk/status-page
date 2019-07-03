import React, { useState, useEffect, useContext } from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import {
  getIncident,
  addUpdateToIncident,
  IncidentUpdate,
  Incident,
} from '../../api'
import { FormWrapper } from '../../components/FormWrapper'
import { FormItem } from '../../components/FormItem'
import { Button, LinkButton, ButtonWrapper } from '../../components/Buttons'
import UserContext from '../../contexts/UserContext'

type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams> & {}
const Update = (props: Props) => {
  const [incident, setIncident] = useState<Incident>()
  const [description, setDescription] = useState('')
  const [type, setType] = useState<IncidentUpdate['type']>('update')

  const user = useContext(UserContext)

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    await addUpdateToIncident(user, props.match.params.id, description, type)

    props.history.replace(`/${props.match.params.id}`)
  }

  useEffect(() => {
    const unsubscribe = getIncident(props.match.params.id, setIncident)
    return unsubscribe
  }, [props.match.params.id])

  if (!incident) return <div>Loading...</div>

  if (incident.updates.some(update => update.type === 'resolved')) {
    // If it's already resolved, we go back to the incident status page
    return <Redirect to={`/${incident.id}`} />
  }

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Update incident</h1>
        <FormItem>
          <label css="margin-bottom: 0.5em" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            onChange={evt => setDescription(evt.currentTarget.value)}
            value={description}
          />
        </FormItem>
        <FormItem>
          <label css="margin-bottom: 0.5em" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            onChange={evt =>
              setType(evt.currentTarget.value as IncidentUpdate['type'])
            }
            value={type}
          >
            <option value="update">Update</option>
            <option value="resolved">Resolved</option>
          </select>
        </FormItem>
        <ButtonWrapper>
          <Button>Create update</Button>
          <LinkButton to="/">Cancel</LinkButton>
        </ButtonWrapper>
      </form>
    </FormWrapper>
  )
}

export default Update
