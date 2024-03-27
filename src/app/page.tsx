import { getServerSession } from "next-auth";
import { authOptions } from "./utils/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col">
      <h1 className="">Home page</h1>
      {session ? (
        <p>Session found: {JSON.stringify(session)}</p>
      ) : (
        <p>Unauthorized</p>
      )}
    </main>
  );
}
