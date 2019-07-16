import React, { useContext, useState } from 'react'
import {
  createIncident,
  Incident,
  Services,
  ServicesType,
} from '../../api/index'
import { History } from 'history'
import { Button, LinkButton, ButtonWrapper } from '../../components/Buttons'
import { FormItem } from '../../components/FormItem'
import { FormWrapper } from '../../components/FormWrapper'
import styled from 'styled-components/macro'
import UserContext from '../../contexts/UserContext'
import { color } from '../../utils/variables'

type Props = {
  history: History
}

const Warning = styled.div`
  position: relative;
  margin: 3em 0;
  padding: 2em 1em;
  background: ${color.yellow};
  line-height: 1.5;

  em {
    font-weight: 600;
  }

  a {
    font-weight: 600;
    color: ${color.madrugada};
  }
`

const ServiceLabel = styled.label<{ checked: boolean }>`
  background: ${({ checked }) => (checked ? color.blue : color.smoke)};
  color: ${({ checked }) => (checked ? color.white : color.madrugada)};
  padding: 1em 1.5em;
  text-transform: capitalize;
  display: inline-block;
  margin-right: 1em;
  cursor: pointer;
  transition: 0.2s;

  input {
    display: none;
  }
`

function ServiceCheckBox(props: {
  service: ServicesType
  checked: boolean
  onChange: () => void
}) {
  return (
    <ServiceLabel checked={props.checked}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={() => props.onChange()}
      />
      {props.service}
    </ServiceLabel>
  )
}

const Create = (props: Props) => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<Incident['type']>('degraded')
  const [services, setServices] = useState<Array<ServicesType>>([])
  const [description, setDescription] = useState('')

  const user = useContext(UserContext)

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    await createIncident(user, {
      title,
      type,
      services,
      description,
    })

    props.history.replace('/')
  }

  const toggleType = (service: ServicesType) => {
    if (services.includes(service)) {
      setServices(services.filter(s => s !== service))
    } else {
      setServices([...services, service])
    }
  }

  return (
    <FormWrapper css="margin-top:3em;">
      <h1>Create New Incident</h1>
      <Warning>
        This page is intended to be used <em>only by engineers</em> to create
        new incidents. If you want to report a bug use{' '}
        <a href="https://tkbcn.typeform.com/to/vwZnDB">this form</a> instead so
        that we can address it faster.
      </Warning>
      <form onSubmit={handleSubmit}>
        <FormItem>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            onChange={evt => setTitle(evt.currentTarget.value)}
            value={title}
            required
          />
        </FormItem>
        <FormItem>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            onChange={evt => setDescription(evt.currentTarget.value)}
            value={description}
            required
            rows={3}
          />
        </FormItem>
        <FormItem>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            onChange={evt =>
              setType(evt.currentTarget.value as Incident['type'])
            }
            value={type}
          >
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
        </FormItem>
        <div css="margin-bottom: 1em">
          <p css="font-size:1.3em">Services affected</p>
          {Services.map(service => (
            <ServiceCheckBox
              key={service}
              service={service}
              checked={services.includes(service)}
              onChange={() => toggleType(service)}
            />
          ))}
        </div>
        <ButtonWrapper>
          <LinkButton to="/" level="cancel">
            Cancel
          </LinkButton>
          <Button level="primary">Create incident</Button>
        </ButtonWrapper>
      </form>
    </FormWrapper>
  )
}

export default Create
