const gutterWidth = '32px'
export const gutterCompensation = `calc(${gutterWidth} * 0.5 * -1)`
export const halfGutterWidth = `calc(${gutterWidth} * 0.5)`

export type VerticalAlign =
  | 'baseline'
  | 'sub'
  | 'super'
  | 'text-top'
  | 'text-bottom'
  | 'middle'
  | 'top'
  | 'bottom'

export const viewport = Object.freeze({
  sm: 'only screen and (min-width:512px)',
  md: 'only screen and (min-width:768px)',
  lg: 'only screen and (min-width:1024px)',
  xl: 'only screen and (min-width:1280px)',
  xxl: 'only screen and (min-width:1440px)',
})

export const containerWidth = '1440px'
export const containerPadding = '48px'

export const spacerSizeNumber = 8
export const spacerSize = `${spacerSizeNumber}px`

export const font = Object.freeze({
  serif:
    "'Graphik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
})

export const fontWeight: Readonly<{ [key: string]: string }> = Object.freeze({
  regular: '400',
  medium: '500',
  bold: '600',
})

export const typeScale: Readonly<{
  [key: string]: { [key: string]: string }
}> = Object.freeze({
  size6: {
    fontSize: '48px',
    fontWeight: fontWeight.bold,
    lineHeight: '64px',
  },
  size5: {
    fontSize: '38px',
    fontWeight: fontWeight.bold,
    lineHeight: '48px',
  },
  size4: {
    fontSize: '28px',
    fontWeight: fontWeight.bold,
    lineHeight: '40px',
  },
  size3: {
    fontSize: '22px',
    lineHeight: '32px',
    fontWeight: fontWeight.medium,
  },
  size2: {
    fontSize: '18px',
    lineHeight: '28px',
    fontWeight: fontWeight.medium,
  },
  size1: {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: fontWeight.medium,
  },
  size0: {
    fontSize: '14px',
    lineHeight: '24px',
  },
  sizeN1: {
    fontSize: '12px',
    lineHeight: '20px',
  },
  sizeN2: {
    fontSize: '10px',
    lineHeight: '16px',
  },
})
export type TypeScale = keyof typeof typeScale

export const maxWidths = Object.freeze({
  medium: '256px',
  large: '384px',
})

export const color = Object.freeze({
  white: '#fff',
  // rgba(255, 255, 255, 1)
  // White is the main background color. It's also used for icons and text on colored background if the contrast is high enough.

  whiteAlpha10: 'rgba(255, 255, 255, 0.1)',
  whiteAlpha20: 'rgba(255, 255, 255, 0.2)',
  whiteAlpha50: 'rgba(255, 255, 255, 0.5)',
  whiteAlpha80: 'rgba(255, 255, 255, 0.8)',
  // whiteAlpha colors are used to give contrast change of a dynamic background color.
  // If the background color change following the context, it will help to keep consistent color palette.
  // Ex: A messageBox can be red or green. Using an alpha color will keep the color beneath.

  black: '#000',
  // rgba(0, 0, 0, 1)
  // Black is almost never used as we prefer to use Madrugada. Although, shadow colors will be black.

  blackAlpha10: 'rgba(0, 0, 0, 0.1)',
  blackAlpha20: 'rgba(0, 0, 0, 0.2)',
  blackAlpha50: 'rgba(0, 0, 0, 0.5)',
  blackAlpha80: 'rgba(0, 0, 0, 0.8)',
  // blackAlpha colors are used to give contrast change of a dynamic background color.
  // If the background color change following the context, it will help to keep consistent color palette.
  // Ex: A messageBox can be red or green. Using an alpha color will keep the color beneath.

  // Snow colors are mainly used for background colors. They should never be used for other purposes.
  snowLight: '#F9FAFC',
  // Use cautiously because the contrast with white is very low.
  snow: '#EFF3F7',
  snowDark: '#E5EBF2',

  // Smoke colors are used for borders and "disabled elements".
  smokeLight: '#D9E2EC',
  // smokelight is the default border color. On a gray background, we'll use smoke or smokeDark. On a coloured background, blackAlpha10
  smoke: '#C2D0DE',
  smokeDark: '#ABB9C7',

  steel: '#79879D',
  // Default color for icons and subheadings. Often used for N2 texts, basically contextual info.
  slate: '#545C6C',
  // Use Slate to use contrast for hierarchy when steel is too light (ie on gray background). In case of a dark background, slate will be prefered to madrugada
  madrugada: '#1D2C3C',
  // Madrugada is the default "black" color, mainly used for text.

  // Apart from being our brand color, blue is the default action color. Everything that is blue should be clickable,
  // but it doesn't mean that everything that is clickable should be blue.
  blueLight: '#B2E2FF',
  blue: '#1396e4',
  blueDark: '#147CBA',

  // Green is used only for validation / confirmation message.
  greenLight: '#C5F6E0',
  green: '#2AC981',
  greenDark: '#0FA863',

  // Orange is used for warning messages (along with yellow), that are not blocking the user to perform an action.
  // In case of form validation, we'll prefer to use orange instead or red to lower the "danger feeling"
  orangeLight: '#FBD7C1',
  orange: '#FF8F49',
  orangeDark: '#E35300',

  // Red is used to show errors and elements that block the user to perform an action or very important information (ex: flight canceled)
  redLight: '#FED0D0',
  red: '#FC6363',
  redDark: '#CC3232',

  // Secondary color. Emerald is used now for in-app communication purposes (ie: new-feature)
  emeraldLight: '#E4FAF7',
  emerald: '#0CD2BC',
  emeraldDark: '#058C78',

  // Secondary color. Yellow is used for low warning messages (ie: search expiring in x min x sec )
  // It is also the main FlexiPerk color.
  yellowLighter: '#FEEBB6',
  yellowLight: '#FEDB7A',
  yellow: '#FFC82C',
  yellowDark: '#E6A517',
  yellowDarker: '#D39101',

  // Pink is the Out of Policy colors.
  // It's used as well for the "trips waiting for approval" badge, but we should change this and keep Pink only for Policy content.
  pinkLight: '#FFC9DA',
  pink: '#FB6090',
  pinkDark: '#DC3367',

  // Purple  is the Premium color.
  purpleLight: '#978FEC',
  purple: '#514A9D',
  purpleDark: '#302A73',

  premium: '#514A9D', // purple

  transparent: 'rgba(255, 255, 255, 0)',

  // "Leg" colors are used ONLY to visually distinguish multi-city flight filters. One color per leg.
  leg2: '#B2ABFF',
  leg3: '#F385D1',
  leg4: '#FFA9AC',
  leg5: '#FFB87A',
  leg6: '#3DC3C6',
})
export type ColorName = keyof typeof color
export type Color = typeof color[ColorName]

// Gradients are only used to the user color profile. For the user avatar and the background of the search in the homepage.
// Since the interface has no pictures and no graphic elements, this background is the only emotional and colorful touch.
export const gradient = Object.freeze({
  cornflowerBlue: {
    from: '#B8CEF5',
    to: '#A7BCE4',
    angle: 135,
  },
  dodgerBlue: {
    from: '#99D5FA',
    to: '#87C2E7',
    angle: 135,
  },
  mayaBlue: {
    from: '#A1D5E7',
    to: '#82BFD4',
    angle: 135,
  },
  viking: {
    from: '#9ADBDB',
    to: '#8BCECE',
    angle: 135,
  },
  aquamarine: {
    from: '#9DDFC6',
    to: '#8BD3B8',
    angle: 135,
  },
  algaeGreen: {
    from: '#A0DEA7',
    to: '#95DC94',
    angle: 135,
  },
  mindaro: {
    from: '#D3E69C',
    to: '#C5D98C',
    angle: 135,
  },
  lemon: {
    from: '#FAE898',
    to: '#F0D976',
    angle: 135,
  },
  salomie: {
    from: '#FACD98',
    to: '#F2BC7D',
    angle: 135,
  },
  macaroniAndCheese: {
    from: '#F8B4AA',
    to: '#F3AA9F',
    angle: 135,
  },
  salmon: {
    from: '#FB9C9C',
    to: '#F08989',
    angle: 135,
  },
  carnationPink: {
    from: '#FFB2CB',
    to: '#F7A1BD',
    angle: 135,
  },
  wisteria: {
    from: '#DFC2EC',
    to: '#D8B2E9',
    angle: 135,
  },
  perano: {
    from: '#C8C5F2',
    to: '#B7B3EA',
    angle: 135,
  },
})
export type GradientName = keyof typeof gradient
export type Gradient = typeof gradient[GradientName]

export const shadow = Object.freeze({
  z0: {
    boxShadow: 'none',
  },
  z1: {
    boxShadow:
      '0 4px 8px 0 rgba(50,50,93,0.06), 0 0 4px 0 rgba(121,135,157,0.10), 0 2px 6px 0 rgba(50,50,93,0.06)',
  },
  z2: {
    boxShadow:
      '0 12px 35px 0 rgba(50,50,93,0.10), 0 2px 6px 0 rgba(50,50,93,0.06)',
  },
  z3: {
    boxShadow:
      '0 16px 47px 0 rgba(50,50,93,0.10), 0 2px 16px 0 rgba(50,50,93,0.06)',
  },
  z4: {
    boxShadow:
      '0 20px 60px 0 rgba(50,50,93,0.08), 0 2px 26px 0 rgba(50,50,93,0.06)',
  },
  z5: {
    boxShadow: '0 30px 100px 0 rgba(29,44,60,0.15)',
  },
})

export type ShadowName = keyof typeof shadow

/*
zIndex should never be defined as an arbitrary value inside any of the applications
Please use the definitions below or one of the semantic mappings, adding any new semantic mappings as required
*/
const z1 = 8
const z2 = 16
const z3 = 24
const z4 = 32
const z5 = 40
const z6 = 48
const z7 = 56
const z8 = 64

export const zIndex = Object.freeze({
  z1,
  z2,
  z3,
  z4,
  z5,
  z6,
  z7,
  z8,

  /* Semantic zIndex mapping */
  flashMessage: z7,
  modal: z6,
  panel: z5,
  scrim: z4,
  header: z3,
  mapCard: z2,
  dropDown: z1, // Applies for things like DropDown menu items, Typeahead results, Date Selector
  toolTip: z1,
})

export type ZIndex = keyof typeof zIndex
