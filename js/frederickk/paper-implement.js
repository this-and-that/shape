/**
 *	
 *	paper-implement.js
 *
 *	3. March 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *	
 */


// ------------------------------------------------------------------------
// Inject PaperJS into the DOM
// ------------------------------------------------------------------------
paper.install(window);
$(document).ready(function(){
	// TODO: solve for multiple canvases
	paper.setup('canvas');
	console.log('PaperJS is go!');
	


	// ------------------------------------------------------------------------
	// PaperJS Methods
	// ------------------------------------------------------------------------
	Setup();


	// ------------------------------------------------------------------------
	Draw();

	
	
	// ------------------------------------------------------------------------
	// PaperJS Events
	// ------------------------------------------------------------------------
	view.onFrame = function(event) {
		Update(event);
	}
	
	view.onResize = function(event) {
		onResize(event);
	}

	// ------------------------------------------------------------------------
	var tool = new Tool();
	tool.onMouseUp = function(event) {
		onMouseUp(event);
	}
	
	tool.onMouseDown = function(event) {
		onMouseDown(event);
	}
	
	tool.onMouseMove = function(event) {
		onMouseMove(event);
	}
	
	tool.onMouseDrag = function(event) {
		onMouseDrag(event);
	}


	// ------------------------------------------------------------------------
	tool.onKeyDown = function(event) {
		onKeyDown(event);
	}

	tool.onKeyUp = function(event) {
		onKeyUp(event);
	}
	
	
	// ------------------------------------------------------------------------
	view.draw(); // draw the screen

});



/**
 *
 *	PaperJS WebApp Supporting Methods
 *	
 *	TODO: tweak orientation settings to procure correct angle
 *
 */
// ------------------------------------------------------------------------
function resizeCanvas() {
	var width = $('#container').width();
	var height = $('#container').height();
	
	// set canvas width and height
	$('#canvas').attr('width', width);
	$('#canvas').attr('height', height)

	Draw();
	view.draw(); // draw the screen

};

$(function() {
	// ------------------------------------------------------------------------
	// Resize Event Handler
	// ------------------------------------------------------------------------
	var resizeTimeout;
	$(window).resize(function() {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(resizeCanvas, 100);
	});
	resizeCanvas();
});

