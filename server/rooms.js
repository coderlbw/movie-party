
const rooms = []
/**
 * define a method to get active rooms list
 */


function getActiveRooms(io)
{
    //not that sure on its working
    console.log(`list of rooms:  ${JSON.stringify(io.sockets.adapter.rooms)}`);
    console.log(`list of rooms:  ${JSON.stringify(Object.keys(io.sockets.adapter.rooms))}`);
    
    return Object.keys(io.sockets.adapter.rooms);
}


module.exports = {

getActiveRooms
}