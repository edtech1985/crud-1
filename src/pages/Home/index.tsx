import * as React from "react";

export default function Home() {
  //login
  const [user, setUser] = React.useState<{
    id: string | null;
    name: string;
  } | null>(null);

  const handleLogin = () => setUser({ id: "1", name: "robin" });
  const handleLogout = () => setUser(null);

  return (
    <>
      {user ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}
      <h1>Home</h1>
    </>
  );
}
