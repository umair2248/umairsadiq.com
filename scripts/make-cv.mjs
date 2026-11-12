// Prints the /cv/ page of the static build to a PDF, so the downloadable CV
// always matches the data in src/data/site.ts.
//
//   npm run cv      → after `npm run build`, writes out/cv/umair-sadiq-cv.pdf
//                     and a copy in public/cv/ (used by `npm run dev`)
//
// Uses the Microsoft Edge or Google Chrome already installed on this machine.
import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve } from "node:path";

const OUT = resolve("out");
const PDF = "umair-sadiq-cv.pdf";

if (!existsSync(join(OUT, "cv", "index.html"))) {
  console.error("No /out/cv/index.html. Run `npm run build` first.");
  process.exit(1);
}

const browsers = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];
const browser = browsers.find((b) => existsSync(b));
if (!browser) {
  console.error("Could not find Edge or Chrome to print the CV. Skipping PDF.");
  process.exit(1);
}

// Tiny static server for /out so fonts and styles load exactly as on the live site.
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp" };
const server = createServer((req, res) => {
  let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
  let file = join(OUT, p);
  if (!file.startsWith(OUT)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
  if (!existsSync(file)) return res.writeHead(404).end();
  res.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

mkdirSync(join(OUT, "cv"), { recursive: true });
const target = join(OUT, "cv", PDF);
const profile = join(OUT, "..", ".cv-browser-profile");
const args = [
  "--headless=new",
  "--disable-gpu",
  "--no-pdf-header-footer",
  "--virtual-time-budget=8000",
  `--user-data-dir=${profile}`,
  `--print-to-pdf=${target}`,
  `http://127.0.0.1:${port}/cv/`,
];
const child = spawn(browser, args, { stdio: "ignore" });
const code = await new Promise((r) => child.on("exit", r));
server.close();
if (process.platform === "win32") spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], { stdio: "ignore" });

if (code !== 0 || !existsSync(target)) {
  console.error(`Printing the CV failed (exit ${code}).`);
  process.exit(1);
}
mkdirSync("public/cv", { recursive: true });
copyFileSync(target, join("public", "cv", PDF));
console.log(`CV ready: out/cv/${PDF} (${Math.round(statSync(target).size / 1024)} KB)`);
