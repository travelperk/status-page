import React, { useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'
import styled from 'styled-components'
import SearchIcon from '../../icons/SearchIcon'
import { color } from '../../utils/variables'

const Container = styled.div<{ focused: boolean }>`
  display: flex;
  align-items: center;
  padding: 0.3em;
  cursor: text;

  border: 3px solid ${props => (props.focused ? color.smokeDark : color.snow)};
  transition: border 0.2s linear;
`

const Input = styled.input`
  border: none;
  margin-left: 0.5em;

  &:focus {
    outline: none;
  }
`

type Props = {
  onSearch: (query: string) => void
}

const SearchBox = (props: Props) => {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const lastQuery = useRef(query)

  const inputRef = useRef<HTMLInputElement>(null)

  const search = debounce(() => {
    props.onSearch(query)
  }, 500)

  useEffect(() => {
    if (lastQuery.current === query) {
      return
    }
    lastQuery.current = query

    search()
    return search.cancel
  }, [query])

  return (
    <Container
      focused={focused}
      onClick={() => inputRef.current && inputRef.current.focus()}
    >
      <SearchIcon size="1.5em" />{' '}
      <Input
        value={query}
        onChange={evt => setQuery(evt.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        ref={inputRef}
        role="search"
      />
    </Container>
  )
}

export default SearchBox
