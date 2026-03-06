import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nathan | Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          gap: "16px",
        }}
      >
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-2px",
          }}
        >
          Nathan
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#a1a1aa",
            fontWeight: 400,
          }}
        >
          Frontend Developer
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 24px",
            background: "#18181b",
            borderRadius: "8px",
            border: "1px solid #3f3f46",
          }}
        >
          <div style={{ fontSize: 18, color: "#71717a" }}>portfolio</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
