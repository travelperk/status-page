import React, { useState } from 'react'
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
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  history: History
}

const ServicesWrapper = styled.div`
  text-transform: capitalize;
  display: inline;
  margin-right: 1em;
`

const Create = (props: Props) => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<Incident['type']>('degraded')
  const [services, setServices] = useState<Array<ServicesType>>([])
  const [description, setDescription] = useState('')

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    await createIncident({
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
    <FormWrapper>
      <h1>Create incident</h1>
      <form onSubmit={handleSubmit}>
        <FormItem>
          <label css="margin-bottom: 0.5em" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            onChange={evt => setTitle(evt.currentTarget.value)}
            value={title}
          />
        </FormItem>
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
              setType(evt.currentTarget.value as Incident['type'])
            }
            value={type}
          >
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
        </FormItem>
        <div css="margin-bottom: 1em">
          <p>Services affected</p>
          {Services.map(service => (
            <ServicesWrapper>
              <label key={service}>
                <input
                  type="checkbox"
                  checked={services.includes(service)}
                  onChange={() => toggleType(service)}
                />
                {service}
              </label>
            </ServicesWrapper>
          ))}
        </div>
        <ButtonWrapper>
          <Button>Create incident</Button>
          <LinkButton to="/">Cancel</LinkButton>
        </ButtonWrapper>
      </form>
    </FormWrapper>
  )
}

export default Create
