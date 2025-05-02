import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "next-themes";





export const metadata: Metadata = {
  title: "AlgoFlow",
  description: "A Visualizer of DSA Algorithms and DSA Questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
