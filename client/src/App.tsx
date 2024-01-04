import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import Chat from "./components/Chat";
function App() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState(""); // New state for the input field
  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000");
    setWs(websocket);

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                room={room}
                setRoom={setRoom}
                setUsername={setUsername}
                username={username}
                ws={ws}
                setWs={setWs}
              />
            }
          />
          <Route
            path="/chat"
            element={
              <Chat
                ws={ws}
                roomId={room}
                userId={username}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// <div>
//   <label>Room</label>
//   <input value={room} onChange={e => setRoom(e.target.value)} />

//   <label>Username</label>
//   <input value={username} onChange={e => setUsername(e.target.value)} /> {/* New input field */}
//   {/* <button onClick={sendMessage}>set Username</button> */}
//   <label>Message</label>
//   <input value={message} onChange={e => setMessage(e.target.value)} /> {/* New input field */}
//   <button onClick={sendMessage}>Send Message</button>
//   <ul>
//     {messages.map((message, index) => (
//       <li key={index}>{message}</li>
//     ))}
//   </ul>
// </div>

export default App;
