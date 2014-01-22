///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

var TILE_SIZE             = 90
var BOARD_SIZE_X          = 21 //floor( screenWidth / TILE_SIZE );
var BOARD_SIZE_Y          = 14 //floor( screenHeight / TILE_SIZE );

var MAX_SPEED             = 10
var HORIZ_ACCEL           = 1
var GRAVITY               = 3 // must be >= 2
var JUMP_SPEED            = -70

var pi                    = 3.14159265359
// colors
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0.2, .7, 0.2, 1);
var blue = makeColor(0, 0, 1, 1);
var purple = makeColor(0.5, 0.0, 1.0, 1.0);
var yellow = makeColor(0.5, 0.5, 0, 1)
var cyan = makeColor( 0, 0.7, 0.7, 1)
var white = makeColor(1, 1, 1, 1);
var black = makeColor(0, 0, 0, 1);
var gray = makeColor(0.7,0.7,0.7);

var mapStrings = [ "XXXXXXXXXXXXXXXXXXXXX",
                    "X___________________X",
                    "X______XXXX_________X",
                    "X_________X_________X",
                    "X_________XXXX______X",
                    "X____________X______X",
                    "X____________X______X",
                    "X___________________X",
                    "X___________________X",  
                    "X_______________X___X",
                    "X_X______X______X___X",
                    "X_X______X____XXX___X",
                    "X_X______X____XXX___X",
                    "XXXXXXXXXXXXXXXXXXXXX" ]

// images

var NSPIKE = loadImage( "nSpike.png");
var ESPIKE = loadImage( "eSpike.png");
var SSPIKE = loadImage( "sSpike.png");
var WSPIKE = loadImage( "wSpike.png");
///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var lastKeyCode;
var leftDown = false;
var rightDown = false;
var horiz_velocity = 0;
var vert_velocity = 0;
var nextPos;
var debugShapes = []

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //


// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;

    makeBoard();

    dude = makeDude( board[7][3].center.x, board[7][3].center.y, TILE_SIZE/2, cyan );

    //board[7][BOARD_SIZE_Y-3].center.x, board[7][BOARD_SIZE_Y-3].center.y, cyan );

    goal = new Object();
        goal.pos = new vec2( board[4][12].center.x, board[4][12].center.y );
        goal.color = green;
}


// When a key is pushed
function onKeyStart(key) {    
    if ( key == 37 ){ // left arrow
        leftDown = true;
    } else if ( key == 39 ){ // right arrow
        rightDown = true;
    } else if ( key == 70 ){ // 'f' key
        if ( vert_velocity == 0 ){
            vert_velocity = JUMP_SPEED;
        } // checks for double jumps
    } else if ( key == 32 ){ // spacebar
        JUMP_SPEED = JUMP_SPEED * -1
        GRAVITY = GRAVITY * -1
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

    // dots on edges of a square
    /*blockSides = pointsOnSquare( board[2][12].corner, TILE_SIZE, "horiz" );
    for (var i=0; i<blockSides.length; i++){
        fillCircle( blockSides[i].x, blockSides[i].y, 10, red )
    }*/
    
    // draw the board, grid lines, walls
    for ( var x = 0; x < BOARD_SIZE_X; x++ ){
        for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
            //if it's a wall, fill it in
            if ( board[x][y].wall == true ){
                fillRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, purple );    
            }
            
            // draw grid
            strokeRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, gray, 1 );
        }
    }

    // draw the goal
    drawGoal();

    // draw the player
    drawDude();

    // draw any debugging shapes
    debugDraw();
}

function simulate(){


    if ( leftDown == true ){
        moveHoriz( "left" );    
        
    } else if ( rightDown == true ){
        moveHoriz( "right" );
    }

    moveVert();

    if ( checkIntersection( getTile( goal.pos ), dude.pos, "all", 10 ) ){
        beatLevel();
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
        nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos, "horiz" ) } );
            if( nextCollides ){
                //insertBack( debugShapes, nextPos )
                var curTile = getTile( dude.pos );
                setPos( dude, vec2 ( curTile.center.x, dude.pos.y ) );
            } else {
                setPos( dude, nextPos );
            }
    }

    // move vertically (i.e. apply gravity)
    function moveVert( dir ){
        vert_velocity = vert_velocity + GRAVITY;
        nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
        nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos ) } );

            if( nextCollides ){
                //insertBack( debugShapes, nextPos ) 
                vert_velocity = vert_velocity/2
                nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
                nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos ) } );
                if ( nextCollides ){
                    vert_velocity = vert_velocity/2
                    nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
                    nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos ) } );            
                    if ( nextCollides ){
                        vert_velocity = 0
                    } else {
                        setPos( dude, nextPos );    
                    }
                } else {
                    setPos( dude, nextPos );
                }
            } else {
                setPos( dude, nextPos );
            }
    }

    // what happens when you beat the level
    function beatLevel(){
        console.log( "Good job!" );

        dude.color = purple;
        // eventually this will increase the level counter and draw the next board
    }
///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// MAKIN' STUFF

    // make the dude
    function makeDude( xstart, ystart, r, startcolor ){
        position = new vec2( xstart, ystart )
        ul_corner = new vec2( xstart - TILE_SIZE/2, ystart - TILE_SIZE/2 );
        lr_corner = new vec2( xstart + TILE_SIZE/2, ystart + TILE_SIZE/2 );
        return { pos : position, radius : r, color : startcolor, upperLeft : ul_corner, lowerRight : lr_corner };
    }

    // draw the dude
    function drawDude(){
        fillCircle( dude.pos.x, dude.pos.y, dude.radius, dude.color );
        //fillRectangle( dude.pos.x - TILE_SIZE/2, dude.pos.y - TILE_SIZE/2, TILE_SIZE, TILE_SIZE, dude.color );
    }

    function drawGoal(){
        fillRectangle( goal.pos.x - TILE_SIZE/2, goal.pos.y - TILE_SIZE/2, TILE_SIZE, TILE_SIZE, goal.color );
    }

    function debugDraw(){
        for (var i = 0; i<debugShapes.length; i++){
            fillCircle( debugShapes[i].x, debugShapes[i].y, 5, red );
        }
    }


    // make the board
    function makeBoard(){
     // Create an array of columns
        board = [];
        walls = [];

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
                    insertBack( walls, tile )
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
// check for a collision in a position
    function checkIntersection( tile, pos, direction, radius ){
        var tileEdges = []; 
        if ( direction == "horiz" ){
            tileEdges = pointsOnSquare( tile.corner, TILE_SIZE, "horiz" );
        } else {
            tileEdges = pointsOnSquare( tile.corner, TILE_SIZE );
        }
            intersection = forAny( tileEdges, function( point ){ return withinCircle( point, pos, radius )} )

        return intersection;
    }

    // check if a given point is within a circle the size of 'dude' (either at a given position or,
        // otherwise, centered at dude.pos)
    function withinCircle( point, pos, radius ){
        if (pos == null){
            pos = dude.pos;
        }

        if (radius == null){
            radius = dude.radius;
        } 

        diffVec = sub( pos, point );
        mag = magnitude( diffVec );
        return mag <= radius - 1;
    }

// get edges of a circle
    function pointsOnCircle( center, radius ){
        var circleEdges = [];
        var theta;
        var thisX, thisY, thisPoint;
        r = radius - 2;
        for (var i=0; i<=2; i = i + 0.025){
            theta = pi * i;
            thisX = r * cos( theta );
            thisY = r * sin( theta );
            thisPoint = new vec2( center.x + thisX, center.y + thisY );
            insertBack( circleEdges, thisPoint );
        }
            return circleEdges
    }

    // points on a square
    function pointsOnSquare( corner, s, direction ){ //do i really need the 'side length' param?
        var squareEdges = [];
        var nPoint, ePoint, sPoint, wPoint
        var z = 5
        var a;

        if ( direction == "horiz"){
            a = 2;
        } else {
            a = 0;
        }
        var nwCorner = new vec2( corner.x, corner.y + a )
        var neCorner = new vec2( corner.x + s, corner.y + a )
        var seCorner = new vec2( corner.x + s, corner.y - a + s )
        var swCorner = new vec2( corner.x, corner.y - a + s )

            insertBack( squareEdges, nwCorner );
            insertBack( squareEdges, neCorner );
            insertBack( squareEdges, seCorner );
            insertBack( squareEdges, swCorner );

            /*insertBack( debugShapes, nwCorner );
            insertBack( debugShapes, neCorner );
            insertBack( debugShapes, seCorner );
            insertBack( debugShapes, swCorner );*/
        for (var i=1; i<z; i++){
            
            ePoint = new vec2( neCorner.x, neCorner.y + i * (s/z) )
            wPoint = new vec2( corner.x, corner.y + i * (s/z) )
            insertBack( squareEdges, ePoint );
            insertBack( squareEdges, wPoint );

            if ( direction !== "horiz" ){
                nPoint = new vec2( corner.x + i * (s/z), corner.y )
                sPoint = new vec2( swCorner.x + i * (s/z), swCorner.y )
                insertBack( squareEdges, nPoint );
                insertBack( squareEdges, sPoint );
            }
        }
            return squareEdges
    }

// LOGIC
    function forAny( stuff, conditional ){
            var condition = false;
                stuff.forEach( function( x ) { 
                    var temp = conditional( x )
                            if ( temp !== true && temp !== false ){
                                alert( "AAAH! (For Any pass a function that did not return true or false.)" );
                            }
                                if( temp ) { 
                                    condition = true 
                                } 
                            } )
            return condition;
    }