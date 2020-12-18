const users = []


/**
 * todo:
 * addUser function to add the joined users each user has the following structure 
 * user = {
 *  id: id,
 *  name: name,
 *  room: room,
 * color: color
 * }
 */
 //name, room, colors 
 function addUser({id,name,room,colors}){
     const user = {id,name,room,colors};
     users.push(user);
     console.log(` ${user.name} has joined ${user.room} with id: ${user.id}`);
     return user;
 }


 /*
 * removeUser function to remove the users who left the link/chat // id of the user provided as input
 */

function removeUser(id)
{
    const index = users.findIndex(user => user.id == id);
    if(index != -1)
    {
        const user = users.splice(index,1)[0];
        console.log(`${user} has left the chat`);
        return user;
    }
}

 /*
 getUsersInRoom function to get users in a room // room name provided as input
 */

 function getUsersInRoom(room)
 {
     const userObj = JSON.stringify(users.filter(user => user.room == room));
     console.log(userObj);
     return users.filter(user => user.room == room)
 }

 /*
 getOtherUserInRoom - room name must be equal whereas id of the user shouldnt be the same.
 INPUT: NEW USER ID, room 
 user filter
 */




 module.exports = {
    addUser,
    removeUser,
    getUsersInRoom
 };