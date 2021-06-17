var net = require('net');
var server = net.createServer(function (client) {
    console.log("hi")
    client.setTimeout(500);
    client.setEncoding('utf8');
    client.on('data', function (data) {
        username = data.split("|")[0]
        writeData(client, 'Sending: nice to meet you' + username);
    });
    client.on('end', function () {
        server.getConnections(function (err, count) {
        });
    });
    client.on('error', function (err) {
        console.log("error")
    });
    client.on('timeout', function () {
    });
});

server.listen(8107, function () {
    console.log("listen 8107")
    server.on('close', function () {
    });
    server.on('error', function (err) {
    });
});
function writeData(socket, data) { //어떤 소켓을 받아서 데이터 쓰기
    var success = !socket.write(data); //쓰기에 성공하면
    if (!success) {
        (function (socket, data) {
            socket.once('drain', function () {
                writeData(socket, data);
            });
        })(socket, data);
    }
}
