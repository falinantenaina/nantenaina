import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = `${site.fullName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FFFFFF",
        padding: 72,
        border: "1px solid rgba(15, 23, 42, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 88,
            height: 88,
            borderRadius: 20,
            backgroundColor: "#2563EB",
            color: "#FFFFFF",
            fontSize: 40,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          {site.initials}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#0F172A",
            fontSize: 34,
            fontWeight: 600,
          }}
        >
          <span>{site.fullName}</span>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            color: "#2563EB",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              backgroundColor: "#2563EB",
            }}
          />
          {site.role}
        </div>
        <div
          style={{
            display: "flex",
            maxWidth: 900,
            color: "#0F172A",
            opacity: 0.85,
            fontSize: 44,
            fontWeight: 600,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          Je transforme vos idées en applications web modernes et performantes.
        </div>
      </div>
    </div>,
    { ...size },
  );
}
