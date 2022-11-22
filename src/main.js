const { invoke } = window.__TAURI__.tauri;
const { Command } = window.__TAURI__.shell;
const { writeFile, createDir } = window.__TAURI__.fs;
const { join } = window.__TAURI__.path;
const { tempdir } = window.__TAURI__.os;

let greetInputEl;
let greetMsgEl;

async function greet() {
  // create a test js file in temp dir
  await createDir(await join(await tempdir(), "sidecar-bug-123456"))
  await writeFile(await join(await tempdir(), "sidecar-bug-123456", "main.js"), "console.log('test');")
  // log the file path
  console.log('tempfile', await join(await tempdir(), "sidecar-bug-123456", "main.js"))

  // THIS IS NOT WORKING
  const cmd = Command.sidecar("bin/esbuild", ["main.js"], {
    cwd: await join(await tempdir(), "sidecar-bug-123456")
  })
  // THIS IS THE WORKING CODE
  // const cmd = new Command("not-sidecar", [], { cwd: await join(await tempdir(), "sidecar-bug-123456") })

  const output = await cmd.execute()
  // output never gets logged
  console.log('output', output)
}

window.addEventListener("DOMContentLoaded", () => {
  greetInputEl = document.querySelector("#greet-input");
  greetMsgEl = document.querySelector("#greet-msg");
  document
    .querySelector("#greet-button")
    .addEventListener("click", () => greet());
});
