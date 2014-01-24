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
var JUMP_SPEED            = -50

var pi                    = 3.14159265359
// colors
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0.2, .7, 0.2, 1);
var blue = makeColor(0, 0, 1, 1);
    var transBlue = makeColor(0, 0, 1, 0.5);
var purple = makeColor(0.5, 0.0, 1.0, 1.0);
    var transPurple = makeColor(0.5, 0.0, 1.0, 0.5);
var yellow = makeColor(0.5, 0.5, 0, 1)
var cyan = makeColor( 0, 0.7, 0.7, 1)
var white = makeColor(1, 1, 1, 1);
var black = makeColor(0, 0, 0, 1);
var gray = makeColor(0.7,0.7,0.7);

var DUDE_COLOR = cyan;

var mapStrings = [ "XXXXXXXXXXXXXXXXXXXXX",
                    "Xssss___a__________wX",
                    "Xuuuu__XXXX________wX",
                    "Xuuuu__S__X_____B__wX",
                    "Xuuuu_____XXXX_____wX",
                    "X_________sssX______X",
                    "X____________X______X",
                    "X___________________X",
                    "X_____A_____________X",  
                    "X_______________X___X",
                    "XbX______X______X___X",
                    "X_X______X____XXX___X",
                    "XGX______XnnnnXXX___X",
                    "XXXXXXXXXXXXXXXXXXXXX" ]

// images
var NSPIKES = loadImage( "nSpikes.png");
var ESPIKES = loadImage( "eSpikes.png");
var SSPIKES = loadImage( "sSpikes.png");
var WSPIKES = loadImage( "wSpikes.png");
var UPARROW = loadImage( "upArrow.png");
var DOWNARROW = loadImage( "downArrow.png");
var KEY = loadImage( "key.png" )
var LOCK = loadImage( "lock.png" );
var OPENLOCK = loadImage( "openLock.png" );
var OPENLOCKTRANS = loadImage( "openLockTrans.png" );

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// TODO: DECLARE your variables here
var curTime = 0;
var leftDown = false;
var rightDown = false;
var horiz_velocity = 0;
var vert_velocity = 0;
var nextPos;
var debugShapes = [];
var spikes = [];
var upGrav = [];
var downGrav = [];
var keys = [];
var locks = [];
var filledWalls = [];
var dead = false;
var levelComplete = false;
var deathTime;

var dude;
var goal;

var lockDraw = 100;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //


// When setup happens...
function onSetup() {
    // TODO: INITIALIZE your variables here
    lastKeyCode = 0;

    dude = makeDude( 0, 0, DUDE_COLOR );

    goal = new Object();
        goal.pos = new vec2( 0, 0 );
        goal.color = green;

    makeBoard();
    levelComplete = false;
}


// When a key is pushed
function onKeyStart(key) {    
    if ( !dead ){
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
}

function onKeyEnd(key) {
    if ( key == 37 || key == 39 ){
        leftDown = false;
        rightDown = false;
        horiz_velocity = 0;
    }
}

// USE TO FIND COORDS ON THE SCREEN
function onClick( x, y ){
    console.log( x.toString() + ", " + y.toString())
}

// Called 30 times or more per second
function onTick() {
    simulate();
    render();
}

function render() {
    clearScreen();
    curTime = floor( currentTime() - START_TIME );

    // Draw a black background
    fillRectangle(0, 0, screenWidth, screenHeight, black );

    // Draw a white background where the board is
    fillRectangle( board[0][0].corner.x, board[0][0].corner.y, TILE_SIZE * BOARD_SIZE_X, TILE_SIZE * BOARD_SIZE_Y, white );

    // draw the goal
    drawGoal();

    // draw any debugging shapes
    debugDraw();

    // draw & fill tiles with stuff in 'em
    drawAllTiles();
    fillAllTiles();

    // draw the player
    drawDude();

    // draw grid
    drawGrid();
}

function simulate(){

    if ( leftDown == true ){
        moveHoriz( "left" );    
        
    } else if ( rightDown == true ){
        moveHoriz( "right" );
    }

    moveVert();

    // check if dude is in the goal; if so, win
    if ( checkIntersection( getTile( goal.pos ), dude.pos/*, "all"/*, 10*/ ) ){
        beatLevel();
    }

    // debug goal:
    /*goalEdges = pointsOnSquare( getTile( goal.pos ).corner, "all" );
    for (var i = 0; i<goalEdges.length; i++){
        insertBack( debugShapes, goalEdges[i] );
    }*/

    //console.log( checkIntersection( getTile( goal.pos ), dude.pos, "all", 10 ) );
    // check if the dude is in spikes; if so, die
    inSpikes = forAny( spikes, checkIntersection );
    if ( inSpikes ){
        death();
    }

    // check if the dude is in up-grav square; if so, set gravity to up
    inUpGrav = forAny( upGrav, checkIntersection );
    inDownGrav = forAny( downGrav, checkIntersection );
    if ( inUpGrav ){
        GRAVITY = abs( GRAVITY ) * -1;
    } else if ( inDownGrav ){
        GRAVITY = abs( GRAVITY );
    }

    

    // check to see if dude has gotten a key
    inKey = forAny( keys, checkIntersection );
    if ( inKey ){
        keyIndex = forAnyIndex( keys, checkIntersection )
        if ( keys[ keyIndex ].active == true ){
            getKey( keyIndex );
        }
    }
    
    // once a key has been gotten, can decrement lockDraw to fade out the lock
        for ( var i = 0; i<locks.length; i++){
            if ( !locks[i].active && locks[i].lockDraw > 0 ){
                locks[i].lockDraw = locks[i].lockDraw - 1 ;
            }
        }

    // things to do when the character is dead
    if ( dead ){
        timeSinceDeath = currentTime() - deathTime
        leftDown = false;
        rightDown = false;

        if ( timeSinceDeath > 1 && timeSinceDeath < 1.5 ){
            // disappear
            setPos( dude, new vec2( -100, -100 ) );
        } else if ( timeSinceDeath > 1.5 ){
            respawn();
        }
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
        if ( !levelComplete ){
            
            dude.color = purple;
            levelComplete = true;
        }

        console.log( "Good job!" );
        // eventually this will increase the level counter and draw the next board
    }

    // what happens when you die
    function death(){
        if ( !dead ){
            console.log( "Aww snap, you died" );
        dude.color = red;
        dead = true;
        deathTime = currentTime();
        // eventually this will do more stuff;
        }
    }

    function respawn(){
        setPos( dude, dude.startPos );
        dude.color = DUDE_COLOR;
        dead = false;
    }

    function getKey( index ){
        console.log( "you got a key!" )
        locks[ index ].image = OPENLOCKTRANS;

        lockWallsIndex = indexOf( walls, locks[index] )
        removeAt( walls, lockWallsIndex)
        keys[ index ].image = null;
        keys[ index ].active = false;
        locks[ index ].active = false;
    }
///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// MAKIN' STUFF

    // make the dude
    function makeDude( xstart, ystart, startcolor ){
        position = new vec2( xstart, ystart )
        return { pos : position, startPos : position, radius : TILE_SIZE/2, color : startcolor };
    }

    // draw the dude
    function drawDude(){
        fillCircle( dude.pos.x, dude.pos.y, dude.radius, dude.color );
    }

    function drawGoal(){
        fillRectangle( goal.pos.x - TILE_SIZE/2, goal.pos.y - TILE_SIZE/2, TILE_SIZE, TILE_SIZE, goal.color );
    }

    function debugDraw(){
        for (var i = 0; i<debugShapes.length; i++){
            fillCircle( debugShapes[i].x, debugShapes[i].y, 5, red );
        }
    }

    function fillTile( tile, color ){
            fillRectangle( tile.corner.x, tile.corner.y, TILE_SIZE, TILE_SIZE, color );
    }

    function fillTileArray( stuff, color ){
        for (var i = 0; i<stuff.length; i++){
            fillTile( stuff[i], color );
        }
    }
    function fillAllTiles(){
        // fill walls
        fillTileArray( filledWalls, purple );

        // fill upGrav and downGrav
        fillTileArray( upGrav, transPurple );
        fillTileArray( downGrav, transBlue );
    }

    function drawGrid(){
        for ( var x = 0; x < BOARD_SIZE_X; x++ ){
            for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
                strokeRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, gray, 1 );
            }
        }
    }
    function drawAllTiles(){
        for ( var x = 0; x < BOARD_SIZE_X; x++ ) {
            for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
                if (board[x][y].image != null){
                    if ( board[x][y].image == OPENLOCKTRANS ){
                        for ( var i = 0; i < board[x][y].lockDraw; i++ ){
                            drawImageInTile( board[x][y].image, board[x][y] )    
                        }
                        if ( board[x][y].lockDraw == 0 ){
                            board[x][y].image = null;
                        }
                    } else {
                    drawImageInTile( board[x][y].image, board[x][y] )
                    }
                }
            }
        }
    }

    // make the board
    function makeBoard(){
     // Create an array of columns
        board = [];
        walls = [];
        lockKeyIndexes = [ "a", "b", "c" ]

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

                tile.wall = false;

                mapElement = substring( mapStrings[y], x, x+1 )
                
                // walls, spawn, goal
                if ( mapElement == "X" ){
                    tile.wall = true;
                    insertBack( walls, tile )
                    insertBack( filledWalls, tile )
                } else if ( mapElement == "G" ){
                    goal.pos = tile.center;
                } else if ( mapElement == "S" ){
                    dude.startPos = tile.center;
                    dude.pos = tile.center;
                } 

                // spikes
                else if ( mapElement == "n" ){
                    tile.image = NSPIKES
                    insertBack( spikes, tile );
                } else if ( mapElement == "e" ){
                    tile.image = ESPIKES
                    insertBack( spikes, tile );
                } else if ( mapElement == "s" ){
                    tile.image = SSPIKES
                    insertBack( spikes, tile );
                } else if ( mapElement == "w" ){
                    tile.image = WSPIKES
                    insertBack( spikes, tile );
                }

                // gravity influence tiles
                else if ( mapElement == "u" ){
                    tile.image = UPARROW;
                    insertBack( upGrav, tile );
                }  else if ( mapElement == "d" ){
                    tile.image = DOWNARROW;
                    insertBack( downGrav, tile );
                } //heavy grav goes here?

                //keys and locks
                else if ( mapElement == "A" || 
                            mapElement == "B" ||
                            mapElement == "C" ){
                    tile.image = KEY;
                    tile.active = true;
                    insertionIndex = indexOf( lockKeyIndexes, mapElement.toLowerCase() );
                    insertAt( keys, insertionIndex, tile );
                }  else if ( mapElement == "a" || 
                                mapElement == "b" ||
                                mapElement == "c" ){
                    tile.wall = true;
                    insertBack( walls, tile )

                    tile.image = LOCK;
                    tile.active = true;
                    tile.lockDraw = 100;
                    insertionIndex = indexOf( lockKeyIndexes, mapElement );
                    insertAt( locks, insertionIndex, tile );                 
                }

                board[x][y] = tile;
            }  
        }
    }

    // put an image in a tile, filling the entire tile
    function drawImageInTile( image, tile ){
        drawImage( image, tile.corner.x, tile.corner.y, TILE_SIZE, TILE_SIZE )
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
            tileEdges = pointsOnSquare( tile.corner, "horiz" );
        } else {
            tileEdges = pointsOnSquare( tile.corner );
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
// this funct. probs unnecessary at this point
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
    function pointsOnSquare( corner, direction ){
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
        var neCorner = new vec2( corner.x + TILE_SIZE, corner.y + a )
        var seCorner = new vec2( corner.x + TILE_SIZE, corner.y - a + TILE_SIZE )
        var swCorner = new vec2( corner.x, corner.y - a + TILE_SIZE )

            insertBack( squareEdges, nwCorner );
            insertBack( squareEdges, neCorner );
            insertBack( squareEdges, seCorner );
            insertBack( squareEdges, swCorner );

        for (var i=1; i<z; i++){
            
            ePoint = new vec2( neCorner.x, neCorner.y + i * (TILE_SIZE/z) )
            wPoint = new vec2( corner.x, corner.y + i * (TILE_SIZE/z) )
            insertBack( squareEdges, ePoint );
            insertBack( squareEdges, wPoint );

            if ( direction !== "horiz" ){
                nPoint = new vec2( corner.x + i * (TILE_SIZE/z), corner.y )
                sPoint = new vec2( swCorner.x + i * (TILE_SIZE/z), swCorner.y )
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
                                alert( "AAAH! (forAny passed a function that did not return true or false.)" );
                            }
                                if( temp ) { 
                                    condition = true 
                                } 
                            } )
            return condition;
    }

    function forAnyIndex( stuff, conditional ){
        var condition = false;
        var thisIndex;
            for ( var i = 0; i < stuff.length; i++ ){
                var temp = conditional( stuff[i] )
                        if ( temp !== true && temp !== false ){
                            alert( "AAAH! (forAnyIndex passed a function that did not return true or false.)" );
                        } else if( temp ) { 
                            condition = true
                            thisIndex = i;    
                        }
            }   
        return thisIndex;
    }