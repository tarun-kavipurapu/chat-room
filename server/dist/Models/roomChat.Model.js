"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeChat = void 0;
let globalChatId = 0;
class storeChat {
    constructor() {
        this.store = new Map();
    }
    initStore(roomId) {
        this.store.set(roomId, {
            roomId,
            chats: [],
        });
    }
    addChat(userId, roomId, message) {
        if (!this.store.get(roomId)) {
            //room not intialised
            this.initStore(roomId);
        }
        const room = this.store.get(roomId);
        if (!room) {
            return;
        }
        const chat = {
            id: (globalChatId++).toString(),
            userId,
            message,
        };
        room.chats.push(chat);
        return chat;
    }
    getChat(roomId) {
        const room = this.store.get(roomId);
        if (!room) {
            console.log("This room is not found");
        }
        return room.chats.reverse();
    }
}
exports.storeChat = storeChat;
