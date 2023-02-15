const { invoke } = window.__TAURI__.tauri;
const { Command } = window.__TAURI__.shell;
const { writeFile, createDir } = window.__TAURI__.fs;
const { join } = window.__TAURI__.path;
const { tempdir } = window.__TAURI__.os;


async function greet() {
  // await createDir(await join(await tempdir(), "sidecar-bug-123456"))
  // await writeFile(await join(await tempdir(), "sidecar-bug-123456", "main.js"), "console.log('test');")
  // log the file path
  // console.log('tempfile', await join(await tempdir(), "sidecar-bug-123456", "main.js"))

  // THIS IS NOT WORKING
  /* const cmd = Command.sidecar("bin/redis", ["aadsaflasdfa"], {
    cwd: "/Users/guoshuai"
  }) */
  // THIS IS THE WORKING CODE
  // const cmd = new Command("redis", [], { cwd: "/Users/guoshuai" })
  // const cmd = new Command("redis")
  // const cmd = new Command("bin/redis")
  // const output = await cmd.execute()
  // console.log('output', output)

  let cmd = await Command.sidecar("bin/redis")

  cmd.stdout.on('data', line => {
    console.log(`comman stdout: ${line}`)
  })
  cmd.stderr.on('data', line => {
    console.log(`comman stderr: ${line}`)
  })

  await cmd.spawn();


}

greet();
