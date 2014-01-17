///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

var GRID_SPACING        = 160;
var GRID_LINE_THICKNESS = 4;

var LINE_COLOR          = makeColor(0.7,0.7,0.7);

var TILE_SIZE             = 50
var BOARD_SIZE_X          = 10 //screenWidth / TILE_SIZE
var BOARD_SIZE_Y          = 10 //screenHeight / TILE_SIZE


// colors
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0, 1, 0, 1);
var blue = makeColor(0, 0, 1, 1);
var purple = makeColor(0.5, 0.0, 1.0, 1.0);
var yellow = makeColor(0.5, 0.5, 0, 1)
var cyan = makeColor( 0, 0.5, 0.5, 1)
var white = makeColor(1, 1, 1, 1);
var black = makeColor(0, 0, 0, 1);

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var lastKeyCode;


///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //

// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;

    makeBoard();
}


// When a key is pushed
function onKeyStart(key) {
    lastKeyCode = key;
}


// Called 30 times or more per second
function onTick() {

    // Some sample drawing 
    clearScreen();

    // Draw a white background
    fillRectangle(0, 0, screenWidth, screenHeight, white );

    // put little dots in the board cuz I can.

    for ( var x = 0; x < BOARD_SIZE_X; x++ ){
        for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
            fillCircle( board[x][y].center.x, board[x][y].center.y, 5, blue )
        }
    }

    fillCircle( board[0][0].x, board[0][0].y, 10, red )

/*
    // Draw vertical lines
    x = 0;
    while (x <= screenWidth) {
        fillRectangle(x - GRID_LINE_THICKNESS/2, 0, GRID_LINE_THICKNESS, screenHeight, LINE_COLOR);
        x = x + GRID_SPACING;
    }

    // Horizontal lines
    y = 0;
    while (y <= screenHeight) {
        fillRectangle(0, y - GRID_LINE_THICKNESS / 2, screenWidth, GRID_LINE_THICKNESS, LINE_COLOR);
        y = y + GRID_SPACING;
    }
*/
}


///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// draw the board

function makeBoard(){
 // Create an array of columns
    board = [];

    for ( var x = 0; x < BOARD_SIZE_X; x++ ) {
        
        // Create this column
        board[x] = [];

        for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
            tile = makeObject();
            
            // Center of the tile in pixels
            centerX = (screenWidth - TILE_SIZE * BOARD_SIZE_X) / 2 + (x + 0.5) * TILE_SIZE;
            centerY = (screenHeight - TILE_SIZE * BOARD_SIZE_Y) / 2 + (y + 0.5) * TILE_SIZE + 100;
            tile.center = new vec2( centerX, centerY );
            tile.wall = false;
            
            board[x][y] = tile;
        }  
    }
}