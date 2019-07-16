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

const CarIcon = (props: Props) => {
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
        d="M7 18.786v.714a1.5 1.5 0 0 1-3 0v-.714H3a1 1 0 0 1-1-1V13c0-1.314.31-2.299 1.017-2.741.125-2.075.9-3.765 2.324-5.012C7.5 3.36 8.628 3 12 3c3.307 0 4.553.405 6.659 2.247 1.379 1.207 2.144 2.896 2.308 5.012.688.44 1 1.41 1.033 2.716.033 1.35.033 2.958 0 4.83a1 1 0 0 1-1 .981h-1v.714a1.5 1.5 0 0 1-3 0v-.714H7zm8.333-5.286c.369 0 .667.448.667 1s-.298 1-.667 1H8.667c-.369 0-.667-.448-.667-1s.298-1 .667-1h6.666zM6 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm12 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zM4 16.786h16.015c.017-1.43.012-2.684-.015-3.761-.012-.495-.07-.846-.15-1.036a1 1 0 0 1-.85-.976c-.025-1.925-.584-3.32-1.659-4.26C15.627 5.253 14.85 5 12 5c-2.918 0-3.578.21-5.341 1.753-1.13.989-1.684 2.372-1.66 4.233a1 1 0 0 1-.875 1.006C4.05 12.176 4 12.517 4 13v3.786zM16.714 10c.434 0 .786.224.786.5s-.352.5-.786.5H7.286c-.434 0-.786-.224-.786-.5s.352-.5.786-.5h9.428z"
        fill="currentColor"
        fillRule="nonzero"
      />
    </svg>
  )
}

CarIcon.defaultProps = {
  color: 'steel',
  size: typeScale.size0.fontSize,
  verticalAlign: 'text-top',
  onClick: () => {},
}

export default CarIcon
