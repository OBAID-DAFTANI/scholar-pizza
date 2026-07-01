"use client";
import { restaurantInfo } from "../data/menu";

export default function ContactSection() {
  const orderWhatsApp = () => {
    window.open(`https://wa.me/${restaurantInfo.phone}?text=Hi! I'd like to place an order.`, "_blank");
  };
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurantInfo.address)}`;

  return (
    <section id="contact" style={{ background: "#fff", padding: "3.5rem 1rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, marginBottom: 8 }}>
            Find Us & Order
          </h2>
          <p style={{ color: "#888", fontSize: 15 }}>Come visit or order from the comfort of home</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          alignItems: "start",
        }}>
          {/* Info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { icon: "📍", label: "Address", value: restaurantInfo.address },
              { icon: "📞", label: "Phone", value: restaurantInfo.displayPhone },
              { icon: "⏰", label: "Hours", value: restaurantInfo.timing },
              { icon: "🛵", label: "Delivery", value: "Available — charges as per area" },
              { icon: "🪑", label: "Services", value: "Dine In · Takeaway · Delivery" },
            ].map(info => (
              <div key={info.label} style={{
                display: "flex", gap: 14, alignItems: "flex-start",
                background: "#faf9f7", borderRadius: 12,
                padding: "12px 16px", border: "1px solid #f0ece6",
              }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{info.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: "#aaa", fontWeight: 700, textTransform: "uppercase", marginBottom: 2 }}>
                    {info.label}
                  </div>
                  <div style={{ fontSize: 14, color: "#1a1a1a", fontWeight: 500, lineHeight: 1.4 }}>
                    {info.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Map */}
            <div onClick={() => window.open(mapUrl, "_blank")} style={{
              background: "#1a0800",
              borderRadius: 16,
              padding: "2rem",
              textAlign: "center",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            >
              <div style={{ fontSize: 48, marginBottom: 10 }}>🗺️</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>
                View on Google Maps
              </div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
                Sector 5-J, Saeedabad, Baldia Town
              </div>
            </div>

            {/* WhatsApp */}
            <button onClick={orderWhatsApp} style={{
              background: "#25d366", color: "#fff", border: "none",
              borderRadius: 12, padding: "16px",
              fontSize: 16, fontWeight: 700, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              💬 Order on WhatsApp
            </button>

            {/* Call */}
            <a href={`tel:${restaurantInfo.phone}`} style={{
              background: "#fff", color: "#c0340d",
              border: "2px solid #c0340d",
              borderRadius: 12, padding: "16px",
              fontSize: 16, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              textDecoration: "none",
            }}>
              📞 Call {restaurantInfo.displayPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
