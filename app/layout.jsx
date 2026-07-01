import "./globals.css";

export const metadata = {
  title: "Scholar Pizza | Saeedabad, Baldia Town Karachi",
  description: "Premium Quality Pizza, Burgers, Deals & More. Dine In, Takeaway & Delivery. Call 0337-7172185. Open 12PM - 2AM.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
