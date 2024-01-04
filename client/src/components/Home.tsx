import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const Home = ({ ws, setWs, room, setRoom, username, setUsername }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const userRoomObject = {
      event: "setUserRoom",
      payload: {
        userId: username,
        roomId: room,
      },
    };

    if (ws) {
      ws.send(JSON.stringify(userRoomObject));

      // ws.onmessage = (event) => {
      //   const data = JSON.parse(event.data);

      //   if (data.event === "userRoomResponse" && data.payload.success) {
      //     // Navigate to /chat page
      //     console.log(data);
      //     navigate("/chat", { replace: true });
      //   }
      // };
      navigate("/chat", { replace: true });

    }
  };

  // useEffect(() => {
  //   if (ws) {
  //     ws.onmessage = (event) => {
  //       // const data = JSOn
  //       console.log(event.data);
  //       setMessages((prevMessages) => [...prevMessages, event.data]);
  //     };
  //   }
  // }, [ws]);

  // const sendMessage = () => {
  //   const messageObject = {
  //     event: "sendMessage",
  //     payload: {
  //       message,
  //       timeStamp: new Date().toISOString(),
  //       userId: username,
  //       roomId: room,
  //     },
  //   };
  //   if (ws) {
  //     ws.send(JSON.stringify(messageObject)); // Send the value of the input field
  //     setMessage(""); // Clear the input field
  //   }
  // };

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-800 text-white p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-gray-900 shadow-xl rounded-lg overflow-hidden p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Chat</h1>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="roomId">
            Room ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
            id="roomId"
            type="text"
            placeholder="Room ID"
            value={room}
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
