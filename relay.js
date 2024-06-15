import { createLibp2p } from 'libp2p'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { webSockets } from '@libp2p/websockets'
import { circuitRelayServer } from '@libp2p/circuit-relay-v2'

const relay = await createLibp2p({
  addresses: {
    listen: [
      '/ip4/127.0.0.1/tcp/0/ws'
    ]
  },
  connectionEncryption: [
    noise()
  ],
  streamMuxers: [
    yamux()
  ],
  transports: [
    webSockets()
  ],
  services: {
    relay: circuitRelayServer({
      reservations: {
        maxReservations: Infinity
      }
    })
  }
})

relay.getMultiaddrs().forEach(ma => {
  console.info(`const relay = '${ma.toString()}'`)
})
