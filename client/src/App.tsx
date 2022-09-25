import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Axios from "axios";
import { SessionDisplay } from "./components/SessionDisplay";
import { AppContext, ISession } from "./AppContext";
import "./App.css";

function App() {
  const [helloWorld, setHelloWorld] = useState("");
  const [session, setSession] = useState<ISession>();

  const loadHelloWorld = useCallback(async () => {
    const message = await Axios.request({ url: "/api" }).then(
      (resp) => resp.data as string
    );
    setHelloWorld(message);
  }, []);

  const loadSession = useCallback(async () => {
    const data = await Axios.request({ url: "/api/session" }).then(
      (resp) => resp.data.data as ISession
    );
    setSession(data);
  }, []);

  async function addVisit() {
    await Axios.request({ url: "/api/session/visit", method: "POST" });
    await loadSession();
  }

  async function clearSession() {
    await Axios.request({ url: "/api/session", method: "DELETE" });
    await loadSession();
  }

  useLayoutEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    loadHelloWorld();
  }, [loadHelloWorld]);

  return (
    <AppContext.Provider
      value={{
        session,
        addVisit,
        loadSession,
        clearSession,
      }}
    >
      <div className="App">
        <header className="App-header">
          <p>{helloWorld}</p>
          <SessionDisplay />
        </header>
      </div>
    </AppContext.Provider>
  );
}

export default App;
