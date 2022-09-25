import React, { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [helloWorld, setHelloWorld] = useState("");

  const loadHelloWorld = useCallback(async () => {
    const message = await Axios.request({ url: "/api" }).then(
      (resp) => resp.data as string
    );
    setHelloWorld(message);
  }, []);

  useEffect(() => {
    loadHelloWorld();
  }, [loadHelloWorld]);

  return (
    <div className="App">
      <header className="App-header">
        <p>{helloWorld}</p>
      </header>
    </div>
  );
}

export default App;
