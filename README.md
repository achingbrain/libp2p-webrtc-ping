# libp2p-webrtc-ping

## Instructions

1. Start the relay

```console
$ node relay.js
const relay = '...'
```

2. Paste the relay address into `listener.js`
3. Start the listener

```console
$ npx pw-test listener.js
- Count not find a test runner. Using "none".
ℹ Browser "chromium" setup complete.
const listener = '...'
```

4. Paste the listener address into `sender.js`
5. Start the sender

```console
$ npx pw-test sender.js
- Count not find a test runner. Using "none".
ℹ Browser "chromium" setup complete.
PING 12D3Foo... 1ms
PING 12D3Foo... 1ms
PING 12D3Foo... 1ms
PING 12D3Foo... 1ms
PING 12D3Foo... 2ms
PING 12D3Foo... 1ms
...
```

## Variations

Use Firefox

```console
$ npx pw-test --browser firefox sender.js
```
