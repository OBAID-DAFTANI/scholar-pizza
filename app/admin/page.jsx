"use client";
import { useState, useEffect } from "react";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("admin_authenticated", "true");
        onLogin();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a0a00", padding: 20 }}>
      <form onSubmit={handleSubmit} style={{ background: "#fff", borderRadius: 16, padding: 32, width: "100%", maxWidth: 360, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, textAlign: "center" }}>🍕 Scholar Pizza</h1>
        <p style={{ fontSize: 13, color: "#888", textAlign: "center", marginBottom: 24 }}>Admin Dashboard Login</p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e0ddd8", marginBottom: 12, fontSize: 14, boxSizing: "border-box" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e0ddd8", marginBottom: 16, fontSize: 14, boxSizing: "border-box" }}
        />
        {error && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button type="submit" disabled={loading} style={{ width: "100%", background: "#c0340d", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const STATUS_COLORS = {
  pending: "#dd6b20",
  confirmed: "#3182ce",
  preparing: "#805ad5",
  delivered: "#25a244",
};

const PAYMENT_COLORS = {
  pending: "#dd6b20",
  paid: "#25a244",
  cod: "#666",
};

function OrderCard({ order, onUpdateStatus, onUpdatePayment, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const date = new Date(order.createdAt).toLocaleString("en-PK", { dateStyle: "medium", timeStyle: "short" });

  return (
    <div style={{ background: "#fff", borderRadius: 14, border: "1px solid #f0ede8", marginBottom: 12, overflow: "hidden" }}>
      <div onClick={() => setExpanded(!expanded)} style={{ padding: 16, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{order.customerName}</span>
            <span style={{ background: STATUS_COLORS[order.orderStatus] || "#666", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>
              {order.orderStatus}
            </span>
            <span style={{ background: PAYMENT_COLORS[order.paymentStatus] || "#666", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase" }}>
              {order.paymentStatus === "cod" ? "COD" : order.paymentStatus}
            </span>
          </div>
          <div style={{ fontSize: 12, color: "#888" }}>{date} · {order.customerPhone}</div>
        </div>
        <div style={{ fontWeight: 800, fontSize: 17, color: "#c0340d", whiteSpace: "nowrap" }}>Rs. {order.total?.toLocaleString()}</div>
      </div>

      {expanded && (
        <div style={{ padding: "0 16px 16px", borderTop: "1px solid #f5f2ee" }}>
          <div style={{ marginTop: 12, marginBottom: 14 }}>
            {order.items?.map((item, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0", color: "#444" }}>
                <span>{item.name}{item.size ? ` (${item.size})` : ""} x{item.qty}</span>
                <span>Rs. {(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 13, color: "#666", marginBottom: 12, background: "#f9f6f2", borderRadius: 8, padding: 10 }}>
            <div><strong>Address:</strong> {order.customerAddress}</div>
            <div><strong>Payment:</strong> {order.paymentMethod}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div>
              <div style={{ fontSize: 11, color: "#888", marginBottom: 4, fontWeight: 600 }}>ORDER STATUS</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {["pending", "confirmed", "preparing", "delivered"].map((s) => (
                  <button key={s} onClick={() => onUpdateStatus(order._id, s)} style={{
                    background: order.orderStatus === s ? STATUS_COLORS[s] : "#f5f2ee",
                    color: order.orderStatus === s ? "#fff" : "#666",
                    border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "capitalize"
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {order.paymentMethod === "Easypaisa" && (
              <div>
                <div style={{ fontSize: 11, color: "#888", marginBottom: 4, fontWeight: 600 }}>PAYMENT STATUS</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {["pending", "paid"].map((s) => (
                    <button key={s} onClick={() => onUpdatePayment(order._id, s)} style={{
                      background: order.paymentStatus === s ? PAYMENT_COLORS[s] : "#f5f2ee",
                      color: order.paymentStatus === s ? "#fff" : "#666",
                      border: "none", borderRadius: 8, padding: "5px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", textTransform: "capitalize"
                    }}>{s === "paid" ? "✓ Mark Paid" : "Pending"}</button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => onDelete(order._id)} style={{ marginTop: 4, background: "transparent", color: "#e53e3e", border: "1px solid #fde8e3", borderRadius: 8, padding: "6px 10px", fontSize: 12, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>
              🗑️ Delete Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ onLogout }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, orderStatus) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, orderStatus } : o)));
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderStatus }),
    });
  };

  const updatePayment = async (id, paymentStatus) => {
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, paymentStatus } : o)));
    await fetch(`/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus }),
    });
  };

  const deleteOrder = async (id) => {
    if (!confirm("Delete this order?")) return;
    setOrders((prev) => prev.filter((o) => o._id !== id));
    await fetch(`/api/orders/${id}`, { method: "DELETE" });
  };

  const filteredOrders = filter === "all" ? orders : orders.filter((o) => o.orderStatus === filter);

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    revenue: orders.reduce((sum, o) => sum + (o.total || 0), 0),
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9f6f2" }}>
      <div style={{ background: "#1a0a00", padding: "16px 20px", position: "sticky", top: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ color: "#fff", fontSize: 18, fontWeight: 800 }}>🍕 Scholar Pizza — Orders</h1>
        <button onClick={onLogout} style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <div style={{ padding: 16, maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          <div style={{ background: "#fff", borderRadius: 12, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{stats.total}</div>
            <div style={{ fontSize: 11, color: "#888" }}>Total Orders</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#dd6b20" }}>{stats.pending}</div>
            <div style={{ fontSize: 11, color: "#888" }}>Pending</div>
          </div>
          <div style={{ background: "#fff", borderRadius: 12, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#25a244" }}>Rs. {stats.revenue.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: "#888" }}>Total Revenue</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto" }}>
          {["all", "pending", "confirmed", "preparing", "delivered"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#c0340d" : "#fff",
              color: filter === f ? "#fff" : "#555",
              border: "1px solid #e0ddd8", borderRadius: 20, padding: "6px 14px",
              fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", textTransform: "capitalize"
            }}>{f}</button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: "center", color: "#888", padding: 40 }}>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", padding: 40 }}>No orders found</p>
        ) : (
          filteredOrders.map((order) => (
            <OrderCard key={order._id} order={order} onUpdateStatus={updateStatus} onUpdatePayment={updatePayment} onDelete={deleteOrder} />
          ))
        )}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_authenticated") === "true";
    setAuthenticated(isAuth);
    setChecking(false);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_authenticated");
    setAuthenticated(false);
  };

  if (checking) return null;

  if (!authenticated) {
    return <LoginForm onLogin={() => setAuthenticated(true)} />;
  }

  return <Dashboard onLogout={handleLogout} />;
}
