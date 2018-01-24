///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

// BOARD DIMENSIONS & IMAGE DIMENSIONS
var TILE_SIZE             = 76;
var BOARD_SIZE_X          = 25;
var BOARD_SIZE_Y          = 16;
var VICTORY_IMAGE_SIZE    = 1000;

// PHYSICS/MOVEMENT CONSTANTS
var MAX_HORIZ_SPEED       = 8;
var MAX_VERT_SPEED        = 55;
var HORIZ_ACCEL           = 1;
var GRAVITY               = 2;
var JUMP_SPEED            = -35;

// COLORS
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0.2, 0.7, 0.2, 1);
var blue = makeColor(0, 0, 1, 1);
    var transBlue = makeColor(0, 0, 1, 0.5); // transparent version of 'blue'
var purple = makeColor(0.5, 0, 1, 1);
    var transPurple = makeColor(0.5, 0, 1, 0.5); // transparent version of 'purple'
var cyan = makeColor( 0, 0.7, 0.7, 1)
var white = makeColor(1, 1, 1, 1);
var black = makeColor(0, 0, 0, 1);
var gray = makeColor(0.7,0.7,0.7);

var DUDE_COLOR = cyan;

// LEVEL MAPS

/* each level is stored in an array of strings (and some other info, too). The first 16 lines represent
    the tiles of the board, with each character standing for a different board element:
        S = player spawn point (one only)
        G = goal (one only)
        X = wall
        x = invisible wall
        n, e, s, w = spikes facing in that direction
        u, d = tiles that set gravity to up or down
        a, b, c, f, h, i = locks
        A, B, C, F, H, I = corresponding keys

    Information stored after the end of the board:
        17th line --> board message (displays at the top of the level)
        18th line --> # of shifts
            Positive or zero value --> that number of shifts allowed
            Negative value --> infinite shifts
            Non-numeric value (string, etc.) --> shifting disabled on this level
        19th line --> put the value 1 in the 19th line to declare this level the final level
        */

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
            -1 ]

// introduce shift caps & kill key
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

// introduce keys & locks
var level6      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Xssssssss______________wX",
            "X__________________C___wX",
            "X______________________wX",
            "X____A_________XXXXXXXXXX",
            "X______________aXXXXXXXXX",
            "X______________a__XXXXXXX",
            "X______________a__b_XXXXX",
            "X______________a__b__c__X",
            "X______________a__b__c_GX",
            "XS_______B_____a__b__c__X",
            "X______________a__b_XXXXX",
            "X______________a__XXXXXXX",
            "X______________aXXXXXXXXX",
            "X______________XXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Unlock your full potential!",
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

// introduce up-grav and down-grav tiles
var level8      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X________a______uuXXXXXXX",
            "X________a______uuuXXXXXX",
            "X________X______uuuuuXXXX",
            "X________X______uuuuuuuXX",
            "X___S____X______uuuuuuuXX",
            "X________X_________XX___X",
            "X________Xnnnnnnnn______X",
            "X________XXXXXXXXX______X",
            "X_________X__G__________X",
            "X_________X_____________X",
            "X______A__X_____________X",
            "XdddddddddX_____________X",
            "XdddddddddX_____________X",
            "XdddddddddX_____________X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Wait, I'm a little... stuck.",
            10 ]

var level9      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X_____uuuuX_____dddd_A__X",
            "X_____uuuuX_____dddd____X",
            "X_____uuuuX_____________X",
            "X_______________________X",
            "X_______________________X",
            "X________wX_____________X",
            "X________wX_____________X",
            "X________wX_____________X",
            "X________wX_____nnnn____X",
            "X________wXXXXXXXXXXaaaXX",
            "X_________ssssssssss____X",
            "X_______________________X",
            "X_________uuuuuuuuuu____X",
            "X_S_______uuuuuuuuuu_G__X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Warning: persnickety gravity ahead!",
            4 ]

var level10      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "XGb_X_f_X_____________aSX",
            "XXX_X_f_X_____________X_X",
            "X___X_f_X_____________X_X",
            "XccXX_X_X_____________X_X",
            "X_____X_X_____________X_X",
            "XXXXXXX_X_____________X_X",
            "X______FX_____________XAX",
            "XXXXhhhXX_____________XXX",
            "X_____________________XXX",
            "XuuuuuuuuuuuuuuuuuuuuuXXX",
            "XuuuuuuXXXXuuuuuuuuuuuXXX",
            "XuuuuuuuuuuuuuuuuuuCuuXXX",
            "XuuBuuuuuuuuuuuuuuuuuuXXX",
            "XuuuuuuuuHuunnnuuuuuuuXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Boinnnng!",
            4 ]

var level11     = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "X_________j__sssssssssssX",
            "X_XXXXXXXXX_____________X",
            "X_X___i___________J_____X",
            "X_X_XXXXXXXX_C_________BX",
            "X_X_X_b___X_____________X",
            "X_X_X_XXX_X____F_____H__X",
            "X_XhX_XGXcX_____________X",
            "X_X_X_a_X_X_______I_____X",
            "X_X_XXXXX_X_____________X",
            "X_X___f___X_____________X",
            "X_XXXXXXXXX_____________X",
            "X________AX_____________X",
            "X_________X_____________X",
            "X____nnnnnX________S____X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Shift at your own risk.",
            -1 ]

var level12     = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "XS___a___b_____F_____C__X",
            "X____X___b______________X",
            "X___AX___b__XXXXXXXXXXXXX",
            "XXXXXX___X______________X",
            "X________Xdddddddddd____X",
            "X__B_____Xffffffffff____X",
            "X________Xnnnnnnnnnn____X",
            "X________XXXXXXXXXXX____X",
            "X________Xssssssssss____X",
            "X________Xhhhhhhhhhh____X",
            "X________Xuuuuuuuuu___H_X",
            "X________X____XXXXXXXXXXX",
            "X________X___________c__X",
            "XnnnnnnnnX___________c_GX",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Be careful what you wish for...",
            2 ]

// invisible walls, just for fun!
var level13      = [
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "Xxxx__________x___S_____X",
            "Xxxx_____x____x__xxxxxxxX",
            "Xxxu_____x____x_________X",
            "Xxxu_____x____xxxxxx____X",
            "Xxuu_____x______________X",
            "Xxuu_____xxxxxxxxxxxxaaaX",
            "Xuuu_____x____x_________X",
            "Xuuuxxxxxx___x__________X",
            "X________x____x__x______X",
            "X________x__G____x______X",
            "X_A______xxxxxxxxx______X",
            "X________x______________X",
            "X________x______________X",
            "X________x______________X",
            "XXXXXXXXXXXXXXXXXXXXXXXXX",
            "How very puzzling!",
            -1 ]

// the victory level! Yay!
var victory     = [
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

var allMaps = [ level0, level1, level2, level3, level4, level5, level6, level7,
                level8, level9, level10, level11, level12, level13, victory ];

// IMAGES
var SOUND_ON_ICON = loadImage( "images/soundOn.png" );
var SOUND_OFF_ICON = loadImage( "images/soundOff.png" );
var NSPIKES = loadImage( "images/nSpikes.png" );
var ESPIKES = loadImage( "images/eSpikes.png" );
var SSPIKES = loadImage( "images/sSpikes.png" );
var WSPIKES = loadImage( "images/wSpikes.png" );
var UPARROW = loadImage( "images/upArrow.png" );
var DOWNARROW = loadImage( "images/downArrow.png" );
var KEY = loadImage( "images/key.png" );
var LOCK = loadImage( "images/lock.png" );
var OPENLOCKTRANS = loadImage( "images/openLockTrans.png" );
var VICTORY = loadImage( "images/balloonsConfetti.png" );
var PLAY_AGAIN = loadImage( "images/playagain.png" );

// SOUNDS
var UNLOCK_SOUND = loadSound( "sounds/unlock.mp3" );
var YAY_SOUND = loadSound( "sounds/yay.mp3" );
var SPIKE_SOUND = loadSound( "sounds/squish.mp3" );
var UP_SOUND = loadSound( "sounds/alarmup.wav" );
var DOWN_SOUND = loadSound( "sounds/alarmdown.wav" );
var NOSHIFT_SOUND = loadSound( "sounds/noShift.mp3 ");
var CHEERING_SOUND = loadSound( "sounds/cheering.mp3" );
var soundOn = true;

///////////////////////////////////////////////////////////////
//                                                           //
//                     MUTABLE STATE                         //

// BOARD VARIABLES
var board = [];
var walls = [];
var locks0 = [];
var locks0 = [];
var locks1 = [];
var locks2 = [];
var locks3 = [];
var locks4 = [];
var locks5 = [];
var locks6 = [];
var locks = [ locks0, locks1, locks2, locks3, locks4, locks5, locks6 ];
var spikes = [];
var upGrav = [];
var downGrav = [];
var keys = [];
var filledWalls = [];
var allLocks = [];

var boardMessage;
var happyMessage;
var sadMessage;

var dude;
var goal;

// GAME STATE VARIABLES
var leftDown = false;
var rightDown = false;
var dead = false;
var levelComplete = false;
var currentLevel = 0;
var gravityDown = true;
var shiftsRemaining = 0;
var inUpGrav = false;
var inDownGrav = false;
var victoryLevel = false;

// MOVEMENT VARIABLES
var horiz_velocity = 0;
var vert_velocity = 0;
var grav_accel = GRAVITY;
var jumping;
var nextPos;

///////////////////////////////////////////////////////////////
//                                                           //
//                      EVENT RULES                          //


// When setup happens... (gets called at the beginning of the game,
    // and then at the beginning of each level)
function onSetup() {
    // reset game state
    levelComplete = false;
    dead = false;
    gravityDown = true;
    victoryLevel = false;
    var horiz_velocity = 0;
    var vert_velocity = 0;

    // make the dude and the goal anew
    dude = makeDude( 0, 0, DUDE_COLOR );
    goal = new Object();
        goal.pos = new vec2( 0, 0 );
        goal.color = green;

    // clear board and make a new one
    clearBoard();
    makeBoard();

}

// When a key is pushed
function onKeyStart(key) {
    if ( !dead && !levelComplete ){
        if ( key == 37 ){ // left arrow --> move left
            leftDown = true;
        } else if ( key == 39 ){ // right arrow --> move right
            rightDown = true;
        } else if ( key == 70 ){ // 'f' key --> jump
            if ( vert_velocity == 0 ){ // checks for double jumps
                vert_velocity = jumping;
            }
        } else if ( key == 32 ){ // spacebar --> reverse gravity
            if ( gravityDown ){
                shiftGrav( "up" );
                decrementShifts();
            } else {
                shiftGrav( "down" );
                decrementShifts();
            }
        } else if ( key == 38 ){ // up arrow --> set gravity = "up"
            if ( gravityDown ){
                shiftGrav( "up" );
                decrementShifts();
            }
        } else if ( key == 40 ){ // down arrow --> set gravity = "down"
            if ( !gravityDown ){
                shiftGrav( "down" );
                decrementShifts();
            }
        } else if ( key == 27 ){ // escape --> kill dude to reset level
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

// When the mouse is clicked (currently only relevant for turning sound on/off)
function onClick( x, y ){
    // is the click in the tile with the sound icon? If so, toggle sound on/off.
    if( inTile( x, y, soundTile ) ){
        soundOn = !soundOn;
    }
}

// Called 30 times or more per second
function onTick() {
    simulate();
    render();
}

function render() {
    clearScreen();

    // draw a black background
    fillRectangle(0, 0, screenWidth, screenHeight, black );

    // draw a white background where the board is
    fillRectangle( board[0][0].corner.x, board[0][0].corner.y, TILE_SIZE * BOARD_SIZE_X, TILE_SIZE * BOARD_SIZE_Y, white );

    // draw the goal
    drawGoal();

    // draw & fill tiles with stuff in 'em
    setSoundIcon();
    fillAllTiles();
    drawAllTiles();

    // draw the player
    drawDude();

    // draw gravity indicator
    drawGravIndicator();

    // draw grid (should be last thing drawn, except for text)
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

    // MOVEMENT
        // depending on direction of gravity, adjust numerical values of vertical accel. and jumping
        if ( gravityDown ){
            jumping = JUMP_SPEED
            grav_accel = GRAVITY
        } else {
            jumping = JUMP_SPEED * -1
            grav_accel = GRAVITY * -1
        }

        // move left or right
        if ( leftDown == true ){
            moveHoriz( "left" );
        } else if ( rightDown == true ){
            moveHoriz( "right" );
        }

        // move vertically
        moveVert();

    // RESPOND TO THE TILE THE DUDE IS STANDING IN

        // check if dude is in the goal; if so, win
        if ( checkIntersection( getTile( goal.pos ), dude.pos ) ){
            beatLevel();
        }

        // check if the dude is in spikes; if so, die
        inSpikes = forAny( spikes, checkIntersection );
        if ( inSpikes && !levelComplete){
            death();
        }

        // check if the dude is in up-grav or down-grav square; if so, set gravity accordingly
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

    // RESPOND TO CHARACTER STATE

        // when dude is dead...
        if ( dead ){
            timeSinceDeath = currentTime() - deathTime;

            // disable motion
            leftDown = false;
            rightDown = false;

            if ( timeSinceDeath > 0 && timeSinceDeath < 1.5 ){
                // write a sad message on the screen
                sadMessage = "Oh noes, you died! =( "
            }

            if ( timeSinceDeath > 1 && timeSinceDeath < 1.5 ){
                // disappear
                setPos( dude, new vec2( -100, -100 ) );
                sadMessage = "Oh noes, you died! =( "
                gravityDown = true;
            } else if ( timeSinceDeath > 1.5 ){
                reset(); //calls onSetup, which will reset the board (and the dude with it)
            }
        }

    // if the level is complete...
    if ( levelComplete ){
        timeSinceWin = currentTime() - winTime;

        // disable motion
        leftDown = false;
        rightDown = false;

        // special case: if you just beat the last level, restart the game
        if ( victoryLevel ){
            if ( timeSinceWin > 1.5 ){
                currentLevel = 0;
                reset(); //calls onSetup, which will reset the board and draw the next level
            }
        } else {
            if ( timeSinceWin > 0 && timeSinceWin < 1.5 ){
                // happy message
                happyMessage = "GREAT JOB!";
            } else if ( timeSinceWin > 1.5 ){
                // go to the next level
                currentLevel++;
                reset(); //calls onSetup, which will reset the board and draw the next level
            }
        }
    }

    // stop-gap bug fix: if you somehow ended up off-the board, reset the level
    if ( offScreen() && !dead ){
        death();
        }
}

// calculate horizontal acceleration and uses it to change velocity
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
    if ( abs( horiz_velocity + mod ) <= MAX_HORIZ_SPEED ){
        horiz_velocity = horiz_velocity + mod;
    } else if ( abs( horiz_velocity + mod ) > MAX_HORIZ_SPEED && abs( horiz_velocity ) < MAX_HORIZ_SPEED ){
        horiz_velocity = MAX_HORIZ_SPEED * multiplier
    } else {
        horiz_velocity = horiz_velocity;
    }
}

// move horizontally
function moveHoriz( dir ){
    // first, find current accel.
    accelerateHoriz( dir );
    nextPos = new vec2( dude.pos.x + horiz_velocity, dude.pos.y )
    nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos, "horiz" ) } );
        if( nextCollides ){
            // if your full move results in hitting a wall, just go to the edge of your current tile
            var curTile = getTile( dude.pos );
            setPos( dude, vec2 ( curTile.center.x, dude.pos.y ) );
        } else {
            // otherwise, change your position by current velocity
            setPos( dude, nextPos );
        }
}

// set vertical velocity to maximum (in either pos. or neg. direction, depending on which way you're moving)
    function maxVertVelocity(){
        if ( vert_velocity > 0 ){
            vert_velocity = MAX_VERT_SPEED;
        } else if ( vert_velocity < 0 ){
            vert_velocity = MAX_VERT_SPEED * -1;
        }
    }

// move vertically (i.e. apply gravity)
function moveVert( dir ){
    // first, find current accel. (making sure not to, by some glitch, reach superspeed)
    if ( abs(vert_velocity) > MAX_VERT_SPEED ){
        // (if something has gone wrong and you're moving too fast, get speed back under maximum.))
        maxVertVelocity();
    } else if ( abs(vert_velocity) < MAX_VERT_SPEED ){
        if ( abs(vert_velocity + grav_accel) < MAX_VERT_SPEED ){
            vert_velocity = vert_velocity + grav_accel;
        } else {
            maxVertVelocity()
        }
    }


    nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
    nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos ) } );

        if( nextCollides ){
            // if your full move results in hitting a wall, try moving half that distance
            vert_velocity = vert_velocity/2
            nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
            nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos ) } );
            if ( nextCollides ){
                // if you STILL hit a wall, check half THAT distance
                vert_velocity = vert_velocity/2
                nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
                nextCollides = forAny( walls, function( tile ){ return checkIntersection( tile, nextPos ) } );
                if ( nextCollides ){
                    // if you STILL hit a wall, try half that distance, and if you still hit
                        //a wall, just stay still
                    vert_velocity = 0
                } else {
                    // otherwise, move by that distance
                    setPos( dude, nextPos );
                }
            } else {
                // otherwise, move by that distance
                setPos( dude, nextPos );
            }
        } else {
            // otherwise, move by that distance
            setPos( dude, nextPos );
        }
    }

// what happens when you beat the level
function beatLevel(){
    if ( !levelComplete && !dead ){
        dude.color = purple;
        levelComplete = true;
        winTime = currentTime();
        playSoundConditional( YAY_SOUND );
    }
}

// what happens when you die
function death(){
    if ( !dead ){
        dude.color = red;
        dead = true;
        deathTime = currentTime();
        playSoundConditional( SPIKE_SOUND );
    }
}

// what happens when you get a key
function getKey( index ){
    // key disappears
    keys[ index ].image = null;

    // key is deactivated so you can't collect it more than once
    keys[ index ].active = false;

    // open the corresponding lock
    locks[ index ].forEach( openLock );
}

// opening a single tile of lock; will then be applied to each square of a macro-lock
function openLock( tile ){
    // lock is deactivated so transparency will work
    tile.active = false;

    // change lock image to the open lock
    tile.image = OPENLOCKTRANS;

    // remove from the array of walls so it doesn't block movement
    lockWallsIndex = indexOf( walls, tile );
    removeAt( walls, lockWallsIndex );

    playSoundConditional( UNLOCK_SOUND );
}

// shift gravity in specified direction, if there are shifts remaining
function shiftGrav( dir ){
    if ( shiftsRemaining !== 0 && isNumber( shiftsRemaining ) ){
        stopAllGravSounds();

        if ( dir == "up" ){
                if ( inDownGrav ){
                    playSoundConditional( NOSHIFT_SOUND );
                } else {
                    gravityDown = false;
                    playSoundConditional( UP_SOUND );
                }
        } else if ( dir == "down" ){
                if ( inUpGrav ){
                    playSoundConditional( NOSHIFT_SOUND );
                } else {
                    gravityDown = true;
                    playSoundConditional( DOWN_SOUND );
                }
        } else {
            alert( "Invalid gravity direction!")
        }
    } else if ( shiftsRemaining == 0 ){
        playSoundConditional( NOSHIFT_SOUND );
    }
}

///////////////////////////////////////////////////////////////
//                                                           //
//                      HELPER RULES                         //

// MAKIN' STUFF & DRAWIN' STUFF

    // make the dude
    function makeDude( xstart, ystart, startcolor ){
        position = new vec2( xstart, ystart )
        return { pos : position, startPos : position, radius : TILE_SIZE/2, color : startcolor };
    }

    // make the board
    function makeBoard(){

        // this will be used in a bit to make locks and keys
        lockKeyIndexes = [ "a", "b", "c", "f", "h", "i", "j" ];

        // select the appropriate map from the array of all maps, according to current level
        currentMap = allMaps[ currentLevel ];

        // Create an array of columns
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

                // coordinates of the tile according to grid squares
                tile.coords = new vec2( x, y );

                // TRANSLATE CHARACTERS IN MAP TO ELEMENTS ON GAMEBOARD
                mapElement = substring( currentMap[y], x, x+1 )

                // walls, spawn, goal
                if ( mapElement == "X" ){
                    insertBack( walls, tile );
                    insertBack( filledWalls, tile );
                } else if ( mapElement == "x" ){
                    insertBack( walls, tile );
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
                            mapElement == "C" ||
                            mapElement == "F" ||
                            mapElement == "H" ||
                            mapElement == "I" ||
                            mapElement == "J" ){
                    tile.image = KEY;
                    tile.active = true;
                    insertionIndex = indexOf( lockKeyIndexes, mapElement.toLowerCase() );
                    insertAt( keys, insertionIndex, tile );
                }  else if ( mapElement == "a" ||
                                mapElement == "b" ||
                                mapElement == "c" ||
                                mapElement == "f" ||
                                mapElement == "h" ||
                                mapElement == "i" ||
                                mapElement == "j" ){
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
            playSoundConditional( CHEERING_SOUND );
        }

        // set the coordinates of the tile containing the sound on/off icon
        soundTile = board[BOARD_SIZE_X - 1][0];

    }

    // clears the board so that the next level can be drawn
    function clearBoard(){
        board = [];
        walls = [];
        locks0 = [];
        locks1 = [];
        locks2 = [];
        locks3 = [];
        locks4 = [];
        locks5 = [];
        locks6 = [];
        locks = [ locks0, locks1, locks2, locks3, locks4, locks5, locks6 ];
        spikes = [];
        upGrav = [];
        downGrav = [];
        keys = [];
        filledWalls = [];
        allLocks = [];
    }

    // draw the dude
    function drawDude(){
        fillCircle( dude.pos.x, dude.pos.y, dude.radius, dude.color );
    }

    // draw the goal
    function drawGoal(){
        fillRectangle( goal.pos.x - TILE_SIZE/2, goal.pos.y - TILE_SIZE/2, TILE_SIZE, TILE_SIZE, goal.color );
    }

    // draw all of the text on the board
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

        // happy message
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

        // sad message
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

    // fill a single tile with the specified color
    function fillTile( tile, color ){
            fillRectangle( tile.corner.x, tile.corner.y, TILE_SIZE, TILE_SIZE, color );
    }

    // for an entire array of tiles, fill each with the specified color
    function fillTileArray( stuff, color ){
        for (var i = 0; i<stuff.length; i++){
            fillTile( stuff[i], color );
        }
    }

    // running this function fills all of the tiles that ought to be solid colors
    function fillAllTiles(){
        // fill walls
        fillTileArray( filledWalls, purple );

        // fill upGrav and downGrav
        fillTileArray( upGrav, transPurple );
        fillTileArray( downGrav, transBlue );
    }

    // draw grid-lines
    function drawGrid(){
        for ( var x = 0; x < BOARD_SIZE_X; x++ ){
            for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
                strokeRectangle( board[x][y].corner.x, board[x][y].corner.y, TILE_SIZE, TILE_SIZE, gray, 1 );
            }
        }
    }

    // draw an arrow on the right side of the screen that indicates direction of gravity
    function drawGravIndicator(){
        if ( isNumber( shiftsRemaining ) ){
            if ( gravityDown ){
                drawImageInTile( DOWNARROW, board[ BOARD_SIZE_X - 1 ][BOARD_SIZE_Y - 2] );
            } else {
                drawImageInTile( UPARROW, board[ BOARD_SIZE_X - 1 ][BOARD_SIZE_Y - 2] );
            }
        }
    }

    // put an image in a tile, filling the entire tile
    function drawImageInTile( image, tile ){
        drawImage( image, tile.corner.x, tile.corner.y, TILE_SIZE, TILE_SIZE )
    }

    // for each square of the board, if that square as an associated image, draw it
    function drawAllTiles(){
        for ( var x = 0; x < BOARD_SIZE_X; x++ ) {
            for ( var y = 0; y < BOARD_SIZE_Y; y++ ){
                if (board[x][y].image != null){
                    if ( board[x][y].image == OPENLOCKTRANS ){
                        // special case: if the tile is an open lock, draw the image multiple times;
                            // the number of times it is drawn will decrease over time, producing a
                            // fade effect
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

        // if this is the final level, draw some extra images (balloons + confetti, and "play again" indicator)
        if ( victoryLevel ){
            drawImage( VICTORY, (screenWidth - VICTORY_IMAGE_SIZE)/2, (screenHeight - VICTORY_IMAGE_SIZE)/2, VICTORY_IMAGE_SIZE, VICTORY_IMAGE_SIZE );
            drawImage( PLAY_AGAIN, board[20][1].corner.x, board[20][1].corner.y, 305, 456 )
        }
    }

// MODIFYIN' STUFF

    // set position of an object
    function setPos( object, pos ) {
        object.pos = new vec2(pos)
    }

    // decrease the number of shifts remaining by one, if this is a level where shifting is enabled
    function decrementShifts(){
        if ( isNumber( shiftsRemaining ) && shiftsRemaining > 0 ){
            shiftsRemaining--
        }
    }

// INFORMATIONAL FUNCTIONS

    // get index of a tile, given an (x,y) position
    function getTile( pos ){
        xIndex = floor( pos.x / TILE_SIZE );
        yIndex = floor( pos.y / TILE_SIZE );
        return board[xIndex][yIndex];
    }

    // check if a given point is within a circle the size of 'dude' (either at a given position or,
            // otherwise, centered at dude.pos)
    function withinCircle( point, pos ){
        if (pos == null){
            pos = dude.pos;
        }

        diffVec = sub( pos, point );
        mag = magnitude( diffVec );
        return mag <= dude.radius - 1;
    }

    // returns a set of points on the edge of a tile
        // direction == "horiz" --> only e & w edges. Otherwise, will return points on all 4 edges
    function pointsOnSquare( corner, direction ){
        var squareEdges = [];
        var nPoint, ePoint, sPoint, wPoint
        var z = 5 //number of points per side
        var a;


        // when detecting for horizontal collisions, the points of contact are slightly
            // more towards the center of the tile, so the dude doesn't get caught on the
            // corner of a floor tile, for instance
        if ( direction == "horiz"){
            a = 2;
        } else {
            a = 0;
        }

        // calculate all four corners and insert into results array
        var nwCorner = new vec2( corner.x, corner.y + a )
        var neCorner = new vec2( corner.x + TILE_SIZE, corner.y + a )
        var seCorner = new vec2( corner.x + TILE_SIZE, corner.y - a + TILE_SIZE )
        var swCorner = new vec2( corner.x, corner.y - a + TILE_SIZE )

        insertBack( squareEdges, nwCorner );
        insertBack( squareEdges, neCorner );
        insertBack( squareEdges, seCorner );
        insertBack( squareEdges, swCorner );

        // calculate intermediate points on edges and insert into results array
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

    // check for a collision in a position
    function checkIntersection( tile, pos, direction ){
        var tileEdges = [];
        if ( direction == "horiz" ){
            tileEdges = pointsOnSquare( tile.corner, "horiz" );
        } else {
            tileEdges = pointsOnSquare( tile.corner );
        }
            // if for any of the points on the edge of a square that point is within a circle of radius "dude"
                // centered at the dude's position (i.e. if that point is within the dude) there is a collision:
                // return true
            intersection = forAny( tileEdges, function( point ){ return withinCircle( point, pos )} )

        return intersection;
    }

    // check if the dude is off the map
    function offScreen(){
        // if dude's x or y coordinates are past the centers of the upper left/lower right corner of the
            // board, return 'true'
        if ( dude.pos.x <= board[0][0].center.x ||
                dude.pos.x >= board[BOARD_SIZE_X - 1][BOARD_SIZE_Y - 1].center.x ||
                dude.pos.y <= board[0][0].center.y ||
                dude.pos.y >= board[BOARD_SIZE_X - 1][BOARD_SIZE_Y - 1].center.y ){
            return true;
        } else { // otherwise, return 'false'
            return false;
        }
    }

// LOGIC

    // return 'true' if a given conditional function returns 'true' for ANY of the elements of an array
    function forAny( stuff, conditional ){
            var condition = false;
                stuff.forEach( function( x ) {
                    var temp = conditional( x )
                            if ( temp !== true && temp !== false ){
                                alert( "forAny passed a function that did not return true or false.)" );
                            }
                                if( temp ) {
                                    condition = true
                                }
                            } )
            return condition;
    }

    // if a given conditional function returns 'true' for ANY of the elements of an array, returns
        // the index of that array element
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

    // check if given x and y are within a given tile
    function inTile( x, y, tile ){
        return( x > tile.corner.x && x < tile.corner.x + TILE_SIZE &&
            y > tile.corner.y && y < tile.corner.y + TILE_SIZE )
    }

// SOUNDS

    // stops all sounds associated with gravity
    // plays sound, if sound is turned on
    function playSoundConditional( sound ){
        if( soundOn ){
            playSound( sound )
        }
    }

    function stopAllGravSounds(){
        stopSound( UP_SOUND );
        stopSound( DOWN_SOUND );
        stopSound( NOSHIFT_SOUND );
    }

    // toggles sound on/off image
    function setSoundIcon(){
        if( soundOn ){
            soundTile.image = SOUND_ON_ICON
        } else {
            soundTile.image = SOUND_OFF_ICON
        }
    }
