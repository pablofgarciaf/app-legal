import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 192,
  height: 192,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1D4ED8 0%, #2563EB 50%, #3B82F6 100%)",
          borderRadius: "42px",
          border: "4px solid rgba(255, 255, 255, 0.2)",
          color: "#FFFFFF",
          fontSize: "80px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
        }}
      >
        ⚖️
      </div>
    ),
    {
      ...size,
    }
  );
}
