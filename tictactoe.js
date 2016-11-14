// Player Variables
var playerClasses = ['circle', 'x'],
    playerTurn = 0;

// Create a new board game
function newGame() {
  // Game div
  var boardHtml = document.getElementById('game');

  // Clear game div of last game
  while(boardHtml.firstChild) {
    boardHtml.removeChild(boardHtml.firstChild);
  }

  // Create 9 game slots
  for(var i=0; i < 9; i++){
    var slot = document.createElement('div');
    slot.className = 'slot';

    // Add click event listener
    slot.addEventListener('click', handleClick);

    // Append slot to game div
    boardHtml.appendChild(slot);
  }
}

// Handle slot click
function handleClick(event) {
  slot = event.target;

  // Check if the slot hasn't been picked yet
  if(slot.className == 'slot'){
    // Add the player class to the slot
    slot.className = 'slot ' + playerClasses[playerTurn];
    // Check if the game has come to an end
    endCheck(slot.parentElement);

    // Change player turns
    playerTurn = (playerTurn ? 0 : 1);
  }
}

// Check if game has ended
function endCheck(board) {
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
    if(confirm('Player ' + (playerTurn + 1) + ' wins! New Game?'))
      newGame();
  }

  // Check if all slots are full
  if(slots[0].className != 'slot' && slots[1].className != 'slot' && slots[2].className != 'slot' &&
     slots[3].className != 'slot' && slots[4].className != 'slot' && slots[5].className != 'slot' &&
     slots[6].className != 'slot' && slots[7].className != 'slot' && slots[8].className != 'slot'){
    if(confirm('It\'s a tie! New Game?'))
      newGame();
  }
}

// Check if all slots in array are used
function checkUsed(slot) {
  return slot.className != 'slot';
}

// Initialise game
newGame()
