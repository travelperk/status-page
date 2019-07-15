import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getIncidents, Incident as IncidentInterface } from '../../api/index'
import { PlusButton } from '../../components/PlusButton'
import IncidentCard from './IncidentCard'
import Status from './Status'

const Centered = styled.div`
  display: flex;
  height: 10rem;
  justify-content: center;
  align-items: center;
`

const Home = () => {
  const [incidentList, setIncidentList] = useState<Array<IncidentInterface>>([])
  const [isFetching, setIsFetching] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const unsubscribe = useRef<() => void>()

  const addIncidents = (incidents: Array<IncidentInterface>) => {
    if (incidents.length === 0) {
      setLoadedAll(true)
    }
    setIsFetching(false)
    setIncidentList(incidents)
  }

  useEffect(() => {
    setIsFetching(true)
  }, [])

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setIsFetching(!loadedAll)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) {
      return
    }

    if (unsubscribe.current) {
      unsubscribe.current()
    }

    unsubscribe.current = getIncidents(addIncidents)
  }, [isFetching])

  return (
    <>
      <Status incidentList={incidentList} />
      {incidentList.map(incident => {
        return <IncidentCard key={incident.id} incident={incident} />
      })}

      {isFetching && <Centered>Loading ...</Centered>}

      <PlusButton to="/create">+</PlusButton>
    </>
  )
}

export default Home
