const join = () => {
  let peer = new Peer('peer2', {
    host: 'localhost',
    port: 9000,
    path: '/myapp',
    debug: true,
  })
  peer.on('open', (id) => {
    // Workaround for peer.reconnect deleting previous id
    console.log('ID: ' + id)
  })

  peer.on('connection', (conn) => {
    console.log(conn)
    conn.on('data', (data) => {
      // Will print 'hi!'
      console.log(data)
    })
    conn.on('open', () => {
      console.log('连接打开')
      conn.send('hello!')
    })
  })

  peer.on('disconnected', () => {
    console.log('Connection lost. Please reconnect')
    // Workaround for peer.reconnect deleting previous id
  })
  peer.on('close', function () {
    console.log('Connection destroyed')
  })
  peer.on('error', function (err) {
    console.log(err)
    alert('' + err)
  })
}

join()
