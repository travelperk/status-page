import React from 'react'
import styled from 'styled-components'
import PlaneIcon from '../icons/PlaneIcon'
import HotelIcon from '../icons/HotelIcon'
import TrainIcon from '../icons/TrainIcon'
import CarIcon from '../icons/CarIcon'

const List = styled.ul`
  padding-left: 0;
  list-style-type: none;
  display: flex;
`

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #147cba;
  color: white;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  text-transform: uppercase;
  margin-right: 1em;

  svg {
    margin-right: 0.1em;
  }
`

type Props = {
  services: Array<string>
}

const serviceIcon = (service: string) => {
  if (service === 'flights')
    return (
      <Li key={service}>
        <PlaneIcon color="white" size="1.5em" />
        {service}
      </Li>
    )
  else if (service === 'hotels')
    return (
      <Li key={service}>
        <HotelIcon color="white" size="1.5em" />
        {service}
      </Li>
    )
  else if (service === 'trains')
    return (
      <Li key={service}>
        <TrainIcon color="white" size="1.5em" />
        {service}
      </Li>
    )
  else if (service === 'cars')
    return (
      <Li key={service}>
        <CarIcon color="white" size="1.5em" />
        {service}
      </Li>
    )
  else return <Li key={service}>{service}</Li>
}

const ServiceList = (props: Props) => {
  return <List>{props.services.map(service => serviceIcon(service))}</List>
}

export default ServiceList
