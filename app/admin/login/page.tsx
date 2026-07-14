"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.message || "סיסמה שגויה");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-4 py-24">
      <h1 className="text-xl font-extrabold text-camp-forest-900">כניסת ניהול</h1>
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <label className="block text-sm font-medium text-camp-bark-800">
          סיסמה
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded-xl border border-camp-sand-200 px-3 py-2 outline-none transition focus:border-camp-forest-600 focus:ring-2 focus:ring-camp-forest-600/15"
            autoFocus
          />
        </label>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-camp-forest-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-camp-forest-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "בודק..." : "כניסה"}
        </button>
      </form>
    </div>
  );
}
