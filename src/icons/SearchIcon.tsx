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

const SearchIcon = (props: Props) => {
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
        d="M16.462 15.05l.045.043 4.2 4.2a1 1 0 0 1-1.414 1.414l-4.2-4.2a1.015 1.015 0 0 1-.042-.045 7.5 7.5 0 1 1 1.412-1.412zM10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  )
}

SearchIcon.defaultProps = {
  color: 'steel',
  size: typeScale.size0.fontSize,
  verticalAlign: 'text-top',
  onClick: () => {},
}

export default SearchIcon
