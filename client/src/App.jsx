import { useEffect, useState } from "react";
import "./App.css";
import { NavBar } from "./components/navbar";
import { Card } from "./components/card";
import { posts } from "./data";
import { io } from "socket.io-client";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleClick = () => {
    setUser(username);
  };

  useEffect(() => {
    setSocket(io(import.meta.env.VITE_SERVER_URL));
  }, []);

  useEffect(() => {
    socket?.emit("client:newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <NavBar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input type="text" placeholder="username" onChange={handleChange} />
          <button onClick={handleClick}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
