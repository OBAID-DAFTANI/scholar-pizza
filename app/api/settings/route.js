import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

const DEFAULT_SETTINGS = {
  name: "Scholar Pizza",
  tagline: "Premium Quality · Premium Taste",
  phone: "03377172185",
  whatsapp: "923377172185",
  address: "Sector 5-J, Saeedabad, Baldia Town",
  timing: "12:00 PM – 2:00 AM",
  deliveryInfo: "Area-based charges",
  isOpen: true,
  bannerText: "",
  bannerActive: false,
  deliveryAreas: [],
};

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("scholarpizza");
    const settings = await db.collection("settings").findOne({ key: "restaurant" });
    return NextResponse.json({ settings: settings || DEFAULT_SETTINGS });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json({ settings: DEFAULT_SETTINGS });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { name, tagline, phone, whatsapp, address, timing, deliveryInfo, isOpen, bannerText, bannerActive, deliveryAreas } = body;

    const client = await clientPromise;
    const db = client.db("scholarpizza");
    await db.collection("settings").updateOne(
      { key: "restaurant" },
      { $set: { key: "restaurant", name, tagline, phone, whatsapp, address, timing, deliveryInfo, isOpen, bannerText, bannerActive, deliveryAreas } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}