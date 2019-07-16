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

const incidentsPerPage = 5

const Home = () => {
  const [incidentList, setIncidentList] = useState<Array<IncidentInterface>>([])
  const [isFetching, setIsFetching] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const unsubscribe = useRef<() => void>()
  const page = useRef(0)

  const addIncidents = (incidents: Array<IncidentInterface>) => {
    if (incidents.length < page.current * incidentsPerPage) {
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
      setIsFetching(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching || loadedAll) {
      return
    }

    if (unsubscribe.current) {
      unsubscribe.current()
    }

    page.current++
    unsubscribe.current = getIncidents(
      page.current * incidentsPerPage,
      addIncidents
    )
  }, [isFetching, loadedAll])

  return (
    <>
      <Status incidentList={incidentList} />
      {incidentList.map(incident => {
        return <IncidentCard key={incident.id} incident={incident} />
      })}

      {isFetching && !loadedAll && <Centered>Loading ...</Centered>}

      <PlusButton to="/create">+</PlusButton>
    </>
  )
}

export default Home
