import { getURL } from '../1'

export const linearGradientRandom = 'linear-gradient:random,random'

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
