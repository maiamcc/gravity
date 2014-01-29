///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

var TILE_SIZE             = 76 // orig 90
var BOARD_SIZE_X          = 25 //floor( screenWidth / TILE_SIZE ); orig 21
var BOARD_SIZE_Y          = 16 //floor( screenHeight / TILE_SIZE ); orig 14
var VICTORY_IMAGE_SIZE    = 1000;

var MAX_SPEED             = 8
var HORIZ_ACCEL           = 1
var GRAVITY               = 2 // must be >= 2
var JUMP_SPEED            = -35

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

// intro level
var level0 = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X_______________________X",
            "X__S____________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X____________X__________X",
            "X____________X__________X",
            "X______X____XX__________X",
            "X______X____XX__________X",
            "X______X____XX______G___X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "This should be easy! (L/R to move, F to jump)",
            "z" ] //a non-numeric value here will disable shifting on a given level

// spikes intro
var level1 = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X________wX_____________X",
            "XS_______wX_____________X",
            "XXXXXX___wX_____________X",
            "X________wX_____________X",
            "X_____XXXXX_____________X",
            "X_______________XXX_____X",
            "X______________XXXX_____X",
            "X_____________XXXXX_____X",
            "X____________XXXXXX_____X",
            "XXXXXXX__XXXXXXXXXX____GX",
            "X_____XnnX______________X",
            "X_____XXXX______________X",
            "X_______________________X",
            "X________________nnnnnnnX",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Those look painful!",
            "z" ]

// gravity intro
var level2      = [ 
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X_______________X______GX",
            "X_______________X_______X",
            "X_______________X_______X",
            "X_______________X__XXXXXX",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X_______________________X",
            "X__S____________________X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "How will I get all the way up there? (Hint: spacebar!)",
            -1 ] //a negative value here sets #shifts = infinity

// more practice with gravity
var level3      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X_________X________X____X",
            "X_________X________X____X",
            "X____X____X____X___X____X",
            "X____X____X____X___X____X",
            "X____X____X____X___X____X",
            "X____X_________X________X",
            "XG___X_________X________X",
            "XXXXXXXXXXXXXXXXXXXXXX__X",
            "X_________X________X____X",
            "X_________X________X____X",
            "X____X____X____X___X____X",
            "X____X____X____X___X____X",
            "X____X_________X________X",
            "XS___X_________X________X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Slolam!",
            -1 ]

var level4      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXsss___GX",
            "XXXXXXXXXXXXXXsss_______X",
            "XXXXXXXXXXXsss__________X",
            "XXXXXXXXsss_____________X",
            "XXXXXsss________________X",
            "XXsss___________________X",
            "X_______________________X",
            "X_____________________nnX",
            "X__________________nnnXXX",
            "X______________nnnnXXXXXX",
            "X___________nnnXXXXXXXXXX",
            "X________nnnXXXXXXXXXXXXX",
            "X___XXnnnXXXXXXXXXXXXXXXX",
            "XS__XXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Now with 100% more danger!",
            -1]

var level5      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X_____XssXX_____________X",
            "X_____X__XX_____________X",
            "X_________X_____XXXXX___X",
            "X_______________XG______X",
            "X___________nnnnX_______X",
            "X______XXXXXXXXXX_______X",
            "X______sss______X_______X",
            "X_______________X_______X",
            "X_______________X_______X",
            "XXXXX_________XXXXXXXXXXX",
            "XXXXX___________________X",
            "XXXXXnnX________________X",
            "XXXXXXXXnnX_____X__S____X",
            "XXXXXXXXXXX_____X_______X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Resources are scarce. (In an emergency, use 'esc'.)",
            3 ]

var level6      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Xssssssss______________wX",
            "X__________________A___wX",
            "X______________________wX",
            "X____B_________XXXXXXXXXX",
            "X______________cXXXXXXXXX",
            "X______________c__XXXXXXX",
            "X______________c__b_XXXXX",
            "X______________c__b__a__X",
            "X______________c__b__a_GX",
            "XS_______C_____c__b__a__X",
            "X______________c__b_XXXXX",
            "X______________c__XXXXXXX",
            "X______________cXXXXXXXXX",
            "X______________XXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Unlock your full potential.",
            -1 ]

var level7      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X____G_XssssssssssssssssX",
            "X______X________________X",
            "XXXXXaaa________________X",
            "Xssss_________________A_X",
            "X____________________XXXX",
            "X_______________________X",
            "X________S____XX__XX____X",
            "X__________X____________X",
            "X__________X____________X",
            "X__________XXX__________X",
            "X______________XX_______X",
            "X_______________________X",
            "X__________________XX___X",
            "X_______________________X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Honey, have you seen my keys?",
            4 ]



/*var level8      = [ "XXXXXXXXXXXXXXXXXXXXX",
                    "Xssss________a_____wX",
                    "Xuuuu__XXXX__a_____wX",
                    "Xuu____S__X__a__B__wX",
                    "Xuu_A_____XXXX_____wX",
                    "X_________sssX______X",
                    "X____________X______X",
                    "X___________________X",
                    "X___________________X",  
                    "X_______________X___X",
                    "XbXddd___X______X___X",
                    "X_Xddd___X____XXX___X",
                    "XGXddd___XnnnnXXX___X",
                    "XXXXXXXXXXXXXXXXXXXXX",
                    "Getting trickier now..." ]*/

var level8     = [
                    "XXXXXXXXXXXXXXXXXXXXXXXXX",
                    "X______________________GX",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_____S_________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "X_______________________X",
                    "XXXXXXXXXXXXXXXXXXXXXXXXX",
                    "Party time!",
                    -1,
                    1 ]

var allMaps = [ level0, level1, level2, level3, level4, level5, level6, level7, level8 ];

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
var VICTORY = loadImage( "balloonsConfetti.png" );
var PLAY_AGAIN = loadImage( "playagain.png" );

// sounds
var UNLOCK_SOUND = loadSound( "unlock.mp3" );
var YAY_SOUND = loadSound( "yay.mp3" );
var SPIKE_SOUND = loadSound( "squish.mp3" );
var UP_SOUND = loadSound( "alarmup.wav" );
var DOWN_SOUND = loadSound( "alarmdown.wav" );
var NOSHIFT_SOUND = loadSound( " noShift.mp3 ");
var CHEERING_SOUND = loadSound( "cheering.mp3" );

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// board variables
    var board = [];
    var walls = [];
    var locks0 = [];
    var locks1 = [];
    var locks2 = [];
    var locks = [ locks0, locks1, locks2 ];
    var spikes = [];
    var upGrav = [];
    var downGrav = [];
    var keys = [];
    var filledWalls = [];
    var allLocks = [];

    var boardMessage;
    var happyMessage;
    var sadMessage;

    var debugShapes = [];

    var dude;
    var goal;

// game state variables
var leftDown = false;
var rightDown = false;
var dead = false;
var levelComplete = false;
var currentLevel = 8;
var gravityDown = true;
var shiftsRemaining = 0;
var inUpGrav = false;
var inDownGrav = false;
var victoryLevel = false;

// movement variables
var horiz_velocity = 0;
var vert_velocity = 0;
var grav_accel = GRAVITY;
var jumping;
var nextPos;

// time variables
var curTime = 0;
var deathTime;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //


// When setup happens... (gets called at the beginning of the game, and then at the beginning of each level)
function onSetup() {
    levelComplete = false;
    dead = false;
    gravityDown = true;
    victoryLevel = false;

    dude = makeDude( 0, 0, DUDE_COLOR );

    goal = new Object();
        goal.pos = new vec2( 0, 0 );
        goal.color = green;

    clearBoard();
    makeBoard();

    var horiz_velocity = 0;
    var vert_velocity = 0;
}


// When a key is pushed
function onKeyStart(key) {    
    if ( !dead && !levelComplete ){
        if ( key == 37 ){ // left arrow
            leftDown = true;
        } else if ( key == 39 ){ // right arrow
            rightDown = true;
        } else if ( key == 70 ){ // 'f' key
            if ( vert_velocity == 0 ){ // checks for double jumps
                vert_velocity = jumping;
            }
        } else if ( key == 32 ){ // spacebar
            if ( gravityDown ){
                shiftGrav( "up" );
            } else {
                shiftGrav( "down" );
            }
        } else if ( key == 38 ){ // up arrow
            if ( gravityDown ){    
                shiftGrav( "up" );
            }
        } else if ( key == 40 ){ // down arrow
            if ( !gravityDown ){    
                shiftGrav( "down" );
            }
        } else if ( key == 27 ){ // escape = kill key
            death();
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

    // draw gravity indicator
    drawGravIndicator();

    // draw grid (should be last thing, except for text)
    drawGrid();

    // text on the board (level counter and board message)
    drawBoardText();
}

function simulate(){
    // wipe any messages off the screen, unless it's the last level
    if ( !victoryLevel ){
        happyMessage = null;
        sadMessage = null;
    }

    if ( gravityDown ){
        jumping = JUMP_SPEED
        grav_accel = GRAVITY
    } else {
        jumping = JUMP_SPEED * -1
        grav_accel = GRAVITY * -1
    }

    if ( leftDown == true ){
        moveHoriz( "left" );    
        
    } else if ( rightDown == true ){
        moveHoriz( "right" );
    }

    moveVert();

    // check if dude is in the goal; if so, win
    if ( checkIntersection( getTile( goal.pos ), dude.pos ) ){
        beatLevel();
    }

    // check if the dude is in spikes; if so, die
    inSpikes = forAny( spikes, checkIntersection );
    if ( inSpikes && !levelComplete){
        death();
    }

    // check if the dude is in up-grav square; if so, set gravity to up
    inUpGrav = forAny( upGrav, checkIntersection );
    inDownGrav = forAny( downGrav, checkIntersection );
    if ( inUpGrav ){
        gravityDown = false;
    } else if ( inDownGrav ){
        gravityDown = true;
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
        for ( var i = 0; i<allLocks.length; i++){
            if ( !allLocks[i].active && allLocks[i].lockDraw > 0 ){
                allLocks[i].lockDraw = allLocks[i].lockDraw - 1 ;
            }
        }

    // things to do when the character is dead
    if ( dead ){
        timeSinceDeath = currentTime() - deathTime;
        leftDown = false;
        rightDown = false;

        if ( timeSinceDeath > 0 && timeSinceDeath < 1.5 ){
            // sad message
            sadMessage = "Oh noes, you died! =( "
        }

        if ( timeSinceDeath > 1 && timeSinceDeath < 1.5 ){
            // disappear
            setPos( dude, new vec2( -100, -100 ) );
            sadMessage = "Oh noes, you died! =( "
            gravityDown = true;
        } else if ( timeSinceDeath > 1.5 ){
            respawn();
        }
    }

    // handles making the next level
    if ( levelComplete ){
        timeSinceWin = currentTime() - winTime;
        leftDown = false;
        rightDown = false;

        // special case: if last level, restarts the game
        if ( victoryLevel ){
            if ( timeSinceWin > 1.5 ){
                currentLevel = 0;
                nextLevel();
            }
        } else {
            if ( timeSinceWin > 0 && timeSinceWin < 1.5 ){
                // happy message
                happyMessage = "GREAT JOB!";
            } else if ( timeSinceWin > 1.5 ){
                currentLevel++;
                nextLevel();
            }
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
        vert_velocity = vert_velocity + grav_accel;
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
        if ( !levelComplete && !dead ){        
            dude.color = purple;
            levelComplete = true;
            winTime = currentTime();
            playSound( YAY_SOUND );
        }
    }

    function nextLevel(){
        reset();
    }
    // what happens when you die
    function death(){
        if ( !dead ){
            dude.color = red;
            dead = true;
            deathTime = currentTime();
            playSound( SPIKE_SOUND );
        }
    }

    function respawn(){
        reset();
    }

    function getKey( index ){
        keys[ index ].image = null;
        keys[ index ].active = false;
        locks[ index ].forEach( openLock );
    }

    // opening a single tile of lock; will then be applied to each square of a macro-lock
    function openLock( tile ){
        tile.active = false;
        tile.image = OPENLOCKTRANS;
        lockWallsIndex = indexOf( walls, tile );
        removeAt( walls, lockWallsIndex );
        playSound( UNLOCK_SOUND );
    }

    function shiftGrav( dir ){
        if ( shiftsRemaining !== 0 && isNumber( shiftsRemaining ) ){
            stopAllGravSounds();
            decrementShifts();

            if ( dir == "up" ){
                    if ( inDownGrav ){
                        playSound( NOSHIFT_SOUND );
                    } else {
                        gravityDown = false;
                        playSound( UP_SOUND );
                    }
            } else if ( dir == "down" ){
                    if ( inUpGrav ){
                        playSound( NOSHIFT_SOUND );
                    } else {
                        gravityDown = true;
                        playSound( DOWN_SOUND );
                    }
            } else {
                alert( "Invalid gravity direction!")
            }
        } else if ( shiftsRemaining == 0 ){
            playSound( NOSHIFT_SOUND );
        }
    }


    function stopAllGravSounds(){
        stopSound( UP_SOUND );
        stopSound( DOWN_SOUND );
        stopSound( NOSHIFT_SOUND );
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

    function drawBoardText(){
        // level counter
        fillText("LEVEL " + currentLevel.toString(),
             board[ 0 ][ BOARD_SIZE_Y - 1 ].center.x - TILE_SIZE/4,
             board[ 0 ][ BOARD_SIZE_Y - 1 ].center.y,             
             black, 
             "45px Arial Black", 
             "left", 
             "middle");

        // shift counter
        if ( isNumber( shiftsRemaining ) ){
        fillText("SHIFTS REMAINING: ",
             board[ BOARD_SIZE_X - 1 ][ BOARD_SIZE_Y - 1 ].corner.x,
             board[ BOARD_SIZE_X - 1 ][ BOARD_SIZE_Y - 1 ].center.y,             
             black, 
             "45px Arial Black", 
             "right", 
             "middle");


            if ( shiftsRemaining >= 0 ){
                fillText(shiftsRemaining.toString(),
                    board[ BOARD_SIZE_X - 1 ][ BOARD_SIZE_Y - 1 ].center.x + TILE_SIZE/4,
                    board[ BOARD_SIZE_X - 1 ][ BOARD_SIZE_Y - 1 ].center.y,             
                    black, 
                    "45px Arial Black", 
                    "right", 
                    "middle");
            } else {
                fillText( "∞",
                    board[ BOARD_SIZE_X - 1 ][ BOARD_SIZE_Y - 1 ].center.x,
                    board[ BOARD_SIZE_X - 1 ][ BOARD_SIZE_Y - 1 ].center.y,             
                    black, 
                    "80px Arial Black", 
                    "center", 
                    "middle");
            }
        }

        // board message
        fillText( boardMessage,
             board[ 0 ][ 0 ].center.x - TILE_SIZE/4,
             board[ 0 ][ 0 ].center.y,             
             black, 
             "55px Arial Black", 
             "left", 
             "middle");

        if ( happyMessage != null ){
            strokeText( happyMessage,
                BOARD_SIZE_X * TILE_SIZE / 2,
                BOARD_SIZE_Y * TILE_SIZE / 2,             
                black, 
                "100px Arial Black",
                10, 
                "center", 
                "middle");

            fillText( happyMessage,
                BOARD_SIZE_X * TILE_SIZE / 2,
                BOARD_SIZE_Y * TILE_SIZE / 2,             
                green, 
                "100px Arial Black", 
                "center", 
                "middle");
            }

        if ( sadMessage != null ){
            strokeText( sadMessage,
                BOARD_SIZE_X * TILE_SIZE / 2,
                BOARD_SIZE_Y * TILE_SIZE / 2,             
                black, 
                "100px Arial Black",
                10, 
                "center", 
                "middle");

            fillText( sadMessage,
                BOARD_SIZE_X * TILE_SIZE / 2,
                BOARD_SIZE_Y * TILE_SIZE / 2,             
                red, 
                "100px Arial Black", 
                "center", 
                "middle");
        }
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

    function drawGravIndicator(){
        if ( isNumber( shiftsRemaining ) ){
            if ( gravityDown ){
                drawImageInTile( DOWNARROW, board[ BOARD_SIZE_X - 1 ][BOARD_SIZE_Y - 2] );
            } else {
                drawImageInTile( UPARROW, board[ BOARD_SIZE_X - 1 ][BOARD_SIZE_Y - 2] );
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

        if ( victoryLevel ){
            drawImage( VICTORY, (screenWidth - VICTORY_IMAGE_SIZE)/2, (screenHeight - VICTORY_IMAGE_SIZE)/2, VICTORY_IMAGE_SIZE, VICTORY_IMAGE_SIZE );
            drawImage( PLAY_AGAIN, board[20][1].corner.x, board[20][1].corner.y, 305, 456 )
        }
    }

    // make the board
    function makeBoard(){
     // Create an array of columns
        lockKeyIndexes = [ "a", "b", "c" ];

        currentMap = allMaps[ currentLevel ];

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

                mapElement = substring( currentMap[y], x, x+1 )
                
                // walls, spawn, goal
                if ( mapElement == "X" ){
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
                }

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
                    insertBack( walls, tile )

                    tile.image = LOCK;
                    tile.active = true;
                    tile.lockDraw = 100;
                    
                    insertionIndex = indexOf( lockKeyIndexes, mapElement );
                    insertBack( locks[ insertionIndex ], tile ); 

                    insertBack( allLocks, tile )               
                }

                board[x][y] = tile;
            }  
        }

        boardMessage = currentMap[ BOARD_SIZE_Y ];
        shiftsRemaining = currentMap[ BOARD_SIZE_Y + 1 ];

        if ( currentMap[ BOARD_SIZE_Y + 2 ] == 1 ){
            // it's the victory level!
            victoryLevel = true;
            happyMessage = "YOU DID IT!";
            playSound( CHEERING_SOUND );


        }
    }

    function clearBoard(){
        board = [];
        walls = [];
        locks0 = [];
        locks1 = [];
        locks2 = [];
        locks = [ locks0, locks1, locks2 ];
        spikes = [];
        upGrav = [];
        downGrav = [];
        keys = [];
        filledWalls = [];
        allLocks = [];
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

    function decrementShifts(){
        if ( isNumber( shiftsRemaining ) ){
            shiftsRemaining--
        }
    }


// get index of a tile, given an (x,y) position
    function getTile( pos ){
        xIndex = floor( pos.x / TILE_SIZE );
        yIndex = floor( pos.y / TILE_SIZE );
        return board[xIndex][yIndex];
    }

// check for a collision in a position
    function checkIntersection( tile, pos, direction ){
        var tileEdges = []; 
        if ( direction == "horiz" ){
            tileEdges = pointsOnSquare( tile.corner, "horiz" );
        } else {
            tileEdges = pointsOnSquare( tile.corner );
        }
            intersection = forAny( tileEdges, function( point ){ return withinCircle( point, pos )} )

        return intersection;
    }

    // check if a given point is within a circle the size of 'dude' (either at a given position or,
        // otherwise, centered at dude.pos)

//CAN REMOVE RADIUS
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