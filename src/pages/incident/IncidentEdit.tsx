import React, {useEffect, useState} from 'react'
import {
  updateIncident,
  getIncident,
  Incident,
  Services,
  ServicesType,
} from '../../api'
import { History } from 'history'
import { RouteComponentProps } from 'react-router-dom'
import { Button, LinkButton, ButtonWrapper } from '../../components/Buttons'
import { FormItem } from '../../components/FormItem'
import { FormWrapper } from '../../components/FormWrapper'


type MatchParams = {
  id: string
}

type Props = RouteComponentProps<MatchParams> & {history: History}

const IncidentEdit = (props: Props) => {
  const loadingTitle = 'Loading ...'
  const [title, setTitle] = useState(loadingTitle)
  const [services, setServices] = useState<Array<ServicesType>>([])
  const [incident, setIncident] = useState<Incident>()
  useEffect(() => {
    getIncident(props.match.params.id, setIncident)
  }, [props.match.params.id])


  if (incident && title === loadingTitle) {
    setTitle(incident.title)
    setServices(incident.services)
  }

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    await updateIncident(incident ? incident.id : '', title, services)
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
      <h1>Edit incident</h1>
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
        <ButtonWrapper>
          <Button>Update incident</Button>
          <LinkButton to="/">Cancel</LinkButton>
        </ButtonWrapper>
      </form>
    </FormWrapper>
  )
}

export default IncidentEdit
