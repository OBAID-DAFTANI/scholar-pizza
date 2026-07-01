"use client";
import { restaurantInfo } from "../data/menu";

export default function Footer() {
  return (
    <footer style={{
      background: "#0d0500",
      color: "rgba(255,255,255,0.4)",
      padding: "2rem 1rem",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 28, marginBottom: 8 }}>🍕</div>
      <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
        Scholar Pizza
      </div>
      <div style={{ fontSize: 13, marginBottom: 12 }}>
        {restaurantInfo.address}
      </div>
      <div style={{ fontSize: 13, marginBottom: 16 }}>
        📞 {restaurantInfo.displayPhone} &nbsp;·&nbsp; ⏰ {restaurantInfo.timing}
      </div>
      <div style={{
        display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap",
        marginBottom: 16,
      }}>
        <a href={`https://wa.me/${restaurantInfo.phone}`} target="_blank" rel="noreferrer"
          style={{ color: "#25d366", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
          💬 WhatsApp Order
        </a>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span>
        <a href={`tel:${restaurantInfo.phone}`}
          style={{ color: "#c0340d", textDecoration: "none", fontSize: 13, fontWeight: 600 }}>
          📞 Call Now
        </a>
      </div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
        © 2025 Scholar Pizza · Made with ❤️ in Karachi
      </div>
    </footer>
  );
}
