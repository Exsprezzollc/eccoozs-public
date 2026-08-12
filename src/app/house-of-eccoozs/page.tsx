import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "House of ECCOOZS — Coming Soon",
  description: "House of ECCOOZS is coming soon.",
};

export default function HouseComingSoon() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#040c1c",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        display: "grid",
        placeItems: "center",
        padding: 32,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 70% 20%,rgba(31,71,224,.28),transparent 36%),linear-gradient(135deg,#040c1c,#071240 58%,#0b1a3e)",
        }}
      />
      <section
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 780,
          textAlign: "center",
          padding: "56px 34px",
          border: "1px solid rgba(255,255,255,.13)",
          borderRadius: 26,
          background: "rgba(255,255,255,.045)",
          boxShadow: "0 32px 90px rgba(0,0,0,.34)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/eccoozs-mark-official.png"
          alt="ECCOOZS"
          style={{ width: 58, height: 58, margin: "0 auto 20px" }}
        />
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: ".18em",
            textTransform: "uppercase",
            color: "#6f8cff",
            marginBottom: 14,
          }}
        >
          House of ECCOOZS
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(3.4rem,8vw,6.7rem)",
            lineHeight: .9,
            margin: "0 0 22px",
          }}
        >
          Coming Soon!
        </h1>
        <p
          style={{
            maxWidth: 610,
            margin: "0 auto 28px",
            color: "rgba(255,255,255,.62)",
            fontSize: 17,
            lineHeight: 1.75,
          }}
        >
          The lifestyle and commerce extension of ECCOOZS is being prepared with the same premium, intentional approach as the platform.
        </p>
        <a
          href="/welcome"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: 46,
            padding: "0 22px",
            borderRadius: 10,
            background: "#2448ee",
            color: "#fff",
            fontWeight: 800,
            textDecoration: "none",
          }}
        >
          ← Back to ECCOOZS
        </a>
      </section>
    </main>
  );
}
