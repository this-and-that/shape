/**
 *	main.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	credit given where credit is due
 *
 *
 *	http://thisetthatmagazine.tumblr.com/
 *	http://github.com/this-and-that/
 *
 *	Licensed under The MIT License
 *	http://opensource.org/licenses/MIT
 *
 */



// ------------------------------------------------------------------------
//
// Properties
//
// ------------------------------------------------------------------------

/*
 *	Cache
 */
var $article = $('#article'),
	$gallery = $('#gallery');


/*
 *	Article
 */
// global holders for the various parts of an article
// generic to be reused by all articles
var filename = (filename != undefined) ? filename : null;


/*
 *	Callbacks
 */
function onReady(pageIndex) {};

// baker callbacks
function onLeftTap(articleIndex) {};
function onRightTap(articleIndex) {};
function onUpTap(articleIndex) {};
function onDownTap(articleIndex) {};

// onepage-scroll callbacks
// Article
function onArticleLoad(pageIndex) {};
function onBeforeArticlePage(pageIndex, nextIndex) {};
function onAfterArticlePage(pageIndex) {};
// Gallery
function onGalleryLoad(pageIndex) {};
function onBeforeGalleryPage(pageIndex, nextIndex) {};
function onAfterGalleryPage(pageIndex) {};


/*
 *	Misc.
 */
var bRedirected = false;



// ------------------------------------------------------------------------
//
// Loaded
//
// ------------------------------------------------------------------------
/*
 *	DOM is loaded
 */
$(window).load(function() {
	/*
	 *	Check Connection status
	 */
	console.log( 'online', navigator.onLine );
	if(!(navigator.onLine) && !bRedirected ) {
		window.location = './oops.html';
		bRedirected = true;
	}


	/*
	 *	Initialization
	 */
	// load article
	loadArticle();

	// set placement of pages
	paginate();

	// get active page
	onReady( $('#article .page-marker .active').data('index') );

	// serve up retina images
	// $('img').retina('@2x');

	// set bootstrap carousel globally
	$('.carousel').carousel({
		interval: 5000,
		pause: 'false'
	});


	/*
	 *	Events
	 */
	// toogle table of contents
	$('#main-menu').on('click touchstart', function() {
		$('.baseline-grid-view').toggleOpacity(); // baseline grid for debugging only
	});

	// pagination sidebars
	$('#scroll-back').on('click touchstart', function() {
		scrollBack();
	});
	$('#scroll-forward').on('click touchstart', function() {
		scrollForward();
	});

	// toggle gallery, links
	$('a.gallery-link').on('click touchstart', function() {
		toggleGallery( $(this).data('index') );
	});
	// toggle gallery, close
	$('#gallery-close').on('click touchstart', function() {
		toggleGallery();
	});


	var clicked = false;
	var $div = $('div');
	for( var i=$div.length-1; i>=0; i-- ) {
		var clicked = false;
		$div.on('click', function() {
			if(!clicked) return !(clicked = true);
		});
	};

});



// ------------------------------------------------------------------------
//
// Methods
//
// ------------------------------------------------------------------------
function paginate() {

	// set up article for pagination
	$article.onepage_scroll({
		sectionContainer: '.page-marker',
		easing: 'cubic-bezier(.02, .01, .47, 1)',
		animationTime: 500,
		pagination: false,
		// updateURL: true,
		direction: 'horizontal',
		touchTarget: '#navigation',

		onLoad: function(pageIndex) {
			onArticleLoad(pageIndex);
		},
		beforeMove: function(pageIndex, nextIndex) {
			onBeforeArticlePage(pageIndex, nextIndex);
		},
		afterMove: function(pageIndex) {
			onAfterArticlePage(pageIndex);
		}
	});

	// set up gallery for pagination
	$gallery.onepage_scroll({
		sectionContainer: '.image-marker',
		easing: 'cubic-bezier(.02, .01, .47, 1)',
		animationTime: 500,
		pagination: false,
		// updateURL: true,
		direction: 'horizontal',
		touchTarget: '#navigation',
		// loop: true,

		onLoad: function(pageIndex) {
			onGalleryLoad(pageIndex);
		},
		beforeMove: function(pageIndex, nextIndex) {
			onBeforeGalleryPage(pageIndex, nextIndex);
		},
		afterMove: function(pageIndex) {
			onAfterGalleryPage(pageIndex);
		}
	});
	// toggle gallery class, so that it doesn't scroll
	$gallery.find('.image').toggleClass('image-marker');

};

// ------------------------------------------------------------------------
function scrollBack(element) {
	var element = ( $gallery.css('opacity') != 0 )
		? $gallery
		: $article;
	$(element).moveUp();
};
function scrollForward(element) {
	var element = ( $gallery.css('opacity') != 0 )
		? $gallery
		: $article;
	$(element).moveDown();
};

// ------------------------------------------------------------------------
function toggleGallery(pageIndex) {
	// fade in the actual gallery
	$gallery.toggleOpacity();
	// fade in gallery navigation
	$('div.gallery-navigation').toggleOpacity()
		.togglePointerEvents();

	// toggle image class and...
	$gallery.find('#gallery.image').toggleClass('image-marker');
	// toggle page class to ensure swipe gestures only paginate gallery
	$article.find('#article.page').toggleClass('page-marker');

	// not only open the gallery, but to the right page
	if( pageIndex != undefined ) {
		$gallery.moveTo(pageIndex);
	}
};

// ------------------------------------------------------------------------
$.fn.toggleOpacity = function(val) {
	// by toggling css opacity the css transitions
	// are triggered, yeah! limited jquery
	if( val == undefined ) {
		var opacity = $(this).css('opacity');
		val = (opacity >= 1.0) ? false : true;
	}
	$(this).css('opacity',
		(val) ? 1.0 : 0.0
	);
	return $(this);
};

$.fn.togglePointerEvents = function(val) {
	if( val == undefined ) {
		var pointer_events = $(this).css('pointer-events');
		val = (pointer_events !== 'none') ? false : true;
	}
	$(this).css('pointer-events',
		(val) ? 'auto' : 'none'
	);
	return $(this);
};

// ------------------------------------------------------------------------
// TODO: simplify color fading of pages
// hmm... seems a bit over complicated no?
$.fn.fadeToBlack = function(toggleClass, onPage, currentPage, nextPage) {
	var $black_dark_gray = $( '.black-dark-gray' );
	// var $white_dark_gray = $( '.white-dark-gray' );
	var $white_light_gray = $( '.white-light-gray' );


	if( currentPage == onPage-1 && nextPage == onPage ||
		currentPage == onPage+1 && nextPage == onPage ) {
		$(this).addClass( 'black' )
				 .removeClass( toggleClass );

		// this will invert all elements that have .black-dark-gray as a class
		$black_dark_gray.addClass( 'white-light-gray' )
						.removeClass( 'black' )
						.removeClass( 'black-dark-gray' );
	}
	else if( currentPage == onPage && nextPage == onPage+1 ||
			 currentPage == onPage && nextPage == onPage-1 ) {
		$(this).addClass( toggleClass )
				 .removeClass( 'black' );

		$white_light_gray.addClass( 'black-dark-gray' )
						 .removeClass( 'white-light-gray' );
	}
	else if(currentPage == onPage) {
		$(this).addClass( 'black' )
				 .removeClass( toggleClass );

		$black_dark_gray.addClass( 'white-light-gray' )
						.removeClass( 'black' )
						.removeClass( 'black-dark-gray' );
	}
	return $(this);
};


// ------------------------------------------------------------------------
/*
 *	Article
 */
// load the article as a from a .json file
// the idea is to make editing and updating easier
// a pseudo-cms
//
// TODO: i would like to use markdown,
// https://github.com/evilstreak/markdown-js
// https://github.com/treasonx/grunt-markdown
//
function loadArticle(structure) {
	structure = (structure != undefined)
		? structure
		: {};

	console.log( 'loadArticle( ' + structure + ' )' );

	// load article json
	if(filename === undefined || filename === null) {
		console.log( 'filename: ' + typeof filename );
		return;
	}
	else {
		console.log( 'loadArticle() getJSON( ' + filename + ' )' );
		$.getJSON('copy/'+filename, function(data) {
			// info block
			subject = data.article.info.subject;
			title = data.article.info.title;
			author = data.article.info.author;
			// introduction paragraphs
			intro = data.article.intro.text;
			// content
			main = data.article.main.text;
			interview = data.article.interview.text;
			// images
			images = data.article.captions.text;

			structure = {
				subject:	jsonToHtml( subject, 'subject' ),
				title:		jsonToHtml( title, 'title' ),
				author:	 jsonToHtml( author, 'author' ),
				intro:		jsonToHtml( intro, 'intro' ),
				main:		 jsonToHtml( main, 'main' ),
				interview:	jsonToHtml( interview, 'interview' ),
				images:	 jsonToHtml( images, 'captions' )
			};

		});
	}

	return structure;
};



// ------------------------------------------------------------------------
//
// Events
//
// ------------------------------------------------------------------------
window.onresize = function() {
	paginate();
};


// ------------------------------------------------------------------------
// $(window).scroll(function() {
// });


// ------------------------------------------------------------------------
// http://stackoverflow.com/questions/1207008/how-do-i-lock-the-orientation-to-portrait-mode-in-a-iphone-web-application
// $(window).on('orientationchange', function(){
// 	if (window.orientation % 180 == 0){
// 		$(document.body).css('-webkit-transform-origin', '')
// 						.css('-webkit-transform', '');
// 	}
// 	else {
// 		if ( window.orientation > 0) { //clockwise
// 			$(document.body).css('-webkit-transform-origin', '200px 190px')
// 							.css('-webkit-transform',	'rotate(-90deg)');
// 		}
// 		else {
// 			$(document.body).css('-webkit-transform-origin', '280px 190px')
// 							.css('-webkit-transform',	'rotate(90deg)');
// 		}
// 	}
// }).trigger('orientationchange');

