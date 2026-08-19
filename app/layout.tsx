import "./globals.css";
export { metadata } from "@/lib/web/metadata";


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
