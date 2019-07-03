import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Button = styled.button`
  border: none;
  background-color: #f9fafc;
  color: #000;
  padding: 0.5em 1em;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 0 4px 2px #0003;
`
export const LinkButton = styled(Link)`
  background-color: #f9fafc;
  color: #000;
  padding: 0.5em 1em;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 0 4px 2px #0003;
  text-decoration: none;
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
`
