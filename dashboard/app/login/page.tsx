"use client";

import { useState } from "react";
import { sendMagicLink } from "./actions";

type Status = "idle" | "sending" | "sent" | "error";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const result = await sendMagicLink(email);
    if (result.ok) {
      setStatus("sent");
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: 360 }}>
        <h1 style={{ fontSize: "1.75rem", margin: 0, letterSpacing: "-0.02em" }}>
          Sign in
        </h1>
        <p style={{ opacity: 0.6, marginTop: "0.5rem", fontSize: "0.95rem" }}>
          We'll email you a one-tap login link.
        </p>

        {status === "sent" ? (
          <div
            style={{
              marginTop: "1.5rem",
              padding: "1rem",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              background: "#111",
            }}
          >
            <p style={{ margin: 0 }}>Check your inbox at <b>{email}</b>.</p>
            <p style={{ opacity: 0.6, marginTop: "0.5rem", fontSize: "0.85rem" }}>
              Click the link in the email to finish signing in. You can close this tab.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} style={{ marginTop: "1.5rem" }}>
            <label htmlFor="email" style={{ fontSize: "0.85rem", opacity: 0.8 }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@taptico.com"
              style={{
                display: "block",
                width: "100%",
                marginTop: "0.4rem",
                padding: "0.7rem 0.9rem",
                fontSize: "1rem",
                background: "#111",
                color: "#fafafa",
                border: "1px solid #2a2a2a",
                borderRadius: 8,
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                marginTop: "1rem",
                width: "100%",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#0a0a0a",
                background: status === "sending" ? "#888" : "#fafafa",
                border: "none",
                borderRadius: 8,
                cursor: status === "sending" ? "default" : "pointer",
              }}
            >
              {status === "sending" ? "Sending…" : "Email me a login link"}
            </button>

            {error && (
              <p
                style={{
                  marginTop: "0.75rem",
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                }}
              >
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </main>
  );
}
