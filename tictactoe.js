// Number of board games (maximum 10)
var boardsNum = 4;

// Player Variables
var playerClasses = ['circle', 'x'],
    playerTurn = [];

// Create boards
function createBoards(num) {
  var boardList = document.getElementById('game-list');

  // Create each board
  for(var i=0; i < num; i++){
    var board = document.createElement('li');
    board.className = 'game';

    // Add tracker to player turn array
    playerTurn.push(0)

    // Append slot to game div
    boardList.appendChild(board);
    // Initialise Game on this board
    newGame(board, i);
  }
}

// Create a new board game
function newGame(boardHtml, idx) {
  // Clear game div of last game
  while(boardHtml.firstChild) {
    boardHtml.removeChild(boardHtml.firstChild);
  }

  // Create 9 game slots
  for(var i=0; i < 9; i++){
    var slot = document.createElement('div');
    slot.className = 'slot';

    // Add click event listener
    slot.addEventListener('click', handleClick.bind(null, idx));

    // Append slot to game div
    boardHtml.appendChild(slot);
  }
}

// Handle slot click
function handleClick(idx, event) {
  slot = event.target;

  // Check if the slot hasn't been picked yet
  if(slot.className == 'slot'){
    // Add the player class to the slot
    slot.className = 'slot ' + playerClasses[playerTurn[idx]];
    // Check if the game has come to an end
    endCheck(slot.parentElement, idx);

    // Change player turns
    playerTurn[idx] = (playerTurn[idx] ? 0 : 1);
  }
}

// Check if game has ended
function endCheck(board, idx) {
  slots = board.childNodes;

  // Check horizontal lines
  if((slots[0].className != 'slot' && slots[0].className == slots[1].className && slots[0].className == slots[2].className)
  || (slots[3].className != 'slot' && slots[3].className == slots[4].className && slots[3].className == slots[5].className)
  || (slots[6].className != 'slot' && slots[6].className == slots[7].className && slots[6].className == slots[7].className)
  // Check vertical lines
  || (slots[0].className != 'slot' && slots[0].className == slots[3].className && slots[0].className == slots[6].className)
  || (slots[1].className != 'slot' && slots[1].className == slots[4].className && slots[1].className == slots[7].className)
  || (slots[2].className != 'slot' && slots[2].className == slots[5].className && slots[2].className == slots[8].className)
  // Check diagonal lines
  || (slots[0].className != 'slot' && slots[0].className == slots[4].className && slots[0].className == slots[8].className)
  || (slots[2].className != 'slot' && slots[2].className == slots[4].className && slots[2].className == slots[6].className)){
    if(confirm('Player ' + (playerTurn[idx] + 1) + ' wins on board ' + (idx) + '! New Game?'))
      newGame(board, idx);
  }

  // Check if all slots are full
  else if
    (slots[0].className != 'slot' && slots[1].className != 'slot' && slots[2].className != 'slot' &&
     slots[3].className != 'slot' && slots[4].className != 'slot' && slots[5].className != 'slot' &&
     slots[6].className != 'slot' && slots[7].className != 'slot' && slots[8].className != 'slot'){
        if(confirm('It\'s a tie on board ' + (idx) + '! New Game?'))
          newGame(board, idx);
  }
}

// Listen to keypress
document.onkeypress = function(key) {
  // Check if key is pressed is between 0 and 9
  if(key.keyCode >= 48 && key.keyCode <= 57){
    boards = document.getElementById('game-list').childNodes;

    // Reset board
    if(key.keyCode - 48 < boards.length)
      newGame(boards[key.keyCode - 48], key.keyCode - 48);
  }
}

// Initialise games
createBoards(boardsNum)
