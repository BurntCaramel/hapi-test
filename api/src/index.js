const Hapi = require('hapi')

const server = new Hapi.Server()
const port = process.env.PORT || 7010
server.connection({ port })

server.route([
	{
		method: 'GET',
		path: '/',
		handler(request, reply) {
			reply({ test: 456 })
		}
	}
])

server.route(require('./routes/swatches'))

server.start()
	.then(() => {
		console.log(`Started ${JSON.stringify(server.connections[0].info.uri)}`)
	})
	.catch(error => {
		console.error(error)
	})