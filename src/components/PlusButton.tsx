import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const PlusButton = styled(Link)`
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

  @media (max-width: 768px) {
    bottom: 4vh;
    right: 2vw;
  }
`
