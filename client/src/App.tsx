import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import Axios from "axios";
import { SessionDisplay } from "./components/SessionDisplay";
import { AppContext, ISession } from "./AppContext";
import { Login } from "./components/Login";
import { UserDisplay } from "./components/UserDisplay";
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

  async function login(username: string, password: string) {
    await Axios.request({
      url: "/api/session/login",
      method: "POST",
      data: { username, password },
    }).then((resp) => resp.data);
    await loadSession();
  }

  async function logout() {
    await Axios.request({ url: "/api/session/logout", method: "POST" });
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
        login,
        logout,
      }}
    >
      <div className="App">
        <header className="App-header">
          <p>{helloWorld}</p>
          {!session?.userId && <Login />}
          <UserDisplay />
          <SessionDisplay />
        </header>
      </div>
    </AppContext.Provider>
  );
}

export default App;
