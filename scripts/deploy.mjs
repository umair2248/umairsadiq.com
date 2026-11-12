// Uploads the static export in /out to Hostinger over FTP.
//
//   npm run deploy        → build, then upload
//   npm run deploy:only   → upload the existing /out without rebuilding
//
// FTP details are read from .env.deploy (never committed). Find them in
// hPanel → Files → FTP Accounts.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync, rmSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ENV_FILE = ".env.deploy";
if (!existsSync(ENV_FILE)) {
  console.error(`Missing ${ENV_FILE}. Copy .env.deploy.example to ${ENV_FILE} and fill in your Hostinger FTP details.`);
  process.exit(1);
}
process.loadEnvFile(ENV_FILE);

if (!existsSync("out/index.html")) {
  console.error("No build found in /out. Run `npm run build` first (or use `npm run deploy`).");
  process.exit(1);
}

// ── SSH (preferred): key-based, no password stored anywhere ────────────────
// SSH_HOST can be an alias from ~/.ssh/config (e.g. "palbreedhub").
if ((process.env.DEPLOY_METHOD || "").toLowerCase() === "ssh") {
  const { SSH_HOST, SSH_DIR } = process.env;
  if (!SSH_HOST || !SSH_DIR) {
    console.error(`Fill in SSH_HOST and SSH_DIR in ${ENV_FILE}.`);
    process.exit(1);
  }
  const run = (cmd, args) => {
    const res = spawnSync(cmd, args, { stdio: "inherit" });
    if (res.status !== 0) {
      console.error(`\n${cmd} failed (exit ${res.status}).`);
      process.exit(1);
    }
  };
  const ssh = ["-o", "BatchMode=yes", "-o", "ConnectTimeout=20"];
  const archive = "out-deploy.tar.gz";
  const remoteArchive = `${SSH_DIR}/../.${archive}`;
  console.log(`Packing /out → ${archive}`);
  run("tar", ["-czf", archive, "-C", "out", "."]);
  console.log(`Uploading to ${SSH_HOST}:${SSH_DIR}`);
  run("ssh", [...ssh, SSH_HOST, `test -d ${SSH_DIR}`]);
  run("scp", [...ssh, "-q", archive, `${SSH_HOST}:${remoteArchive}`]);
  run("ssh", [...ssh, SSH_HOST, `tar -xzf ${remoteArchive} -C ${SSH_DIR} && rm -f ${remoteArchive}`]);
  rmSync(archive, { force: true });
  console.log("Done. The new version is live at https://umairsadiq.com");
  process.exit(0);
}

// ── FTP fallback ────────────────────────────────────────────────────────────
const { FTP_HOST, FTP_USER, FTP_PASSWORD } = process.env;
const FTP_PORT = process.env.FTP_PORT || "21";
if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
  console.error(`Fill in FTP_HOST, FTP_USER and FTP_PASSWORD in ${ENV_FILE}.`);
  process.exit(1);
}
const base = `ftp://${FTP_HOST}:${FTP_PORT}`;
const auth = ["--user", `${FTP_USER}:${FTP_PASSWORD}`];
// --ssl: use encrypted FTPS when the server offers it, plain FTP otherwise.
const common = ["--silent", "--show-error", "--ssl", "--connect-timeout", "20", ...auth];

const curl = (args) => spawnSync("curl", [...common, ...args], { encoding: "utf8" });

// Work out where the website root is. Hostinger's main FTP account usually
// lands in a folder that contains public_html; sub-accounts often land in it directly.
let dir = (process.env.FTP_DIR || "").replace(/^\/+|\/+$/g, "");
const login = curl(["--list-only", `${base}/`]);
if (login.status !== 0) {
  console.error("Could not log in to the FTP server:\n" + (login.stderr || "").replace(FTP_PASSWORD, "****"));
  process.exit(1);
}
if (!process.env.FTP_DIR) {
  const entries = login.stdout.split(/\r?\n/).map((s) => s.trim());
  dir = entries.includes("public_html") ? "public_html" : "";
}
console.log(`Connected to ${FTP_HOST}. Uploading to /${dir || "(FTP root)"}`);

// Collect every file in /out, including dotfiles such as .htaccess.
const files = [];
const walk = (d) => {
  for (const name of readdirSync(d)) {
    const full = join(d, name);
    if (statSync(full).isDirectory()) walk(full);
    else files.push(full);
  }
};
walk("out");

// Upload in batches: one curl call reuses a single connection for many files.
const BATCH = 15;
let done = 0;
for (let i = 0; i < files.length; i += BATCH) {
  const args = ["--ftp-create-dirs"];
  for (const file of files.slice(i, i + BATCH)) {
    const remote = [dir, relative("out", file).split(sep).join("/")].filter(Boolean).join("/");
    args.push("-T", file, `${base}/${encodeURI(remote)}`);
  }
  const res = curl(args);
  if (res.status !== 0) {
    console.error("\nUpload failed:\n" + (res.stderr || "").replace(FTP_PASSWORD, "****"));
    process.exit(1);
  }
  done = Math.min(files.length, i + BATCH);
  process.stdout.write(`\r  ${done}/${files.length} files uploaded`);
}
console.log(`\nDone. ${files.length} files are live at https://umairsadiq.com`);
