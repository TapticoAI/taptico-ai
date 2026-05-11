import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

/**
 * Scoped layout for the legacy waitlist landing page.
 * Overrides the SLS brand body styling with the original dark theme.
 */
export default function WaitlistLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={poppins.className}
      style={{
        backgroundColor: "#030303",
        color: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}
