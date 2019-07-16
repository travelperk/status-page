import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { color } from '../utils/variables'

export const Button = styled.button<{
  level?: 'default' | 'primary' | 'cancel'
}>`
  border: none;
  color: ${color.madrugada};
  background-color: ${color.snowLight};
  padding: 0.5em 1em;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 0 4px 2px #0003;

  ${({ level }) =>
    level === 'primary'
      ? css`
          color: ${color.white};
          background-color: ${color.green};
        `
      : level === 'cancel'
      ? css`
          color: blue;
          background-color: ${color.red};
        `
      : null};
`
Button.defaultProps = { level: 'default' }

export const LinkButton = styled(Link)<{
  level?: 'default' | 'primary' | 'cancel'
}>`
  background-color: ${color.snowLight};
  color: ${color.madrugada};
  padding: 0.5em 1em;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1.2rem;
  cursor: pointer;
  box-shadow: 0 0 4px 2px #0003;
  text-decoration: none;

  ${({ level }) =>
    level === 'primary'
      ? css`
          color: ${color.white};
          background-color: ${color.green};
        `
      : level === 'cancel' &&
        css`
          color: ${color.white};
          background-color: ${color.red};
        `}: null;
`
LinkButton.defaultProps = { level: 'default' }

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2em 0;
`
