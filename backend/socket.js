const { io } = require("./server");
const userService = require("./src/services/UserServices");

io.on("connection", (socket) => {
  console.log("User just connected");

  socket.on("newUser", async (data) => {
    const user = await userService.findById(data?._id);
    if (user) {
      socket.broadcast.emit("recieveNewUser", user);
    }
  });
});

module.exports = io;
