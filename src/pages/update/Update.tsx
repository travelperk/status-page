import React, { useState, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { getIncident, addUpdateToIncident, IncidentUpdate } from '../../api'
import { FormWrapper } from '../../components/FormWrapper'
import { FormItem } from '../../components/FormItem'
import Button from '../../components/Button'

type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams> & {}
const Update = (props: Props) => {
  const [incident, setIncident] = useState()
  const [description, setDescription] = useState('')
  const [type, setType] = useState<IncidentUpdate['type']>('update')

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    await addUpdateToIncident(props.match.params.id, description, type)

    props.history.replace('/')
  }
  useEffect(() => {
    const unsubscribe = getIncident(props.match.params.id, setIncident)
    return unsubscribe
  }, [props.match.params.id])

  if (!incident) return <div>Loading</div>

  return (
    <FormWrapper>
      <form onSubmit={handleSubmit}>
        <h1>Update incident</h1>
        <FormItem>
          {/* 
        // @ts-ignore */}
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
          {/* 
        // @ts-ignore */}
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
        <Button>Update incident</Button>
      </form>
    </FormWrapper>
  )
}

export default Update
