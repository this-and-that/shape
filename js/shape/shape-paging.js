/**
 *	The & That
 *	shape-paging.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	credit given where credit is due
 *
 *
 *	Pagination
 *	v1.0
 *	12. February 2008
 *
 *	Ben Smith
 *	http://spilled-milk.com/pagination/index.html
 *	http://www.developria.com/2010/10/replicate-the-ios-pagination-w.html
 *
 *
 */



// ------------------------------------------------------------------------
// properties
// ------------------------------------------------------------------------
// get the document
var doc = document;


/*
 *	Article
 */
//
// TODO: move to shape-core.js
//
// global holders for the various parts of an article
// generic to be reused by all articles
var title = [];
var author = [];
var intro = [];
var main = [];
var interview = [];
var captions = [];


/*
 *	Pagination
 */
var fingerPosX;
var firstX;
var lastPosX = 0;

var posBeforeGrab;
var touchPos = 0;
var top;

var slidingForce = 50;
var userForce = 0;

// var bHidden = false;
// var bEnded = false;
var isScrolling = false



// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
/*
 *	DOM is ready
 */
$(document).ready(function() {
	console.log('ready');

	// resize() is for the rotation of the screen
	resize();
	$(window).bind('resize', resize);


	// top listens to touchevents
	top = doc.getElementById('touchTarget');

	// add event listener, 
	// when a user touches our layer 'top'
	// and assign it to touchDown()
	top.addEventListener('touchstart', touchDown, false); 
	$('.page').css({
		'opacity': 1.0
	});


	// load article
	// filename is defined in HTML
	loadArticle();
});



// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
/*
 *	Article
 */
function loadArticle() {
	console.log( 'loadArticle()' );
	//
	// load article json
	//
	if( filename != undefined ) {
		console.log( 'getJSON( ' + filename + ' )' );
		$.getJSON('copy/'+filename, function(data) {
			// info block
			title = data.article.info.title;
			author = data.article.info.author;
			// introduction paragraphs
			intro = data.article.intro.text;
			// content
			main = data.article.main.text;
			interview = data.article.interview.text;
			// captions
			captions = data.article.captions.text;

			jsonToHtml(title, 'title');
			jsonToHtml(author, 'author');
			jsonToHtml(intro, 'intro');
			jsonToHtml(main, 'main');
			jsonToHtml(interview, 'interview');
			jsonToHtml(captions, 'captions');
		});
	}
};

function jsonToHtml(arr, idName) {
	var i = 0;
	for(i=0; i<arr.length; i++) {
		var id = '#'+idName+(i).toString();
		$( id ).html( arr[i] );
	}
};



// ------------------------------------------------------------------------
/*
 *	Pagination
 */
function resize() {
	// var screenWidth = doc.documentElement.clientWidth;
	// // console.log('resize  '  + screenWidth);
	// var l = (screenWidth-$('.pages').outerWidth(true))*.5;
	// $('.pages').css(
	// 	'left', l-10
	// );
};

// ------------------------------------------------------------------------
function goHome() {
	isScrolling = false;
};

function goForward() {
	isScrolling = false;
};

function goBackWards() {
	isScrolling = false;
};

// ------------------------------------------------------------------------
function viewPrevious(val) {
	if (isScrolling) {
		return;
	}
	isScrolling = true;
	var multiplier = (val == undefined) ? 1 : val;

	slideLeft(multiplier);
};

function viewNext(val) {
	if (isScrolling) {
		return;
	}
	isScrolling = true;
	var multiplier = (val == undefined) ? 1 : val;

	slideRight(multiplier);
};



// ------------------------------------------------------------------------
// events
// ------------------------------------------------------------------------
function touchDown(e) {
	// touchDown merely keeps track of the
	// user's finger when it touches the layer 'top'
	console.log('down');

	if (isScrolling) {
		return;
	}

	var targetX = e.targetTouches[0].pageX;
	firstX = targetX;
	lastPosX = targetX;

	console.log( firstX );
	console.log( isScrolling );

	top.addEventListener('touchmove', touchMovement, false);
	top.addEventListener('touchend', touchEnd, false);
};

function touchEnd(e) {
	console.log('end');

	isScrolling = true;
	var forceUsed = slidingForce;
	var topLayer = top;

	topLayer.removeEventListener('touchend', touchEnd, false);
	topLayer.removeEventListener('touchmove', touchMovement, false);

	var forceUsed = (userForce>forceUsed) ? userForce:-userForce;
	var direction = userForce/forceUsed;
	var homeToGetTo = touchPos;
	var forwardToGetTo = homeToGetTo+(direction*768);

	var xposToGet = (forceUsed>50) ? forwardToGetTo:homeToGetTo;
	touchPos = xposToGet;

	var slidePos = xposToGet+'px 0';
	var func = (xposToGet == homeToGetTo) ? goHome : ((direction>0) ? goForward : goBackWards);

	console.log( isScrolling );

	// $('.page').animate({
	// 	backgroundPosition : xposToGet},
	// 	'fast', 'linear', func
	// );
};

function touchMovement(e) {
	console.log('movement');

	// event thrown when the user continues to drags
	// finger across the device, while touchend is
	// the event dispatched when the user lifts finger
	e.preventDefault();

	var currentX = e.targetTouches[0].pageX;
	var lastFinger = lastPosX;
	var fx = firstX;
	var grab = touchPos;
	var dx = currentX-lastFinger;
	var realPlace = currentX-firstX;

	userForce = dx;

	var pos = realPlace+grab;
	lastPosX = currentX;

	// $('.page').css({
	// 	backgroundPosition: pos+'px 0'
	// });
	console.log(pos+ ' px');
};

// ------------------------------------------------------------------------
function slideLeft(valDistance) {
	var scrollTo = '-='+768*valDistance+'px 0px';
	$('.page').animate({
		backgroundPosition: scrollTo},
		300, 'linear'
	);
};

function slideRight(valDistance) {
	var scrollTo = '+='+768*valDistance+'px 0px';
	$('.page').animate({
		backgroundPosition: scrollTo},
		300, 'linear'
	);
};



