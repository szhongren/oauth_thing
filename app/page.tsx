"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import MainPanel from "./components/MainPanel";

export default function Home() {
  let [session, setSession] = useState(null);
  useEffect(() => {
    fetch("/api/oauth/google/session")
      .then((res) => res.json())
      .then((data) => setSession(data));
  }, []);
  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <Header session={session} setSession={setSession}></Header>
      <MainPanel session={session} setSession={setSession}></MainPanel>
    </main>
  );
}
