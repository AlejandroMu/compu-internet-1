import Cell from './Cell.js';

const Board = (cells, showCell) => {
  console.log(cells);

  const n = cells.length;
  const m = cells[0].length;
  const boardContainer = document.createElement('div');
  boardContainer.className = 'board';
  for (let i = 0; i < n; i++) {
    const rowN = document.createElement('div');
    rowN.id = '' + i;
    rowN.className = 'row';
    for (let j = 0; j < m; j++) {
      const cell = Cell({ ...cells[i][j], id: i+"-"+j, onClick:showCell });
      rowN.appendChild(cell);
    }
    boardContainer.appendChild(rowN);
  }

  return boardContainer;
};

export default Board;
