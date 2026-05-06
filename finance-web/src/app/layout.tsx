import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
