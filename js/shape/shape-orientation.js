/**
 *	The & That
 *	shape-orientation.js
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
 */



// ------------------------------------------------------------------------
// properties
// ------------------------------------------------------------------------
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



// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
/*
 *	DOM is loaded
 */
$(function() {
	console.log('loaded');

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
// methods
// ------------------------------------------------------------------------
//
//	TODO: tweak orientation settings to procure correct angle
//
function orientationChange() {
	console.log( 'orientationChange()' );
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

	adjustPages();
	console.log( orientation );
};


// ------------------------------------------------------------------------
function adjustPages() {
	console.log( 'adjustPages()' );
	var w = $(window).width();
	var h = $(window).height();

	console.log( w + ' x ' + h );

	// count the number of page elements
	var pagesNum = $(".page").size();


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









