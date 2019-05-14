const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 4000 });
let numberOfUsers = {'number' : 0};

wss.on('connection', function connection(ws) {
    numberOfUsers.number += 1;
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(numberOfUsers));
        }
    });
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
        if (data === "CLOSE") {
            numberOfUsers.number -= 1;
            wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(numberOfUsers));
                }
            });
        }
    });
});