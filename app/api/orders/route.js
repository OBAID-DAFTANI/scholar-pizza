import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { items, total, customerName, customerPhone, customerAddress, paymentMethod } = body;

    if (!items || items.length === 0 || !total) {
      return NextResponse.json({ error: "Missing order data" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("scholarpizza");

    const order = {
      items,
      total,
      customerName: customerName || "Not provided",
      customerPhone: customerPhone || "Not provided",
      customerAddress: customerAddress || "Not provided",
      paymentMethod: paymentMethod || "Cash on Delivery",
      paymentStatus: paymentMethod === "Easypaisa" ? "pending" : "cod",
      orderStatus: "pending",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json({
      success: true,
      orderId: result.insertedId,
      order: { ...order, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const client = await clientPromise;
    const db = client.db("scholarpizza");

    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
