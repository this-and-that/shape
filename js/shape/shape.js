/**
 *	zine.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://kenfrederick.blogspot.com/
 *
 *	credit given where credit is due
 *
 */



// ------------------------------------------------------------------------
// properties
// ------------------------------------------------------------------------
var scrollTimeout = null;
var scrollEndDelay = 150;			// milliseconds

var divId = '#page';				// id of div 
var individualDivWidth = 768;
var timing = 100;					// milliseconds



// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
$(function() {
	/**
	 *	wraps elements side-by-side
	 *
	 *	http://css-tricks.com/how-to-create-a-horizontally-scrolling-site/
	 */
	$("#page-wrap").wrapInner("<table cellspacing='30'><tr>");
	$(".post").wrap("<td>");



	/**
	 *	scroll event
	 *
	 *	http://jsfiddle.net/dxzk4/5/
	 */
	// var _left = $(window).scrollLeft();
	// $(window).scroll(function(){
	// 	if ( scrollTimeout === null ) scrollBeginHandler();
	// 	else clearTimeout( scrollTimeout );
	// 	scrollTimeout = setTimeout( scrollEndHandler, scrollEndDelay );
	// });

});


/**
 *
 *	http://jsfromhell.com/array/shuffle
 *	http://www.brain4.de/programmierecke/js/arrayShuffle.php
 *
 */
Array.prototype.shuffle = function() {
	for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
};

var combineAndShuffle = function(arr1, arr2) {
	var newArr = arr1.concat(arr2);
	// var tempSlot;
	// var randomNumber;
	// for(var i=0; i!=newArr.length; i++) {
	// 	randomNumber = Math.floor(Math.random() * newArr.length);
	// 	tempSlot = newArr[i]; 
	// 	newArr[i] = newArr[randomNumber]; 
	// 	newArr[randomNumber] = tempSlot;
	// }
	newArr.shuffle();
	return newArr;
}



// ------------------------------------------------------------------------
/**
 *	scroll event handlers
 *
 *	http://stackoverflow.com/questions/4289473/javascript-do-an-action-after-user-is-done-scrolling
 */
function scrollBeginHandler() {
}
function scrollEndHandler() {
	console.log( 'scrollEnd' );

	var curPos = $(window).scrollLeft();
	var totalWidth = $( divId ).width();
	var posToScroll = Math.round(curPos / individualDivWidth) * individualDivWidth;

	$('html, body').stop().animate( {scrollLeft: posToScroll}, timing );
	scrollTimeout = null;
}