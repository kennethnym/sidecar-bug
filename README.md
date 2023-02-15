






0. you can use 
```
config get dbfilename
config get path
```
in redis-cli's repl, so you can judge if config file loaded in redis.


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

3. ok, now, I want to pass some args in Command line , such as `redis redis.conf`, so what can I do?
It seems I passed to sideCar functions's second param not works. It can't modify the first param, because the first param 
must be specify in tauri.conf.json's external bin.
But the third param can works, third param is a config, config{pwd:'the pwd you want redis to load'}
But the second param is still cannot work,even I use absolute path.Even I enable `fs security` in tauri.conf.json!!!



4. If I bundle external file use resource config:
I add a.txt as resource

here I create resource file:
```
> tree src-tauri
src-tauri
├── Cargo.lock
├── Cargo.toml
├── bin
│   ├── redis-aarch64-apple-darwin
│   └── redis-x86_64-apple-darwin
├── build.rs
├── icons
│   ├── 128x128.png
│   ├── 128x128@2x.png
│   ├── 32x32.png
│   ├── Square107x107Logo.png
│   ├── Square142x142Logo.png
│   ├── Square150x150Logo.png
│   ├── Square284x284Logo.png
│   ├── Square30x30Logo.png
│   ├── Square310x310Logo.png
│   ├── Square44x44Logo.png
│   ├── Square71x71Logo.png
│   ├── Square89x89Logo.png
│   ├── StoreLogo.png
│   ├── icon.icns
│   ├── icon.ico
│   └── icon.png
├── resources
│   └── a.txt
├── src
│   └── main.rs
├── tauri.conf.json
└── tauri.conf.json.bak

5 directories, 25 files
```

in tauri.config.json, I write this: 
```
"bundle": {
  "externalBin": [
    "bin/redis"
  ],
  "resources": [
    "resources/*"
  ],
},

"fs": {
  "scope": [
    "$RESOURCE/*"
  ]
}
```

here I got: 
```
.
├── Info.plist
├── MacOS
│   ├── redis
│   └── sidecar-bug
└── Resources
    ├── icon.icns
    └── resources
        └── a.txt

4 directories, 5 files
```

5.so I don't use Command.sideCar API to pass external params,I try another api.
If I use command api, it says that program not specify on tauri.conf.json
So I want to use command, and redis is not on my server, so I muse specify sidecar first.
But whatevet I try, I can't successed,If I specify shell's with a sidecar:true
I forgot another api, still try sidecar api,here is my tauri.conf.json:
```
"shell": {
  "sidecar": true,
  "scope": [
    {
      "name": "bin/redis",
      "cmd": "bin/redis",
      "sidecar": true,
      "args": true
    }
  ]
```
It works,success loaded my config file for me!!!
