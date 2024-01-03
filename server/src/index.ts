import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { Rooms } from "./Models/roomUser.Model";
import { storeChat } from "./Models/roomChat.Model";

const app = express();
const port = 8000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

const clientIDs = new Map();
let nextId = 1;

//object structure
// {
// event:
// payload:{
// message:
// }
//
const manageUser = new Rooms();

const manageChat = new storeChat();

wss.on("connection", async (ws, req) => {
  const id = nextId++;
  clientIDs.set(ws, id);
  console.log("Websocket connect to client", wss.clients.size);
  ws.on("message", (message) => {
    console.log("received: %s", message);
    const data = JSON.parse(message.toString());
    console.log(data);
    const { userId, roomId } = data.payload;
    manageUser.addUser(userId, roomId, ws);
    if(data.event === "setUserRoom"){
      
    }


    if (data.event === "sendMessage") {
      const messageObject = {
        message: data.payload.message,
        time: data.payload.timeStamp,
        userId: data.payload.userId,
        roomId: data.payload.roomId,
      };
      manageUser.broadcast(userId,roomId,messageObject);
    }
  });
  ws.on("close", () => {
    console.log(`connection closed for client ${id}`);
    clientIDs.delete(ws);
  });
});

app.get("/health", (req, res) => {
  res.json({ msg: "I am healthy" });
});

server.listen(port, () => {
  console.log(`server runnning on ${port}`);
});
