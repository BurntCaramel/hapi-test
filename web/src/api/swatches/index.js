import { getURL } from '../1'

export const linearGradientRandom = 'linear-gradient:random,random'

export const getURLForCircleSVG = (width, height, fillPath) => (
  getURL(`/swatches:${width},${height}/circle/fill:${fillPath}`)
)
