import React, { useContext } from "react";
import { UserContext } from "../../utils/UserContext";

export default function Home() {
  const { user, setUser } = useContext(UserContext);
  return (
    <div>
      <h2>Home</h2>
      <div>{user}</div>
      <button
        onClick={() => {
          setUser("hey");
        }}
      >
        click me
      </button>
    </div>
  );
}
