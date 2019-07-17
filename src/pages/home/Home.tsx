import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getIncidents, Incident as IncidentInterface } from '../../api'
import { PlusButton } from '../../components/PlusButton'
import useIncidentFilter from '../../hooks/useIncidentFilter'
import useInfiniteScroll from '../../hooks/useInfiniteScroll'
import IncidentCard from './IncidentCard'
import SearchBox from './SearchBox'
import Status from './Status'

const Centered = styled.div`
  display: flex;
  height: 10em;
  justify-content: center;
  align-items: center;
`

const RightAligned = styled.div`
  display: flex;
  flex-direction: row-reverse;

  @media (max-width: 768px) {
    width: 90vw;
    margin: 0 auto;
  }
`

const incidentsPerPage = 5

const Home = () => {
  const [incidentList, setIncidentList] = useState<Array<IncidentInterface>>()
  const [isFetching, setIsFetching] = useState(true)
  const [loadedAll, setLoadedAll] = useState(false)

  const [displayedIncidents, setDisplayedIncidents] = useState<
    Array<IncidentInterface>
  >([])

  const unsubscribe = useRef<() => void>()
  const page = useRef(0)

  const { isFiltering, handleSearch } = useIncidentFilter(setDisplayedIncidents)

  useInfiniteScroll(!isFetching && !isFiltering && !loadedAll, () =>
    setIsFetching(true)
  )

  const setIncidents = (incidents: Array<IncidentInterface>) => {
    if (isFetching && incidents.length < page.current * incidentsPerPage) {
      setLoadedAll(true)
    }
    setIsFetching(false)
    setIncidentList(incidents)
  }

  useEffect(() => {
    if (!isFetching) return

    if (loadedAll) {
      setIsFetching(false)
      return
    }

    if (unsubscribe.current) {
      unsubscribe.current()
    }

    page.current++
    unsubscribe.current = getIncidents(
      page.current * incidentsPerPage,
      setIncidents
    )
  }, [isFetching, loadedAll])

  useEffect(() => {
    if (!incidentList || isFiltering) return

    setDisplayedIncidents(incidentList)
  }, [incidentList, isFiltering])

  if (!incidentList) {
    return <Centered>Loading ...</Centered>
  }

  return (
    <>
      <Status incidentList={incidentList} />

      <RightAligned>
        <SearchBox onSearch={handleSearch} />
      </RightAligned>

      {displayedIncidents.map(incident => {
        return <IncidentCard key={incident.id} incident={incident} />
      })}

      <Centered>{isFetching && !loadedAll && 'Loading ...'}</Centered>

      <PlusButton to="/create">+</PlusButton>
    </>
  )
}

export default Home
