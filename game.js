///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

var GRID_SPACING        = 160;
var GRID_LINE_THICKNESS = 4;

var TILE_SIZE             = 90
var BOARD_SIZE_X          = 21 //floor( screenWidth / TILE_SIZE );
var BOARD_SIZE_Y          = 14 //floor( screenHeight / TILE_SIZE );

var MAX_SPEED             = 7
var HORIZ_ACCEL           = 0.5
var GRAVITY               = 3;
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
var leftDown = false;
var rightDown = false;
var horiz_velocity = 0;
var nextPos;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //


// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;

    makeBoard();

    dude = makeDude( board[12][2].center.x, board[12][2].center.y, cyan );

        //board[7][BOARD_SIZE_Y-2].center.x, board[7][BOARD_SIZE_Y-2].center.y, cyan );

}


// When a key is pushed
function onKeyStart(key) {    
    if ( key == 37 ){ // left arrow
        leftDown = true;
    } else if ( key == 39 ){ // right arrow
        rightDown = true;
    } else if ( key == 38 ){ // up arrow
        // jump goes here
    } else if ( key == 32 ){ // spacebar
        // gravity reverse goes here
    }
}

// USE TO FIND COORDS ON THE SCREEN

function onClick( x, y ){
    console.log( x.toString() + ", " + y.toString())
}

function onKeyEnd(key) {
    if ( key == 37 || key == 39 ){
        leftDown = false;
        rightDown = false;
        horiz_velocity = 0;
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
            
            // draw grid
            strokeRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, gray, 3 );
        }
    }

    // draw the player
    drawDude();
}

function simulate(){


// left off here trying to do collision detection, it doesn't work so good.
    if ( leftDown == true ){
        moveHoriz( "left" );    
        
    } else if ( rightDown == true ){
        moveHoriz( "right" );
    }

}

function accelerateHoriz( dir ){

    // figure out relevant values (i.e. positive vs. negative) according to direction of motion
    if ( dir == "left" ){
        var mod = HORIZ_ACCEL * -1
        var multiplier = -1
    } else if ( dir == "right" ){
        var mod = HORIZ_ACCEL
        var multiplier = 1
    }

    // calculate new horiz_velocity, not exceeding max speed
    if ( abs( horiz_velocity + mod ) <= MAX_SPEED ){
        horiz_velocity = horiz_velocity + mod;  
    } else if ( abs( horiz_velocity + mod ) > MAX_SPEED && abs( horiz_velocity ) < MAX_SPEED ){
        horiz_velocity = MAX_SPEED * multiplier
    } else {
        horiz_velocity = horiz_velocity;
    }
}

    // move horizontally
    function moveHoriz( dir ){
        accelerateHoriz( dir );
        nextPos = new vec2( dude.pos.x + horiz_velocity, dude.pos.y )
            if ( isWall( getUpperLeft( nextPos ) ) || isWall( getLowerRight( nextPos ) ) ){
                console.log( "PANIC!")
            } else {
                console.log( "wird")
                setPos( dude, nextPos );
            }
    }
///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// MAKIN' STUFF

    // make the dude
    function makeDude( xstart, ystart, startcolor ){
        position = new vec2( xstart, ystart )
        ul_corner = new vec2( xstart - TILE_SIZE/2, ystart - TILE_SIZE/2 );
        lr_corner = new vec2( xstart + TILE_SIZE/2, ystart + TILE_SIZE/2 );
        return { pos : position, color : startcolor, upperLeft : ul_corner, lowerRight : lr_corner };
    }

    // draw the dude
    function drawDude(){
        //fillCircle( dude.pos.x, dude.pos.y, TILE_SIZE/2, dude.color );
        fillRectangle( dude.pos.x - TILE_SIZE/2, dude.pos.y - TILE_SIZE/2, TILE_SIZE, TILE_SIZE, dude.color );
        dude.upperLeft = new vec2( dude.pos.x - TILE_SIZE/2, dude.pos.y - TILE_SIZE/2 );
        dude.lowerRight = new vec2( dude.pos.x + TILE_SIZE/2, dude.pos.y + TILE_SIZE/2 );
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

                tile.coords = new vec2( x, y );

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
    function setPos( object, pos ) {
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




// get index of a tile, given an (x,y) position
    function getTile( pos ){
        xIndex = floor( pos.x / TILE_SIZE );
        yIndex = floor( pos.y / TILE_SIZE );
        return board[xIndex][yIndex];
    }

// check for a wall, given a position
    function isWall( pos ){
        return getTile( pos ).wall;
    }

// given the center of an object, get its upper left corner
    function getUpperLeft( pos ){
        ul_corner = new vec2( pos.x - TILE_SIZE/2, pos.y - TILE_SIZE/2 );
        return ul_corner;
    }

// given the center of an object, get its upper left corner
    function getLowerRight( pos ){
        lr_corner = new vec2( pos.x + TILE_SIZE/2, pos.y + TILE_SIZE/2 );
        return lr_corner;
    }