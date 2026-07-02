"use client";
import Image from "next/image";
import { restaurantInfo } from "../data/menu";

export default function Hero() {
  const orderWhatsApp = () => {
    window.open(`https://wa.me/${restaurantInfo.phone}?text=Hi! I'd like to place an order.`, "_blank");
  };
  const callNow = () => { window.location.href = `tel:${restaurantInfo.phone}`; };

  return (
    <section style={{
      background: "linear-gradient(160deg, #1a0800 0%, #2d1000 60%, #1a0800 100%)",
      padding: "clamp(3rem, 8vw, 6rem) 1.5rem",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow blobs */}
      <div style={{
        position: "absolute", top: -80, right: -80,
        width: 300, height: 300,
        background: "rgba(192,52,13,0.12)",
        borderRadius: "50%", filter: "blur(60px)",
      }} />
      <div style={{
        position: "absolute", bottom: -60, left: -60,
        width: 250, height: 250,
        background: "rgba(192,52,13,0.08)",
        borderRadius: "50%", filter: "blur(50px)",
      }} />

      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto" }}>
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative" }}>
            <Image src="/logo.png" alt="Scholar Pizza" width={130} height={130}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid rgba(192,52,13,0.5)",
                boxShadow: "0 0 40px rgba(192,52,13,0.3)",
              }} />
          </div>
        </div>

        {/* Heading */}
        <h1 style={{
          color: "#fff",
          fontSize: "clamp(2rem, 6vw, 3.2rem)",
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: "0.75rem",
        }}>
          Karachi's Favourite<br />
          <span style={{ color: "#e84c1e" }}>Scholar Pizza</span>
        </h1>

        <p style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: "clamp(14px, 3vw, 17px)",
          marginBottom: "0.5rem",
          fontWeight: 400,
        }}>
          Premium Quality · Premium Taste
        </p>

        {/* Info pills */}
        <div style={{
          display: "flex", gap: 8, justifyContent: "center",
          flexWrap: "wrap", marginBottom: "2rem", marginTop: "1rem",
        }}>
          {[
            { icon: "🪑", text: "Dine In" },
            { icon: "📦", text: "Takeaway" },
            { icon: "🛵", text: "Delivery" },
            { icon: "🕛", text: "12PM – 2AM" },
          ].map(p => (
            <span key={p.text} style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)",
              borderRadius: 20, padding: "5px 14px",
              fontSize: 13, fontWeight: 500,
            }}>
              {p.icon} {p.text}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={orderWhatsApp} style={{
            background: "#25d366", color: "#fff", border: "none",
            borderRadius: 12, padding: "14px 32px",
            fontSize: "clamp(14px, 3vw, 16px)", fontWeight: 700,
            cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 20px rgba(37,211,102,0.3)",
          }}>
            💬 Order on WhatsApp
          </button>
          <button onClick={callNow} style={{
            background: "transparent", color: "#fff",
            border: "2px solid rgba(255,255,255,0.25)",
            borderRadius: 12, padding: "14px 32px",
            fontSize: "clamp(14px, 3vw, 16px)", fontWeight: 600,
            cursor: "pointer",
          }}>
            📞 Call Us
          </button>
        </div>

        {/* Address */}
        <p style={{
          color: "rgba(255,255,255,0.35)", fontSize: 13,
          marginTop: "1.5rem",
        }}>
          📍 Saeedabad, Baldia Town, Karachi.
        </p>
      </div>
    </section>
  );
}
