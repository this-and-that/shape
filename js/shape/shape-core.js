/**
 *	The & That
 *	shape-core.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	credit given where credit is due
 *
 *	Pagination
 *	v1.0
 *	12. February 2008
 *
 *	Ben Smith
 *	http://spilled-milk.com/pagination/index.html
 *	http://www.developria.com/2010/10/replicate-the-ios-pagination-w.html
 *
 */



// ------------------------------------------------------------------------
// properties
// ------------------------------------------------------------------------
// get the document
var doc = document;


/*
 *	Orientation
 */
var ios;
var device = {
	isiPad: null,
	isiPhone: null,
	isiPod: null,
	isSafari: null,
	isAndroid: null
};
var orientation;


/*
 *	Article
 */
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


/*
 *	Misc.
 */
var bCenterCenterReady = false;






// ------------------------------------------------------------------------
// loaded
// ------------------------------------------------------------------------
/*
 *	DOM is loaded
 */
$(function() {
	console.log('--- DOM load ---');

	/*
	 *	Orientation
	 */
	angle = 0; // orienation angle
	isRotated = false;

	ios = navigator.userAgent.match(/(iPhone)|(iPod)|(iPad)/);
	device.isiPad    = (navigator.userAgent.match(/iPad/i) != null);
	device.isiPhone  = (navigator.userAgent.match(/iPhone/i) != null);
	device.isiPod    = (navigator.userAgent.match(/iPod/i) != null);
	device.isSafari  = (navigator.userAgent.match(/Safari/i) != null);
	device.isAndroid = (navigator.userAgent.match(/Android/i) != null);

	// initial orientation check
	orientation	= 'landscape';
	orientationChange();

	// ------------------------------------------------------------------------
	// Orientation Change Event Handler
	// ------------------------------------------------------------------------
	var otimeout;
	window.onorientationchange = function() {
		clearTimeout(otimeout);
		otimeout = setTimeout(orientationChange, 50);
	};
});






// ------------------------------------------------------------------------
// ready
// ------------------------------------------------------------------------
/*
 *	DOM is ready
 */
$(document).ready(function() {
	console.log('--- DOM ready ---');

	/*
	 *	Pagination
	 */
	// adjustPaginationSizes() is for the rotation of the screen
	adjustPaginationSizes();
	$(window).bind('adjustPaginationSizes', adjustPaginationSizes);


	// top listens to touchevents
	top = doc.getElementById('touchTarget');

	// add event listener, 
	// when a user touches our layer 'top'
	// and assign it to touchDown()
	top.addEventListener('touchstart', touchDown, false); 
	$('.page').css({
		'opacity': 1.0
	});


	/*
	 *	Article
	 */
	// load article
	// filename is defined in HTML
	loadArticle();


	/*
	 *	Misc.
	 */
 	// adjustCenterCenter();

});






// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
/*
 *	Orientation
 */
//
//	TODO: tweak orientation settings to procure correct angle
//
function orientationChange() {
	console.log( 'orientationChange()' );

	/*
	 *	Orientation
	 */
	isRotated = true;

	// angle = window.orientation;

	// if(window.orientation == 90 || window.orientation == -90)	orientation	= 'landscape';
	if(window.orientation == 0 || window.orientation == 180) orientation = 'portrait';

	if (window.orientation == -90) {
		angle = 90;
	}
	if (window.orientation == 90) {
		angle = -90;
	}
	if (window.orientation == 0) {
		angle = 0;
	}


	/*
	 *	Pagination
	 */
	adjustPageSizes();
	console.log( orientation );


	/*
	 *	Misc.
	 */
	 if(bCenterCenterReady) {
	 	// adjustCenterCenter();
	 }

};


// ------------------------------------------------------------------------
function adjustPageSizes() {
	console.log( 'adjustPageSizes()' );
	var w = $(window).width();
	var h = $(window).height();

	console.log( w + ' x ' + h );

	// count the number of page elements
	var pagesNum = $('.page').size();


	for(var i=0; i<pagesNum; i++) {
		// adjust page(s) css
		// adjust the left edge
		$( '.page' ).each(function(i) {
			$(this).css({
				'width': w,
				'height': h,
				'top': 0 + 'px',
				'left': i*w
			});
		});	
	}
	// console.log( $('.page') );


	// adjust page(s) css
	$('.pages').css({
		'width': pagesNum*w,
		'height': h
	});
	// console.log( $('.pages') );


	// adjust article css
	$('.article').css({
		'width': pagesNum*w,
		'height': h
	});
	// console.log( $('.article') );

};



// ------------------------------------------------------------------------
/*
 *	Article
 */
function loadArticle() {
	//
	// load article json
	//
	if(filename === undefined || filename === null) {
		console.log( 'filename: ' + typeof filename );
		return;
	}
	else {
		console.log( 'loadArticle() getJSON( ' + filename + ' )' );
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
	//
	// might be worth doing this without jquery
	// http://stackoverflow.com/questions/327047/what-is-the-most-efficient-way-to-create-html-elements-using-jquery
	//
	var i = 0;
	var id = '';
	for(i=0; i<arr.length; i++) {
		id = '#'+idName+(i).toString();

		if( idName == 'captions' ) {
			// handle captions a bit diffrently
			// they are treated like lists
			$( id ).html( '<ul class="caption"><li>' + arr[i].title + '</li><li>' + arr[i].body + '</li></ul>' );
		}
		else {
			// everything else
			$( id ).html( arr[i] );
		}
	}
};



// ------------------------------------------------------------------------
/*
 *	Pagination
 */
function adjustPaginationSizes() {
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



/*
 *	Misc.
 */
function adjustCenterCenter() {
	 // dynamically adjust all center-center elements
	 // to have the correct half height
	var centerCenterNum = $('.center-center').size();

	for(var i=0; i<centerCenterNum; i++) {
		// adjust page(s) css
		// adjust the left edge
		$( '.center-center' ).each(function(i) {
			var img = $(this).find('img');
			console.log( img );
			// var imgSize = getOriginalImageSize( $(this).find('img') );
			// console.log( $(this).find('img').attr('src') );
			// console.log( imgSize[0] + ' x ' + imgSize[1] );
			// $(this).css({
			// 	'margin-top': -(imgSize[1]/2) + 'px' // should be 50% target height
			// });
		});	
	}

	bCenterCenterReady = true;
};

// http://stackoverflow.com/questions/318630/get-real-image-width-and-height-with-javascript-in-safari-chrome
function getOriginalImageSize(img) {
	var image = new Image();
	console.log( image );

	image.src = img.attr('src');

	var imageWidth = image.width;
	var imageHeight = image.height;

	console.log( imageWidth );
	console.log( imageHeight );

	// img.attr("width", fixedW);

    // var t = new Image();
    // t.src = img.attr('src');

    // console.log(t.src);
    // console.log(t);

    // return [t.width, t.height];
};






// ------------------------------------------------------------------------
// events
// ------------------------------------------------------------------------
function touchDown(e) {
	// touchDown merely keeps track of the
	// user's finger when it touches the layer 'top'
	console.log('touchDown()');

	if (isScrolling) {
		return;
	}

	var targetX = e.targetTouches[0].pageX;
	firstX = targetX;
	lastPosX = targetX;

	top.addEventListener('touchmove', touchMovement, false);
	top.addEventListener('touchend', touchEnd, false);
};

function touchEnd(e) {
	console.log('touchEnd()');

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

	// $('.page').animate({
	// 	backgroundPosition : xposToGet},
	// 	'fast', 'linear', func
	// );
};

function touchMovement(e) {
	console.log('touchMovement()');

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
	// console.log(pos+ ' px');
};


