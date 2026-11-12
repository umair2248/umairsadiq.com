"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/site";

/**
 * Live working-hours status in Umair's time zone: "Online now" between
 * 9 AM and 2 AM (Pakistan time), otherwise "Back at 9 AM". Messages are
 * welcome at any time either way. Renders a neutral placeholder on the server.
 */
export function WorkingHours() {
  const [now, setNow] = useState<{ time: string; online: boolean } | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timeZone });
    const hourFmt = new Intl.DateTimeFormat("en-GB", { hour: "numeric", hourCycle: "h23", timeZone: profile.timeZone });
    const tick = () => {
      const d = new Date();
      const h = Number(hourFmt.format(d));
      // Working day runs 09:00 → 02:00 the next morning.
      const online = h >= profile.hours.start || h < profile.hours.end;
      setNow({ time: fmt.format(d), online });
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  const online = now?.online ?? true;
  return (
    <span className={`hours${online ? " is-online" : " is-away"}`}>
      <span className="hours__dot" aria-hidden="true" />
      <strong>{online ? "Online now" : `Back at ${profile.hours.startLabel}`}</strong>
      <span className="hours__sep hours__long" aria-hidden="true">·</span>
      <span className="hours__long">Available {profile.hours.label} PKT, message me anytime</span>
      <span className="hours__sep" aria-hidden="true">·</span>
      <time suppressHydrationWarning>{now?.time ?? "--:--"}</time>
    </span>
  );
}
