"use client";
export default function Features() {
  const items = [
    { icon: "🍕", title: "Premium Ingredients", desc: "Only the freshest toppings on every pizza, every time." },
    { icon: "⚡", title: "Fast Delivery", desc: "Hot food at your door — delivery charges as per area." },
    { icon: "🕛", title: "Open Late", desc: "We're open 12PM to 2AM — late night cravings covered!" },
    { icon: "💬", title: "Easy WhatsApp Order", desc: "Just one tap to place your order directly on WhatsApp." },
    { icon: "🪑", title: "Dine In Available", desc: "Enjoy a cozy dining experience at our restaurant." },
    { icon: "🏆", title: "Scholar Signature", desc: "Try our exclusive Scholar Signature pizza — a fan favourite!" },
  ];

  return (
    <section style={{ background: "#faf9f7", padding: "3.5rem 1rem" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, marginBottom: 8 }}>
            Why Scholar Pizza?
          </h2>
          <p style={{ color: "#888", fontSize: 15 }}>We don't just make pizza, we make memories 🎓</p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {items.map(item => (
            <div key={item.title} style={{
              background: "#fff",
              border: "1px solid #f0ece6",
              borderRadius: 14,
              padding: "1.25rem",
              transition: "box-shadow 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.07)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{item.title}</div>
              <div style={{ color: "#888", fontSize: 13, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
