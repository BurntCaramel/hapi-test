import { getURL } from '../1'

export const linearGradientRandom = 'linear-gradient:random,random'

export const getURLForSVG = (width, height, shape, fillPath) => (
  getURL(`/swatches:${width},${height}/${shape}/fill:${fillPath}`)
)
