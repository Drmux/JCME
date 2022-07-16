///////////////////////////////////////////////////////////////////
//    CORE.JS
//         -Main game loops:
//              - Update, Render, 
//              - Update
//              -
//              -
///////////////////////////////////////////////////////////////////



// The function gets called when the window is fully loaded
var cellsize = 8; //grid cell size in pixels
var gridx = 128; //how many cells on a side (split to x and y dimensions???)
var gridy = 128;
var zoom = 1; //magnification level
var camx = 0; //camera x position
var camy = 0;
var iso = false; //whether to render in isometric view

// Timing and frames per second
var lastframe = 0;
var fpstime = 0;
var framecount = 0;
var fps = 0;
var score = 0;

var defaultCanvas = "viewport"
var activeCanvas = "viewport";


//make an array of layers for better access? layer[sky]=arr[]??

var layer = [];
layer["sky"] = [];
var tiles = [];
var skylayer = [];

function clamp(num, min, max) {
    (num < min) ? min : ((num > max) ? max : num);
}

var setTile = function (x, y, r, g, b) {
    return {
        "x": x,
        "y": y,
        "r": parseInt(r),
        "g": parseInt(g),
        "b": parseInt(b),
    }
}

function generateMiniMap(from, colorref) {
    //From = object containting map data
    //Colorref = lookup table containing color values for keys


}

function generateSkyLayer() {
    for (var i = 0; i < gridx; i++) {
        layer["sky"][i] = [];
        for (var j = 0; j < gridy; j++) {
            //let r = (j / gridy) * 255 * .2;
            let r = ((i+j) / (gridx+gridy)) * 255 * .65;
            //let r = 0;
            let g = (gridx - i) / (gridx) * 255 * .25;
            g += (i / gridy) * 255 * .35;
            //let g = 0;
            let b = 128-((j/gridy)*255);
            //255 - 2 * ((j / gridy));
            layer["sky"][i][j] = setTile(i, j, r, g, b);
        }
    }
}

//function generateSkyTiles() {
//    for (var i = 0; i < gridx; i++) {
//        tiles[i] = [];
//        for (var j = 0; j < gridy; j++) {
//            //let r = (j / gridy) * 255 * .2;
//            let r = ((i+j) / (gridx+gridy)) * 255 * .65;
//            //let r = 0;
//            let g = (gridx - i) / (gridx) * 255 * .25;
//            g += (i / gridy) * 255 * .35;
//            //let g = 0;
//            let b = 128-((j/gridy)*255);
//            //255 - 2 * ((j / gridy));
//            tiles[i][j] = setTile(i, j, r, g, b);
//        }
//    }
//}

function generateTileRGBGradient() {//old test gradient. i kept it because I think it's pretty.
    for (var i = 0; i < gridx; i++) {
        tiles[i] = [];
        for (var j = 0; j < gridy; j++) {
            let r = (i / gridx) * 255;
            let g = (j / gridy) * 255;
            let b = 128;
            tiles[i][j] = setTile(i, j, r, g, b);
        }
    }
}

function ColorToHex(color) {
    var hexadecimal = color.toString(16);
    return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function rgbToHex(red, green, blue) {
    return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}


//////////////////////////////////////////////////////////////////////////
// On Window Load, get the canvas element
//  Get the context of the canvas element
//
///////////////////////////////////////////////////////////////////////////

//window.onload = function () {
//    canvasContext("viewport");
//}

function runCanvas(id = activeCanvas) {
    // Get the canvas and context
    var canvas = document.getElementById(id);
    var context = canvas.getContext("2d");

    // VIEW properties ///separate VIEW from MAP
    var view = {
        x: 1,//literal position on canvas
        y: 65,
        width: canvas.width - 2,
        height: canvas.height - 66
    };

    function initMap() {

    }

    function init() {

        //////////////////////////////////
        //  Initialize the Game State
        //  Generate the map
        //  Initialize game variables
        //
        //////////////////////////////////


        // Add mouse events
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mouseup", onMouseUp);
        canvas.addEventListener("mouseout", onMouseOut);

        //Set Grid
        //for i,j, set square position
        generateSkyLayer();
        //generateTiles();
        //Generate various arrays - xbld, xzon, xter, excetera
        // Initialize the score
        score = 0;
        // Enter main loop
        main(0);
    }

    // Main loop
    ////////////////////////////////////////////////
    function main(tframe) {

        // Request animation frames
        window.requestAnimationFrame(main);
        // Update and render the game
        update(tframe);
        render();
    }

    // Update the game state
    ////////////////////////////////////////////////
    function update(tframe) {
        var dt = (tframe - lastframe) / 1000;
        lastframe = tframe;
        // Update the fps counter
        updateFps(dt);
        // Move the square, time-based
        //// Handle left and right collisions with the level
        //// Handle top and bottom collisions with the level
    }

    function updateFps(dt) {
        if (fpstime > 0.25) {
            // Calculate fps
            fps = Math.round(framecount / fpstime);

            // Reset time and framecount
            fpstime = 0;
            framecount = 0;
        }

        // Increase time and framecount
        fpstime += dt;
        framecount++;
    }





    // Render the game

    function render() {
        // Draw the frame
        drawFrame();

        //TO DO: ONLY UPDATE RENDER WHEN THERE'S A RELEVANT CHANGE!!
        renderLayer("sky");
        drawUI();

        // Draw the square -> get color from data table, palette, gradient equation.
        //context.fillStyle = "#A05030";
        //context.fillRect(square.x, square.y, square.width, square.height);
        //context.fillRect(square.x, square.y, square.width, square.height);
    }

    function drawToolbar() {
        //need menu UI shit here
    }

    //function renderTiles() {
    //    for (var i = 0, l = gridx; i < l; i++) {
    //        for (var j = 0, l2 = 10; j < gridy; j++) {
    //            let tile = tiles[i][j];
    //            context.fillStyle = rgbToHex(tile.r, tile.g, tile.b);
    //            context.fillRect(tile.x * cellsize, tile.y * cellsize, cellsize, cellsize);
    //        }
    //    }
    //}

    function renderLayer(thislayer) {
        for (var i = 0, l = gridx; i < l; i++) {
            for (var j = 0, l2 = 10; j < gridy; j++) {
                let tile = layer[thislayer][i][j];
                context.fillStyle = rgbToHex(tile.r, tile.g, tile.b);
                context.fillRect(tile.x * cellsize, tile.y * cellsize, cellsize, cellsize);
            }
        }
    }

    // Draw a frame with a border
    function drawFrame() {
        // Draw background and a border
        context.fillStyle = "#000A0A";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "#AAAAEA";
        context.fillRect(1, 1, canvas.width - 2, canvas.height - 2);


    }

    function drawUI() {
        // Draw header
        //context.fillStyle = "#000030";
        //context.fillRect(0, 0, canvas.width, 65);

        // Draw title
        //context.fillStyle = "#ffffff";
        //context.font = "24px Verdana";
        //context.fillText("HTML5 Canvas Sandbox", 10, 30);

        // Display fps
        context.fillStyle = "#ffffff";
        context.font = "12px Verdana";
        context.fillText("Fps: " + fps, 10, 20);
    }

    // Mouse event handlers

    function onMouseMove(e) {
        var pos = getMousePos(canvas, e);
    }
    function onMouseDown(e) { }
    function onMouseUp(e) { }
    function onMouseOut(e) { }

    // Get the mouse position
    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
            y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
        };
    }
    // Call init to start the game
    init();
};