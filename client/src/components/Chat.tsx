import React from 'react';

const Chat = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-800 text-white p-10">
      <div className="flex flex-col flex-grow w-full max-w-xl bg-gray-900 shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
          {/* Add your chat messages here */}
        </div>
        <div className="bg-gray-700 p-4">
          <input className="flex items-center h-10 w-full rounded px-3 text-sm bg-gray-800 text-white" type="text" placeholder="Type your message…" />
        </div>
      </div>
    </div>
  );
};

export default Chat;