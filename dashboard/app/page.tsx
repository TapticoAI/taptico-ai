export default function Home() {
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
        Placeholder. Login and tasks coming in the next steps.
      </p>
    </main>
  );
}
