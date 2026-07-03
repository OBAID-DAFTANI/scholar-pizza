import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("scholarpizza");
    const orders = await db.collection("orders").find({}).toArray();

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(startOfToday);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const sumTotal = (list) => list.reduce((s, o) => s + (o.total || 0), 0);

    const todayOrders = orders.filter((o) => new Date(o.createdAt) >= startOfToday);
    const weekOrders = orders.filter((o) => new Date(o.createdAt) >= startOfWeek);
    const monthOrders = orders.filter((o) => new Date(o.createdAt) >= startOfMonth);

    const itemCounts = {};
    orders.forEach((o) => {
      (o.items || []).forEach((it) => {
        itemCounts[it.name] = (itemCounts[it.name] || 0) + it.qty;
      });
    });
    const topItems = Object.entries(itemCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, qty]) => ({ name, qty }));

    return NextResponse.json({
      today: { count: todayOrders.length, total: sumTotal(todayOrders) },
      week: { count: weekOrders.length, total: sumTotal(weekOrders) },
      month: { count: monthOrders.length, total: sumTotal(monthOrders) },
      allTime: { count: orders.length, total: sumTotal(orders) },
      avgOrderValue: orders.length ? Math.round(sumTotal(orders) / orders.length) : 0,
      topItems,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}