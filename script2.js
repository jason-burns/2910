//level arrays
//each segment is a row

var empty = 0;
var boat = 1;
var mine = 2;
var treasure = 3;
var goal = 4;
var bar = 10;
var currentLevel;
var level1 = [[bar, bar, bar, bar],
              [bar, boat, treasure, bar],
              [bar, mine, goal, bar],
              [bar, bar, bar, bar]];

var boatLocation = [1][1];

//will have to be local variables
var boatLocationX = 1;
var boatLocationY = 1;



currentLevel = level1;



// game logic functions

// functions to check up/down/left/right.  Returns the location of the tile if it is empty. ~Jason  
    function checkLeft() {
            return currentLevel[boatLocationX - 1][boatLocationY];        
    }
        
    function checkRight() {
            return currentlevel[boatLocationX + 1][boatLocationY];
    }
        
    function checkAbove() {
            return currentLevel[boatLocationX][boatLocationY - 1];
    }
        
    function checkBelow() {
            return currentLevel[boatLocationX][boatLocationY + 1];
    }
            
//win/loss functions, can be updated later on with actual content.  Leave as is for now.
    function win() {
        alert("You win!");
    }

    function loss() {
        alert("You lose!");
    }

//example for how all the other move functions should look. ~Jason
    function moveLeft() {
        
        if (checkLeft() == empty) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationX = boatLocationX - 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
        } else if (checkLeft() == mine) {
            loss();
        } else if (checkLeft() == treasure) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationX = boatLocationX - 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
            scoreIncrease();
        } else if (checkLeft() == goal) {
            win();
        }
    }

    function moveRight() {
        
        if (checkRight() == empty) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationX = boatLocationX + 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
        } else if (checkRight() == mine) {
            loss();
        } else if (checkRight() == treasure) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationX = boatLocationX + 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
            scoreIncrease();
        } else if (checkRight() == goal) {
            win();
        }
        
    }

    function moveUp() {
        
        if (checkUp() == empty) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationY = boatLocationY - 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
        } else if (checkUp() == mine) {
            loss();
        } else if (checkUp() == treasure) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationY = boatLocationY - 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
            scoreIncrease();
        } else if (checkUp() == goal) {
            win();
        }
    }

    function moveDown() {
        
        if (checkDown() == empty) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationY = boatLocationY + 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
        } else if (checkDown() == mine) {
            loss();
        } else if (checkDown() == treasure) {
            
            currentLevel[boatLocationX][boatLocationY] == empty;
        
            boatLocationY = boatLocationY + 1;
        
            currentLevel[boatLocationX][boatLocationY] == boat;
        
            scoreIncrease();
        } else if (checkDown() == goal) {
            win();
        }
    }

//should reset the currentlevel array with the respective stored array.  Will have to be called when the user beats a level.
        function newLevel() {
    
        }

// ui functions

function toMainMenu(){
    
}

function toLevelSelect(){
    
}

function toHighScores(){
    
}

// all the code goes here
// http://paulirish.com/2011/requestanimationframe-for-smart-animating
// shim layer with setTimeout fallback
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();
// name of our game
var FF = {

	
    // set up some initial values
    WIDTH: 720, 
    HEIGHT:  480, 
    // we'll set the rest of these
    // in the init function
    RATIO:  null,
    currentWidth:  null,
    currentHeight:  null,
    canvas: null,
    ctx:  null,
	
    scale:  1,
	
    offset: {top: 0, left: 0},

    //variables to store in the array
    empty: 0,
    boat: 1,
    mine: 2,
    treasure: 3,
    goal: 4,

    init: function() {

        // the proportion of width to height
        FF.RATIO = FF.WIDTH / FF.HEIGHT;
        // these will change when the screen is resized
        FF.currentWidth = FF.WIDTH;
        FF.currentHeight = FF.HEIGHT;
        // this is our canvas element
        FF.canvas = document.getElementsByTagName('canvas')[0];
        // setting this is important
        // otherwise the browser will
        // default to 720 x 480
        FF.canvas.width = FF.WIDTH;
        FF.canvas.height = FF.HEIGHT;
        // the canvas context enables us to 
        // interact with the canvas api
        FF.ctx = FF.canvas.getContext('2d');

        // we're ready to resize
        FF.resize();
		FF.resize();
		
		// we need to sniff out Android and iOS
		// so that we can hide the address bar in
		// our resize function
		FF.ua = navigator.userAgent.toLowerCase();
		FF.android = FF.ua.indexOf('android') > -1 ? true : false;
		FF.ios = ( FF.ua.indexOf('iphone') > -1 || FF.ua.indexOf('ipad') > -1  ) ? 
		true : false;
		
		// listen for clicks
		window.addEventListener('click', function(e) {
			e.preventDefault();
			FF.Input.set(e);
		}, false);

		// listen for touches
		window.addEventListener('touchstart', function(e) {
			e.preventDefault();
			// the event object has an array
			// named touches; we just want
			// the first touch
			FF.Input.set(e.touches[0]);
		}, false);
		
		window.addEventListener('touchmove', function(e) {
			// we're not interested in this,
			// but prevent default behaviour
			// so the screen doesn't scroll
			// or zoom
			e.preventDefault();
		}, false);
		
		window.addEventListener('touchend', function(e) {
			// as above
			e.preventDefault();
		}, false);
		
        //menu starts on startup
		FF.ctx.drawImage(document.getElementById("Main"), 0, 0,FF.canvas.width,FF.canvas.height);
		
		
		//drawing invisible images
		//FF.Draw.circle(100, 100, 50, 'rgba(255,255,0,0)');
		
		//FF.Draw.rect(0,0,FF.canvas.width,FF.canvas.height*7/8, 'Blue');
		
		
		// FF.Draw.rect(0,FF.canvas.height*7/8,FF.canvas.width,FF.canvas.height/8, 'Brown');
		// FF.Draw.circle(FF.canvas.height*1/16, FF.canvas.height*15/16, FF.canvas.height*1/32, 'rgba(255,255,0,0.5)');
		
		// FF.Draw.circle(FF.canvas.width - FF.canvas.height*1/16, FF.canvas.height*15/16, FF.canvas.height*1/32, 'rgba(255,255,0,0.5)');
		// FF.Draw.text('Frantic Frigate', FF.canvas.height*5/32, FF.canvas.height*61/64, 20, '#066');

		//how to use an image
		// var levelOne = document.getElementById("levelOne");
		// FF.ctx.drawImage(levelOne, 0, 0,FF.canvas.width,FF.canvas.height*7/8);
		// FF.ctx.drawImage(levelOne, 0, FF.canvas.height*7/8,FF.canvas.width,FF.canvas.height*1/8);
    },

    resize: function() {

        FF.currentWidth = window.innerWidth;
        // resize the width in proportion
        // to the new height
        FF.currentHeight = FF.currentWidth / FF.RATIO;

        // this will create some extra space on the
        // page, allowing us to scroll past
        // the address bar, thus hiding it.
        if (FF.android || FF.ios) {
            document.body.style.height = (window.innerHeight + 50) + 'px';
        }

        // set the new canvas style width and height
        // note: our canvas is still 320 x 480, but
        // we're essentially scaling it with CSS
        FF.canvas.style.width = FF.currentWidth + 'px';
        FF.canvas.style.height = FF.currentHeight + 'px';

        // we use a timeout here because some mobile
        // browsers don't fire if there is not
        // a short delay
        window.setTimeout(function() {
                window.scrollTo(0,1);
        }, 1);
    }

};

// abstracts various canvas operations into
// standalone functions
FF.Draw = {

    clear: function() {
        FF.ctx.clearRect(0, 0, FF.WIDTH, FF.HEIGHT);
    },

    rect: function(x, y, w, h, col) {
        FF.ctx.fillStyle = col;
        FF.ctx.fillRect(x, y, w, h);
    },

    circle: function(x, y, r, col) {
        FF.ctx.fillStyle = col;
        FF.ctx.beginPath();
        FF.ctx.arc(x, y, r, 0,  Math.PI * 2, true);
        FF.ctx.closePath();
        FF.ctx.fill();
    },

    text: function(string, x, y, size, col) {
        FF.ctx.font = 'bold '+size+'px Monospace';
        FF.ctx.fillStyle = col;
        FF.ctx.fillText(string, x, y);
    }
	

};

window.addEventListener('load', FF.init, false);
window.addEventListener('resize', FF.resize, false);