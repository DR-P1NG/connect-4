//Config
var boardHeight = 6;
var boardWidth = 7;

//Registry
var activePlayer = 'red';
var cellRegistry = {
  black: [],
  red: []
}

//Game Functions
var stop = false;
function endTurn(cellId){
  claimCell(cellId);
  togglePlayer();
}

function claimCell(cellId){
  var numberOfCells = boardWidth * boardHeight;
  function columnCheck(cellId) {
    if (stop == false) {
        if (cellRegistry.red.indexOf(cellId + boardWidth) != -1 || cellRegistry.black.indexOf(cellId + boardWidth) != -1 || cellId + boardWidth > 42) {
        registerCell(cellId);
      } else {
        return cellId - columnCheck(cellId + boardWidth);
      }
    }
  }

  function registerCell(cellId){
    //mark the board
    // register the cell in cellRegistry
    if (activePlayer == "red") {
      $("#" + String(cellId)).append("<img src='https://4vector.com/i/free-vector-roystonlodge-simple-glossy-circle-button-red-clip-art_117009_Roystonlodge_Simple_Glossy_Circle_Button_Red_clip_art_medium.png' height='30' width='30'>");
      cellRegistry.red.push(cellId);
    } else if (activePlayer == "black") {
      $("#" + String(cellId)).append("<img src='http://www.clker.com/cliparts/s/3/o/c/8/M/glossy-black-icon-angle-md.png' height='30' width='30'>");
      cellRegistry.black.push(cellId);
    }
    console.log(cellRegistry.red); 
    console.log(cellRegistry.black);
    victoryCheck(cellId);
  }
  columnCheck(cellId);
}

function victoryCheck(cellId){
  var connectedCount = 1;
  // checkVertical(cellId);
  // checkHorizontal(cellId);
  checkDiagonalLeft(cellId);
  // checkDiagonalRight(cellId);
}

function checkVertical(cellId) {
  console.log("check vertical");
  var count = 0;

  for (var i= 0; i<= 3; i++) {
    const index = cellRegistry[activePlayer].indexOf(cellId + (boardWidth * i));
    if (index > -1){
      count += 1;
      console.log("uploading count...");
    }
    if (count == 4) {
      console.log("count:" + count);
      console.log("vertical win");
      alert(activePlayer + " win")
      stop = true;
    }
  }
}

function checkHorizontal(cellId) {
  console.log("check horinzontal");
  var count = 0;
  var count2 = 0;

  for (var i= 0; i<= 3; i++) {
    const index = cellRegistry[activePlayer].indexOf(cellId + i);
    if (index > -1) {
      count += 1;
      console.log("uploading count...");
      if ((cellId + i) % 7 == 0 || (cellId) % 7 == 0) {
        console.log("break");
        break;
      }
    } 
  }
  for (var i= 0; i<= 3; i++) {
    const index2 = cellRegistry[activePlayer].indexOf(cellId - i);
    if (index2 > -1) {
      count2 += 1;
      console.log("uploading count2...");
      if ((cellId - 1 - i)  % 7 == 0 || (cellId - 1) % 7 == 0) {
        console.log("break");
        break;
      }
    } 
  }

  if (count == 4 || count2 == 4 || count + count2 >= 5) {
    console.log("horizontal win");
    alert(activePlayer + " win")
    stop = true;
  }
}

function checkDiagonalLeft(cellId) {
  console.log("check diagonal left");
  var count = 0;
  var count2 = 0;

  for (var i= 0; i<= 3; i++) {
    const index = cellRegistry[activePlayer].indexOf(cellId + ((boardWidth - 1) * i));
    if (index > -1){
      count += 1;
      console.log("uploading count...");
      if (((cellId + ((boardWidth - 1) * i)) - 1) % 7 == 0 || (cellId - 1) % 7 == 0) {
        console.log("break");
        break;
      }
    }
  }
  for (var i= 0; i<= 3; i++) {
    const index2 = cellRegistry[activePlayer].indexOf(cellId - ((boardWidth -1) * i));
    if (index2 > -1){
      count2 += 1;
      console.log("uploading count2...");
      if ((cellId - ((boardWidth - 1) * i)) % 7 == 0 || (cellId) % 7 == 0) {
        console.log("break");
        break;
      }
    }
  }

  if (count == 4 || count2 == 4 || count + count2 >= 5) {
    console.log("diagonal left win");
    alert(activePlayer + " win")
    stop = true;
  }
}

function checkDiagonalRight(cellId) {
  console.log("check diagonal right");
  var count = 0;
  var count2 = 0;

  for (var i= 0; i<= 3; i++) {
    const index = cellRegistry[activePlayer].indexOf(cellId + ((boardWidth + 1) * i));
    if (index > -1){
      count += 1;
      console.log("uploading count...");
    }
  }
  for (var i= 0; i<= 3; i++) {
    const index2 = cellRegistry[activePlayer].indexOf(cellId - ((boardWidth + 2) * i));
    if (index2 > -1){
      count2 += 1;
      console.log("uploading count2...");
    }
  }

  if (count == 4 || count2 == 4 || count + count2 >= 5) {
    console.log("diagonal right win");
    alert(activePlayer + " win")
    stop = true;
  }
}

function togglePlayer(){
  if (stop == false) {
    if (activePlayer == "red") {
      activePlayer = "black";
    } else if (activePlayer == "black") {
      activePlayer = "red";
    }
    console.log(activePlayer);
  }
}

//Setup Board and Reset Button
function init(){
  $('.cell .checker').css('display', 'none');
  $('.cell').empty();
  activePlayer = 'red';
  cellRegistry.red = [];
  cellRegistry.black = [];
  stop = false;
}

$(document).ready(function() {
  //build board

  function buildHtml(){
    var htmlToReturn = '';
    for(var i=1; i<=boardHeight; i++){
      htmlToReturn += '<div class="boardRow">';

      for(var j=1; j<=boardWidth; j++){
        var cellNumber = (i-1)*boardWidth+j;
        htmlToReturn += '<div class="cell" id=' + cellNumber + '>';
        htmlToReturn += '<div class="checker"></div>';
        htmlToReturn += '</div>';
      }

      htmlToReturn += '</div>';
    }
    return htmlToReturn;
  }

  $('#board').html(buildHtml());

  //attach click handlers
  $('.cell').click(function(event) {
    var cellId = parseInt(event.currentTarget.id);
    if(cellRegistry.black.indexOf(cellId) == -1 && + cellRegistry.red.indexOf(cellId) == -1){
      endTurn(cellId);
    }
  });

  $('#reset').click(function(){
    init();
  });
});