import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "radial-gradient(circle at 20% 10%, rgba(168,85,247,0.35), transparent 55%), radial-gradient(circle at 80% 20%, rgba(34,211,238,0.28), transparent 55%), radial-gradient(circle at 50% 90%, rgba(236,72,153,0.22), transparent 60%), #06060b",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.18,
            backgroundImage:
              "linear-gradient(90deg, rgba(34,211,238,0.75), rgba(168,85,247,0.75), rgba(236,72,153,0.75), rgba(250,204,21,0.65), rgba(34,211,238,0.75))",
            filter: "blur(80px)",
          }}
        />

        {/* “ring” style */}
        <div
          style={{
            width: 420,
            height: 420,
            borderRadius: 9999,
            background:
              "conic-gradient(from 180deg, rgba(34,211,238,0.9), rgba(168,85,247,0.9), rgba(236,72,153,0.9), rgba(250,204,21,0.8), rgba(34,211,238,0.9))",
            padding: 10,
            boxShadow:
              "0 0 70px rgba(168,85,247,0.20), 0 0 90px rgba(34,211,238,0.18)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 9999,
              background: "rgba(5,5,10,0.85)",
              border: "1px solid rgba(255,255,255,0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center", padding: "0 40px" }}>
              <div
                style={{
                  fontSize: 70,
                  fontWeight: 800,
                  letterSpacing: 1,
                  lineHeight: 1,
                  backgroundImage:
                    "linear-gradient(90deg, rgba(34,211,238,1), rgba(168,85,247,1), rgba(236,72,153,1), rgba(250,204,21,0.95))",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  textShadow:
                    "0 0 22px rgba(34,211,238,0.18), 0 0 28px rgba(236,72,153,0.14)",
                }}
              >
                PULSE
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 34,
                  fontWeight: 700,
                  letterSpacing: 6,
                  opacity: 0.9,
                }}
              >
                PREMIUM
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 22,
                  opacity: 0.78,
                }}
              >
                Photo de profil TikTok • Cadres • Export HD
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 34,
            left: 46,
            fontSize: 18,
            opacity: 0.7,
          }}
        >
          pulse-premium-generator.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}

