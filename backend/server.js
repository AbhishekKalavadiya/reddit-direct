const express = require("express");
// const bodyParser = require("body-parser");
const user = require("./routes/user");
const commentsRouter = require('./routes/comments');
const cacheRouter = require('./routes/cache');
const InitiateMongoServer = require("./config/db");
const expressWs = require('express-ws');
const cors = require("cors")

require('dotenv-safe').config()

const app = express();
const PORT = process.env.PORT;

const corsOptions = {
  exposedHeaders: 'token',
};
app.use(cors(corsOptions));

app.use(express.json());
const wsInstance = expressWs(app);

InitiateMongoServer();
// app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/user", user)
app.use('/api/comments',commentsRouter);
app.use('/api/cache', cacheRouter);

app.ws('/comment', (ws, req) => {

  ws.on('message', function incoming(message) {
    console.log(message) ;
    ws.broadcast(message);
  });

  ws.broadcast = function broadcast(data) {
    wsInstance.getWss().clients.forEach(function each(client) {
    client.send(data);
    });
  };
})

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});
