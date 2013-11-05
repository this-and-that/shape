/* ===========================================================
 * jquery-onepage-scroll.js v1.3.2
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * https://github.com/peachananr/onepage-scroll
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/eikes/jquery.swipe-events.js
 *
 * License: GPL v3
 *
 * Credit: Ken Frederick for the "direction", "touchTarget", bower.json and "onLoad" options
 * https://github.com/frederickk
 *
 * Credit: Jay Contonio for the moveTo method
 * https://github.com/jcontonio
 *
 * ========================================================== */

!function($) {

	// ------------------------------------------------------------------------
	//
	// Private
	//
	// ------------------------------------------------------------------------
	var defaults = {
		sectionContainer: "section",
		easing: "ease",
		animationTime: 750,
		pagination: true,
		updateURL: false,
		loop: false,
		direction: "vertical",
		touchTarget: null,

		onLoad: null,
		beforeMove: null,
		afterMove: null,
		keyboard: true
	};

	var onepageScrollClass = function(el, options) {
		//
		// Properties
		//
		var settings = options, //$.extend({}, defaults, options),
			sections = $(settings.sectionContainer),
			total = sections.length,
			status = "off",
			topPos = 0,
			leftPos = 0,
			currentPos = 0,
			lastAnimation = 0,
			quietPeriod = 250,
			paginationList = "";


		//
		// Methods
		//
		var transformPage = function(el, settings, pos, index) {
			el.css({
				"-webkit-transform": ( settings.direction === "horizontal" )
					? "translate3d(" + pos + "%, 0, 0)"
					: "translate3d(0, " + pos + "%, 0)",
				"-moz-transform": ( settings.direction === "horizontal" )
					? "translate3d(" + pos + "%, 0, 0)"
					: "translate3d(0, " + pos + "%, 0)",
				"-ms-transform": ( settings.direction === "horizontal" )
					? "translate3d(" + pos + "%, 0, 0)"
					: "translate3d(0, " + pos + "%, 0)",
				"transform": ( settings.direction === "horizontal" )
					? "translate3d(" + pos + "%, 0, 0)"
					: "translate3d(0, " + pos + "%, 0)",

				"-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
				"transition": "all " + settings.animationTime + "ms " + settings.easing
			});
			el.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function(e) {
				if (typeof settings.afterMove === "function") settings.afterMove(index);
			});
		};

		var moveDown = function(el, increment) {
			increment = (increment != undefined) ? increment : 1;
			index = $(el.data('sectionContainer') +".active").data("index");
			current = $(el.data('sectionContainer') + "[data-index='" + index + "']");
			next = $(el.data('sectionContainer') + "[data-index='" + (index + increment) + "']");

			if(next.length < 1) {
				if (settings.loop === true) {
					pos = 0;
					next = $(el.data('sectionContainer') + "[data-index='1']");
				} else {
					return
				}

			}
			else {
				// pos = (index * 100) * -1;
				pos = ((next.data("index") - 1) * 100) * -1;
			}
			if (typeof settings.beforeMove === "function") settings.beforeMove( current.data("index"));
			current.removeClass("active")
			next.addClass("active");
			if(settings.pagination === true) {
				$(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
				$(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
			}

			$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
			$("body").addClass("viewing-page-"+next.data("index"))

			if (history.replaceState && settings.updateURL === true) {
				var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index + increment);
				history.pushState( {}, document.title, href );
			}
			transformPage(el, settings, pos, index);
		};

		var moveUp = function(el, increment) {
			increment = (increment != undefined) ? increment : 1;
			index = $(el.data('sectionContainer') +".active").data("index");
			current = $(el.data('sectionContainer') + "[data-index='" + index + "']");
			next = $(el.data('sectionContainer') + "[data-index='" + (index - increment) + "']");

			if(next.length < 1) {
				if (settings.loop === true) {
					pos = ((total - 1) * 100) * -1;
					next = $(el.data('sectionContainer') + "[data-index='"+total+"']");
				}
				else {
					return
				}
			}
			else {
				pos = ((next.data("index") - 1) * 100) * -1;
			}
			if (typeof settings.beforeMove === "function") settings.beforeMove(current.data("index"));
			current.removeClass("active")
			next.addClass("active")
			if(settings.pagination === true) {
				$(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
				$(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
			}
			$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
			$("body").addClass("viewing-page-"+next.data("index"))

			if (history.replaceState && settings.updateURL === true) {
				var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (index - increment);
				history.pushState( {}, document.title, href );
			}
			transformPage(el, settings, pos, index);
		};

		var moveTo = function(el, slideIndex) {
			index = $(el.data('sectionContainer') +".active").data("index");

			current = $(el.data('sectionContainer') + "[data-index='" + index + "']");
			next = $(el.data('sectionContainer') + "[data-index='" + slideIndex + "']");
			if (next) {
				current.removeClass("active");
				next.addClass("active");
			}
			$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
			$("body").addClass("viewing-page-"+next.data("index"));
			pos = ((next.data("index") - 1) * 100) * -1;
			transformPage(el, settings, pos);
		};


		//
		// Intialization
		//
		function init_scroll(event, delta) {
			deltaOfInterest = delta;
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if(timeNow - lastAnimation < quietPeriod + settings.animationTime) {
				event.preventDefault();
				return;
			}

			if (deltaOfInterest < 0) {
				moveDown(el);
			} else {
				moveUp(el);
			}
			// el.trigger("swiped", [(parseInt($(el.data('sectionContainer') +".active").data("index")) - 1)]);
			lastAnimation = timeNow;
		};

		// push the sectionContainer information to the data of the element
		// this helps keep things organized when having multiple instances
		el.data("sectionContainer",settings.sectionContainer);

		// Prepare everything before binding wheel scroll
		// el.addClass("onepage-wrapper").css("position","relative");
		el.addClass("onepage-wrapper").css("position","absolute");
		$.each( sections, function(i) {
			$(this).css({
				position: "absolute",
				left: ( settings.direction === "horizontal" )
					? leftPos + "%"
					: 0,
				top: ( settings.direction === "vertical" || settings.direction !== "horizontal" )
					? topPos + "%"
					: 0,
			}).addClass("section").attr("data-index", i+1);
			if( settings.direction === "horizontal" ) {
				leftPos = leftPos + 100;
			}
			else {
				topPos = topPos + 100;
			}
			if(settings.pagination === true) {
				paginationList += "<li><a data-index='"+(i+1)+"' href='#" + (i+1) + "'></a></li>"
			}
		});

		if( settings.direction === "horizontal" ) {
			if( settings.touchTarget != null ) {
				$(settings.touchTarget).swipeEvents().bind("swipeRight", function(){
					moveUp(el);
				}).bind("swipeLeft", function(){
					moveDown(el);
				});
			}

			el.swipeEvents().bind("swipeRight", function(){
				moveUp(el);
			}).bind("swipeLeft", function(){
				moveDown(el);
			});
		}
		else {
			if( settings.touchTarget != null ) {
				$(settings.touchTarget).swipeEvents().bind("swipeDown",  function(){
					moveUp(el);
				}).bind("swipeUp", function(){
					moveDown(el);
				});
			}

			el.swipeEvents().bind("swipeDown",  function(){
				moveUp(el);
			}).bind("swipeUp", function(){
				moveDown(el);
			});
		}

		// Create Pagination and Display Them
		if(settings.pagination === true) {
			$("<ul class='onepage-pagination'>" + paginationList + "</ul>").prependTo("body");
			if( settings.direction === "horizontal" ) {
				posLeft = (el.find(".onepage-pagination").width() / 2) * -1;
				el.find(".onepage-pagination").css("margin-left", posLeft);
			}
			else {
				posTop = (el.find(".onepage-pagination").height() / 2) * -1;
				el.find(".onepage-pagination").css("margin-top", posTop);
			}
		}

		// Check URL for slide index
		if(window.location.hash != "" && window.location.hash != "#1") {
			init_index =  window.location.hash.replace("#", "")
			$(el.data('sectionContainer') + "[data-index='" + init_index + "']").addClass("active")
			$("body").addClass("viewing-page-"+ init_index)
			if(settings.pagination === true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");

			if (typeof settings.onPageJump === "function") settings.onPageJump(0, init_index);

			next = $(el.data('sectionContainer') + "[data-index='" + (init_index) + "']");
			if(next) {
				next.addClass("active")
				if(settings.pagination === true) $(".onepage-pagination li a" + "[data-index='" + (init_index) + "']").addClass("active");
				$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
				$("body").addClass("viewing-page-"+next.data("index"))
				if (history.replaceState && settings.updateURL === true) {
					var href = window.location.href.substr(0,window.location.href.indexOf('#')) + "#" + (init_index);
					history.pushState( {}, document.title, href );
				}
			}
			pos = ((init_index - 1) * 100) * -1;
			transformPage(el, settings, pos, init_index);
		}
		else {
			$(el.data('sectionContainer') + "[data-index='1']").addClass("active")
			$("body").addClass("viewing-page-1")
			if(settings.pagination === true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
		}
		if(settings.pagination === true)  {
			$(".onepage-pagination li a").click(function (){
				var page_index = $(this).data("index");
				if (!$(this).hasClass("active")) {
					current = $(el.data('sectionContainer') + ".active")
					next = $(el.data('sectionContainer') + "[data-index='" + (page_index) + "']");

					if (typeof settings.onPageJump === "function") settings.onPageJump(current, page_index);

					if(next) {
						current.removeClass("active")
						next.addClass("active")
						$(".onepage-pagination li a" + ".active").removeClass("active");
						$(".onepage-pagination li a" + "[data-index='" + (page_index) + "']").addClass("active");
						$("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
						$("body").addClass("viewing-page-"+next.data("index"))
					}
					pos = ((page_index - 1) * 100) * -1;
					transformPage(el, settings, pos, page_index);
				}
				if (settings.updateURL === false) return false;
			});
		}

		$(document).bind("mousewheel DOMMouseScroll", function(event) {
			event.preventDefault();
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			init_scroll(event, delta);
		});


		if(settings.keyboard === true) {
			$(document).keydown(function(e) {
				var tag = e.target.tagName.toLowerCase();
				switch(e.which) {
					case 38:
						if (tag != "input" && tag != "textarea") moveUp(el);
					break;
					case 40:
						if (tag != "input" && tag != "textarea") moveDown(el);
					break;
					default: return;
				}
				e.preventDefault();
			});
		}

		if (typeof settings.onLoad === "function") settings.onLoad( $(el.data('sectionContainer') +".active").data("index") );
		// return false;


		return {
			settings:	settings,

			moveDown:	moveDown,
			moveUp:		moveUp,
			moveTo:		moveTo
		};

	};



	// ------------------------------------------------------------------------
	//
	// Public
	//
	// ------------------------------------------------------------------------

	$.fn.onepage_scroll = function(options) {
		var settings = $.extend({}, defaults, options);

		return this.each(function () {
			var instance = new onepageScrollClass( $(this), settings );

			$.fn.moveDown = function(increment) {
				instance.moveDown($(this), increment);
			};
			$.fn.moveUp = function(increment) {
				instance.moveUp($(this), increment);
			};
			$.fn.moveTo = function(increment) {
				instance.moveTo($(this), increment);
			};

        });
	};



	// ------------------------------------------------------------------------
	//
	// Events
	//
	// ------------------------------------------------------------------------

	$.fn.swipeEvents = function() {

		return this.each(function() {
			var startX,
				startY,
				$this = $(this);

			$this.bind("touchstart", touchstart);

			function touchstart(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					startX = touches[0].pageX;
					startY = touches[0].pageY;
					$this.bind("touchmove", touchmove);
				}
				// event.preventDefault();
			};

			function touchmove(event) {
				var touches = event.originalEvent.touches;
				if (touches && touches.length) {
					var deltaX = startX - touches[0].pageX;
					var deltaY = startY - touches[0].pageY;

					if (deltaX >= 50) {
						$this.trigger("swipeLeft");
					}
					if (deltaX <= -50) {
						$this.trigger("swipeRight");
					}
					if (deltaY >= 50) {
						$this.trigger("swipeUp");
					}
					if (deltaY <= -50) {
						$this.trigger("swipeDown");
					}
					if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
						$this.unbind("touchmove", touchmove);
					}
				}
				// event.preventDefault();
			};
		});

	};

}(window.jQuery);

