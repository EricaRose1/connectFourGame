const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

const makeBoard = () => {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = [...Array(HEIGHT)].map((e) => [...Array(WIDTH)]);
};

/** makeHtmlBoard: make HTML table and row of column tops. */

const makeHtmlBoard = () => {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector("#board");

  // TODO: add comment for this code
  // this code creates an one row and appends seven cells to that row. Also it appends the row to the top of the table that has id board
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (let x in [...Array(WIDTH)]) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  // this chunk of code creates 6 rows and appends 7 cells to each row and then append the row to the table that has id board
  for (let y in [...Array(HEIGHT)]) {
    const row = document.createElement("tr");
    for (let x in [...Array(WIDTH)]) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
};

const removeEvent = () => {
  document
    .querySelector("#column-top")
    .removeEventListener("click", handleClick, false);
};

/** findSpotForCol: given column x, return top empty y (null if filled) */

const findSpotForCol = (x) => {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {
    if (!board[y][x]) {
      return y;
    }
  }
};

/** placeInTable: update DOM to place piece into HTML table of board */

const placeInTable = (y, x) => {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement("div");
  div.classList.add("piece");
  div.classList.add(`p${currPlayer}`);

  const cell = document.getElementById(`${y}-${x}`);
  cell.append(div);
};

const removeDivsPiece = () => {
  const divs = document.querySelectorAll(".piece");
  for (let div of divs) {
    div.remove();
  }
};

/** endGame: announce game end */

const endGame = (msg) => {
  alert(msg);
};

/** handleClick: handle click of column top to play piece */

const handleClick = (evt) => {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    removeEvent();
    const player = currPlayer;
    alert(`Player ${player} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => row.every((cell) => cell))) {
    removeEvent();
    alert(`Game end, nobody wins!`);
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
};

/** checkForWin: check board cell-by-cell for "does a win start here?" */

const checkForWin = () => {
  const _win = (cells) => {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  };

  // TODO: read and understand this code. Add comments to help you.
  // creates four two dimensional arrays with coordinates-indexes
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      const vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      const diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      const diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

function resetButton() {
  if (confirm(`winner is ${currplayer}`)) {
  }
}
makeBoard();
makeHtmlBoard();
