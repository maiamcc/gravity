///////////////////////////////////////////////////////////////
//                                                           //
//                    CONSTANT STATE                         //

var START_TIME          = currentTime();

var TILE_SIZE             = 90
var BOARD_SIZE_X          = 21 //floor( screenWidth / TILE_SIZE );
var BOARD_SIZE_Y          = 14 //floor( screenHeight / TILE_SIZE );

var MAX_SPEED             = 10
var HORIZ_ACCEL           = 1
var GRAVITY               = 3
var JUMP_SPEED            = -70

var pi                    = 3.14159265359
// colors
var red = makeColor(1, 0, 0, 1);
var green = makeColor(0, .8, 0, 1);
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
        goal.pos = new vec2( board[19][12].center.x, board[19][12].center.y );
        goal.color = green;
}


// When a key is pushed
function onKeyStart(key) {    
    if ( key == 37 ){ // left arrow
        leftDown = true;
    } else if ( key == 39 ){ // right arrow
        rightDown = true;
    } else if ( key == 38 ){ // up arrow
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

    // dots on edges
    /*dudeEdges = pointsOnCircle( dude.pos, dude.radius )
    for (var i=0; i<dudeEdges.length; i++){
        fillCircle( dudeEdges[i].x, dudeEdges[i].y, 10, red )
    }*/



    // dots in the corners
    /*dude.upperLeft = new vec2( dude.pos.x - TILE_SIZE/2, dude.pos.y - TILE_SIZE/2 );
    dude.upperRight = new vec2( dude.pos.x + TILE_SIZE/2, dude.pos.y - TILE_SIZE/2 );
    dude.lowerLeft = new vec2( dude.pos.x - TILE_SIZE/2, dude.pos.y + TILE_SIZE/2 );
    dude.lowerRight = new vec2( dude.pos.x + TILE_SIZE/2, dude.pos.y + TILE_SIZE/2 );

    fillCircle( dude.upperLeft.x, dude.upperLeft.y, 10, red )
    fillCircle( dude.upperRight.x, dude.upperRight.y, 10, red )
    fillCircle( dude.lowerLeft.x, dude.lowerLeft.y, 10, red )
    fillCircle( dude.lowerRight.x, dude.lowerRight.y, 10, red )*/
    
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

        // dots on some squares
    tileEdges = pointsOnSquare( board[7][12].corner, TILE_SIZE )
    for (var i=0; i<tileEdges.length; i++){
        fillCircle( tileEdges[i].x, tileEdges[i].y, 10, red )
    }

    // draw the player
    drawDude();

    // draw the goal
    drawGoal();
}

function simulate(){

    if ( leftDown == true ){
        moveHoriz( "left" );    
        
    } else if ( rightDown == true ){
        moveHoriz( "right" );
    }

    moveVert();
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
                if( checkCollision( nextPos )){
                    console.log( "boom!" );
            } else {
                setPos( dude, nextPos );
            }
    }

    function moveVert( dir ){
        vert_velocity = vert_velocity + GRAVITY;
        nextPos = new vec2( dude.pos.x, dude.pos.y + vert_velocity)
            if( checkCollision( nextPos )){
                vert_velocity = 0
            } else {
                setPos( dude, nextPos );
            }
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
// check for a collision in a position
    // for circular
    function checkCollision( pos ){
      var pointsArray = pointsOnCircle( pos, dude.radius );
        collision = forAny( pointsArray, isWall );
        return collision;


//        abs value ( circlecenter - squarepoint) =< r --> then collision!
    }







// get corners!
    // given the center of an object, get its upper left corner
        function getUpperLeft( pos ){
            ul_corner = new vec2( pos.x - TILE_SIZE/2, pos.y - TILE_SIZE/2 );
            return ul_corner;
        }

    // given the center of an object, get its upper right corner
        function getUpperRight( pos ){
            ur_corner = new vec2( pos.x + TILE_SIZE/2, pos.y - TILE_SIZE/2 );
            return ur_corner;
        }

    // given the center of an object, get its lower left corner
        function getLowerLeft( pos ){
            ll_corner = new vec2( pos.x - TILE_SIZE/2, pos.y + TILE_SIZE/2 );
            return ll_corner;
        }

    // given the center of an object, get its lower right corner
        function getLowerRight( pos ){
            lr_corner = new vec2( pos.x + TILE_SIZE/2, pos.y + TILE_SIZE/2 );
            return lr_corner;
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

// points on square
    function pointsOnSquare( corner, s ){
        var squareEdges = [];
        var nPoint, ePoint, sPoint, wPoint
        var z = 5
        var neCorner = new vec2( corner.x + s, corner.y )
        var seCorner = new vec2( corner.x + s, corner.y + s )
        var swCorner = new vec2( corner.x, corner.y + s )

        insertBack( squareEdges, corner );
        insertBack( squareEdges, neCorner );
        insertBack( squareEdges, seCorner );
        insertBack( squareEdges, swCorner );
        for (var i=1; i<z; i++){
            nPoint = new vec2( corner.x + i * (s/z), corner.y )
            ePoint = new vec2( neCorner.x, neCorner.y + i * (s/z) )
            sPoint = new vec2( swCorner.x + i * (s/z), swCorner.y )
            wPoint = new vec2( corner.x, corner.y + i * (s/z) )
            
            insertBack( squareEdges, nPoint );
            insertBack( squareEdges, ePoint );
            insertBack( squareEdges, sPoint );
            insertBack( squareEdges, wPoint );
        }
            return squareEdges
    }

// LOGIC
    function forAny( stuff, conditional ){
            var condition = false;
            stuff.forEach( function( x ) { 
                                if( conditional( x ) ) { 
                                    condition = true 
                                } 
                            } )
            return condition;
    }

// UTILS.JS:
        function capitalize(text) {
            return toUpperCase(text[0]) + toLowerCase(text.substring(1));
        }


        function shallowClone(x) {
            var y;
            if (isArray(x)) {
                y = makeArray(x.length);
                for (var i = 0; i < x.length; ++i) {
                    y[i] = x[i];
                }
            } else if (isObject(x)) {
                y = Object.create(Object.getPrototypeOf(x));
                for (var p in x) {
                    if (x.hasOwnProperty(p)) { y[p] = x[p]; }
                }
            } else {
                // function, string, boolean, and number are immutable
                y = x;
            }

            return y;
        }


        function fillTextWordWrap(maxWidth, lineHeight, text, x, y, color, style, xAlign, yAlign) {
            xAlign = (xAlign === undefined) ? 'start' : xAlign;
            yAlign = (yAlign === undefined) ? 'alphabetic' : yAlign;

            _ch_ctx.textAlign    = xAlign;
            _ch_ctx.textBaseline = yAlign;
            _ch_ctx.font         = style;
            _ch_ctx.fillStyle    = color;

            var words = text.split(' ');
            var line = '';

            for (var n = 0; n < words.length; ++n) {
                var testLine = line + words[n];
                var testWidth = _ch_ctx.measureText(testLine).width;
                if (testWidth > maxWidth) {
                    // Fail: draw the line
                    try { _ch_ctx.fillText(line, x, y); } catch (e) {}
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    // Succeed; add the word (and maybe whitespace) to the
                    // line and continue
                    line = testLine + ((n === words.length - 1) ? '' : ' ');
                }
            }

            // Draw the final line fragment
            try { _ch_ctx.fillText(line, x, y); } catch (e) {}
        }

        /** Saves a text file to the filename in the default download directory. */
        function downloadTextFile(filename, text) {
            var textFileAsBlob    = new Blob([text], {type:'text/plain'});
            var downloadLink      = document.createElement("a");
            downloadLink.href     = window.webkitURL.createObjectURL(textFileAsBlob);
            downloadLink.download = filename;
            downloadLink.click();    
        }


        /** Prompts the user for a filename, and then invokes the callback
            with the file's contents. The callback will never be invoked
            if the user cancels the dialog. */
        function openLocalTextFile(callback) {
            // Create an input box
            var input    = document.createElement("input");

            input.type   = "file";
            input.accept = "text/plain";
            var onClick = function(event) {
                var fileReader = new FileReader();
                fileReader.onload = function(fileLoadedEvent) {
                    callback(fileLoadedEvent.target.result);
                };

                fileReader.readAsText(input.files[0], "UTF-8");
                // The input object should now become garbage collected
            };
            input.addEventListener("change", onClick, false);

            // Trigger the click event
            input.click();
        }


        function clamp(v, low, high) {
            return Math.max(low, Math.min(high, v));
        }


        /** Loads a file from a URL, blocking until it is available.  The URL
            must be on the same server as the game and can be relative.  The
            result is stored in a string.  If it is binary data, it will be
            correctly represented within the string as ASCII.  If the file is
            not found, returns undefined.

            Example of use to parse JSON:
            
             var mydata = JSON.parse(getRemoteFileAsString("foo.json"));

            The file must be on the same domain as the program was originally
            loaded from.  For example, if your program is at
            http://example.com/test/play.html, then you can only load other
            files from domain example.com.

            On Chrome, this function cannot be used when running directly off
            the local file system without first disabling web security because
            Chrome considers every file on the local filesystem to be a
            different domain.  On OS X, you can work around this by launching
            Chrome in developer mode as:

             open -a Google\ Chrome --args --disable-web-security

            or

             chrome --allow-file-access-from-files

            You can also avoid this problem by always running under a web
            server, even when developing.  To load a web server in a directory
            on OS X, type:

             python -m SimpleHTTPServer
         */
        function getRemoteFileAsString(url) {
            if (window.XMLHttpRequest) {
                xhttp = new XMLHttpRequest();
            } else {
                xhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }

            var asynchronous = false;
            var result;
            try {
                xhttp.open("GET", url, asynchronous);
                xhttp.send();
                result = xhttp.responseText;
            } catch (e) {
                return undefined;
            }

            if (xhttp.status === 0) {
                return result;
            } else {
                return undefined;
            }
        }


        function loadSoundArray(filename) {
            return loadAssetArray(filename, loadSound);
        }


        function loadImageArray(filename) {
            return loadAssetArray(filename, loadImage);
        }


        function loadAssetArray(filename, load) {
            var array = false;

            if (filename) {
                var i = indexOf(filename, "[");
                if (i == -1) {
                    // One frame of animation
                    array = [load(filename)];
                } else {
                    var before = substring(filename, 0, i);
                    var after = substring(filename, i + 3, length(filename));
                    var num = parseInt(substring(filename, i + 1, i + 2));

                    array = [];
                    for (i = 0; i < num; ++i) {
                        array[i] = load(before + i + after);
                    }
                }
            }

            return array;
        }

        /** Creates an object whose members are the values provided (that
            happen to map to the same strings) and that is immutable. 

            var Mode = makeEnum("TITLE", "PLAY", "GAME_OVER");

            When the proxy API is more widely supported, this will also
            give errors when trying to access undefined properties.

            (http://soft.vub.ac.be/~tvcutsem/proxies/assets/proxy_examples/helloproxy.html)
        */
        function makeEnum() {
            var e = {};
            for (var i = 0; i < arguments.length; ++i) {
                e[arguments[i]] = arguments[i];
            }
            return Object.freeze(e);
        }
