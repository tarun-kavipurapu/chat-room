"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const roomUser_Model_1 = require("./Models/roomUser.Model");
const roomChat_Model_1 = require("./Models/roomChat.Model");
const app = (0, express_1.default)();
const port = 8000;
const server = http_1.default.createServer(app);
const wss = new ws_1.WebSocketServer({ server });
const clientIDs = new Map();
let nextId = 1;
//object structure
// {
// event:
// payload:{
// message:
// }
//
const manageUser = new roomUser_Model_1.Rooms();
const manageChat = new roomChat_Model_1.storeChat();
wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = nextId++;
    clientIDs.set(ws, id);
    console.log("Websocket connect to client", wss.clients.size);
    ws.on("message", (message) => {
        console.log("received: %s", message);
        const data = JSON.parse(message.toString());
        // console.log(data);
        if (data.event === "setUserRoom") {
            const { userId, roomId } = data.payload;
            manageUser.addUser(userId, roomId, ws);
            const responseObject = {
                event: "userRoomResponse",
                payload: {
                    success: true,
                    message: "User Successfully added to the room",
                },
            };
            manageUser.sendMessageToClient(userId, roomId, responseObject);
        }
        if (data.event === "setMessage") {
            const { userId, roomId } = data.payload;
            const messageObject = {
                event: "responseChat",
                payload: {
                    message: data.payload.message,
                    time: data.payload.timeStamp,
                    userId,
                    roomId,
                },
            };
            console.log(messageObject);
            manageUser.broadcast(userId, roomId, messageObject);
            //   if()
            //  console.log(data);
        }
        // if (data.event === "sendMessage") {
        //   const messageObject = {
        //     message: data.payload.message,
        //     time: data.payload.timeStamp,
        //     userId: data.payload.userId,
        //     roomId: data.payload.roomId,
        //   };
        //   manageUser.broadcast(userId,roomId,messageObject);
        // }
    });
    ws.on("close", () => {
        console.log(`connection closed for client ${id}`);
        clientIDs.delete(ws);
    });
}));
app.get("/health", (req, res) => {
    res.json({ msg: "I am healthy" });
});
server.listen(port, () => {
    console.log(`server runnning on ${port}`);
});
