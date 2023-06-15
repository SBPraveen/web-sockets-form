 const webSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('connected and no of clients connected', io.engine.clientsCount);  

        socket.on('join', (roomId) => {
            console.log(roomId);
            socket.join(roomId)
        });   

        socket.on('valChanged', (data) => {
            console.log(data) 
            const {jobId, invId, changedValue, field} = data
            const changes = { changedValue, field}
            const roomId = `${jobId}#${invId}`
            console.log(roomId);
            socket.to(roomId).emit(field, changes)
                // if( msg === `Done`){
                //     socket.emit("Done" ,msg);
                //     socket.disconnect(true)
                // }
                
  
        });   
    });

}
export default webSocket