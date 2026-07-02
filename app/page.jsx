"use client";
import { useState } from "react";
import { restaurant, categories } from "../data/menu";

function useCart() {
  const [cart, setCart] = useState([]);
  const addItem = (item, size = "small") => {
    const key = `${item.id}-${size}`;
    const price = size === "large" ? item.priceL : size === "regular" ? (item.priceR ?? item.price) : item.price;
    setCart((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) return prev.map((c) => c.key === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { key, id: item.id, name: item.name, price, size: item.hasSize ? size : null, qty: 1, img: item.img }];
    });
  };
  const removeItem = (key) => setCart((prev) => prev.filter((c) => c.key !== key));
  const updateQty = (key, delta) => {
    setCart((prev) =>
      prev.map((c) => c.key === key ? { ...c, qty: Math.max(0, c.qty + delta) } : c)
        .filter((c) => c.qty > 0)
    );
  };
  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const count = cart.reduce((sum, c) => sum + c.qty, 0);
  return { cart, addItem, removeItem, updateQty, total, count };
}

function ItemCard({ item, onAdd }) {
  const [size, setSize] = useState("small");
  const [added, setAdded] = useState(false);
  const displayPrice = item.hasSize
    ? size === "large" ? item.priceL : size === "regular" ? (item.priceR ?? item.price) : item.price
    : item.price;
  const handleAdd = () => {
    onAdd(item, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };
  return (
    <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", border: "1px solid #f0ede8", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", background: "#f5f2ee", flexShrink: 0, overflow: "hidden", padding: "20px" }}>
      <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", borderRadius: 8 }} loading="lazy" />     {item.tag && (
        <span style={{ position: "absolute", top: 8, left: 8, background: item.tag.includes("🌶") ? "#e53e3e" : item.tag.includes("🔥") || item.tag.includes("Deal") ? "#dd6b20" : "#c0340d", color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{item.tag}</span>
      )}
    </div>
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>{item.name}</div>
        <div style={{ fontSize: 12, color: "#888", lineHeight: 1.5, flex: 1 }}>{item.desc}</div>
        {item.hasSize && (
          <div style={{ display: "flex", gap: 4, marginTop: 4, flexWrap: "wrap" }}>
            {(item.hasThree ? ["small", "regular", "large"] : item.hasRegular ? ["regular", "large"] : ["small", "large"]).map((s) => (
              <button key={s} onClick={() => setSize(s)} style={{ flex: 1, padding: "5px 0", borderRadius: 8, border: size === s ? "2px solid #c0340d" : "1px solid #e0ddd8", background: size === s ? "#fde8e3" : "#fff", color: size === s ? "#c0340d" : "#666", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                {s === "small" ? `Small Rs.${item.price}` : s === "regular" ? `Regular Rs.${item.priceR || item.price}` : `Large Rs.${item.priceL}`}         </button>
            ))}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          <span style={{ fontWeight: 800, fontSize: 17, color: "#c0340d" }}>Rs. {displayPrice.toLocaleString()}</span>
          <button onClick={handleAdd} style={{ background: added ? "#25a244" : "#c0340d", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "background 0.2s", display: "flex", alignItems: "center", gap: 5 }}>
            {added ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

function CartSheet({ cart, updateQty, removeItem, total, onClose, onOrder }) {
  const [step, setStep] = useState("cart"); // cart -> checkout
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setError("Please fill all fields");
      return;
    }
    setError("");
    setSubmitting(true);
    await onOrder({ customerName, customerPhone, customerAddress, paymentMethod });
    setSubmitting(false);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "20px 20px 0 0", maxHeight: "85vh", display: "flex", flexDirection: "column", boxShadow: "0 -8px 32px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #f0ede8", flexShrink: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{step === "cart" ? "🛒 Your Order" : "📝 Delivery Details"}</div>
          <button onClick={onClose} style={{ background: "#f5f2ee", border: "none", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>

        {step === "cart" && (
        <div style={{ overflowY: "auto", flex: 1, padding: "12px 20px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0", color: "#aaa" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🍕</div>
              <div style={{ fontSize: 15 }}>Your cart is empty</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Add items from the menu!</div>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.key} style={{ display: "flex", gap: 12, alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f2ee" }}>
                <img src={item.img} alt={item.name} style={{ width: 56, height: 56, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  {item.size && <div style={{ fontSize: 11, color: "#888", textTransform: "capitalize" }}>{item.size} size</div>}
                  <div style={{ fontWeight: 700, color: "#c0340d", fontSize: 14 }}>Rs. {(item.price * item.qty).toLocaleString()}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  <button onClick={() => updateQty(item.key, -1)} style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid #e0ddd8", background: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontWeight: 700, fontSize: 15, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.key, 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: "none", background: "#c0340d", color: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>
        )}

        {step === "checkout" && (
          <div style={{ overflowY: "auto", flex: 1, padding: "16px 20px" }}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Full Name</label>
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Ahmed Khan" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e0ddd8", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Phone Number</label>
              <input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="03XX-XXXXXXX" style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e0ddd8", fontSize: 14, boxSizing: "border-box" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Delivery Address</label>
              <textarea value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="House #, Street, Area" rows={3} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1px solid #e0ddd8", fontSize: 14, boxSizing: "border-box", resize: "none", fontFamily: "inherit" }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6, display: "block" }}>Payment Method</label>
              <div style={{ display: "flex", gap: 8 }}>
                {["Cash on Delivery", "Easypaisa", "JazzCash"].map((m) => (
                  <button key={m} onClick={() => setPaymentMethod(m)} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: paymentMethod === m ? "2px solid #c0340d" : "1px solid #e0ddd8", background: paymentMethod === m ? "#fde8e3" : "#fff", color: paymentMethod === m ? "#c0340d" : "#666", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                    {m === "Cash on Delivery" ? "💵 COD" : m === "Easypaisa" ? "📱 Easypaisa" : "💚 JazzCash"}
                  </button>
                ))}
              </div>
              {(paymentMethod === "Easypaisa" || paymentMethod === "JazzCash") && (
                <div style={{ marginTop: 10, background: "#f9f6f2", borderRadius: 10, padding: 12, fontSize: 12, color: "#666" }}>
                  Send payment to {paymentMethod}: <strong style={{ color: "#1a1a1a" }}>0335-7551826</strong><br />
                  Account Name: <strong style={{ color: "#1a1a1a" }}>MUHAMMAD FIAZ</strong><br />
                  Send payment screenshot on WhatsApp to confirm your order.
                </div>
              )}
            </div>
            {error && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 8 }}>{error}</p>}
          </div>
        )}

        {cart.length > 0 && step === "cart" && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f0ede8", flexShrink: 0 }}>
            <div style={{ background: "#f9f6f2", borderRadius: 12, padding: "12px 16px", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 6 }}>
                <span>Subtotal</span><span>Rs. {total.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#666", marginBottom: 8 }}>
                <span>Delivery</span><span style={{ color: "#25a244", fontWeight: 600 }}>As per area</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16, paddingTop: 8, borderTop: "1px solid #e8e4de" }}>
                <span>Total</span><span style={{ color: "#c0340d" }}>Rs. {total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => setStep("checkout")} style={{ width: "100%", background: "#c0340d", color: "#fff", border: "none", borderRadius: 14, padding: "15px", fontSize: 16, fontWeight: 800, cursor: "pointer" }}>
              Proceed to Checkout →
            </button>
          </div>
        )}

        {step === "checkout" && (
          <div style={{ padding: "16px 20px", borderTop: "1px solid #f0ede8", flexShrink: 0, display: "flex", gap: 10 }}>
            <button onClick={() => setStep("cart")} style={{ background: "#f5f2ee", color: "#666", border: "none", borderRadius: 14, padding: "15px 20px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              ← Back
            </button>
            <button onClick={handleCheckout} disabled={submitting} style={{ flex: 1, background: "#25d366", color: "#fff", border: "none", borderRadius: 14, padding: "15px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {submitting ? "Placing Order..." : "📱 Confirm & Order via WhatsApp"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const { cart, addItem, removeItem, updateQty, total, count } = useCart();
  const [activeCategory, setActiveCategory] = useState("classic-pizza");
  const [cartOpen, setCartOpen] = useState(false);
  const currentCategory = categories.find((c) => c.id === activeCategory);

  const handleOrder = async (details) => {
    if (cart.length === 0) return;
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          total,
          customerName: details.customerName,
          customerPhone: details.customerPhone,
          customerAddress: details.customerAddress,
          paymentMethod: details.paymentMethod,
        }),
      });
    } catch (err) {
      console.error("Failed to save order:", err);
    }

    const lines = cart.map((item) =>
      `• ${item.name}${item.size ? ` (${item.size})` : ""} x${item.qty} = Rs.${(item.price * item.qty).toLocaleString()}`
    );
    const msg = `🍕 *Order from Scholar Pizza*\n\n👤 ${details.customerName}\n📞 ${details.customerPhone}\n📍 ${details.customerAddress}\n💳 ${details.paymentMethod}\n\n${lines.join("\n")}\n\n*Total: Rs.${total.toLocaleString()}*\n\n📍 Please confirm my order!`;
    window.location.href = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(msg)}`;
    setCartOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f6f2" }}>
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "#1a0a00", padding: "0 16px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/newlogo_ScholarPizza.png" alt="Scholar Pizza" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, lineHeight: 1.1 }}>Scholar Pizza</div>
            <div style={{ color: "#c9933a", fontSize: 10 }}>⏰ 12PM – 2AM</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href={`tel:+92${restaurant.phone.slice(1)}`} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)" }}>📞 Call</a>
          <button onClick={() => setCartOpen(true)} style={{ background: "#c0340d", color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 13, fontWeight: 700, cursor: "pointer", position: "relative" }}>
            🛒 {count > 0 && <span style={{ position: "absolute", top: -6, right: -6, background: "#25d366", color: "#fff", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800 }}>{count}</span>}
            Cart
          </button>
        </div>
      </nav>

      <div style={{ background: "linear-gradient(160deg, #1a0a00, #2d1200)", padding: "32px 20px 36px", textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 16 }}>
          <img src="/newlogo_ScholarPizza.png" alt="Scholar Pizza" style={{ width: 110, height: 110, borderRadius: "50%", border: "3px solid rgba(201,147,58,0.5)", objectFit: "cover" }} />
        </div>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 900, lineHeight: 1.2, marginBottom: 6 }}>Scholar Pizza 🎓</h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, marginBottom: 20 }}>Premium Quality · Premium Taste</p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
          {["🪑 Dine In", "📦 Takeaway", "🛵 Delivery"].map((s) => (
            <span key={s} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.8)", borderRadius: 20, padding: "4px 12px", fontSize: 12 }}>{s}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button onClick={() => { window.location.href = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent("Hi! I want to order.")}`; }} style={{ background: "#25d366", color: "#fff", border: "none", borderRadius: 12, padding: "12px 22px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>📱 Order on WhatsApp</button>
          <a href={`tel:+92${restaurant.phone.slice(1)}`} style={{ background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.3)", borderRadius: 12, padding: "12px 22px", fontSize: 15, fontWeight: 700 }}>📞 Call Now</a>
        </div>
      </div>

      <div style={{ position: "sticky", top: 60, zIndex: 90, background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflowX: "auto", scrollbarWidth: "none" }}>
        <div style={{ display: "flex", gap: 4, padding: "10px 12px", width: "max-content", minWidth: "100%" }}>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => { setActiveCategory(cat.id); setTimeout(() => document.getElementById("menu-grid")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); }} style={{ background: activeCategory === cat.id ? "#c0340d" : "#f5f2ee", color: activeCategory === cat.id ? "#fff" : "#555", border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", transition: "all 0.15s" }}>
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div id="menu-grid" style={{ padding: "20px 16px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a" }}>{currentCategory?.emoji} {currentCategory?.label}</h2>
          <p style={{ fontSize: 13, color: "#888", marginTop: 2 }}>{currentCategory?.desc}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
          {currentCategory?.items.map((item) => (
            <ItemCard key={item.id} item={item} onAdd={addItem} />
          ))}
        </div>
      </div>

      <div style={{ background: "#1a0a00", padding: "32px 20px", marginTop: 16 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 16 }}>About Us</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            Scholar Pizza is your neighbourhood pizza destination in Saeedabad, Baldia Town. We serve premium quality pizzas with 17 unique flavours, crispy burgers, loaded sandwiches, and amazing value deals — all made fresh for you.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {[
              { icon: "📍", label: "Address", val: "Sector 5-J, Saeedabad, Baldia Town" },
              { icon: "⏰", label: "Timing", val: "12:00 PM – 2:00 AM" },
              { icon: "📞", label: "Phone", val: "0337-7172185" },
              { icon: "🛵", label: "Delivery", val: "Area-based charges" },
            ].map((info) => (
              <div key={info.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px" }}>
                <div style={{ fontSize: 18, marginBottom: 4 }}>{info.icon}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 2 }}>{info.label}</div>
                <div style={{ fontSize: 13, color: "#fff", fontWeight: 600 }}>{info.val}</div>
              </div>
            ))}
          </div>
          <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=Scholar+Pizza+Sector+5J+Saeedabad+Baldia+Town+Karachi`, "_blank")} style={{ marginTop: 16, width: "100%", background: "#c9933a", color: "#fff", border: "none", borderRadius: 12, padding: "13px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            🗺️ Open in Google Maps
          </button>
        </div>
      </div>
 <div style={{ background: "#0d0500", color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "16px", fontSize: 12 }}>
        <p>© 2026 Scholar Pizza · Sector 5J, Saeedabad, Baldia Town, Karachi.</p>
        <p style={{ marginTop: 4 }}>Made with ❤️ for our community</p>
        <p style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 11 }}>
          Crafted by{" "}
          <a href="https://wa.me/923082787558" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.55)", fontWeight: 600, textDecoration: "none" }}>
            Obaid Ur Rehman
          </a>
        </p>
      </div>

      {count > 0 && !cartOpen && (
        <div style={{ position: "fixed", bottom: 20, left: 16, right: 16, zIndex: 150 }}>
          <button onClick={() => setCartOpen(true)} style={{ width: "100%", background: "#c0340d", color: "#fff", border: "none", borderRadius: 14, padding: "15px 20px", fontSize: 16, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 4px 20px rgba(192,52,13,0.4)" }}>
            <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "2px 10px", fontSize: 14 }}>{count} item{count > 1 ? "s" : ""}</span>
            <span>View Order 🛒</span>
            <span style={{ fontWeight: 900 }}>Rs. {total.toLocaleString()}</span>
          </button>
        </div>
      )}

      {cartOpen && (
        <CartSheet cart={cart} updateQty={updateQty} removeItem={removeItem} total={total} onClose={() => setCartOpen(false)} onOrder={handleOrder} />
      )}
    </div>
  );
}