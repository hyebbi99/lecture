const bodyParser = require("body-parser");

var express = require("express"),
  http = require("http"),
  app = express();
bodyParser = require("body-parser");
var server = http.createServer(app);
server.listen(80);

app.use(express.static(__dirname + "/web"));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  console.log("[Server] Get :/");
  res.send("Hi, CLient, I am a server");
});

app.post("/", (req, res) => {
  console.log("[Server] POST : " + JSON.stringify(req.body));
  res.send(`post value is : ` + req.body.Client + ``);
});
