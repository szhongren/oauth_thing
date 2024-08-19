"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginButton({ session, setSession }) {
  if (session?.email) {
    return (
      <button
        onClick={() => {
          fetch("/api/oauth/google/logout").then(() => setSession(undefined));
        }}
      >
        Sign out
      </button>
    );
  }
  return (
    <button>
      <Link href="/api/oauth/google/login">Sign in</Link>
    </button>
  );
}
