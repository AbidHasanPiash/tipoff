import "./globals.css";

export const metadata = {
  title: "TipOff",
  description: "Explore new place & Share your guidance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="gbg">
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
