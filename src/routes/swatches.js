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

const makeStop = ({ offset, color }) => (
	`<stop offset="${offset}" stop-color="${color}" />`
)

const prepareLinearGradient = (stops) => (id) => (
	`<linearGradient id="${id}">${stops.map(makeStop).join('')}</linearGradient>`
)

const hexDigits = '0123456789abcdef'
const randomNumberUpTo = (max) => Math.floor(Math.random() * (max + 1))
const randomHex = () => hexDigits[randomNumberUpTo(15)]
const randomRGB = () => (
	'#' + randomHex() + randomHex() + randomHex()
	// + randomHex() + randomHex() + randomHex()
)

module.exports = [
	{
		method: 'get',
		path: '/swatches/random-gradient',
		handler(request, reply) {
			reply(makeSVG(20, 20, {
				gradient1: prepareLinearGradient([
					{ offset: '0%', color: randomRGB() },
					{ offset: '100%', color: randomRGB() }
				])
			}, [
				makeRect(20, 20, { fill: 'url(#gradient1)' })
			]))
			.type('image/svg+xml')
		}
	},
	{
		method: 'get',
		path: '/swatches/random-color',
		handler(request, reply) {
			reply(makeSVG(20, 20, [], [
				makeRect(20, 20, { fill: randomRGB() })
			]))
			.type('image/svg+xml')
		}
	},
	{
		method: 'get',
		path: '/swatches/hex:{fill}',
		handler({ params }, reply) {
			reply(makeSVG(20, 20, [                                                                                            
				makeRect(20, 20, { fill: '#' + params.fill })                                                                             
			]))                                                                                                                
			.type('image/svg+xml')   
		}
	}
]
