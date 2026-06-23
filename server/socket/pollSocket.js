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
socket.on("joinPoll", (pollId) => {
  console.log(
    `${socket.id} joined poll ${pollId}`
  );

  socket.join(pollId);
});
module.exports = registerPollSocket;