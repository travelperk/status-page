import { spacerSizeNumber } from './variables'

/* eslint-disable travelperk/only-tsx */

const units = ['px', 'em', 'rem', 'vw', 'vh', '%', 'vmin', 'vmax']
const validCssSizeKeywords = [
  'auto',
  'inherit',
  'unset',
  'initial',
  'cover',
  'contain',
]

export function getMultiSpacing(multiplier /* : number */) /* : string */ {
  return `${spacerSizeNumber * multiplier}px`
}

export function getSizeUnit(size /* : string */) /* : string */ {
  return units.find(unit => size.endsWith(unit)) || ''
}

const isValidCssSize = (size /* : string */) => {
  const endsWithSizeUnit = units.some(unit => size.endsWith(unit))
  const isValidSizeKeyword = validCssSizeKeywords.includes(size)
  return endsWithSizeUnit || isValidSizeKeyword
}

export default function parseSize(size /* : string | number */) /* : string */ {
  if (typeof size === 'string' && isValidCssSize(size)) {
    return size
  }
  return `${size}px`
}
