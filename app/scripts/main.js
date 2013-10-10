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
 *	github.com/this-and-that/
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
var filename = (filename != undefined) ? filename : null;
var article = {};


/*
 *	Events
 */
var opscroll;


/*
 *	Misc.
 */
var type;
var bRedirected = false;





// ------------------------------------------------------------------------
//
// Loaded
//
// ------------------------------------------------------------------------
/*
 *	DOM is loaded
 */
// $(function() {
$(document).load(function() {
	/*
	 *	Orientation
	 */
	angle = 0; // orienation angle
	isRotated = false;

	ios = navigator.userAgent.match(/(iPhone)|(iPod)|(iPad)/);
	device.isiPad	= (navigator.userAgent.match(/iPad/i) != null);
	device.isiPhone  = (navigator.userAgent.match(/iPhone/i) != null);
	device.isiPod	= (navigator.userAgent.match(/iPod/i) != null);
	device.isSafari  = (navigator.userAgent.match(/Safari/i) != null);
	device.isAndroid = (navigator.userAgent.match(/Android/i) != null);

	// initial orientation check
	orientation	= 'landscape';
	orientationChange();

	/*
	 *	Check Connection status
	 */
	console.log( 'online', navigator.onLine );
	if(!(navigator.onLine) && !bRedirected ) {
		window.location = './oops.html';
		bRedirected = true;
	}	 


	// keep all links within webapp
	// crucial for testing purposes
	var a = document.getElementsByTagName('a');
	for( var i=0; i<a.length; i++ ) {
		if( !a[i].onclick && a[i].getAttribute('target') != '_blank' ) {
			a[i].onclick = function() {
				window.location = this.getAttribute('href');
				return false; 
			}
		}
	}

});




// ------------------------------------------------------------------------
//
// Ready
//
// ------------------------------------------------------------------------
/*
 *	DOM is ready
 */
$(document).ready(function() {
	/*
	 *	Links
	 */
	$('a').each(function() {
		$(this).addClass(type);
	});

	// http://stackoverflow.com/questions/7901679/jquery-add-target-blank-for-outgoing-link
	$('a[href^="htt"]').each(function() {
		var link = $(this).attr('href');

		// within normal browser
		// open external links in a new window/tab
		$(this).attr('target', '_blank');
	});

	// set carousel globally
	$('.carousel').carousel({
		interval: 5000,
		pause: 'false'
	});


	/*
	 *	Misc
	 */
	loadArticle();
	orientationChange();

	// serve up retina images
	$('img').retina('@2x');


	/*
	 *	Events
	 */
	// http://stackoverflow.com/questions/1207008/how-do-i-lock-the-orientation-to-portrait-mode-in-a-iphone-web-application
	// $(window)	
	// 	.bind('orientationchange', function(){
	// 		if (window.orientation % 180 == 0){
	// 			$(document.body).css("-webkit-transform-origin", "")
	// 				.css("-webkit-transform", "");			
	// 		}
	// 		else {
	// 			if ( window.orientation > 0) { //clockwise
	// 				$(document.body).css("-webkit-transform-origin", "200px 190px")
	// 					.css("-webkit-transform",  "rotate(-90deg)");  
	// 			}
	// 			else {
	// 				$(document.body).css("-webkit-transform-origin", "280px 190px")
	// 						.css("-webkit-transform",  "rotate(90deg)"); 
	// 			}
	// 		}
	// 	 })
	// 	.trigger('orientationchange'); 

});



// ------------------------------------------------------------------------
//
// Methods
//
// ------------------------------------------------------------------------
/*
 *	Orientation
 */
//
//	TODO: tweak orientation settings to procure correct angle
//
function orientationChange() {
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
	 *	Pages
	 */
	// set placement of pages
	paginate();

};


// ------------------------------------------------------------------------
function paginate() {

	opscroll = $('.article').onepage_scroll({
		sectionContainer: '.page',
		easing: 'cubic-bezier(.02, .01, .47, 1)',
		// first page = last page = easeOutBounce
		animationTime: 300,
		pagination: false,
		updateURL: true,
		direction: 'horizontal'
	});

};

// ------------------------------------------------------------------------
function scrollBack() {
	$('.article').moveUp();
};
function scrollForward() {
	$('.article').moveDown();
};
function scrollTo(element) {
	var index = $(element).data("index");
	var delta = index - ($(".page.active").data("index") - 1);
	if( delta > 0 ) {
		$('.article').moveDown(Math.abs(delta)-1);
	}
	else {
		$('.article').moveUp(Math.abs(delta)+1);
	}
};


// ------------------------------------------------------------------------
/*
 *	Article
 */
function loadArticle(structure) {
	structure = (structure == undefined)
		? article
		: structure;

	console.log( 'loadArticle( ' + structure + ' )' ); 
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
				subject: 	jsonToHtml( subject, 'subject' ),
				title:		jsonToHtml( title, 'title' ),
				author: 	jsonToHtml( author, 'author' ),
				intro: 		jsonToHtml( intro, 'intro' ),
				main:		jsonToHtml( main, 'main' ),
				interview:	jsonToHtml( interview, 'interview' ),
				images:		jsonToHtml( images, 'captions' )
			};
			
		});
	}

	return structure;
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
			$( id ).html( '<h6><ul class="caption"><li><span>' + arr[i].title + '</span></li><li><span>' + arr[i].body + '</span></li></ul></h6>' );
		}
		else {
			// everything else
			$( id ).html( '<h5>' + arr[i] + '</h5>' );
		}
	}
};


// ------------------------------------------------------------------------
/*
 *	Cookies
 *	http://www.quirksmode.org/js/cookies.html
 */
 function saveCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		var expires = '; expires=' + date.toGMTString();
	}
	else var expires = '';
	document.cookie = name + '=' + value + expires + '; path=/';
};

 function openCookie(name) {
	var nameEQ = name + '=';
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
};

 function deleteCookie(name) {
	saveCookie(name, '', -1);
};


/**
 *	Local Storage
 */
function saveSession(name, value) {
	if(window.sessionStorage) {
		sessionStorage.setItem(name, String(value));
	}
	else {
		console.error('sessionStorage not supported');
	}
};

function getSession(name) {
	return sessionStorage.getItem(name);
};

function deleteSession(name) {
	sessionStorage.removeItem(name);
};




// ------------------------------------------------------------------------
//
// Events	
//
// ------------------------------------------------------------------------
$(window).resize(function() {
	orientationChange();
});


// ------------------------------------------------------------------------
$(window).scroll(function() { 
}); 



