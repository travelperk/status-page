/*
 * This file was automatically generated using `npm run generate-icons`
 * DO NOT EDIT IT!!
 * If you need to modify the base template you can find it in `utils/icon-template.js`
 */

import React, { MouseEvent } from 'react'
import 'styled-components/macro'
import {
  color as colorVariables,
  typeScale,
  VerticalAlign,
  ColorName,
} from '../utils/variables'
import parseSize from '../utils/parseSize'

type Props = {
  className?: string
  name?: string
  color: ColorName
  size: string | number
  verticalAlign: VerticalAlign
  id?: string
  'data-testid'?: string
  onClick: (evt: MouseEvent) => void
  css?: string
}

const HotelIcon = (props: Props) => {
  const {
    color: colorName,
    size,
    verticalAlign,
    className,
    name,
    onClick,
  } = props
  const color = colorVariables[colorName]

  return (
    <svg
      data-testid={props['data-testid']}
      css={`
        overflow: hidden;
        fill: ${color};
        color: ${color};
        vertical-align: ${verticalAlign};
        font-size: ${parseSize(size)};
      `}
      className={className}
      name={name}
      onClick={onClick}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
    >
      <path
        d="M12 11.013V14h8v-2a2 2 0 0 0-2-2h-4.998c-.668 0-1.002.338-1.002 1.013zM4 16v2a1 1 0 0 1-2 0V6a1 1 0 1 1 2 0v8h6V9.02c0-.68.337-1.02 1.01-1.02H18a4 4 0 0 1 4 4v6a1 1 0 0 1-2 0v-2H4zm3-3a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

HotelIcon.defaultProps = {
  color: 'steel',
  size: typeScale.size0.fontSize,
  verticalAlign: 'text-top',
  onClick: () => {},
}

export default HotelIcon
