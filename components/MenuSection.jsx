"use client";
import { useState } from "react";
import { menuCategories, restaurantInfo } from "../data/menu";

function ItemCard({ item }) {
  const orderItem = () => {
    const msg = `Hi! I want to order: *${item.name}*${item.price ? ` (Rs. ${item.price})` : ""}`;
    window.open(`https://wa.me/${restaurantInfo.phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #f0ece6",
      borderRadius: 14,
      padding: "14px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 12,
      transition: "all 0.18s",
      cursor: "default",
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = "#c0340d";
        e.currentTarget.style.boxShadow = "0 2px 12px rgba(192,52,13,0.1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "#f0ece6";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontWeight: 600, fontSize: 14,
          color: "#1a1a1a", marginBottom: item.desc ? 4 : 0,
          lineHeight: 1.3,
        }}>
          {item.name}
        </div>
        {item.desc && (
          <div style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>
            {item.desc}
          </div>
        )}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: "#c0340d", whiteSpace: "nowrap" }}>
          Rs.{item.price}
        </span>
        <button onClick={orderItem} style={{
          background: "#c0340d", color: "#fff", border: "none",
          borderRadius: 8, padding: "6px 14px",
          fontSize: 12, fontWeight: 700, cursor: "pointer",
          whiteSpace: "nowrap",
        }}>
          Order
        </button>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [activeCat, setActiveCat] = useState("pizza");
  const [activeSubIdx, setActiveSubIdx] = useState(0);

  const category = menuCategories.find(c => c.id === activeCat);

  return (
    <section id="menu" style={{ padding: "3rem 1rem 4rem", maxWidth: 900, margin: "0 auto" }}>
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "clamp(22px, 5vw, 32px)", fontWeight: 800, marginBottom: 8 }}>
          Our Menu
        </h2>
        <p style={{ color: "#888", fontSize: 15 }}>
          Fresh, hot & delicious — order directly via WhatsApp 📱
        </p>
      </div>

      {/* Category pills - scrollable on mobile */}
      <div style={{
        display: "flex", gap: 8, overflowX: "auto",
        paddingBottom: 8, marginBottom: "1.5rem",
        scrollbarWidth: "none",
      }}>
        {menuCategories.map(cat => {
          const isActive = activeCat === cat.id;
          return (
            <button key={cat.id} onClick={() => { setActiveCat(cat.id); setActiveSubIdx(0); }}
              style={{
                background: isActive ? "#c0340d" : "#f5f3f0",
                color: isActive ? "#fff" : "#555",
                border: "none",
                borderRadius: 20,
                padding: "8px 18px",
                fontSize: 13, fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                flexShrink: 0,
              }}>
              {cat.emoji} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Subcategory tabs */}
      {category?.subcategories?.length > 1 && (
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap",
          marginBottom: "1.25rem",
        }}>
          {category.subcategories.map((sub, i) => (
            <button key={i} onClick={() => setActiveSubIdx(i)}
              style={{
                background: activeSubIdx === i ? "#1a0800" : "#f0ece6",
                color: activeSubIdx === i ? "#fff" : "#666",
                border: "none", borderRadius: 8,
                padding: "6px 16px", fontSize: 13,
                fontWeight: 600, cursor: "pointer",
                transition: "all 0.15s",
              }}>
              {sub.name}
            </button>
          ))}
        </div>
      )}

      {/* Size note */}
      {category?.subcategories?.[activeSubIdx]?.note && (
        <div style={{
          background: "#fff4f1",
          border: "1px solid #fdddd6",
          borderRadius: 10, padding: "8px 16px",
          fontSize: 13, fontWeight: 600,
          color: "#c0340d", marginBottom: "1.25rem",
          display: "inline-block",
        }}>
          📏 {category.subcategories[activeSubIdx].note}
        </div>
      )}

      {/* Items list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {category?.subcategories?.[activeSubIdx]?.items?.map((item, i) => (
          <ItemCard key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
