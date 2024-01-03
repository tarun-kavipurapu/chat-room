"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rooms = void 0;
class Rooms {
    constructor() {
        this.rooms = new Map;
    }
    addUser(userId, roomId, conn) {
        if (!this.rooms.get(roomId)) { //if there is no room created with this id
            this.rooms.set(roomId, {
                users: []
            });
        }
        //if the room is alraedy there then push the user into the rooom
        this.rooms.get(roomId).users.push({
            userId,
            roomId,
            conn
        });
        conn.on('close', () => {
            this.removeUser(userId, roomId);
        });
    }
    removeUser(userId, roomId) {
        var _a;
        //first get the users array with the user id  and the room id
        //check if the user is present 
        // use filter function  to remove the user 
        const users = (_a = this.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.users;
        if (users) {
            users.filter(({ userId }) => userId !== userId);
        }
    }
    getUser(userId, roomId) {
        var _a;
        const user = (_a = this.rooms.get(roomId)) === null || _a === void 0 ? void 0 : _a.users.find((({ userId }) => userId === userId));
        return user !== null && user !== void 0 ? user : null;
    }
    broadcast(id, roomId, message) {
        const user = this.getUser(id, roomId);
        if (!user) {
            console.error("user not found ");
        }
        const room = this.rooms.get(roomId);
        if (!room) {
            console.error("Room not found");
            return;
        }
        const users = this.rooms.get(roomId).users;
        users.forEach(({ conn, userId }) => {
            if (userId === id) {
                return;
            }
            conn.send(JSON.stringify(message));
        });
    }
}
exports.Rooms = Rooms;
