const {io} = require('./index');

io.on('connection', (socket) => {
    console.log('User just connected')

    socket.on('userLogin', (data) => {
        console.log('sssssssssssssss', data)
    });
});

module.exports = io;