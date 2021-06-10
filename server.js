const { PeerServer } = require('peer')

const peerServer = PeerServer({
  port: 9000,
  path: '/myapp',
})

peerServer.on('connection', (client) => {
  console.log(client.getId(), 'connected')
})

peerServer.on('disconnect', (client) => {
  console.log(client.getId(), 'disconnected')
})
