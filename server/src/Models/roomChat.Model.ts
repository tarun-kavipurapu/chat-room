//this code can be used when i am shoowing a chat  which satisfies a specific criteria
interface chats {
  id: string;
  userId: string;
  message: string;
}
interface Room {
  roomId: string;
  chats: chats[];
}
let globalChatId = 0;
export class storeChat {
  private store: Map<string, Room>;

  constructor() {
    this.store = new Map<string, Room>();
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
    if(!room){
        console.log("This room is not found")
    }
    return room.chats.reverse();
  }
}
