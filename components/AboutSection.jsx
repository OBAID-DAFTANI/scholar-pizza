"use client";
export default function AboutSection() {
  return (
    <section id="about" style={{
      background: "linear-gradient(135deg, #1a0800 0%, #2d1000 100%)",
      padding: "3.5rem 1rem",
      color: "#fff",
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(20px, 5vw, 28px)", fontWeight: 800, marginBottom: "0.75rem" }}>
          About Scholar Pizza
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.6)",
          fontSize: "clamp(14px, 3vw, 16px)",
          maxWidth: 600, margin: "0 auto 2.5rem",
          lineHeight: 1.7,
        }}>
          Born in the heart of Saeedabad, Baldia Town — Scholar Pizza brings premium quality pizza
          and fast food to your neighbourhood. Every slice is crafted with the finest ingredients,
          because you deserve nothing less than the best. 🎓🍕
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16, maxWidth: 700, margin: "0 auto",
        }}>
          {[
            { icon: "🍕", num: "17+", label: "Pizza Flavours" },
            { icon: "🍔", num: "4+", label: "Burgers" },
            { icon: "🎁", num: "10+", label: "Value Deals" },
            { icon: "😊", num: "100%", label: "Satisfied Customers" },
          ].map(stat => (
            <div key={stat.label} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14, padding: "1.25rem 1rem",
            }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#e84c1e" }}>{stat.num}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
