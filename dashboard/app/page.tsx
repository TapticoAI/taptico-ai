import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "2.25rem", margin: 0, letterSpacing: "-0.02em" }}>
        TapticoOS Dashboard
      </h1>
      <p style={{ opacity: 0.6, marginTop: "0.75rem", fontSize: "1rem" }}>
        Signed in as <b>{user.email}</b>. Tasks coming in the next step.
      </p>

      <form action="/auth/sign-out" method="post" style={{ marginTop: "1.5rem" }}>
        <button
          type="submit"
          style={{
            padding: "0.55rem 1rem",
            fontSize: "0.9rem",
            color: "#fafafa",
            background: "transparent",
            border: "1px solid #2a2a2a",
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </form>
    </main>
  );
}
