const makeSVG = (width, height, inner) => (
`<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}">
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

module.exports = [
	{
		method: 'get',
		path: '/swatches/random',
		handler(request, reply) {
			reply(makeSVG(20, 20, [
				makeRect(20, 20, { fill: '#0ff' })
			]))
			.type('image/svg+xml')
		}
	},
	{
		method: 'get',
		path: '/swatches/{fill}',
		handler(request, reply) {
			reply(makeSVG(20, 20, [                                                                                            
				makeRect(20, 20, { fill: params.fill })                                                                             
			]))                                                                                                                
			.type('image/svg+xml')   
		}
	}
]
