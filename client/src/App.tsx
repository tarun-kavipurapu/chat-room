import React, { useEffect, useState } from 'react';

function App() {
  const [ws, setWs] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username,setUsername] = useState('');
  const [room,setRoom] = useState(''); // New state for the input field

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8000');
    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        // const data = JSOn
        console.log(event.data);  
        setMessages((prevMessages) => [...prevMessages, event.data]);
      };
    }
  }, [ws]);

  const sendMessage = () => {
    const messageObject = {
      event:'sendMessage',
      payload:{
        message,
        timeStamp:new Date().toISOString(),
        userId:username,
        roomId:room
      },
    }
    if (ws) {
      ws.send(JSON.stringify(messageObject)); // Send the value of the input field
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div>
      <label>Room</label>
      <input value={room} onChange={e => setRoom(e.target.value)} />

      <label>Username</label>
      <input value={username} onChange={e => setUsername(e.target.value)} /> {/* New input field */}
      {/* <button onClick={sendMessage}>set Username</button> */}
      <label>Message</label>
      <input value={message} onChange={e => setMessage(e.target.value)} /> {/* New input field */}
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;