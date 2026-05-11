export const metadata = {
  title: "TapticoOS Dashboard",
  description: "Your agentic operating system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          margin: 0,
          background: "#0a0a0a",
          color: "#fafafa",
        }}
      >
        {children}
      </body>
    </html>
  );
}
