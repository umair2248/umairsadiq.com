import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const dynamic = "force-static";

export const alt = `${profile.name}, WordPress developer and SEO specialist`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Read once at build time. Lives in /assets (not /public) because it is only used here.
const portrait = readFile(join(process.cwd(), "assets/og-portrait.png")).then(
  (buf) => `data:image/png;base64,${buf.toString("base64")}`,
);

export default async function OpengraphImage() {
  const photo = await portrait;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          color: "#f3f1ea",
          background: "radial-gradient(circle at 78% 40%, rgba(212,255,58,0.28), transparent 45%), #0b0b0e",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 0 64px 72px", width: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 28 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 999,
                background: "#d4ff3a",
                color: "#0b0b0e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
              }}
            >
              {profile.initials}
            </div>
            {profile.name}
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 70, fontWeight: 800, lineHeight: 1.08 }}>
            <span>I build websites</span>
            <span style={{ display: "flex" }}>
              <span>that</span>
              <span style={{ color: "#d4ff3a", marginLeft: 20, marginRight: 20 }}>rank</span>
              <span>&amp; apps</span>
            </span>
            <span>that ship.</span>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#9b998f" }}>
            {`WordPress · SEO · Next.js · React · Flutter · ${profile.websitesBuilt} websites`}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center", width: 480, height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo} width={440} height={550} alt="" style={{ objectFit: "contain" }} />
        </div>
      </div>
    ),
    size,
  );
}
