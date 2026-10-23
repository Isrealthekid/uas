import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import obj2gltf from "obj2gltf";

(async () => {
  const models = {
    argini: "Argini (guest).obj",
    arsenio: "Arsenio (guest).obj",
    bfly: "Bfly 288 (guest).obj",
    xander: "XANDA 320 (guest).obj",
    damisa: "Damisa (guest) - .obj",
  };
  fs.mkdirSync("public/assets/drones/models", { recursive: true });
  for (const [slug, file] of Object.entries(models)) {
    const output = path.resolve("public/assets/drones/models", slug + ".glb");
    if (fs.existsSync(output)) continue;
    console.log("Converting", slug);
    const raw = path.join(os.tmpdir(), "briech-" + slug + ".glb");
    const data = await obj2gltf(path.resolve("public/assets/video", file), { binary: true });
    fs.writeFileSync(raw, data);
    execFileSync(process.execPath, ["node_modules/@gltf-transform/cli/bin/cli.js", "optimize", raw, output, "--compress", "meshopt", "--simplify-error", "0.001", "--simplify-ratio", "0.15"], { stdio: "inherit" });
    fs.unlinkSync(raw);
    console.log(slug, fs.statSync(output).size);
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
