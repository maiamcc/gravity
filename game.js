///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

var GRID_SPACING        = 160;
var GRID_LINE_THICKNESS = 4;

var TILE_SIZE             = 90
var BOARD_SIZE_X          = 21 //floor( screenWidth / TILE_SIZE );
var BOARD_SIZE_Y          = 14 //floor( screenHeight / TILE_SIZE );

var START_SPEED           = 2
        var TEST_SPEED      = 10
var MAX_SPEED             = 20
var HORIZ_ACCEL           = 5
// colors
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0, 1, 0, 1);
var blue = makeColor(0, 0, 1, 1);
var purple = makeColor(0.5, 0.0, 1.0, 1.0);
var yellow = makeColor(0.5, 0.5, 0, 1)
var cyan = makeColor( 0, 0.5, 0.5, 1)
var white = makeColor(1, 1, 1, 1);
var black = makeColor(0, 0, 0, 1);
var gray = makeColor(0.7,0.7,0.7);

var mapStrings = [ "XXXXXXXXXXXXXXXXXXXXX",
                    "_____________________",
                    "_______XXXX__________",
                    "__________X__________",
                    "__________XXXX_______",
                    "_____________X_______",
                    "_____________X_______",
                    "_____________________",
                    "_____________________",  
                    "________________X____",
                    "________________X____",
                    "______________XXX____",
                    "______________XXX____",
                    "XXXXXXXXXXXXXXXXXXXXX" ]
///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var lastKeyCode;
var moveLeft = false;
var moveRight = false;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //


// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;

    makeBoard();

    dude = makeDude( board[7][BOARD_SIZE_Y-2].center.x, board[7][BOARD_SIZE_Y-2].center.y, blue );

}


// When a key is pushed
function onKeyStart(key) {    
    if ( key == 37 ){
        moveLeft = true;
    } else if ( key == 39 ){
        moveRight = true;
    } else if ( key == 38 ){
        // jump goes here
    } else if ( key == 32 ){
        // gravity reverse goes here
    }
}

function onKeyEnd(key) {
    if ( key == 37 || key == 39 ){
        stop();
    } else if ( key == 39 ){
        moveRight = true;
    } else if ( key == 38 ){
        // jump goes here
    } else if ( key == 32 ){
        // gravity reverse goes here
    }
}

// Called 30 times or more per second
function onTick() {
    simulate();
    render();
}

function render() {
    clearScreen();

    // Draw a black background
    fillRectangle(0, 0, screenWidth, screenHeight, black );

    // Draw a white background where the board is
    fillRectangle( board[0][0].corner.x, board[0][0].corner.y, TILE_SIZE * BOARD_SIZE_X, TILE_SIZE * BOARD_SIZE_Y, white );

    
    // draw the board, grid lines, walls
    for ( var x = 0; x < BOARD_SIZE_X; x++ ){
        for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
            //if it's a wall, fill it in
            if ( board[x][y].wall == true ){
                fillRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, purple );    
            }
            strokeRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, gray, 3 );
        }
    }

    // later, will be sprite
    drawDude();
    //fillCircle( board[7][BOARD_SIZE_Y-2].center.x, board[7][BOARD_SIZE_Y-2].center.y, TILE_SIZE/2, cyan );
}

function simulate(){
    if ( moveLeft == true ){
        setPosX( dude, dude.pos.x - TEST_SPEED );
    } else if ( moveRight == true ){
        setPosX( dude, dude.pos.x + TEST_SPEED );
    }
}

// MOVEMENT RULES
function stop(){
    moveLeft = false;
    moveRight = false;
}

///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// MAKIN' STUFF

    // make the dude
    function makeDude( xstart, ystart, startcolor ){
        position = new vec2( xstart, ystart )
        return { pos : position, color : startcolor };
    }

    // draw the dude
    function drawDude(){
        fillCircle( dude.pos.x, dude.pos.y, TILE_SIZE/2, dude.color );
    }

    // make the board
    function makeBoard(){
     // Create an array of columns
        board = [];

        for ( var x = 0; x < BOARD_SIZE_X; x++ ) {
            
            // Create this column
            board[x] = [];

            for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
                tile = makeObject();
                
                // Top left corner of the tile in pixels
                cornerX = (screenWidth - TILE_SIZE * BOARD_SIZE_X) / 2 + x * TILE_SIZE;
                cornerY = (screenHeight - TILE_SIZE * BOARD_SIZE_Y) / 2 + y * TILE_SIZE;
                tile.corner = new vec2( cornerX, cornerY );

                // Center of the tile in pixels
                centerX = (screenWidth - TILE_SIZE * BOARD_SIZE_X) / 2 + (x + 0.5) * TILE_SIZE;
                centerY = (screenHeight - TILE_SIZE * BOARD_SIZE_Y) / 2 + (y + 0.5) * TILE_SIZE;
                tile.center = new vec2( centerX, centerY );

                if ( substring( mapStrings[y], x, x+1 ) == "X" ){
                    tile.wall = true;
                } else {
                    tile.wall = false;
                }
                
                board[x][y] = tile;
            }  
        }
    }

// MODIFYIN' STUFF
    
    // set position of an object
    function setPos( object, pos) {
        object.pos = new vec2(pos)
    }

    // set X position of an object
    function setPosX( object, posX ) {
        object.pos = new vec2( posX, object.pos.y )
    }

    // set Y position of an object
    function setPosY( object, posY ) {
        object.pos = new vec2( object.pos.x, posY )
    }
