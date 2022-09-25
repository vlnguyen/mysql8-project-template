import React, { useContext } from "react";
import { AppContext } from "../AppContext";

export function SessionDisplay() {
  const { session, addVisit, clearSession, logout } = useContext(AppContext);
  return (
    <div>
      <pre>{JSON.stringify(session)}</pre>
      <button onClick={addVisit}>Visit</button>{" "}
      {session?.userId && <button onClick={logout}>Logout</button>}{" "}
      <button onClick={clearSession}>Clear Session</button>
    </div>
  );
}
