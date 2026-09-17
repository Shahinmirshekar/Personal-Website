import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name} — Design × Marketing × Analytics`;
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
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0B0D12 0%, #081B4B 100%)",
          color: "#F6F4EF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 28, color: "#8BA3E6", letterSpacing: 4, textTransform: "uppercase" }}>
          {profile.currentTitle}
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, marginTop: 24, display: "flex" }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#E5E7EB", display: "flex" }}>
          {profile.heroKicker}
        </div>
      </div>
    ),
    { ...size },
  );
}
