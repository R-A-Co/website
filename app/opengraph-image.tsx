import { ImageResponse } from "next/og";

export const alt =
  "Research & Analysis Committee — Data Science Club. Turning open questions into reproducible systems.";
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
          backgroundColor: "#f7f6f5",
          color: "#191919",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.045) 1px, transparent 1px)",
            backgroundSize: "80px 100%",
          }}
          aria-hidden="true"
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 15,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: "rgba(25,25,25,0.68)",
            fontFamily: "monospace",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 16,
                height: 16,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <div style={{ width: 7, height: 7, backgroundColor: "#191919" }} />
              <div style={{ width: 7, height: 7, backgroundColor: "#191919" }} />
              <div style={{ width: 7, height: 7, backgroundColor: "#191919" }} />
              <div style={{ width: 7, height: 7, backgroundColor: "#191919" }} />
            </div>
            <span>Data Science Club</span>
          </div>
          <span>Research &amp; Analysis</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 22,
            maxWidth: 900,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 14,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              color: "rgba(25,25,25,0.68)",
              fontFamily: "monospace",
            }}
          >
            <span style={{ color: "#2200ff" }}>01</span>
            <span
              style={{
                display: "flex",
                width: 28,
                height: 1,
                backgroundColor: "rgba(0,0,0,0.12)",
              }}
            />
            <span>Research &amp; Analysis Committee</span>
          </div>

          <div
            style={{
              display: "flex",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: -2.6,
              color: "#191919",
            }}
          >
            Turning open questions into reproducible systems.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(0,0,0,0.09)",
            paddingTop: 22,
            fontSize: 14,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "rgba(25,25,25,0.68)",
            fontFamily: "monospace",
          }}
        >
          <span>research.datascienceclub.org</span>
          <span>Forecasting · Causal inference · Health systems</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
