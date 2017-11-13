const Boom = require('boom')

const renderDefs = (defs) => Object.keys(defs)
	.reduce((lines, id) => {
		const maker = defs[id]
		const xml = maker(id)
		lines.push(xml)
		return lines
	}, [])
	.join('\n')

const makeSVG = (width, height, defs, children) => (
`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">
<defs>${defs.join('\n')}</defs>
${children.join('\n')}
</svg>`
)

const buildSVG = (width, height, buildChildren) => {
	let defs = []
	const children = buildChildren(defs)
	return makeSVG(width, height, defs, children)
}

const renderAttrs = (attrs) => Object.keys(attrs)
	.filter(key => Boolean(attrs[key])) // Filter out null values
	.map(key => `${key}="${attrs[key]}"`) // Display as html
	.join(' ')

const makeRect = (width, height, { fill } = {}) => (
	`<rect width="${width}" height="${height}" ${renderAttrs({ fill })} />`
)

const makeCircle = (r, cx, cy, { fill } = {}) => (
	`<circle ${renderAttrs({ r, cx, cy, fill })} />`
)

const toBottom = { x1: '50%', x2: '50%', y1: '0%', y2: '100%' }

const makeStop = ({ offset, color }) => (
	`<stop offset="${offset}" stop-color="${color}" />`
)

const prepareLinearGradient = (defs, stops, { x1, x2, y1, y2 } = {}) => {
	const id = `item-${defs.length}`
	defs.push(
		`<linearGradient ${renderAttrs({ id, x1, x2, y1, y2 })}>${stops.map(makeStop).join('')}</linearGradient>`
	)
	return `url(#${id})`
}

const hexDigits = '0123456789abcdef'
const randomNumberUpTo = (max) => Math.floor(Math.random() * (max + 1))
const randomHex = () => hexDigits[randomNumberUpTo(15)]
const randomRGB = () => (
	'#' + randomHex() + randomHex() + randomHex()
	// + randomHex() + randomHex() + randomHex()
)

const processColor = (input) => {
	if (input === 'random') {
		return randomRGB()
	}
	else {
		return input
	}
}

const processFill = (defs, input) => {
	const [type, valuesIn] = input.split(':')
	if (type === 'linear-gradient') {
		const [color1, color2] = valuesIn.split(',')
		return prepareLinearGradient(defs, [
			{ offset: '0%', color: processColor(color1) },
			{ offset: '100%', color: processColor(color2) }
		], toBottom)
	}
	else if (type === 'color') {
		return processColor(valuesIn)
	}
	else {
		throw Boom.badData(`Invalid fill type: '${type}'`)
	}
}

const svgMimeType = 'image/svg+xml'

const routes = [
	{
		method: 'get',
		path: '/swatches',
		handler(request, reply) {
			reply(routes.map(({ method, path }) => ({
				method,
				path
			})))
		}
	},
	{
		method: 'get',
		path: '/swatches:{width},{height}/rect/fill:{fill}',
		handler({
			params: { width, height, fill }
		}, reply) {
			reply(buildSVG(width, height, (defs) => [
				makeRect('100%', '100%', { fill: processFill(defs, fill) })
			]))
			.type(svgMimeType)
		}
	},
	{
		method: 'get',
		path: '/swatches:{width},{height}/circle/fill:{fill}',
		handler({
			params: { width, height, fill }
		}, reply) {
			reply(buildSVG(width, height, (defs) => [
				makeCircle('50%', '50%', '50%', { fill: processFill(defs, fill) })
			]))
			.type(svgMimeType)
		}
	},
	{
		method: 'get',
		path: '/swatches/random-color',
		handler(request, reply) {
			reply(makeSVG(20, 20, [], [
				makeRect(20, 20, { fill: randomRGB() })
			]))
			.type(svgMimeType)
		}
	},
	{
		method: 'get',
		path: '/swatches/hex:{fill}',
		handler({ params }, reply) {
			reply(makeSVG(20, 20, [                                                                                            
				makeRect(20, 20, { fill: '#' + params.fill })                                                                             
			]))                                                                                                                
			.type(svgMimeType)   
		}
	}
]

module.exports = routes
