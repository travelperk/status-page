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

const PlaneIcon = (props: Props) => {
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
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
    >
      <defs>
        <path
          d="M4.91 11.286h5.22L8.727 4h1.637l3.506 7.286h5.922c.667 0 1.208.539 1.208 1.214 0 .67-.552 1.214-1.208 1.214H13.87L10.364 21H8.727l1.403-7.286H4.91l-1.092 2.429H3V8.857h.818l1.091 2.429z"
          id={`${props.id || 'PlaneIcon'}-a`}
        />
      </defs>
      <use
        fill="currentColor"
        xlinkHref={`#${props.id || 'PlaneIcon'}-a`}
        fillRule="evenodd"
      />
    </svg>
  )
}

PlaneIcon.defaultProps = {
  color: 'steel',
  size: typeScale.size0.fontSize,
  verticalAlign: 'text-top',
  onClick: () => {},
}

export default PlaneIcon
