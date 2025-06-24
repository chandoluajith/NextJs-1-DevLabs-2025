"use client";
import { useState } from "react";
export default function Registrationform() {
  const [password, setPassword] = useState("");
  const [confpassword, setConfPassword] = useState("");
  const [error, setError] = useState("");

  function change(value) {
    if (password != value) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  }

  return (
    <form className="flex flex-col gap-5">
      <input
        type="text"
        placeholder="Username"
        className="w-[500px] h-12 pl-2 py-1 pr-3 border-2 border-gray-400 rounded-md"
      ></input>
      <input
        type="email"
        placeholder="Email"
        className="w-[500px] h-12 pl-2 py-1 pr-3 border-2 border-gray-400 rounded-md"
      ></input>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-[500px] h-12 pl-2 py-1 pr-3 border-2 border-gray-400 rounded-md"
      ></input>
      <input
        type="password"
        value={confpassword}
        onChange={(e) => {
          setConfPassword(e.target.value);
          change(e.target.value);
        }}
        placeholder="Confirm Password"
        className="w-[500px] h-12 pl-2 py-1 pr-3 border-2 border-gray-400 rounded-md"
      ></input>

      {error != "" && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white h-16 rounded-md">
        Register
      </button>
    </form>
  );
}
