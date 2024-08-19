"use client";

import LoginButton from "./LoginButton";

export default function Header({ session, setSession }) {
  return (
    <div className="flex flex-row w-full justify-between bg-blue-500 text-white p-4">
      <h1>OAuth2.0 app</h1>
      {session?.email ? (
        <div className="flex flex-row justify-between">
          Signed in as {session.email} <br />
        </div>
      ) : (
        <div className="flex flex-row justify-between">
          Not signed in <br />
        </div>
      )}
      <LoginButton session={session} setSession={setSession} />
    </div>
  );
}
