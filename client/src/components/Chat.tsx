import React, { useEffect,useState } from 'react';
import Message from './Message';

const Chat = ({roomId,userId,ws}) => {

const [message,setMessage] = useState('');
const [chat,setChat] = useState([]);
const[messageReceived,setMessageReceived] = useState('');


  useEffect(()=>{
    if(ws){
      ws.onmessage=(event)=>{
        
        const data = JSON.parse(event.data);
        if (data.event === "responseChat" ) {
          // Navigate to /chat page
          console.log(data);
          setChat((prevChat)=>[...prevChat,data.payload])
          
        }        
      }

    }

  },[])
  const handleSend=()=>{
    const messageObject={
      event:"setMessage",
      payload:{
        message,
        timeStamp:new Date().toISOString(),
        userId,//perform username and roomID chheck with already sent roomId annd usernname at the backend 
        roomId,
      }
    }
    if(ws){
      ws.send(JSON.stringify(messageObject));
      setChat((prev)=>[...prev,messageObject.payload]); // Send the value of the input field
      setMessage(''); // Clear the input field
    }
  }


  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-800 text-white p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-gray-900 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {/* <Message userId = {userId} message={message} /> */}
           {chat.map((item, index) => (
            <Message key={index} item={item} />
          ))}
        </div>
        <div className="bg-gray-700 p-4 flex items-center">
          <input className="flex-grow h-10 rounded px-3 text-sm bg-gray-800 text-white" type="text" placeholder="Type your message…" value={message} onChange={(e)=>setMessage(e.target.value)} />
          <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;