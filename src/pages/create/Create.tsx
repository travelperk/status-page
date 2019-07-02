import React, { useState } from 'react'
import {
  createIncident,
  Incident,
  Services,
  ServicesType,
} from '../../api/index'
import { History } from 'history'

type Props = {
  history: History
}

const Create = (props: Props) => {
  const [title, setTitle] = useState()
  const [type, setType] = useState<Incident['type']>('degraded')
  const [services, setServices] = useState<Array<ServicesType>>([])
  const [description, setDescription] = useState()

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
    <>
      <h1>create!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            onChange={evt => setTitle(evt.currentTarget.value)}
            value={title}
          />
        </label>
        {title}
        <label>
          Type
          <select
            onChange={evt =>
              setType(evt.currentTarget.value as Incident['type'])
            }
            value={type}
          >
            <option value="degraded">Degraded</option>
            <option value="down">Down</option>
          </select>
        </label>
        {type}
        <button>Create incident</button>
        <label>
          Services
          {Services.map(service => (
            <label>
              {service}
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => toggleType(service)}
              />
            </label>
          ))}
        </label>
        {services.join(',')}

        <label>
          Description
          <input
            type="text"
            onChange={evt => setDescription(evt.currentTarget.value)}
            value={description}
          />
        </label>
      </form>
    </>
  )
}

export default Create
