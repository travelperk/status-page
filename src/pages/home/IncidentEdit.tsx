import React, {useEffect, useState} from 'react'
import {
  updateIncident,
  getIncident,
  Incident,
  Services,
  ServicesType,
} from '../../api/index'
import { History } from 'history'
import { RouteComponentProps } from 'react-router-dom'
import { Button } from '../../components/Buttons'
import { FormItem } from '../../components/FormItem'
import { FormWrapper } from '../../components/FormWrapper'


type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams> & {history: History}

const IncidentEdit = (props: Props) => {
  const loadingTitle = 'Loading ...'
  const [title, setTitle] = useState(loadingTitle)
  const [type, setType] = useState<Incident['type']>('degraded')
  const [services, setServices] = useState<Array<ServicesType>>([])
  const [incident, setIncident] = useState<Incident>()
  useEffect(() => {
    getIncident(props.match.params.id, setIncident)
  }, [props.match.params.id])


  if (incident && title === loadingTitle) {
    setTitle(incident.title)
    setType(incident.type)
    setServices(incident.services)
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()

    await updateIncident({
      id: incident ? incident.id : '',
      title,
      type,
      services,
      updates: incident ? incident.updates : [],
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
      <h1>Update incident</h1>
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
            <label
              key={service}
              css="margin-right: 1em; text-transform: capitalize"
            >
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => toggleType(service)}
              />
              {service}
            </label>
          ))}
        </div>
        <Button>Update incident</Button>
      </form>
    </FormWrapper>
  )
}

export default IncidentEdit
