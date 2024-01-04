//user ==>userID,RoomID,conn
//Room==>user[]
//Rooms = Map<string,Room> --> matching rooms and room ID
import {WebSocket} from "ws"
interface user{
    userId:string,
    roomId:string,
    conn:WebSocket
}
interface Room{
    users:user[]
}


export class Rooms{
private rooms:Map<string,Room>

constructor(){
    this.rooms = new Map<string,Room>;
}
addUser(userId:string,roomId:string,conn:WebSocket){
    if(!this.rooms.get(roomId)){//if there is no room created with this id
        this.rooms.set(roomId, {
            users: []
        });
    }
    //if the room is alraedy there then push the user into the rooom
    this.rooms.get(roomId).users.push({
        userId,
        roomId,
        conn
    })
    conn.on('close',()=>{
        this.removeUser(userId,roomId);
    })
    
}
sendMessageToClient(userId,roomId,messageObject){
    const user = this.getUser(userId,roomId);
    user.conn.send(JSON.stringify(messageObject))

}
removeUser(userId:string,roomId:string){
//first get the users array with the user id  and the room id
//check if the user is present 
// use filter function  to remove the user 
const users   = this.rooms.get(roomId)?.users;
if(users){
users.filter(({userId}) => userId !== userId);}
}
getUser(userId:string,roomId:string){
const user = this.rooms.get(roomId)?.users.find((({userId}) => userId === userId));
return user ?? null;
}
broadcast(id:string,roomId:string,message:any){
    const user  = this.getUser(id,roomId);
    if(!user){
        console.error("user not found ")
    }

    const room = this.rooms.get(roomId);

    if(!room){
        console.error("Room not found")
        return;
    }
    const users  = this.rooms.get(roomId).users
    users.forEach(({conn,userId})=>{
        if(userId === id){
            return;
        }
        conn.send(JSON.stringify(message))
    })

}


} 