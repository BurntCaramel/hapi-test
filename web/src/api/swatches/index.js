import { getURL } from '../1'

const hexDigits = '0123456789abcdef'
const randomNumberUpTo = (max) => Math.floor(Math.random() * (max + 1))
const randomHex = () => hexDigits[randomNumberUpTo(15)]
export const randomRGB = () => (
	'#' + randomHex() + randomHex() + randomHex()
	+ randomHex() + randomHex() + randomHex()
)

export const getPathForFill = ({ type, args }) => {
  switch (type) {
    case 'linear-gradient':
      return `linear-gradient:${args.map(encodeURIComponent).join(',')}`
    default:
      throw new Error(`Unknown fill type: ${type}`)
  }
}



export const getURLForSVG = (width, height, shape, fillPath) => (
  getURL(`/swatches:${width},${height}/${shape}/fill:${fillPath}`)
)
