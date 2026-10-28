import { ImageResponse } from "next/og";
import { site } from "@/lib/data/site";

export const alt = `${site.fullName} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#172B4D",
          padding: 72,
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(37,99,235,0.35), transparent 45%)",
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
              backgroundColor: "#FFFFFF",
              color: "#172B4D",
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
              color: "#FFFFFF",
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
              color: "#93C5FD",
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
              color: "#FFFFFF",
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
      </div>
    ),
    { ...size },
  );
}
