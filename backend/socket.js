const socketIo = require('socket.io');
const userModel = require('./models/userModel');
const captainModel = require('./models/captainModel');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

//we make this event name "join" to make the client join the room with thesame id as user 
        socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log(userId, userType);


            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });


        // socket.on('update-location-captain', async (data) => {
        //     const { userId, location } = data;

        //     if (!location || !location.ltd || !location.lng) {
        //         return socket.emit('error', { message: 'Invalid location data' });
        //     }

        //     await captainModel.findByIdAndUpdate(userId, {
        //         location: {
        //             ltd: location.ltd,
        //             lng: location.lng
        //         }
        //     });
        // });

        socket.on('update-location-captain', async (data) => {
            try {
                const { userId, location } = data;
        
                if (!location || typeof location.ltd !== 'number' || typeof location.lng !== 'number') {
                    return socket.emit('error', { message: 'Invalid location data' });
                }
        
                const updatedCaptain = await captainModel.findByIdAndUpdate(
                    userId,
                    {
                        $set: {
                            location: {
                                type: "Point",
                                coordinates: [location.lng, location.ltd] // Correct GeoJSON format
                            }
                        }
                    },
                    { new: true } // Return updated document
                );
        
                if (!updatedCaptain) {
                    return socket.emit('error', { message: 'Captain not found' });
                }
        
                socket.emit('location-updated', { message: 'Location updated successfully', location: updatedCaptain.location });
        
            } catch (error) {
                console.error('Error updating location:', error);
                socket.emit('error', { message: 'Error updating location', error: error.message });
            }
        });
        
        

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId };