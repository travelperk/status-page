import React, { useState, useEffect } from 'react'
import { getAllIncidents, Incident as IncidentInterface } from '../../api/index'
import Status from './Status'
import Incident from './Incident'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const AddIncident = styled(Link)`
  position: fixed;
  bottom: 8vh;
  right: calc(10vw - 2em / 2 - 6px);
  border-radius: 50%;
  width: 2em;
  height: 2em;
  background-color: #147cba;
  color: white;
  font-size: 2rem;
  box-shadow: 0 0 4px 2px #0003;
  box-sizing: border-box;
  text-decoration: none;
  text-align: center;
  line-height: 1.8em;
`

const Home = () => {
  const [incidentList, setIncidentList] = useState<Array<IncidentInterface>>()
  useEffect(() => {
    getAllIncidents(setIncidentList)
  }, [])

  if (!incidentList) {
    return <div>Loading ...</div>
  }

  return (
    <>
      <Status incidentList={incidentList} />
      {incidentList.map(incident => {
        return (
          <Incident
            key={incident.updates[0].timestamp.seconds}
            incident={incident}
          />
        )
      })}
      <AddIncident to="/create">+</AddIncident>
    </>
  )
}

export default Home
