const { invoke } = window.__TAURI__.tauri;
const { Command } = window.__TAURI__.shell;
const { writeFile, createDir } = window.__TAURI__.fs;
const { join ,resolveResource } = window.__TAURI__.path;
const { tempdir } = window.__TAURI__.os;

async function greet() {
  // let cmd0 = await Command.sidecar("bin/redis", ["/Users/guoshuai/redis.conf"])
  // try to load your resource file directories.
  const resourcePath = await resolveResource('resources/redis.conf');
  let cmd = await Command.sidecar("bin/redis",[resourcePath])
  cmd.stdout.on('data', line => {
    console.log(`comman stdout: ${line}`)
  })
  cmd.stderr.on('data', line => {
    console.log(`comman stderr: ${line}`)
  })
  await cmd.spawn();
}

greet();
