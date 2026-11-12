import type { Tool } from "@/data/site";

/**
 * A real brand logo on a small white "app icon" tile, so dark logos stay visible in both themes.
 * Decorative: the tool name is always written next to it (or in surrounding text).
 */
export function Logo({ tool, size = 40, label = false }: { tool: Tool; size?: number; label?: boolean }) {
  const src = `/logos/${tool.logo}${/\.\w+$/.test(tool.logo) ? "" : ".svg"}`;
  // Plugin icons from wordpress.org are full squares, so they fill the tile edge to edge.
  const bleed = tool.logo.startsWith("wp/") && !tool.logo.endsWith(".svg");
  return (
    <span
      className={`logo${label ? " logo--label" : ""}${bleed ? " logo--bleed" : ""}`}
      style={{ "--s": `${size}px` } as React.CSSProperties}
    >
      <span className="logo__tile">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={size} height={size} loading="lazy" decoding="async" />
      </span>
      {label ? <span className="logo__name notranslate" translate="no">{tool.name}</span> : null}
    </span>
  );
}
