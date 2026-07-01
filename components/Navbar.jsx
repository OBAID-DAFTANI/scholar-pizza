"use client";
import Image from "next/image";
import { useState } from "react";
import { restaurantInfo } from "../data/menu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const orderOnWhatsApp = () => {
    window.open(`https://wa.me/${restaurantInfo.phone}?text=Hi! I'd like to place an order.`, "_blank");
  };

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "Deals", href: "#deals" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav style={{
      background: "#1a0800",
      position: "sticky",
      top: 0,
      zIndex: 999,
      boxShadow: "0 2px 16px rgba(0,0,0,0.4)",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 1rem",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo + Name */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="Scholar Pizza" width={40} height={40}
            style={{ borderRadius: "50%", objectFit: "cover", border: "2px solid #c0340d" }} />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, lineHeight: 1.1 }}>Scholar Pizza</div>
            <div style={{ color: "#c0340d", fontSize: 10, letterSpacing: 1 }}>PREMIUM QUALITY</div>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}
          className="hide-mobile">
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{
              color: "rgba(255,255,255,0.75)",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 500,
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.75)"}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={orderOnWhatsApp} style={{
            background: "#c0340d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}>
            🛒 Order Now
          </button>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#fff", fontSize: 22, display: "none", padding: 4,
            }}
            className="show-mobile"
            aria-label="Menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          background: "#2a1000",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: 15,
                padding: "10px 12px",
                borderRadius: 8,
                fontWeight: 500,
              }}>
              {link.label}
            </a>
          ))}
          <a href={`tel:${restaurantInfo.phone}`} style={{
            color: "#c0340d",
            textDecoration: "none",
            fontSize: 15,
            padding: "10px 12px",
            fontWeight: 700,
          }}>
            📞 {restaurantInfo.displayPhone}
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
