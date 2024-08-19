import SignedInPanel from "./SignedInPanel";

export default function MainPanel({ session, setSession }) {
  if (!session?.email)
    return (
      <div className="min-h-full w-full bg-gray-200 p-4">Not logged in</div>
    );
  return <SignedInPanel></SignedInPanel>;
}
