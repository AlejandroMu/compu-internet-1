const net = require('net');

const selectCell = (i, j) => {
  const prom = new Promise((resp, reject) => {
    const socket = new net.Socket();

    socket.connect(12345, 'localhost', () => {
      const request = {
        action: 'SELECT_CELL',
        data: {
          i: i,
          j: j,
        },
      };
      socket.write(JSON.stringify(request));
      socket.write('\n');
      socket.once('data', (data) => {
        const message = data.toString().trim();
        try {
          resp(JSON.parse(message));
        } catch (e) {
          reject(e);
        }
      });
    });
  });
  return prom;
};

const getBoard = () => {
  const socket = new net.Socket();

  const prom = new Promise((resp, reject) => {
    socket.connect(12345, 'localhost', () => {
      console.log('connected');

      const request = {
        action: 'GET_BOARD',
        data: {},
      };
      socket.write(JSON.stringify(request));
      socket.write('\n');
      socket.once('data', (data) => {
        const message = data.toString().trim();
        try {
          resp(JSON.parse(message));
        } catch (e) {
          reject(e);
        }
      });
    });
  });
  return prom;
};

module.exports = { selectCell, getBoard };
