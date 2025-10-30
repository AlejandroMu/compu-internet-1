import Board from '../components/Board.js';
// import axios from "axios";

const getBoard = async () => {
  let data = await fetch('http://localhost:5000/board', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data.json();
};

const showCell = async (cellId) => {
  const id = cellId.split('-');
  const i = parseInt(id[0]);
  const j = parseInt(id[1]);

  let data = await fetch('http://localhost:5000/board', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      i: i,
      j: j,
    }),
  });
  const container = document.getElementById('home-page');
  container.removeChild(container.querySelector('.board'));

  const newMatrix = await data.json();

  const win = newMatrix.data.win;
  const end = newMatrix.data.gameEnd;
  console.log({ win, end });
  if (end) {
    if (win) {
      alert('You Win!!');
    } else {
      alert('You Loss :c');
    }
  }

  const board = Board(newMatrix.data.board, showCell);
  container.appendChild(board);
};

function Game() {
  const container = document.createElement('div');
  container.id = 'home-page';
  // getBoardAxios();
  const title = document.createElement('h1');
  title.innerText = 'Land Mines';
  title.classList = 'title';
  container.appendChild(title);

  const cells = getBoard();
  cells.then((data) => {
    const board = Board(data.data.board, showCell);
    container.appendChild(board);
  });

  return container;
}

export default Game;
