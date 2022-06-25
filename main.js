const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 3000;

let USERS = [];
let INDEX = 0;

app.get("/", (_, res) => {
  res.sendFile("index.html", { root: __dirname });
});

io.on("connection", _ => {
  USERS.push("user:" + (INDEX + 1));
  console.log(`user ${USERS[INDEX]} connected`);
  INDEX++;
});

io.on("connection", socket => {
  socket.on("chat message", msg => {
    io.emit("chat message", msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
