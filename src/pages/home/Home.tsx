import React, { useState, useEffect } from 'react'
import { getAllIncidents, Incident as IncidentInterface } from '../../api/index'
import Status from './Status'
import Incident from './Incident'
import { PlusButton } from '../../components/PlusButton'

const Home = () => {
  const [incidentList, setIncidentList] = useState<Array<IncidentInterface>>()
  useEffect(() => {
    const unsubscribe = getAllIncidents(setIncidentList)
    return unsubscribe
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
      <PlusButton to="/create">+</PlusButton>
    </>
  )
}

export default Home
