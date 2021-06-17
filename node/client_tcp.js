var net = require('net');
function getConnection(connName) {
    var client = net.connect({ port: 8107, host: '172.30.245.74' }, function () {
        console.log(connName) //connname찍기
        this.setTimeout(500); //쉬었다가 가기
        this.setEncoding('utf8'); //엔코딩 방식 중 1개
        this.on('data', function (data) {
            console.log(data)
            this.end();
        });
        this.on('end', function () {
        });
        this.on('error', (err) => {
        });
        this.on('timeout', function () {
        });
        this.on('close', function () {
        });
    });
    return client;
}

function writeData(socket, data) {
    var success = !socket.write(data);
    if (!success) {
        (function (socket, data) {
            socket.once('drain', function () {
                writeData(socket, data);
            });
        })(socket, data);
    }
}
var Alice = getConnection("Alice's Connection");
var Bob = getConnection("Bob's Connection");
writeData(Alice, "Alice|Hi, Server");
writeData(Bob, "Bob|Hello, Server");
