const renderDefs = (defs) => Object.keys(defs)
	.reduce((lines, id) => {
		const maker = defs[id]
		const xml = maker(id)
		lines.push(xml)
		return lines
	}, [])
	.join('\n')

const makeSVG = (width, height, defs, inner) => (
`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">
<defs>${renderDefs(defs)}</defs>
${inner.join('\n')}
</svg>`
)

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

const prepareLinearGradient = (stops, { x1, x2, y1, y2 } = {}) => (id) => (
	`<linearGradient ${renderAttrs({ id, x1, x2, y1, y2 })}>${stops.map(makeStop).join('')}</linearGradient>`
)

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
		path: '/swatches:{width},{height}/rect/fill:random-gradient',
		handler({
			params: { width, height }
		}, reply) {
			reply(makeSVG(width, height, {
				gradient1: prepareLinearGradient([
					{ offset: '0%', color: randomRGB() },
					{ offset: '100%', color: randomRGB() }
				], toBottom)
			}, [
				makeRect('100%', '100%', { fill: 'url(#gradient1)' })
			]))
			.type(svgMimeType)
		}
	},
	{
		method: 'get',
		path: '/swatches:{width},{height}/circle/fill:linear-gradient:{color1},{color2}',
		handler({
			params: { width, height, color1, color2 }
		}, reply) {
			reply(makeSVG(width, height, {
				gradient1: prepareLinearGradient([
					{ offset: '0%', color: processColor(color1) },
					{ offset: '100%', color: processColor(color2) }
				], toBottom)
			}, [
				makeCircle('50%', '50%', '50%', { fill: 'url(#gradient1)' })
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
