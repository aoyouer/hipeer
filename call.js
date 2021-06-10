// 注册到信令服务器
let peer
const join = () => {
  peer = new Peer('peer1', {
    host: 'localhost',
    port: 9000,
    path: '/myapp',
    debug: true,
  })

  peer.on('disconnected', () => {
    console.log('disconnect')
  })

  peer.on('close', () => {
    conn = null
    console.log('Connection destroyed')
  })

  peer.on('error', function (err) {
    console.log(err)
    alert('' + err)
  })
  return peer
}
const connect = (peerId) => {
  console.log('try to connect to', peerId)
  let conn = peer.connect(peerId)
  console.log(conn)

  conn.on('open', () => {
    console.log('Connected to: ' + conn.peer)
    conn.send('hi! from peer1')
  })

  conn.on('data', function (data) {
    console.log('receive data:', data)
  })
  conn.on('close', function () {
    console.log('connection cloes')
  })
}
join()
// 必须延迟执行或者通过其他的什么方式来触发，不然无法建立连接
setTimeout(() => {
  connect('peer2')
}, 5000)
