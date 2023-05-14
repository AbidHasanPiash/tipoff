import "./globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

export const metadata = {
  title: "TipOff",
  description: "Explore new place & Share your guidance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="responsive_color min-h-screen">
        <Provider>
          <div className="gbg -z-10"/>
          <Nav/>
          <main className="max-w-7xl mx-auto pt-20">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
