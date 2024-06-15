import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { webSockets } from '@libp2p/websockets'
import { circuitRelayTransport } from '@libp2p/circuit-relay-v2'
import { ping } from '@libp2p/ping'
import { webRTC } from '@libp2p/webrtc'
import { all } from '@libp2p/websockets/filters'
import { WebRTC } from '@multiformats/multiaddr-matcher'

const relay = '/ip4/127.0.0.1/tcp/59957/ws/p2p/12D3KooWDu73Fuu7v3QHt6k5SBkUGq6UdRuw5mWFD8r99sA7aLJi'

const listener = await createLibp2p({
  addresses: {
    listen: [
      `${relay}/p2p-circuit`,
      '/webrtc'
    ]
  },
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

listener.getMultiaddrs().forEach(ma => {
  if (WebRTC.exactMatch(ma)) {
    console.info(`const listener = '${ma.toString()}'`)
  }
})
