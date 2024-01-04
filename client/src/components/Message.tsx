import React from 'react';

const Message = ({item }) => {
  return (
    <div className="flex flex-col bg-gray-800 rounded-lg p-2 mb-2">
      <div className="text-sm text-blue-300">{item.userId} 
      </div>
      {/* <span className="text-gray-500 text-xs">{ Date(timestamp).toLocaleTimeString()}</span></div> */}
      <div className="text-white">{item.message}</div>
    </div>
  );
};

export default Message;