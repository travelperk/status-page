import React, { useState, useEffect } from 'react'
import { getAllIncidents, Incident as IncidentInterface } from '../../api/index'
import Status from './Status'
import Incident from './Incident'

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
    </>
  )
}

export default Home
