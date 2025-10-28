const net = require('net');

const socket = new net.Socket();

let connected = false;

socket.connect(12345, 'localhost', () => {
  console.log('connected');
  connected = true;
});

const selectCell = (i, j) => {
  if (connected) {
    const request = {
      action: 'SELECT_CELL',
      data: {
        i: i,
        j: j,
      },
    };
    socket.write(JSON.stringify(request));
    socket.write('\n');
    const prom = new Promise((resp, reject) => {
      socket.once('data', (data) => {
        const message = data.toString().trim();
        try {
          resp(JSON.parse(message));
        } catch (e) {
          reject(e);
        }
      });
    });
    return prom;
  }
};

module.exports = { selectCell };
