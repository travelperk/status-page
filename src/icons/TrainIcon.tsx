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

const TrainIcon = (props: Props) => {
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
        d="M17.908 18.86l1.87 2.575a1 1 0 1 1-1.618 1.175l-.443-.61H6.283l-.443.61a1 1 0 1 1-1.618-1.175l1.87-2.575A3.001 3.001 0 0 1 4 16V8a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v8c0 1.34-.879 2.475-2.092 2.86zm-2.37.14H8.462l-.727 1h8.528l-.727-1zM10 4a4 4 0 0 0-4 4v8a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V8a4 4 0 0 0-4-4h-4zm0 3a1 1 0 0 0-1 1v3h6V8a1 1 0 0 0-1-1h-4zm0-2h4a3 3 0 0 1 3 3v5H7V8a3 3 0 0 1 3-3zm6 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm-8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

TrainIcon.defaultProps = {
  color: 'steel',
  size: typeScale.size0.fontSize,
  verticalAlign: 'text-top',
  onClick: () => {},
}

export default TrainIcon
