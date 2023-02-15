








1. config external binary can only bundle your external binary into your app. 


2.If you want to use in your js side, you don't need use shell in tauri config, instead, you need use this in js side api: 
```js
//load sidecar in js side (must have prefix, but in rust side, only file name)
let cmd = await Command.sidecar("bin/redis")
//load event
cmd.stdout.on('data', line => {
  console.log(`comman stdout: ${line}`)
})
cmd.stderr.on('data', line => {
  console.log(`comman stderr: ${line}`)
})
//excute it
await cmd.spawn();
```
