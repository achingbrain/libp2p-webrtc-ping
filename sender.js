import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { webSockets } from '@libp2p/websockets'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { ping } from '@libp2p/ping'
import { webRTC } from '@libp2p/webrtc'
import { multiaddr } from '@multiformats/multiaddr'
import { all } from '@libp2p/websockets/filters'

const listener = '/ip4/127.0.0.1/tcp/59957/ws/p2p/12D3KooWDu73Fuu7v3QHt6k5SBkUGq6UdRuw5mWFD8r99sA7aLJi/p2p-circuit/webrtc/p2p/12D3KooWD7ETnfbDiq26JBeqb8BLxyoXj3j6RNmbDUK3UfNcoDWt'

const sender = await createLibp2p({
  connectionEncryption: [
    noise()
  ],
  streamMuxers: [
    yamux()
  ],
  transports: [
    webSockets({
      filter: all
    }),
    webRTC(),
    circuitRelayTransport()
  ],
  connectionGater: {
    denyDialMultiaddr: () => false
  },
  services: {
    ping: ping()
  }
})

while (true) {
  const ma = multiaddr(listener)
  const rtt = await sender.services.ping.ping(ma)
  console.info('PING', ma.getPeerId(), `${rtt}ms`)
}
