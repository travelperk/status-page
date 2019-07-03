import React from 'react'
import styled from 'styled-components'
import Button from './Button'

const Wrapper = styled.div`
  background-color: #1396e4;
  color: #ffffff;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  padding: 1em 2em;
  margin: 0 auto;
  width: 60vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
`

type Props = {
  children: React.ReactNode
  action: () => void
  actionText: string
}

const Toast = (props: Props) => {
  return (
    <Wrapper>
      {props.children}
      <Button onClick={props.action}>{props.actionText}</Button>
    </Wrapper>
  )
}

export default Toast
