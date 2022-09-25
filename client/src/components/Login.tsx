import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import { useTextInput as useInput } from "../hooks/useInput";

export function Login() {
  const { login } = useContext(AppContext);
  const [username, usernameField] = useInput("text", "Username");
  const [password, passwordField] = useInput("password", "Password");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{usernameField}</div>
      <div>{passwordField}</div>
      <button type="submit">Login</button>
    </form>
  );
}
