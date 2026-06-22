const registerPollSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("joinPoll", (pollId) => {
      socket.join(pollId);

      console.log(
        `${socket.id} joined poll ${pollId}`
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "User Disconnected:",
        socket.id
      );
    });
  });
};

module.exports = registerPollSocket;