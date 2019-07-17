import { useEffect, useRef, useState } from 'react'
import { getIncidents, Incident } from '../api'

const incidentsToFilter = 100

const useIncidentFilter = (
  displayIncidents: (incidents: Array<Incident>) => void
) => {
  const [incidents, setIncidents] = useState<Array<Incident>>()
  const [filter, setFilter] = useState('')

  const initialFetchTriggered = useRef(false)

  const handleSearch = (filter: string) => {
    setFilter(filter)
  }

  useEffect(() => {
    if (filter === '' || initialFetchTriggered.current) {
      return
    }

    initialFetchTriggered.current = true
    getIncidents(incidentsToFilter, setIncidents)
  }, [filter])

  useEffect(() => {
    if (!incidents || filter === '') return

    const regExp = new RegExp(filter, 'i')
    displayIncidents(
      incidents.filter(
        incident =>
          regExp.test(incident.title) ||
          incident.updates.some(update => regExp.test(update.description))
      )
    )
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [incidents, filter])

  return {
    isFiltering: filter !== '',
    handleSearch,
  }
}

export default useIncidentFilter
