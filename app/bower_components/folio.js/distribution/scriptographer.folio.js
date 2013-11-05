/**!
 *
 *	folio.js
 *	0.6.0
 *	https://github.com/frederickk/folio.js
 *
 *	31. October 2013
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	Folio.js is a library for Paper.js/Scriptographer
 *	Folio.js serves as a collection of functions for supporting animations,
 *	rudimentary 3D, additional Path items and lastly a structured
 *	framework/chain of operations similar to that of Processing,
 *	OpenFrameworks, Cinder, et. al.
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *	Additional information and demos can be found here
 *	http://kennethfrederick.de/folio.js/
 *	http://kenfrederick.blogspot.de/2012/12/frederickkpaper.html
 *
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the GNU
 *	Lesser General Public License for more details.
 *
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA	02110-1301	USA
 *
 */

/**!
 *
 *	folio.js
 *	@VERSION
 *	https://github.com/frederickk/folio.js
 *
 *	@DATE
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	Folio.js is a library for Paper.js/Scriptographer
 *	Folio.js serves as a collection of functions for supporting animations,
 *	rudimentary 3D, additional Path items and lastly a structured
 *	framework/chain of operations similar to that of Processing,
 *	OpenFrameworks, Cinder, et. al.
 *
 *	Not all of the code in here was created by me
 *	but credit and links are given where credit is due
 *
 *	Additional information and demos can be found here
 *	http://kennethfrederick.de/folio.js/
 *	http://kenfrederick.blogspot.de/2012/12/frederickkpaper.html
 *
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the GNU
 *	Lesser General Public License for more details.
 *
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA	02110-1301	USA
 *
 */


// ------------------------------------------------------------------------
// Global Properties
// ------------------------------------------------------------------------
/**
 *	the Path.Rectangle of the artboard
 *	mimic Paper.js
 */
var view = artboard = activeDocument.activeArtboard;

/**
 *	holder for Raster
 */
var raster;

/**
 *	shim for using same code base for
 *	both versions of folio.js
 */
var paper = PaperScope = global;



/**
 *	Note from the Scriptographer.org Team
 *
 *	In Scriptographer 2.9, we switched to a top-down coordinate system and
 *	degrees for angle units as an easier alternative to radians.
 *
 *	For backward compatibility we offer the possibility to still use the old
 *	bottom-up coordinate system and radians for angle units, by setting the two
 *	values bellow. Read more about this transition on our website:
 *	http://scriptographer.org/news/version-2.9.064-arrived/
 */

script.coordinateSystem = 'top-down';
script.angleUnits = 'degrees';



/**
 *
 *	Scriptographer Global Scope
 *
 */
// Script.inject({
global.inject({
	enumerable: true,


	/**
	 *
	 *	These are specific methods for the
	 *	Scriptographer version of folio.js
	 *
	 */

	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	// constants
	EPSILON: 1.0e-6,

	// have to keep frameRate low... because well...
	// it's illustrator, don't be greedy
	// formula:
	// 1/12 = 0.08333 (fps -> seconds)
	// 0.08333 * 1000 = 83.33 (seconds -> ms)
	FRAMERATE: 12, // 500 == 2 ms

	// event holder for animations events
	// mimics Paper.js
	_event: {
		count: 0, // number of frames
		time: 0.0,  // seconds elapsed
		delta: 0.0  // difference since last frame
	},



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	@param {Object} obj
	 *				any Javascript Object
	 */
	println: function(obj) {
		console.log( obj );
		console.log( '\n' );
	},


	//-----------------------------------------------------------------------------
	/**
	 *	animation function that mimics Paper.js
	 */
	/**
	 *	@param {Boolean} isOn
	 *				true if we want to use animations
	 *	@param {Number} frameRate
	 *				the frame rate for the animatons default is 12
	 */
	Animate: function(isOn, frameRate) {
		frameRate = (frameRate === undefined) ? FRAMERATE : frameRate;
		var interval = parseInt((1/frameRate)*1000);

		if( isOn ) {
			var updater = setInterval( function() {
				onFrame(interval, Update)
				},
				interval
			);
		}
	},

	/**
	 *	@param {Number} interval
	 *				how often in MS to fire event - defaul: 83
	 */
	onFrame: function(interval, func) {
		interval = (interval === undefined) ? 2 : interval;

		_event.count++;
		_event.time += (interval * 0.001);
		_event.delta -= _event.time;

		if (func != undefined) func(_event);

		_event.delta = _event.time;
	},

});


// ------------------------------------------------------------------------
var folio = folio || {};


/*
 *
 *	Core.js
 *
 *	Core Methods and a collection of extensions for paper globally
 *
 */


folio = {
	// ------------------------------------------------------------------------
	// Setup Core Namespaces
	// ------------------------------------------------------------------------
	FTime: {},
	FIO: {},
	F3D: {}
};



/**
 *
 *	Global Scope (Paper.js core)
 *
 */
PaperScope.inject({
	enumerable: true,


	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	Java style println output
	 *
	 *	@param {Object} obj
	 *				any Javascript Object
	 */
	println: function(obj) {
		console.log( obj );
		console.log( '\n' );
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} val
	 *			input boolean value
	 *
	 *	@return {Number} val as integer
	 *
	 */
	boolToInt: function(val) {
		return (val) ? 1 : 0;
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Object} object
	 *			object whose type to determine
	 *
	 *	@return {String} Paper.js object type
	 *
	 */
	getType: function(object) {
		if( typeof object == 'object' ) {
			if (object instanceof paper.Point) return 'Point';
			else if (object instanceof paper.Size) return 'Size';
			else if (object instanceof paper.Rectangle) return 'Rectangle';
			else if (object instanceof Group) return 'Group';
			else if (object instanceof paper.PlacedItem) return 'PlacedItem';
			else if (object instanceof paper.Raster) return 'Raster';
			else if (object instanceof paper.PlacedSymbol) return 'PlacedSymbol';
			else if (object instanceof paper.Path) return 'Path';
			else if (object instanceof paper.CompoundPath) return 'CompoundPath';
			else if (object instanceof paper.Symbol) return 'Symbol';
			else if (object instanceof paper.TextItem) return 'TextItem';
			else return 'undefined'
		}
		else {
			return typeof object;
		}
	},

	/**
	 *
	 *	@param {Array} items
	 *			Array of items to go through
	 *	@param {String} name
	 *			name of Item to find
	 *
	 *	@return {Path} path with the name that matches
	 *
	 */
	findByName: function(items, name) {
		var path;
		for(var i=0; i<items.length; i++) {
			var item = items[i];
			if(item.name == name) path = item; // break;
		}
		return path;
	},

	/**
	 *
	 *	@param {Array} items
	 *			Array of items to go through
	 *	@param {Number} name
	 *			name of Item to find
	 *
	 *	@return {Path} path with the id that matches
	 *
	 */
	findById: function(items, id) {
		var path;
		for(var i=0; i<items.length; i++) {
			var item = items[i];
			if(item.id == id) path = item; // break;
		}
		return path;
	}

});



/*
 *
 *	FArray.js
 *
 *	Extensions to JavaScript Array may be bad form... but whatever
 *
 */


/**
 *
 *	Array
 *
 */

/**
 *
 *	@return {Number} median value
 *
 */
Array.prototype.median = function() {
	var median = 0;
	this.sort();
	if (this.length % 2 === 0) {
		median = (this[this.length / 2 - 1] + this[this.length / 2]) / 2;
	}
	else {
		median = this[(this.length - 1) / 2];
	}
	return median;
};

/**
 *
 *	@return {Object} unique element
 *
 */
Array.prototype.unique = function() {
	var u = [];
	o:for(var i=0, n=this.length; i<n; i++) {
		for(var x=0, y=u.length; x<y; x++) {
			if(u[x] == this[i]) {
				continue o;
			}
		}
		u[u.length] = this[i];
	}
	return u;
};

/**
 *
 *	merges (then shuffles) two Arrays
 *
 *	@param {Array} arr2
 *				Array object 2
 *
 *	@return {Array} new merged Array object
 *
 */
Array.prototype.merge = function(arr) {
	var output = this.concat(arr);
	output.shuffle();
	return output;
};

/**
 *
 *	@param {Number} start
 *				start position in array
 *	@param {Number} stop
 *				stop position in array
 *
 *	@return {Number} maximum value within array
 *
 */
Array.prototype.max = function(start, stop) {
	start = (start != undefined)
		? start
		: 0;
	stop = (stop != undefined)
		? stop
		: this.length;
	var max = this[start];

	for(var i=(start+1); i<stop; i++) if(this[i] > max) max = i;
	return max;
};

/**
 *
 *	@param {Number} start
 *				start position in array
 *	@param {Number} stop
 *				stop position in array
 *
 *	@return {Number} minimum value within array
 *
 */
Array.prototype.min = function(start, stop) {
	start = (start != undefined)
		? start
		: 0;
	stop = (stop != undefined)
		? stop
		: this.length;
	var min = this[start];

	for (var i=(start+1); i<stop; i++) if(this[i] < min) min = i;
	return min;
};

/**
 *
 *	http://jsfromhell.com/array/shuffle
 *	http://www.brain4.de/programmierecke/js/arrayShuffle.php
 *
 *	@return {Array} original array but with the order "shuffled"
 *
 */
Array.prototype.shuffle = function() {
	for (var j, x, i = this.length; i; j = parseInt(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
};

/**
 *
 *	http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
 *
 *	@return {Array} original array without duplicates
 *
 */
Array.prototype.removeDuplicates = function() {
	return this.reduce(function(accum, cur) {
		if (accum.indexOf(cur) === -1) accum.push(cur);
		return accum;
	}, [] );
};

/**
 *
 *	@param {Number} decimalPlaces
 *			number of decimal places
 *
 *	@return {Array} original array with rounded values
 *
 */
Array.prototype.round = function(decimalPlaces) {
	var multi = Math.pow(10,decimalPlaces);
	for (var i=0; i<this.length; i++) this[i] = Math.round(this[i] * multi)/multi;
	return this;
};


// ------------------------------------------------------------------------
// TODO: integrate sorting methods in a much cleaner way
var FSort = {

	/**
	 *
	 *	sort Array in alphabetical order
	 *
	 *	http://www.brain4.de/programmierecke/js/arraySort.php
	 *
	 */
	alphabetical: function(a, b) {
		/*
		var A = a.toLowerCase();
		var B = b.toLowerCase();

		if (A < B) return -1;
		else if (A > B) return  1;
		else return 0;
		*/

		a = a.toLowerCase();
		a = a.replace(/ä/g,'a');
		a = a.replace(/ö/g,'o');
		a = a.replace(/ü/g,'u');
		a = a.replace(/ß/g,'s');

		b = b.toLowerCase();
		b = b.replace(/ä/g,'a');
		b = b.replace(/ö/g,'o');
		b = b.replace(/ü/g,'u');
		b = b.replace(/ß/g,'s');

		return(a == b) ? 0 : (a>b) ? 1 : -1;
	},

	/**
	 *
	 *	sort array by distance of object from center of canvas
	 *
	 */
	distanceToCenter: function(a, b) {
		var valueA = a.distanceToCenter();
		console.log( valueA );
		var valueB = b.distanceToCenter();
		console.log( valueB );
		var comparisonValue = 0;

		if (valueA > valueB) comparisonValue = -1;
		else if (valueA < valueB) comparisonValue = 1;

		return comparisonValue;
	}

};


/*
 *
 *	FCalculate.js
 *
 *	A collection of global mathematical operations, similar
 *	to those found in Processing/OpenFrameworks/etc.
 *
 */


/**
 *
 *	paper.Global
 *
 */
PaperScope.inject({
	// TODO: enumerable doesn't seem to matter
	// paper. prefix needed for these functions
	enumerable: true,


	//-----------------------------------------------------------------------------
	/**
	 *	@param {Number} min
	 *				minmum range
	 *	@param {Number} max
	 *				maximum range
	 *
	 *	@return {Number} random number as float
	 *
	 *	@example
	 *	var rand = random(30, 90);
	 *
	 */
	random: function(min, max) {
		if(max == undefined) {
			max = min;
			min = 0;
		}
		// else if(min == undefined) {
		//	max = 1;
		//	min = 0;
		// )
		return (min + Math.random() * (max - min));
	},

	/**
	 *	@param {Number} min
	 *				minmum range
	 *	@param {Number} max
	 *				maximum range
	 *
	 *	@return {Number} random number as integer
	 *
	 *	@example
	 *	var randInt = randomInt(30, 90);
	 *
	 */
	randomInt: function(min, max) {
		return parseInt( paper.random(min,max) );
	},

	/**
	 *
	 *	http://www.siafoo.net/snippet/191
	 *
	 *	@param {Number} minr
	 *				minmum range
	 *	@param {Number} maxr
	 *				maximum range
	 *	@param {Number} bias
	 *				bias represents the preference towards lower or higher numbers,
	 *				as a number between 0.0 and 1.0. For example:
	 *				random(0, 10, bias=0.9) will return 9 much more often than 1.
	 *
	 *	@return {Number} a random, albeit biased, number
	 *
	 */
	randomBias: function(minr, maxr, bias) {
		var _map = new Array(90.0, 9.00, 4.00, 2.33, 1.50, 1.00, 0.66, 0.43, 0.25, 0.11, 0.01);
		bias = Math.max(0, Math.min(bias, 1)) * 10;

		var i = parseInt(Math.floor(bias))
		var n = _map[i]
		if(bias < 10) n += (_map[i+1]-n) * (bias-i);

		return Math.pow( Math.random(),n ) * (maxr-minr) + minr;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} val
	 *				the value to constrain
	 *	@param {Number} min
	 *				minimum limit
	 *	@param {Number} max
	 *				maximum limit
	 *
	 *	@return {Number} original value that is not less than the minimum and no greater than the maximum
	 *
	 *	@example
	 *	var clamped = clamp(120, 0, 90); // 90
	 *
	 */
	clamp: function(val, min, max) {
		return (val < min) ? min : ((val > max) ? max : val);
	},

	/**
	 *
	 *	@param {Number} val
	 *				the incoming value to be converted
	 *	@param {Number} start
	 *				lower bound of the value's current range
	 *	@param {Number} stop
	 *				upper bound of the value's current range
	 *
	 *	@return {Number} float value between 0.0 and 1.0
	 *
	 *	@example
	 *	var normed = norm(45, 0, 90); // 0.5
	 *
	 */
	normalize: function(val, start, stop) {
		return (val - start) / (stop - start);
	},

	/**
	 *
	 *	@param {Number} val
	 *				the incoming value to be converted
	 *	@param {Number} istart
	 *				lower bound of the value's current range
	 *	@param {Number} istop
	 *				upper bound of the value's current range
	 *	@param {Number} ostart
	 *				lower bound of the value's target range
	 *	@param {Number} ostop
	 *				upper bound of the value's target range
	 *
	 *	@return {Number} re-mapped value
	 *
	 *	@example
	 *	var mapped = map(180, 0, 360, 0.0, 2.0); // 1
	 *
	 */
	map: function(val, istart, istop, ostart, ostop) {
		return ostart + (ostop - ostart) * ((val - istart) / (istop - istart));
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} val
	 *			number
	 *	@param {Number} decimalPlaces
	 *			number of decimal places
	 *
	 *	@return {Number} float value with desired decimal places
	 *
	 *	@example
	 *	var rounded = roundDecimal(0.586, 2); // 0.59
	 *
	 */
	round: function(val, decimalPlaces) {
		var multi = Math.pow(10,decimalPlaces);
		return Math.round(val * multi)/multi;
	},

	/**
	 *
	 *	snap from:
	 *	http://stackoverflow.com/questions/4507784/snap-to-grid-functionality-using-javascript
	 *
	 *	@param {Number} val
	 *			value to snap
	 *	@param {Number} snapInc
	 *			increment to snap value to
	 *	@param {Function} roundFunction
	 *			(optiona) rounding function
	 *
	 *	@return {Number} snapped value
	 *
	 *	@example
	 *	var snapped = snap(0.66, 0.2); // 0.6
	 *
	 */
	snap: function(val, snapInc, roundFunction) {
		if (roundFunction === undefined) roundFunction = Math.round;
		return paper.roundDecimal( snapInc * roundFunction(val / snapInc), 2 );
	},

	/**
	 *
	 *	@param {Number} start
	 *			fitst value
	 *	@param {Number} stop
	 *			second value
	 *	@param {Number} val
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Number} value between start and stop
	 *
	 *	@example
	 *	var interpolateed = interpolate(0, 100, 0.5); // 50
	 *
	 */
	interpolate: function(start, stop, val) {
		return start + (stop-start) * val;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return {Number} val as degree
	 *
	 *	@example
	 *	var deg = degrees(Math.PI); // 180
	 *
	 */
	degrees: function(val) {
		return val * (180/Math.PI);
	},

	/**
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return {Number} val as radians
	 *
	 *	@example
	 *	var rad = radians(180); // Math.PI
	 *
	 */
	radians: function(val) {
		return val * (Math.PI/180);
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	Calculate secants
	 *
	 *	http://www.ssicom.org/js/x974780.htm
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@example
	 *	var s = sec(180);
	 *
	 */
	sec: function(val) {
		return 1/Math.cos(val);
	},

	/**
	 *
	 *	Calculate cosecants
	 *
	 *	http://www.ssicom.org/js/x974284.htm
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@example
	 *	var cs = cosec(180);
	 *
	 */
	cosec: function(val) {
		return 1/Math.sin(val);
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Point} point
	 *			input point
	 *
	 *	@return {Number} slope ratio
	 *
	 */
	// slope: function(point) {
	// }

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} val
	 *			input value
	 *
	 *	@return {Number} squared value of val
	 *
	 *	@example
	 *	var squared = sq(30); // 900
	 *
	 */
	sq: function(val) {
		return val*val;
	},

	// ------------------------------------------------------------------------
	/**
	 *	get common outer tangents of two circles (only works with circles!)
	 *
	 *	@param {Path.Circle} arg0
	 *				the first Circle
	 *	@param {Path.Circle} arg1
	 *				the second Circle
	 *
	 *	@return {Array} of points
	 *
	 */
	/**
	 *	TODO: get common outer tangents of two curves
	 *
	 *	@param {Curve} arg0
	 *				the first Curve
	 *	@param {Curve} arg1
	 *				the second Curve
	 *
	 *	@return {Array} of points
	 *
	 */
	getCommonTangents: function(arg0, arg1) {
		var dx = arg1.position.x - arg0.position.x;
		var dy = arg1.position.y - arg0.position.y;

		var r1 = Math.sqrt( arg0.bounds.size.getArea() );
		var r2 = Math.sqrt( arg1.bounds.size.getArea() );

		r1 /= 2;
		r2 /= 2;

		var dist = arg0.position.getDistance( arg1.position );

		if (dist <= Math.abs(r2 - r1)) {
			//	The circles are coinciding
			//	There are no valid tangents.
			return;
		}

		var angle1 = Math.atan2(dy, dx);
		var angle2 = Math.acos((r1 - r2)/dist);

		var pt1 = new Point(
			arg0.position.x + r1 * Math.cos(angle1 + angle2),
			arg0.position.y + r1 * Math.sin(angle1 + angle2)
		);
		var pt2 = new Point(
			arg1.position.x + r2 * Math.cos(angle1 + angle2),
			arg1.position.y + r2 * Math.sin(angle1 + angle2)
		);
		var pt4 = new Point(
			arg0.position.x + r1 * Math.cos(angle1 - angle2),
			arg0.position.y + r1 * Math.sin(angle1 - angle2)
		);
		var pt3 = new Point(
			arg1.position.x + r2 * Math.cos(angle1 - angle2),
			arg1.position.y + r2 * Math.sin(angle1 - angle2)
		);

		return [pt1, pt2, pt3, pt4]
	}


});

/*
 *
 *	FColor.js
 *
 *	A collection of extensions for paper.Color
 *
 */


/**
 *
 *	paper.Color
 *
 */
paper.Color.inject({
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} component
	 *						input value to convert
	 *
	 *	@return {String} hex value of input color as string
	 *
	 */
	componentToHex: function( component ) {
		var hex = component.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	},


	/**
	 *
	 *	http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
	 *
	 *	@return {String} hex value of input color as string
	 *
	 */
	colorToHex: function() {
		var r, g, b;
		var str = '';
		try {
			r = this.red*255;
			g = this.green*255;
			b = this.blue*255;
			str = '#'+ this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
		}
		catch(err) {
			console.log( err );
			// str = '#ffffff'; // on error return white
		}
		return str;
	},

	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return {Number} value of input color as integer
	 *
	 */
	colorToInt: function() {
		var RgbInt;
		try {
			RgbInt = this.red;
			RgbInt = RgbInt << 8;
			RgbInt |= this.green;
			RgbInt = RgbInt << 8;
			RgbInt |= this.blue;
		}
		catch(err) {
			console.log( err );
			RgbInt = 16777215; // on error return white
		}
		return RgbInt;
	},

	/**
	 *
	 *	@param {Number} RgbInt
	 *			value as integer
	 *
	 *	@return {Color} value of integer as Color
	 *
	 */
	integer: function(RgbInt) {
		this.red = (RgbInt>> 16) & 255;
		this.green = (RgbInt>> 8) & 255;
		this.blue = RgbInt& 255;
		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param {Number} arg0
	 *			red as byte value (0-255)
	 *	@param {Number} arg1
	 *			green as byte value (0-255)
	 *	@param {Number} arg2
	 *			blue as byte value (0-255)
	 *	@param {Number} arg3
	 *			alpha as byte value (0-255)
	 *
	 *	@return {Color}
	 *
	 */
	bytes: function(arg0, arg1, arg2, arg3) {
		this.red = arg0/255;
		this.green = (arg1 != undefined) ? arg1/255 : arg0/255;
		this.blue = (arg2 != undefined) ? arg2/255 : arg0/255;
		this.alpha = (arg3 != undefined) ? arg3/255 : 1.0;
		return this;
	},


	// ------------------------------------------------------------------------
	/**
	 *	desaturate a color (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to desaturate color
	 *
	 *	@return {Color} desaturated Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var desaturated = color.desaturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	desaturate: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		return color;
	},

	/**
	 *	saturate a color (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to saturate color
	 *
	 *	@return {Color} saturated Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var saturated = color.saturate(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	saturate: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation + (this.saturation * amt), 0,1 );
		return color;
	},

	/**
	 *	darken a color (based on hsl model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to darken color
	 *
	 *	@return {Color} darkened Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var darkened = color.darken(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	darken: function(amt) {
		var color = new Color( this );
		color.lightness = paper.clamp( this.lightness - (this.lightness * amt), 0,1 );
		return color;
	},

	/**
	 *	dim a color (based on hsl model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to dim color
	 *
	 *	@return {Color} dimmed Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var dimmed = color.dim(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	dim: function(amt) {
		var color = new Color( this );
		color.brightness = paper.clamp( this.brightness - (this.brightness * amt), 0,1 );
		return color;
	},

	/**
	 *	lighten a color (based on hsl model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to lighten color
	 *
	 *	@return {Color} lightened Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var lightened = color.lighten(0.2); // { red: 0, green: 0.76, blue: 0.532 }
	 *
	 */
	lighten: function(amt) {
		var color = new Color( this );
		// color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.lightness = paper.clamp( this.lightness + (this.lightness * amt), 0,1 );
		return color;
	},

	/**
	 *	brighten a color (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to brighten color
	 *
	 *	@return {Color} brightened Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.brighten(0.2);
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var brightened = color.brighten(0.2);
	 *
	 */
	brighten: function(amt) {
		var color = new Color( this );
		color.saturation = paper.clamp( this.saturation - (this.saturation * amt), 0,1 );
		color.brightness = paper.clamp( this.brightness + (this.brightness * amt), 0,1 );
		return color;
	},


	/**
	 *	increase color contrast (based on hsb model) by percentage
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} amt
	 *			(0.0 - 1.0) factor to increase contrast
	 *
	 *	@return {Color} Color by input amount
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.contrast(0.2);
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var contrasted = color.contrast(0.2);
	 *
	 */
	contrast: function(amt) {
		var color = new Color( this );
		return color.lightness < 0.5
			? color.darken(amt)
			: color.lighten(amt);
	},


	/**
	 *	invert color
	 *	NOTE: Color operators aren't working
	 *
	 *	@return {Color} inverted Color
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	color.invert();
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var inverted = color.invert();
	 *
	 */
	invert: function() {
		var color = new Color( this );
		for( var i=0; i<color._components.length; i++ ) {
			color._components[i] = 1-color._components[i];
		}
		return color;
	},

	/**
	 *	rotate color around hsb/l color wheel other components remain the same
	 *	NOTE: Color operators aren't working
	 *
	 *	@param {Number} degree
	 *			(0.0 - 360.0) rotation degree
	 *
	 *	@return {Color} rotated Color
	 *
	 *	@example
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var compliment = color.rotate(180);
	 *
	 *	var color = new Color( 0.0, 1.0, 0.7 );
	 *	var triad = [
	 *		color,
	 *		color.rotate(120),
	 *		color.rotate(240)
	 *	];
	 *
	 */
	rotate: function(degree) {
		var color = new Color( this );
		color.hue += degree;
		return color;
	},

	/**
	 *	interpolate color
	 *
	 *	@param {Color} from
	 *			start color
	 *	@param {Color} to
	 *			end color
	 *	@param {Number} amt
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Color} interpolated color
	 *
	 *	@example
	 *	var color1 = new Color( 0.0, 1.0, 0.7 );
	 *	var color2 = new Color( 0.0, 0.7, 1.0 );
	 *	var interpolateColor = new Color().interpolate( color1, color2, 0.5 );
	 *
	 */
	/**
	 *
	 *	@param {Color} to
	 *			end color
	 *	@param {Number} amt
	 *			float: between 0.0 and 1.0
	 *
	 *	@return {Color} interpolated color
	 *
	 *	@example
	 *	var color1 = new Color( 0.0, 1.0, 0.7 );
	 *	var color2 = new Color( 0.0, 0.7, 1.0 );
	 *	var interpolateColor = color1.interpolate( color2, 0.5 );
	 *
	 */
	//
	//	TODO: would interpolateTo make more sense?
	//
	// interpolateTo: function(toColor, amt) {
	//	var color = new Color( this );
	//	for( var i=0; i<color._components.length; i++ ) {
	//		color._components[i] += ((toColor._components[i] - color._components[i]) * amt);
	//	}
	//	return color;
	// },
	interpolate: function( arg0, arg1, arg2 ) {
		var color = new Color( this );

		if(typeof arg1 === 'number') {
			var to = arg0.getComponents();
			for( var i=0; i<color._components.length; i++ ) {
				// color._components[i] += ((to[i] - color._components[i]) * arg1);
				color._components[i] = paper.interpolate( color._components[i], to[i], arg1 );
			}
		}
		else {
			var from = arg0.getComponents();
			var to = arg1.getComponents();
			for( var i=0; i<color._components.length; i++ ) {
				// color._components[i] += ((to[i] - from[i]) * arg2);
				color._components[i] = paper.interpolate( from[i], to[i], arg2 );
			}
		}

		color.setType( this.type );
		return color;
	},


	/**
	 *
	 *	@return {Color} random Color based on initialization arguments
	 *
	 *	@example
	 *	var color = new Color().random();
	 *	// all values between 0.0 and 1.0
	 *	// [ red: 0.1, green: 0.5, blue: 1.0 ]
	 *
	 *	var color = new Color(0.5).random();
	 *	// value between 0.5 and 1.0
	 *	// [ gray: 0.7 ]
	 *
	 *	var color = new Color(0.3, 0.6, 0.9).random();
	 *	// red value between 0.4 and 1.0, etc.
	 *	// [ red: 0.4, green: 0.7, blue: 1.0 ]
	 *
	 *	var color = new Color({ hue: 90, saturation: 1, brightness: 0.8 }).random();
	 *	// hue value between 90 and 360, etc.
	 *	// [ hue: 154, saturation: 1, brightness: 0.9 ]
	 *
	 *	var color = new Color({ hue: 90, saturation: 1, lightness: 0.8 }).random();
	 *	// hue value between 90 and 360, etc.
	 *	// [ hue: 274, saturation: 1, lightness: 0.9 ]
	 *
	 */
	random: function() {
		this._components[0] = ( this.type == 'hsb' || this.type == 'hsl' )
			? paper.random( this._components[0], 360 )
			: paper.random( this._components[0], 1 );
		for( var i=1; i<this._components.length; i++ ) {
			this._components[i] = paper.random( this._components[i], 1 );
		}
		return this;
	}


});



/*
 *
 *	FConversions.js
 *
 *	A collection of helpful conversion ratios from and to pixels (or points)
 *
 */


// var FConversions = new function() {
var FConversions = {

	// return {
		// millimeters
		PIXEL_TO_MM: 0.352777778,
		MM_TO_PIXEL: 2.83464567,

		POINT_TO_MM: this.PIXEL_TO_MM, //0.352777778,
		MM_TO_POINT: this.MM_TO_PIXEL, //2.83464567,

		// centimeters
		PIXEL_TO_CM: 0.0352777778,
		CM_TO_PIXEL: 28.3464567,

		POINT_TO_CM: this.PIXEL_TO_CM, //0.0352777778,
		CM_TO_POINT: this.CM_TO_PIXEL, //28.3464567,

		// inches
		PIXEL_TO_INCH: 0.0138888889,
		INCH_TO_PIXEL: 72,

		POINT_TO_INCH: this.PIXEL_TO_INCH, //0.0138888889,
		INCH_TO_POINT: this.INCH_TO_PIXEL, //72,

		// picas
		PIXEL_TO_PICA: 0.0833333333,
		PICA_TO_PIXEL: 12,

		POINT_TO_PICA: this.PIXEL_TO_PICA, //0.0833333333,
		PICA_TO_POINT: this.PICA_TO_PIXEL  //12
	// };

};


/*
 *
 *	FPath.js
 *
 *	A collection of shapes for paper.Path and methods for paper.Item
 *
 *	FArrow
 *	FBubble
 *	FChain
 *	FCross
 *	FDrop
 *	FTriangle
 *
 */


/*
 *
 *	paper.Item
 *
 */
paper.Item.inject({
	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	@param {Size} spacing
	 *				spacing.width  = the horizontal snapping value, width of the grid.
	 *				spacing.height = the vertical snapping value, height of the grid.
	 *
	 */
	snapGrid: function(spacing) {
		// this.position = pt;
		this.position.snapGrid(spacing);
	},

	/**
	 *	snaps point to an isometric grid
	 *
	 *	@param {Number} scale
	 *				scale of the grid (1.0 = 32x16)
	 *
	 */
	snapIso: function(scale) {
		// this.position = pt;
		this.position.snapIso(scale);
	},


	//-----------------------------------------------------------------------------
	/**
	 * {@grouptitle Position and Bounding Boxes}
	 *
	 *	Returns the distance between the item and the center of the canvas/artboard
	 *
	 *	@return {Number}
	 *
	 */
	getDistanceToCenter: function() {
		// var dx = this._position.x - view.bounds.center.x;
		// var dy = this._position.y - view.bounds.center.y;
		// return (dx * dx + dy * dy) + 1;
		return this._position.getDistance( view.bounds.center );
	},


	//-----------------------------------------------------------------------------
	/**
	 *	converts an CompoundPath into a Group otherwise returns original Item
	 *
	 */
	toGroup: function() {
		if (folio.getType(this) == 'CompoundPath') {
			return new Group( this.children );
		}
		else {
			return this;
		}
	}

});



paper.Path.inject({
	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------

	/*
	 *
	 *	Center Methods
	 *	TODO: finish adding center methods
	 *
	 */

	/**
	 *	Returns the Centroid of Path
	 *	http://stackoverflow.com/questions/2792443/finding-the-centroid-of-a-polygon
	 *
	 *	@return {Point}
	 */
	getCentroid: function() {
		var centroid = new Point(0,0);

		var signedArea = 0.0;
		var a = 0.0;

		var points = [];
		var i = 0;
		for ( i; i<this._segments.length-1; ++i ) {
			points[0] = this._segments[i].point;
			points[1] = this._segments[i+1].point;

			a = points[0].x*points[1].y - points[1].x*points[0].y;
			signedArea += a;

			centroid.x += (points[0].x + points[1].x)*a;
			centroid.y += (points[0].y + points[1].y)*a;
		}

		// Do last vertex
		points[0] = this._segments[i].point;
		points[1] = this._segments[0].point;

		a = points[0].x*points[1].y - points[1].x*points[0].y;
		signedArea += a;

		centroid.x += (points[0].x + points[1].x)*a;
		centroid.y += (points[0].y + points[1].y)*a;

		signedArea *= 0.5;

		centroid.x /= (6.0*signedArea);
		centroid.y /= (6.0*signedArea);

		return centroid;
	},

	/**
	 *	Returns the Circumcenter of a triangle
	 *
	 *	TODO: adjust formula to return Circumcenter of any polygon
	 *
	 *	@return {Point}
	 */
	getCircumcenter: function() {
		if( this._segments.length === 3 ) {
			var p1 = this._segments[0].point;
			var p2 = this._segments[1].point;
			var p3 = this._segments[2].point;

			var A = p2.x - p1.x;
			var B = p2.y - p1.y;
			var C = p3.x - p1.x;
			var D = p3.y - p1.y;

			var E = A*(p1.x + p2.x) + B*(p1.y + p2.y);
			var F = C*(p1.x + p3.x) + D*(p1.y + p3.y);

			var G = 2.0*(A*(p3.y - p2.y)-B*(p3.x - p2.x));

			if( Math.abs(G) < Numerical.EPSILON ) {
				// Collinear - find extremes and use the midpoint
				function max3( a, b, c ) {
					return ( a >= b && a >= c )
						? a
						: ( b >= a && b >= c )
							? b
							: c;
				}
				function min3( a, b, c ) {
					return ( a <= b && a <= c )
						? a
						: ( b <= a && b <= c )
							? b
							: c;
				}

				var minx = min3( p1.x, p2.x, p3.x );
				var miny = min3( p1.y, p2.y, p3.y );
				var maxx = max3( p1.x, p2.x, p3.x );
				var maxy = max3( p1.y, p2.y, p3.y );

				return Point.create( ( minx + maxx ) / 2, ( miny + maxy ) / 2 );
			}
			else {
				var cx = (D*E - B*F) / G;
				var cy = (A*F - C*E) / G;

				return Point.create( cx, cy );
			}
		}
		else {
			return null;
		}
	},

	/*
	 *
	 *	TODO: add additional "center" formulas (for polygons)
	 *	http://mathforum.org/library/drmath/view/57665.html
	 *
	 */

	/**
	 *	Returns the Circumcircle of a polygon
	 *
	 *	TODO: fix for triangles...
	 *
	 *	@return {Path.Circle}
	 */
	// getCircumcircle: function() {
	//	var that = this;
	//	var circumradius = 0;

	//	var _segmentsTemp = this._segments.splice();
	//	function getDistanceToCentroid(segment) {
	//		var point = segment.point;
	//		var x = point.x - that.getCentroid().x,
	//			y = point.y - that.getCentroid().y,
	//			d = x * x + y * y;
	//		return Math.sqrt(d);
	//	};

	//	_segmentsTemp.sort( function(a, b) {
	//		return getDistanceToCentroid(a) - getDistanceToCentroid(b);
	//	});

	//	var diff = _segmentsTemp[_segmentsTemp.length-1] - _segmentsTemp[_segmentsTemp.length-2];
	//	circumradius = _segmentsTemp[_segmentsTemp.length-1] - diff;

	//	// for( var i=0; i<_segmentsTemp.length; i++ ) {
	//	//	var seg = _segmentsTemp[i].point;
	//	//	if( seg.getDistance( this.getCentroid()) > circumradius ) {
	//	//		circumradius = seg.getDistance( this.getCentroid());
	//	//	}
	//	// }

	//	return Path.Circle(
	//		this.getCentroid(),
	//		circumradius
	//	);
	// },

	/**
	 *	Returns the Incircle of a polygon
	 *
	 *	@return {Path.Circle}
	 */
	getIncircle: function() {
		var incircleradius = Number.MAX_VALUE;

		for( var i=0; i<this._segments.length; i++ ) {
			var seg = this._segments[i].point;
			if( seg.getDistance( this.getCentroid()) < incircleradius ) {
				incircleradius = seg.getDistance( this.getCentroid());
			}
		}

		return Path.Circle(
			this.getCentroid(),
			incircleradius
		);
	},

	// TODO: currently implementation returns false point
	// getIncenter : function() {
	//	// vertices
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		var circum = a + b + c;

	//		return new Point(
	//			(a* p1.x + b * p2.x + c * p3.x) / circum,
	//			(a * p1.y + b * p2.y + c * p3.y) / circum
	//		);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },

	/**
	 *	@param b
	 *			array of barycentric coordinates
	 */
	// TODO: currently implementation returns false point
	// toCartesian : function(bary) {
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		// var area = 0.5 * (p1.x * (p2.y - p3.y) +
	//		//				  p2.x * (p3.y - p1.y) +
	//		//				  p3.x * (p1.y - p2.y));

	//		// var r = 2 * area / (a + b + c);
	//		// var k = 2 * area / (a*bary[0] + b*bary[1] + c*bary[2]);

	//		// var angleC = Math.acos((a*a + b*b - c*c) / (2*a*b));

	//		// var cosC = Math.cos( angleC );
	//		// var sinC = Math.sin( angleC );

	//		// var x =	(k*bary[1] - r + (k*bary[0] - r)*cosC) / sinC;
	//		// var y =	k*bary[0] - r;

	//		// return new Point(
	//		//	x + this.getIncenter().x,
	//		//	y + this.getIncenter().y
	//		// );

	//		return new Point(
	//			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x,
	//			bary[0] * p1.x + bary[1] * p2.x + bary[2] * p3.x
	//		);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },


	// TODO: currently implementation returns false point
	// getOrthocenter : function() {
	//	// vertices
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		var bary = [
	//			this.sec(a),
	//			this.sec(b),
	//			this.sec(c)
	//		];
	//		return this.toCartesian(bary);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },


	// TODO: currently implementation returns false point
	// getSchifflerPoint : function() {
	//	// vertices
	//	if( this.segments.length == 3 ) {
	//		var p1 = this.segments[0].point;
	//		var p2 = this.segments[1].point;
	//		var p3 = this.segments[2].point;

	//		// side lengths
	//		var a = p1.getDistance(p2);
	//		var b = p2.getDistance(p3);
	//		var c = p3.getDistance(p1);

	//		var bary = [
	//			1/(Math.cos(b) + Math.cos(c)),
	//			1/(Math.cos(c) + Math.cos(a)),
	//			1/(Math.cos(a) + Math.cos(b))
	//		];
	//		return this.toCartesian(bary, p1,p2,p3);
	//	}
	//	else {
	//		console.error( 'Not Path.FTriangle' );
	//		return null;
	//	}
	// },



	//-----------------------------------------------------------------------------
	statics: new function() {
		return {
			/**
			 *
			 *	FArrow
			 *	Create simple arrow
			 *
			 *	@param {Point} headPoint
			 *				the head of the arrow
			 *	@param {Point} tailPoint
			 *				the tail of the arrow
			 *	@param {Size} arrowHeadSize
			 *				(optional) length of the arrow head
			 *
			 *	@example
			 *	var headPoint = new paper.Point( 9,9 );
			 *	var tailPoint = new paper.Point( 90,90 );
			 *	var arrowHeadSize = new paper.Size( 18,18 );
			 *	var farrow = new paper.Path.FArrow( headPoint, tailPoint, arrowHeadSize );
			 *
			 */
			FArrow: function( headPoint, tailPoint, arrowHeadSize ) {
				// the line part
				var path = new Path.Line( headPoint, tailPoint );

				// the arrow head
				arrowHeadSize = (arrowHeadSize != undefined) ? arrowHeadSize : new Size(headPoint.getDistance(tailPoint)*0.381924,headPoint.getDistance(tailPoint)*0.381924);

				// rotate arrow head around to correct position
				var a = Math.atan2( headPoint.x-tailPoint.x, tailPoint.y-headPoint.y );

				// slight "hack" to get strokCap correct
				var arrowHead = [];
				arrowHead[0] = new Path.Line( new Point(0,0), new Point(-arrowHeadSize.width,-arrowHeadSize.height) );
				arrowHead[1] = new Path.Line( new Point(0,0), new Point( arrowHeadSize.width,-arrowHeadSize.height) );
				for( var i=0; i<arrowHead.length; i++ ) {
					arrowHead[i].rotate( 180+paper.degrees(a), new Point(0,0) );
					arrowHead[i].translate( headPoint );
				}

				var group = new Group([ path, arrowHead[0], arrowHead[1] ]);
				group.name = 'arrow';
				return group;
			},


			/**
			 *
			 *	FBubble
			 *	Create a simple speech bubble
			 *
			 *	@param {Point} bubblePoint
			 *				the position of the bubble
			 *	@param {Size} bubbleSize
			 *				the size of the bubble
			 *	@param {Size} bubbleTagSize
			 *				the size of the tag
			 *	@param {String} bubbleTagCenter
			 *				(optional)
			 *				'RANDOM'	randomly x-position the point (default)
			 *				'LEFT'		left align the x-position of the point
			 *				'CENTER'	center align the x-position of the point
			 *				'RIGHT'		right align the x-position of the point
			 *
			 *	@example
			 *	var bubblePoint = new paper.Point( 45,45 );
			 *	var bubbleSize = new paper.Size( 90,60 );
			 *	var bubbleTagSize = new paper.Size( 9,9 );
			 *	var bubbleTagCenter = 'CENTER';
			 *	var b = new paper.Path.FBubble( bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter );
			 *
			 */
			FBubble: function(bubblePoint, bubbleSize, bubbleTagSize, bubbleTagCenter) {
				var path = new Path();
				path.name = 'bubble';

				bubbleTagSize = (bubbleTagSize != undefined) ? bubbleTagSize : defaultFBubbleTagSize;
				if(bubbleSize.width < 10) {
					bubbleSize.width = 10;
					bubbleTagSize = new Size(10,10);
				}
				bubbleTagCenter = (bubbleTagCenter != undefined) ? bubbleTagCenter : 'RANDOM';

				// left side of bubble
				path.add( new Point(0,0) );
				var angle = 180;
				var through = new Point(
					bubbleSize.height/2 + Math.cos( paper.radians(angle) ) * (bubbleSize.height),
					bubbleSize.height/2 + Math.sin( paper.radians(angle) ) * (bubbleSize.height)
				);
				path.arcTo(through, new Point(0,bubbleSize.height));

				// middle bottom
				// create tag space somewhere along the bottom of the bubble
				var tagStart = paper.randomInt(0,bubbleSize.width-bubbleTagSize.width);

				// create tag
				path.add( new Point(tagStart,bubbleSize.height) );

				var tx, ty;
				if(bubbleTagCenter == 'LEFT') {
					tx = tagStart;
				}
				else if(bubbleTagCenter == 'CENTER') {
					tx = tagStart + (bubbleTagSize.width/2);
				}
				else if(bubbleTagCenter == 'RIGHT') {
					tx = tagStart+bubbleTagSize.width;
				}
				else { // if(bubbleTagCenter == 'RANDOM') {
					tx = paper.randomInt(tagStart,tagStart+bubbleTagSize.width);
				}

				// the length of the tag
				ty = bubbleSize.height + bubbleTagSize.height;
				path.add( new Point(tx,ty) );

				// continue bottom
				path.add( new Point(tagStart+bubbleTagSize.width,bubbleSize.height) );
				path.add( new Point(bubbleSize.width,bubbleSize.height) );


				// right side of bubble
				angle = 0;
				through = new Point(
					bubbleSize.height/2 + Math.cos( paper.radians(angle) ) * (bubbleSize.height/2),
					bubbleSize.height/2 + Math.sin( paper.radians(angle) ) * (bubbleSize.height/2)
				);
				path.arcTo( new Point(bubbleSize.width,0), false );

				// middle top
				path.closed = true;

				// center the bubble
				// compensated for the tag's length
				path.position = new Point(bubblePoint.x,bubblePoint.y+(bubbleTagSize.height/2));

				return path;
			},


			/**
			 *	FChain
			 *	Create simple chain (a line with different endpoint sizes)
			 *
			 *	@param {Point} arg0
			 *				point1 The first point (endpoint1)
			 *	@param {Number} arg1
			 *				radius of endpoint1
			 *	@param {Point} arg2
			 *				point2 The second point (endpoint2)
			 *	@param {Number} arg3
			 *				radius of endpoint2
			 *
			 *	@example
			 *	var point1 = new paper.Point( 9,9 );
			 *	var radius1 = 9;
			 *	var point2 = new paper.Point( 90,90 );
			 *	var radius2 = 90;
			 *	var fchain = new paper.Path.FChain( point1, radius1, point2, radius2 );
			 *
			 */
			/**
			 *
			 *	@param {Path} arg0
			 *				PathItem (endpoint1)
			 *	@param {Path} arg1
			 *				PathItem (endpoint2)
			 *
			 *	@example
			 *	var path1 = new paper.Path.Circle( new Point(9,9), 9 );
			 *	var path2 = new paper.Path.Circle( new Point(90,90), 90 );
			 *	var fchain = new paper.Path.FChain( path1, path2 );
			 *
			 */
			FChain: function(arg0, arg1, arg2, arg3) {
				var obj1, obj2;

				// check for the type of arguments being passed
				if( arg0.type == 'Point' ) {
					obj1 = new Path.Circle( arg0, arg1 );
					obj2 = new Path.Circle( arg2, arg3 );
				}
				else {
					obj1 = arg0;
					obj2 = arg1;
				}

				var tangents = paper.getCommonTangents(obj1, obj2);
				var path = new Path();
				if( tangents != null ) {
					path.name = 'chain';
					path.add( tangents[0] );
					path.add( tangents[1] );

					// determine position of chain around endpoint2
					if( obj2.position.x > obj1.position.x ) angle = 0;
					else if( obj2.position.y < obj1.position.y ) angle = -90;
					else if( obj2.position.y > obj1.position.y ) angle = 90;
					else angle = 180;
					var tp2 = new Point(
						obj2.position.x + Math.cos( paper.radians(angle) ) * (obj2.bounds.width/2),
						obj2.position.y + Math.sin( paper.radians(angle) ) * (obj2.bounds.height/2)
					);
					path.arcTo(tp2, tangents[2]);

					path.add(tangents[2]);
					path.add(tangents[3]);

					// determine position of chain around endpoint1
					if( obj1.position.x > obj2.position.x ) angle = 0;
					else if( obj1.position.y < obj2.position.y ) angle = -90;
					else if( obj1.position.y > obj2.position.y ) angle = 90;
					else angle = 180;
					var tp1 = new Point(
						obj1.position.x + Math.cos( paper.radians(angle) ) * (obj1.bounds.width/2),
						obj1.position.y + Math.sin( paper.radians(angle) ) * (obj1.bounds.height/2)
					);
					path.arcTo(tp1, tangents[0]);
					path.closed;
				}
				return path;

			},


			/**
			 *
			 *	FCross
			 *	Create a cross
			 *
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Size} size
			 *				size [width,height] of cross
			 *	@param {Number} strokeWidth
			 *				thickness of the cross
			 *	@param {String} crossType (optional)
			 *				'SHARP'		sharp edged cross (fill)
			 *				'LINE'		simple built of lines (stroke)
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var size = new paper.Size( 45,45 );
			 *	var strokeWidth = 18;
			 *	var crossType = 'LINE';
			 *	var fcross = new paper.Path.FCross( centerPoint, size, strokeWidth, crossType );
			 *
			 */
			FCross: function( centerPoint, size, strokeWidth, crossType ) {
				(strokeWidth != undefined) ? strokeWidth : 1.0;
				(crossType != undefined) ? crossType : 'LINE';

				// var centerPoint = new Point(_x,_y);
				// var size = new Size(_width,_height);
				var line1, line2;

				if( crossType == 'LINE' ) {
					line1 = new Path.Line(
						centerPoint.x + size.width, centerPoint.y - size.height,
						centerPoint.x - size.width, centerPoint.y + size.height
					);
					line1.strokeWidth = strokeWidth;
					line2 = new Path.Line(
						centerPoint.x + size.width, centerPoint.y + size.height,
						centerPoint.x - size.width, centerPoint.y - size.height
					);
					line2.strokeWidth = strokeWidth;
				}
				else if( crossType == 'SHARP' ) {
					line1 = new Path();
					line1.add( new Point( centerPoint.x + size.width, centerPoint.y - size.height ) );
					line1.add( new Point( centerPoint.x + size.width, (centerPoint.y - size.height) + (strokeWidth/2) ) );
					line1.add( new Point( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y + size.height ) );
					line1.add( new Point( centerPoint.x - size.width, centerPoint.y + size.height ) );
					line1.add( new Point( centerPoint.x - size.width, (centerPoint.y + size.height) - (strokeWidth/2) ) );
					line1.add( new Point( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y - size.height ) );
					line1.closed = true;

					line2 = new Path();
					line2.add( new Point( centerPoint.x - size.width, centerPoint.y - size.height ) );
					line2.add( new Point( (centerPoint.x - size.width) + (strokeWidth/2), centerPoint.y - size.height ) );
					line2.add( new Point( centerPoint.x + size.width, (centerPoint.y + size.height) - (strokeWidth/2) ) );
					line2.add( new Point( centerPoint.x + size.width, centerPoint.y + size.height ) );
					line2.add( new Point( (centerPoint.x + size.width) - (strokeWidth/2), centerPoint.y + size.height ) );
					line2.add( new Point( centerPoint.x - size.width, (centerPoint.y - size.height) + (strokeWidth/2) ) );
					line2.closed = true;
				}

				var group = new Group([ line1, line2 ]);
				group.name = 'cross';
				return group;
			},


			/**
			 *	FDrop
			 *	Create a (tear)drop
			 *
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Number} arg1
			 *				scale drop, maintains intended proportion
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var scale = 45;
			 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			/**
			 *
			 *	@param {Point} centerPoint
			 *				position of cross
			 *	@param {Size} arg1
			 *				scale drop, custom proportion
			 *
			 *	@example
			 *	var centerPoint = new paper.Point( 45,45 );
			 *	var scale = new paper.Size( 30,61.8 );
			 *	var fdrop = new paper.Path.FDrop( centerPoint, scale );
			 *
			 */
			FDrop: function( centerPoint, arg1 ) {
				var path = new Path();
				path.name = 'drop';

				// segments added from top counter-clockwise
				path.add( new Segment(
					new Point( -0.01, 0.01 ),
					new Point( 0, -0.0055078 ),
					new Point( 0, 0.643042 )
				) );
				path.add( new Segment(
					new Point( -0.65, 1.6381104 ),
					new Point( 0, -0.6109619 ),
					new Point( 0, 0.3694434 )
				) );
				path.add( new Segment(
					new Point( 0, 2.31 ),
					new Point( -0.3578369, 0 ),
					new Point( 0.3578369, 0 )
				) );
				path.add( new Segment(
					new Point( 0.65, 1.6381104 ),
					new Point( 0, 0.3694434 ),
					new Point( 0, -0.6109619 )
				) );
				path.add( new Segment(
					new Point( 0.01, 0.01 ),
					new Point( 0, 0.643042 ),
					new Point( 0, -0.0055078 )
				) );
				path.add( new Segment(
					new Point( 0, -0 ),
					new Point( 0.0055078, 0 ),
					new Point( -0.0055078, 0 )
				) );
				path.closed = true;
				path.position = centerPoint;

				// check for the type of arguments being passed
				// default scale is from center (position)
				if( typeof arg1 == 'Size' ) {
					path.scale( arg1.width, arg1.height );
				}
				else {
					path.scale( arg1 );
				}

				return path;
			},


			/**
			 *	FTriangle
			 *	Create a triangle
			 *
			 *	@param {Point} p1
			 *				first point of triangle
			 *	@param {Point} p2
			 *				second point of triangle
			 *	@param {Point} p3
			 *				third point of triangle
			 *
			 *	@example
			 *	var p1 = new paper.Point( 9,9 );
			 *	var p2 = new paper.Point( 90,45 );
			 *	var p3 = new paper.Point( 45,90 );
			 *	var ftriangle = new paper.Path.FTriangle( p1, p2, p3 );
			 *
			 */
			FTriangle: function( p1, p2, p3 ) {
				var path = new Path();
				path.add(p1);
				path.add(p2);
				path.add(p3);
				path.closed = true;
				path.name = 'triangle';

				return path;
			}
		}; // end return


	} // end statics:
});


/*
 *
 *	FPoint.js
 *
 *	A collection of extensions for paper.Point
 *
 */


/**
 *
 *	paper.Point
 *
 */
paper.Point.inject({
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	name: null,
	data: {},



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	http://gmc.yoyogames.com/index.php?showtopic=290349
	 *
	 *	@param {Size} spacing
	 *				scale.width  = x scale of the grid.
	 *				scale.height = y scale of the grid.
	 *	@param {Object} options
	 *				{ grid: true }
	 *				{ isometric: true }
	 *
	 *	@return {Point} snapped Point
	 *
	 */
	/**
	 *	snaps point to an isometric grid
	 *
	 *	@param {Number} scale
	 *				scale of the grid
	 *	@param {Object} options
	 *				{ grid: true }
	 *				{ isometric: true }
	 *
	 *	@return {Point} snapped Point
	 *
	 */
	snap: function(scale, options) {
		options = (options != undefined)
			? options
			: { grid: true, isometric: false };
		scale = (scale.type == 'Size')
			? scale
			: new Size(scale,scale);

		var ix, iy;
		if (optons.isometric === true) {
			ix = Math.round(this.y/(16*scale.height) - this.x/(32*scale.width));
			iy = Math.round(this.y/(16*scale.height) + this.x/(16*scale.width));
			this.x = (iy - ix)/2*(32*scale.width);
			this.y = (iy + ix)/2*(16*scale.height);
		}
		else {
			ix = Math.round(this.y/scale.height - this.x/scale.width);
			iy = Math.round(this.y/scale.height + this.x/scale.width);
			this.x = (iy - ix)/2*scale.width;
			this.y = (iy + ix)/2*scale.height;
		}

		return this;
	},

	/**
	 *
	 *  https://bitbucket.org/postspectacular/toxiclibs/src/9d124c80e8af/src.core/toxi/geom/Vec2D.java
	 *
	 *	@param {Point} toPoint
	 *			interpolates the point towards a given target point
	 *	@param {Number} amt
	 *			(0.0 - 1.0) interpolation factor
	 *	@return {Point} interpolated Point
	 *
	 *	@example
	 *	var point = new Point(0, 0);
	 *	var toPoint = new Point(100, 100);
	 *	point.interpolateTo(toPoint, 0.5); // {x: 50, y: 50}
	 *
	 */
	/**
	 *
	 *	@param {Point} arg0
	 *			starting Point
	 *	@param {Point} arg1
	 *			ending Point
	 *	@param {Number} arg2
	 *			(0.0 - 1.0) interpolate factor
	 *
	 *	@return {Point} new interpolated Point
	 *
	 *	@example
	 *	var start = new Point(0, 30);
	 *	var end = new Point(360, 90);
	 *	var interpolate = new Point.interpolateTo( start, end, 0.5 );
	 *	console.log( interpolate ); // { x: 180, y: 60 }
	 *
	 */
	interpolateTo: function(toPoint, amt) {
		this.x += ((toPoint.x - this.x) * amt);
		this.y += ((toPoint.y - this.y) * amt);
		return this;
	},

	/**
	 *	{@grouptitle Distance & Length}
	 *
	 *	Returns the distance between the point and the center of the canvas
	 *
	 *	@return {Number}
	 *
	 */
	getDistanceToCenter: function() {
		// var dx = this.x - view.bounds.center.x;
		// var dy = this.y - view.bounds.center.y;
		// return (dx * dx + dy * dy) + 1;
		return this.getDistance( view.bounds.center );
	},

	/**
	 *
	 *	Returns the heading angle (radians) of a point
	 *
	 *	@return {Number} vector heading of Point
	 *
	 *	@example
	 *	var point = new Point(0, 90);
	 *	var result = point.getHeading();
	 *	console.log( paper.degrees(result) ); // 90
	 *
	 */
	getHeading: function() {
		return -1 * (Math.atan2(-this.y, this.x));
	},

	/**
	 *	Get the vector angle (radians) of two points
	 *
	 *	@param {Point} point1
	 *			first point
	 *	@param {Point} point2
	 *			second point
	 *
	 *	@return {Number} vector angle (radians)
	 *
	 *	@example
	 *	var point1 = new Point(0, 90);
	 *	var point2 = new Point(90, 180);
	 *	var result = point1.getAngle(point2);
	 *	console.log( paper.degrees(result) ); // XX
	 *
	 */
	getAngle: function(point2) {
		return Math.atan2(point2.y - this.y, point2.x - this.x);
	},

	/**
	 *	Normalize a point between two other points (start and end).
	 *
	 *	@param {Point} start
	 *				start Point
	 *	@param {Point} stop
	 *				stop Point
	 *
	 *	@return {Point} normalized Point
	 *
	 *	@example
	 *	var point = new Point(30, 270);
	 *	var start = new Point(90, 180);
	 *	var stop = new Point(180, 360);
	 *	point.norm(start, stop); // { x: -0.66667, y: 0.5 }')
	 *
	 */
	norm: function(start, stop) {
		this.x = paper.normalize(this.x, start.x, stop.x);
		this.y = paper.normalize(this.y, start.y, stop.y);
		return this;
	},

		// /**
	//  *
	//  *	@return {Point} limit Point
	//  *
	//  */
	// limit: function(lim) {
	//	if (this.magSq() > lim * lim) {
	//		this.normalize();
	//		this.mult * lim;
	//		return this;
	//	}
	//	return this;
	// },

	/**
	 *	{@grouptitle Vector Math Functions}
	 *
	 *	@return {Number} vector mag squared
	 *
	 *	@example
	 *	var point = new Point(0, 90);
	 *	var result = point.magSq();
	 *	console.log(result); // 8100
	 *
	 */
	magSq: function() {
		return this.x * this.x + this.y * this.y;
	}


});



/*
 *
 *	FSize.js
 *
 *	A collection of extensions for paper.Size
 *
 */


/**
 *
 *	paper.Size
 *
 */
paper.Size.inject({

	/**
	 *
	 *	@return {Number} area
	 *
	 *	@example
	 *	var size = new Size(10, 20);
	 *	var a = size.getArea(); // 200
	 *
	 */
	getArea: function() {
		return (this.width * this.height);
	},

	/**
	 *
	 *	@return {Number} area of Item circumcircle
	 *
	 *	@example
	 *	var size = new Size(10, 20);
	 *	var a = size.getCircumarea(); // 200
	 *
	 */
	 getCircumarea: function() {
		var r = this.getCircumradius();
		return Math.PI * (r*r);
	},

	/**
	 *
	 *	@return {Number} area of Item incircle
	 *
	 *	@example
	 *	var size = new Size(10, 20);
	 *	var a = size.getIncirclearea(); // 200
	 *
	 */
	 getIncirclearea: function() {
		var r = this.getIncircleradius();
		return Math.PI * (r*r);
	},

	/**
	 *
	 *	@return {Number} the circumcircle radius of the Size bounding box
	 *
	 *	@example
	 *	var size = new Size(10, 20);
	 *	var r = size.getCircumradius(); // 11.180339887498949
	 *
	 */
	getCircumradius: function() {
		var a = this.width;
		var b = this.height;
		return (Math.sqrt(a * a + b * b) / 2);
	},

	/**
	 *
	 *	@return {Number} the incircle radius of the Size bounding box
	 *
	 *	@example
	 *	var size = new Size(10, 20);
	 *	var r = size.getIncircleradius();
	 *	console.log( r ); // XX
	 *
	 */
	getIncircleradius: function() {
		return ( this.width < this.height )
			? this.width/2
			: this.height/2;
	},

	/**
	 *
	 *  Slope is expressed as rise (x) over run (y)
	 *
	 *	@return {Number} angle (radians)
	 *
	 *	@example
	 *	var slope = new Size(10, 20);
	 *	var result = size.getSlopeAngle();
	 *	console.log( paper.degrees(result) ); // 26.56
	 *
	 */
	getSlopeAngle: function() {
		return Math.atan( this.width/this.height );
	}


});
/*
 *
 *	FString.js
 *
 *	Extensions to JavaScript Array may be bad form... but whatever
 *
 */


/**	------------------------------------------------------------------------
 *
 *	Strings
 *
 *	------------------------------------------------------------------------/

/**
 *
 *	trims white space from right (end) of String
 *
 *	@return {String} trimmed input String
 *
 */
String.prototype.trimEnd = function() {
	for (var i=this.length-1; this.charAt(i) ==' '; i--) {
		this.substring(0, i);
	}
	return this;
};

/**
 *
 *	trims all white space from String
 *
 *	@return {String} trimmed input string
 *
 */
String.prototype.trim = function() {
	this.replace(/(^\s*)|(\s*$)/gi,'');
	this.replace(/[ ]{2,}/gi,' ');
	this.replace(/\n /,'\n');
	return this;
};

/**
 *
 *	converts String to Boolean value
 *
 *	@return {Boolean}
 *
 */
String.prototype.toBool = function() {
	switch(this.toLowerCase()) {
		case 'true': case 'yes': case '1': return true;
		case 'false': case 'no': case '0': case null: return false;
		default: return Boolean(this);
	}
};



/*
 *
 *	FTextItem.js
 *
 *	A collection of extensions for paper.TextItem
 *
 */


/**
 *
 *	paper.TextItem
 *
 */
paper.TextItem.inject({
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return {String} content which will will fit within the bounds of the TextItem
	 *
	 */
	trimToFit: function() {
		var visibleContent = this.visibleRange.content.trim();
		this.content = visibleContent;
		return this;
	}

});



/*
 *
 *	FTime.js
 *
 *	Core FTime Methods
 *
 */


folio.FTime = {
	// ------------------------------------------------------------------------
	// Namespaces
	// ------------------------------------------------------------------------
	// Time/Timing Support
	FDate: {},
	FStopwatch: {},

	// Animation Support
	FStepper: {},
	Ease: {}


	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------


};


/*
 *
 *	Easing.js
 *
 *	Easing Functions
 *	originally inspired from http://gizma.com/easing/
 *	https://gist.github.com/gre/1650294
 *
 *	KeySpline Function
 *	use bezier curve for transition easing function
 *	as inspired from Firefox's nsSMILKeySpline.cpp
 *	https://gist.github.com/gre/1926947#file-keyspline-js
 *	http://greweb.me/2012/02/bezier-curve-based-easing-functions-from-concept-to-implementation/
 *
 *	Copyright (c) 2012
 *
 *	Gaetan Renaudeau
 *	renaudeau.gaetan@gmail.com
 *
 *
 *	modified and augemented for usage with Paper.js
 *
 *
 *	MIT License
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a
 *	copy of this software and associated documentation files (the "Software"),
 *	to deal in the Software without restriction, including without limitation
 *	the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *	and/or sell copies of the Software, and to permit persons to whom the
 *	Software is furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *	THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *	FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *	DEALINGS IN THE SOFTWARE.
 */


folio.FTime.Ease = function() {
	/**
	 *
	 * values of classic easing functions, similar to CSS
	 *
	 */
	var splineValues = {
		ease:		[ 0.25, 0.1, 0.25, 1.0 ],
		linear:		[ 0.00, 0.0, 1.00, 1.0 ],
		// in:			[ 0.42, 0.0, 1.00, 1.0 ],
		out:		[ 0.00, 0.0, 0.58, 1.0 ],
		inOut:		[ 0.42, 0.0, 0.58, 1.0 ]
	};


	/**
	 *
	 *	use bezier curve for transition easing function
	 *
	 *	@param {Array} arg0
	 *					an array (4) of normalized X,Y values [ x1, y1, x2, y2 ]
	 *
	 *	@example
	 *	var spline = new KeySpline(0.25, 0.1, 0.25, 1.0)
	 *	spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
	 *
	 */
	/**
	 *
	 *	use bezier curve for transition easing function
	 *
	 *	@param {Point} arg0
	 *					Point 1
	 *	@param {Point} arg1
	 *					Point 2
	 *
	 *	@example
	 *	var spline = new KeySpline(
	 *		new Point( 80, 80 ),
	 *		new Point( 10, 45 )
	 *	);
	 *	spline.get(t) // returns the normalized easing value | t must be in [0, 1] range
	 *
	 */
	function KeySpline(arg0, arg1) {
		var values;
		if (arg0 instanceof Array) {
			values = arg0;
		}
		else {
			arg0 = arg0.normalize();
			arg1 = arg1.normalize();
			values = [arg0.x, arg0.y, arg1.x, arg1.y];
		}

		function A(arg0, arg1) { return 1.0 - 3.0 * arg1 + 3.0 * arg0; };
		function B(arg0, arg1) { return 3.0 * arg1 - 6.0 * arg0; };
		function C(arg0) { return 3.0 * arg0; };


		//
		// TODO: push these to be global?
		//
		/**
		 *	@param {Number} t
		 *					a float from 0.0 - 1.0
		 *	@param {Number} arg0
		 *					x1 or y1
		 *	@param {Number} arg1
		 *					x2 or y2
		 *
		 *	@return x(t)
		 *
		 */
		function CalcBezier(t, arg0, arg1) {
			return ((A(arg0, arg1)*t + B(arg0, arg1))*t + C(arg0))*t;
		};

		/**
		 *	@param {Number} t
		 *					a float from 0.0 - 1.0
		 *	@param {Number} arg0
		 *					x1 or y1
		 *	@param {Number} arg1
		 *					x2 or y2
		 *
		 *	@return dx/dt
		 *
		 */
		function GetSlope(t, arg0, arg1) {
			return 3.0 * A(arg0, arg1)*t*t + 2.0 * B(arg0, arg1) * t + C(arg0);
		};

		function GetTForX(t) {
			// Newton raphson iteration
			var aGuessT = t;
			for (var i = 0; i < 4; ++i) {
				var currentSlope = GetSlope(aGuessT, values[0], values[2]);
				if (currentSlope == 0.0) return aGuessT;
				var currentX = CalcBezier(aGuessT, values[0], values[2]) - t;
				aGuessT -= currentX / currentSlope;
			}
			return aGuessT;
		};


		function get(t) {
			// normalize();
			if (values[0] == values[1] && values[2] == values[3]) return t; // linear
			return CalcBezier(GetTForX(t), values[1], values[3]);
		};


		return {
			get: get
		};

	};


	// public
	return {
		/**
		 *	see http://easings.net/de for visual examples
		 *	of each spline method
		 */
		linear: function(t) { return t },

		inQuad: function(t) { return t*t },
		outQuad: function(t) { return t*(2-t) },
		inOutQuad: function(t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },

		inCubic: function(t) { return t*t*t },
		outCubic: function(t) { return (--t)*t*t+1 },
		inOutCubic: function(t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },

		inQuart: function(t) { return t*t*t*t },
		outQuart: function(t) { return 1-(--t)*t*t*t },
		inOutQuart: function(t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },

		inQuint: function(t) { return t*t*t*t*t },
		outQuint: function(t) { return 1+(--t)*t*t*t*t },
		inOutQuint: function(t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },

		inSine: function(t) { return -1*Math.cos(t*(Math.PI/2))+1 },
		outSine: function(t) { return 1*Math.sin(t*(Math.PI/2)) },
		inOutSine: function(t) { return -0.5*(Math.cos(Math.PI*t)-1) },

		inExpo: function(t) { return 1*Math.pow(2, 10*(t-1)) },
		outExpo: function(t) { return 1*(-Math.pow(2, -10*t)+1 ) },
		inOutExpo: function(t) { t /= 0.5; if (t < 1) return 0.5 * Math.pow(2, 10*(t-1)); t--; return 0.5 * (-Math.pow(2, -10*t)+2); },

		inCirc: function(t) { return -1*(Math.sqrt(1-t*t)-1) },
		outCirc: function(t) { t--; return 1*Math.sqrt(1-t*t); },
		inOutCirc: function(t) { t /= 0.5; if(t<1) { return -0.5*(Math.sqrt(1-t*t)-1); }else{ t-=2; return 0.5*(Math.sqrt(1-t*t)+1); } },


		spline: KeySpline
		// values: splineValues
	};

};
/*
 *
 *	FDate.js
 *
 */


folio.FTime.FDate = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/**
	 *	public
	 */
	this.date;

	/**
	 *	private
	 */
	var _months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var _shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	private
	 */
	var _addZero = function(val) {
		if (val.length == 1) val = '0' + val;
		return val;
	};


	// ------------------------------------------------------------------------
	/**
	 *	public
	 */
	/**
	 *	@return return the current year as 'YYYY'
	 */
	this.year = function() {
		if(this.date === undefined) this.date = new Date();
		var year = String( this.date.getFullYear() );
		return year;
	};

	/**
	 *	@return return the current month as 'MM'
	 */
	this.month = function() {
		if(this.date === undefined) this.date = new Date();
		var month = String( this.date.getMonth() );
		hour = _addZero(month);
		return month;
	};

	/**
	 *	@return return the current day as string 'DD'
	 */
	this.day = function() {
		if(this.date === undefined) this.date = new Date();
		var day = String( this.date.getDate() );
		return day;
	};

	/**
	 *	@return return the current hour as string 'HH'
	 */
	this.hour = function() {
		if(this.date === undefined) this.date = new Date();
		var hour = String( this.date.getHours() );
		hour = _addZero(hour);
		return hour;
	};

	/**
	 *	@return return the current minute as string 'mm'
	 */
	this.minute = function() {
		if(this.date === undefined) this.date = new Date();
		var minute = String( this.date.getMinutes() );
		minute = _addZero(minute);
		return minute;
	};

	/**
	 *	@return return the current second as string 'ss'
	 */
	this.second = function() {
		if(this.date === undefined) this.date = new Date();
		var second = String( this.date.getSeconds() );
		second = _addZero(second);
		return second;
	};

	/**
	 *	return the current date as string "yyyyMMdd"
	 *
	 *	@return date
	 */
	// this.date = function() {
	//	return this.year() + this.month() + this.day();
	// };

	/**
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return the current time
	 */
	this.now = function(format) {
		var disp = [];
		if( format === undefined ) disp = [true, true, true];
		else disp = format;

		var str = '';
		if(disp[0]) str += this.hour();
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += this.minute();
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += this.second();
		return str;
	};

	this.nowMilliseconds = function() {
		return this.toMillsecond(
			this.hour(),
			this.minute(),
			this.second()
		);
	};

	/**
	 *	add to time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.add = function(_d, _h, _m, _s) {
		return this.date + (24 * _d + 60 * _h + 60 * _m + 1000 * s);
	};

	/**
	 *	sub from time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.sub = function(_d, _h, _m, _s) {
		return this.date - (24 * _d + 60 * _h + 60 * _m + 1000 * s);
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	set to a specific time
	 *
	 *	@param _d
	 *			input days
	 *	@param _h
	 *			input hours
	 *	@param _m
	 *			input minutes
	 *	@param _s
	 *			input seconds
	 */
	this.set = function(_d, _h, _m, _s) {
		this.time = new Date();
		this.time.setTime( (24 * _d + 60 * _h + 60 * _m + 1000 * s) );
		return this.time;
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@param ms
	 *			input as milliseconds
	 *	@param format
	 *			boolean array = [hours, minutes, seconds]
	 *
	 *	@return human readable default is hh:mm:ss
	 */
	this.get = function(ms, format) {
		var disp;
		if( format === undefined ) disp = new Array(true, true, true);
		else disp = format;

		var seconds = parseInt( (ms / 1000) % 60 );
		var minutes = parseInt( ((ms / 1000) / 60) % 60 );
		var hours   = parseInt( (((ms / 1000) / 60) / 60) % 24 );

		var hh, mm, ss;
		if(hours < 10) hh = '0' + hours;
		else hh =  '' + hours;
		if(minutes < 10) mm = '0' + minutes;
		else mm =  '' + minutes;
		if(seconds < 10) ss = '0' + seconds;
		else ss =  '' + seconds;

		var str = '';
		if(disp[0]) str += hh;
		if(disp[0] && disp[1]) str += ':';
		if(disp[1]) str += mm;
		if(disp[1] && disp[2]) str += ':';
		if(disp[2]) str += ss;
		return str;
	};

	/**
	 *	@param h
	 *			input as hours OR input string as hh:mm:ss OR mm:ss
	 *	@param m
	 *			input as minutes
	 *	@param s
	 *			input as seconds
	 *
	 *	@return time in milliseconds
	 */
	this.toMillsecond = function(_h, _m, _s) {
		var h,m,s;
		if(_m === undefined && _s === undefined) {
			h = this.toArray(_h)[0];
			m = this.toArray(_h)[1];
			s = this.toArray(_h)[2];
		}
		else {
			h = _h;
			m = _m;
			s = _s;
		}
		return parseInt(3600000 * h + 60000 * m + 1000 * s);
	};

	/**
	 *	@param strHMS
	 *			input string as hh:mm:ss
	 *
	 *	@return array of time [0] hours [1] minutes [2] seconds
	 */
	this.toArray = function(strHMS) {
		var temp = strHMS.split(':');
		return [ temp[0], temp[1], temp[2] ];
	};


};



/*
 *
 *	FStepper.js
 *
 */


folio.FTime.FStepper = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/**
	 *	private
	 */
	var _stepMillis = 1000; // Set to default of 1s OR 1000ms

	var _timeStart = 0.0;
	var _timeEnd = 0.0;

	var _bToggleStart = 0;
	var _bBeginStpper = false;
	var _bIn = false;
	var _bOut = false;
	var _bDone = true;

	var _easing = 0.05;
	var _bEase = true;

	/**
	 *	public
	 */
	this.delta = 1.0;
	this.counter = -1;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	toggle (start/stop) the stepper
	 *
	 */
	this.toggle = function() {
		if (_bToggleStart == 0) {
			_bToggleStart = 1;
			this.stepOut();
		}
		else {
			_bToggleStart = 0;
			this.stepIn();
		}
	}

	// ------------------------------------------------------------------------
	/**
	 *	TODO: implement ability to add _easing functions
	 *
	 *	required function to keep the timing in sync
	 *	with the application
	 *
	 *	@param currentTime
	 *			the elapsed time of the application in seconds
	 */
	this.update = function(currentTime) {
		if(_bBeginStpper) {
			_bBeginStpper = false;
			_timeStart = currentTime;
			if(_bIn) {
				_timeEnd = paper.round( (currentTime + ((1.0 - this.delta) * _stepMillis)), 3 );
			}
			else {
				_timeEnd = paper.round( (currentTime + (this.delta*_stepMillis)), 3 );
			}
			if(_timeEnd <= currentTime) {
				if(_bIn) {
					_bIn = false;
					this.delta = 1.0;
				}
				else {
					_bOut = false;
					this.delta = 0.0;
				}
			}
		}
		if(_bIn) {
			this.delta = paper.round( (1.0 - ((_timeEnd - currentTime) / _stepMillis)), 3 );
			// if(_bEase) {
			// }

			if(currentTime == _timeEnd) {
				_bIn = false;
				this.delta = 1.0;
				this.counter++;
				return;
			}
		}
		else if(_bOut) {
			this.delta = paper.round( ((_timeEnd - currentTime) / _stepMillis), 3 );
			// if(_bEase) {
			// }

			if(currentTime == _timeEnd) {
				_bIn = false;
				this.delta = 0.0;
				this.counter++;
				return;
			}
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *
	 *	toggle stepping in (++)
	 *
	 */
	this.stepIn = function() {
		if(_bIn) return;
		if(this.delta == 1.0) return;
		_bBeginStpper = true;
		_bIn = true;
		_bOut = false;
	};

	/**
	 *
	 *	toggle stepping out (--)
	 *
	 */
	this.stepOut = function() {
		if(_bOut) return;
		if(this.delta == 0.0) return;
		_bBeginStpper = true;
		_bOut = true;
		_bIn = false;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@return if the object is stepping in
	 */
	this.isIn = function() {
		return _bIn;
	};
	/**
	 *	@return if the object is stepping out
	 */
	this.isOut = function() {
		return _bOut;
	};

	/**
	 *	@return if the object has finished it's stepping
	 */
	this.isDone = function() {
		if(this.delta < 1.0 && this.delta > 0.0) return false;
		else if(this.delta > 1.0) {
			this.delta = 1.0;
			return true;
		}
		else if(this.delta < 0.0) {
			this.delta = 0.0;
			return true;
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *
	 *	stop stepping
	 *
	 */
	this.stop = function() {
		_bBeginStpper = _bIn = _bOut = false;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param _seconds
	 *			length of fade in seconds
	 */
	this.setSeconds = function(_seconds) {
		this.setMillis( parseInt(_seconds * 1000.0) );
	};
	/**
	 *	@param _millis
	 *			length of fade in milliseconds
	 */
	this.setMillis = function(_millis) {
		_stepMillis = _millis;
		_stepMillis /= 1000;
	};

	/**
	 *	@param _val
	 *			to ease or not to ease...
	 *	@param __easing
	 *			(optional) degree of _easing
	 */
	// this.setEasing = function(_val, _easeing) {
	//	_bEase = _val;
	//	_easing = _easeing;
	// };

	// ------------------------------------------------------------------------
	/**
	 *	@param _val
	 *			set a value for the delta 0.0 - 1.0
	 */
	this.setDelta = function(_val) {
		this.delta = _val;
	};
};



/*
 *
 *	FStopwatch.js
 *
 *	A simple stopwatch
 *
 */


folio.FTime.FStopwatch = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/**
	 *	private
	 */
	var _now;
	var _then;
	var _timeInMs = 0;
	var _bStart = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	toggle (start/stop) the stopwatch
	 *
	 */
	this.toggle = function() {
		if (_bStart == 0) {
			this.start();
		}
		else {
			this.pause();
		}
	};

	/**
	 *
	 *	start the stopwatch
	 *
	 */
	this.start = function() {
		// start
		_bStart = 1;
		_then = new Date();
		_then.setTime(_then.getTime() - _timeInMs);
	};

	/**
	 *
	 *	pause the stopwatch
	 *
	 */
	this.pause = function() {
		// pause
		_bStart = 0;
		_now = new Date();
		_timeInMs = _now.getTime() - _then.getTime();
	};

	/**
	 *
	 *	reset the stopwatch
	 *
	 */
	this.reset = function() {
		_bStart = 0;
		_timeInMs = 0;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	set the stopwatch
	 *
	 *	@param ms
	 *			milliseconds to start the stopwatch with
	 *	@param run
	 *			whether the stopwatch should start or not
	 *
	 */
	this.set = function(ms, run) {
		_timeInMs = ms;
		(run == true) ? _bStart = 0 : _bStart = 1;

		_then = new Date();
		_then.setTime(_then.getTime() - _timeInMs);
		this.toggle();
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return the time elapsed
	 *
	 */
	this.get = function() {
		if (_bStart == 1)  {
			_now = new Date();
			_timeInMs = _now.getTime() - _then.getTime();
		}
		return _timeInMs;
	};

	/**
	 *
	 *	@return whether the stopwatch is running
	 *
	 */
	this.isRunning = function() {
		return (_bStart) ? true : false;
	};


	// return {

	// };

};



/*
 *
 *	FIO.js
 *
 *	A collection of I/O methods
 *
 */


folio.FIO = {
	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	Local Storage
	 */

	/**
	 *	save a value using HTML5 Local Storage
	 *	http://www.w3schools.com/html/html5_webstorage.asp
	 *
	 *	@param name
	 *				the name (key) of what we want to save
	 *	@param value
	 *				what we want to save
	 */
	saveLocal: function(name, value) {
		if(window.localStorage) {
			localStorage.setItem(name, String(value));
		}
		else {
			console.error('localStorage not supported');
		}
	},

	/**
	 *	retrieve saved value (default: as string)
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocal: function(name) {
		return localStorage.getItem(name);
	},

	/**
	 *	retrieve saved value as an int
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocalInt: function(name) {
		return parseInt( getLocal(name) );
	},

	/**
	 *	retrieve saved value as a float
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getLocalFloat: function(name) {
		return parseFloat( getLocal(name) );
	},

	/**
	 *	@return a list of all items saved in local storage
	 *
	 */
	getAllLocal: function() {
		return sessionStorage;

	},

	/**
	 *	delete a saved value from local storage
	 *
	 *	@param name
	 *				the name (key) of what we want to delete
	 *
	 */
	deleteLocal: function(name) {
		localStorage.removeItem(name);
	},



	/**
	 *	Session Storage
	 */

	/**
	 *	save a value using HTML5 Session Storage
	 *	http://www.w3schools.com/html/html5_webstorage.asp
	 *
	 *	@param name
	 *				the name (key) of what we want to save
	 *	@param value
	 *				what we want to save
	 */
	saveSession: function(name, value) {
		if(window.sessionStorage) {
			sessionStorage.setItem(name, String(value));
		}
		else {
			console.error('sessionStorage not supported');
		}
	},

	/**
	 *	retrieve saved value (default: as string)
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSession: function(name) {
		return sessionStorage.getItem(name);
	},

	/**
	 *	retrieve saved value as an int
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSessionInt: function(name) {
		return parseInt( getSession(name) );
	},

	/**
	 *	retrieve saved value as a float
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	getSessionFloat: function(name) {
		return parseFloat( getSession(name) );
	},

	/**
	 *	@return a list of all items saved in session storage
	 *
	 */
	getAllSession: function() {
		return sessionStorage;

	},

	/**
	 *	delete a saved value from session storage
	 *
	 *	@param name
	 *				the name (key) of what we want to delete
	 *
	 */
	deleteSession: function(name) {
		sessionStorage.removeItem(name);
	},



	/**
	 *	Cookies
	 *	http://www.quirksmode.org/js/cookies.html
	 */

	/**
	 *	save a value as a cookie
	 *
	 *	@param name
	 *				the name (key) of what we want to save
	 *	@param value
	 *				what we want to save
	 *	@param days
	 *				how many days do we want to save it for
	 */
	saveCookie: function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = '; expires=' + date.toGMTString();
		}
		else var expires = '';
		document.cookie = name + '=' + value + expires + '; path=/';
	},

	/**
	 *	retrieve a value from a cookie
	 *
	 *	@param name
	 *				the name (key) of what we want to retrieve
	 */
	openCookie: function(name) {
		var nameEQ = name + '=';
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	/**
	 *	delete a cookie
	 *
	 *	@param name
	 *				the name (key) of what we want to delete
	 */
	deleteCookie: function(name) {
		saveCookie(name, '', -1);
	},



	/**
	 *	Scriptographer specific
	 *
	 *	modified from Jürg Lehni
	 *	http://scriptographer.org/forum/help/save-array-data-to-external-file/
	 *
	 */

	/**
	 *	@param str
	 *				the String of information to save (JSON encoded)
	 *	@param fname
	 *				the name of the file to save to
	 */
	saveFile: function(str, fname) {
		var file = new File(script.file.parent, fname);
		if (file.exists()) file.remove();
		file.open();
		file.write( Json.encode(str) );
		file.close();
	},

	/**
	 *	@param fname
	 *				the name of the file to open
	 */
	openFile: function(fname) {
		var file = new File(script.file.parent, fname);
		file.open();
		var data = Json.decode( file.readAll() );
		file.close();

		return data;
	},

	/**
	 *	@param fname
	 *				the name of the file to delete
	 */
	deleteFile: function(fname) {
		var file = new File(script.file.parent, fname);
		// If file exists, we need to remove it first in order to overwrite its content.
		if (file.exists()) file.remove();
	},

	/**
	 *	@param fname
	 *				the name of the file to verify exists
	 */
	checkFile: function(fname) {
		var file = new File(script.file.parent, fname);
		if (file.exists()) return true;
		else return false
	}

};



/*
 *
 *	Matrix3D
 *
 *	forked from daijimachine's "Matrix3D(lib)"
 *	http://jsdo.it/daijimachine/matrix3d
 *
 *	@author Masayuki Daijima (ARCHETYP Inc.)
 *	http://www.daijima.jp/blog/
 *	http://twitter.com/daijimachine
 *
 *
 *	expanded and modified with inspiration from three.js
 *
 *	This library is free software; you can redistribute it and/or
 *	modify it under the terms of the GNU Lesser General Public
 *	License as published by the Free Software Foundation; either
 *	version 2.1 of the License, or (at your option) any later version.
 *
 *	http://creativecommons.org/licenses/LGPL/2.1/
 *
 *	This library is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 *	Lesser General Public License for more details.
 *
 *	You should have received a copy of the GNU Lesser General Public
 *	License along with this library; if not, write to the Free Software
 *	Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 */



/**
 *
 *	Matrix3D
 *
 */
var Matrix3D = function( n11, n12, n13, n14,
						 n21, n22, n23, n24,
						 n31, n32, n33, n34,
						 n41, n42, n43, n44 ) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	this.n11 = n11 || 1.0;	this.n12 = n12 || 0.0;	this.n13 = n13 || 0.0;	this.n14 = n14 || 0.0;
	this.n21 = n21 || 0.0;	this.n22 = n22 || 1.0;	this.n23 = n23 || 0.0;	this.n24 = n24 || 0.0;
	this.n31 = n31 || 0.0;	this.n32 = n32 || 0.0;	this.n33 = n33 || 1.0;	this.n34 = n34 || 0.0;
	this.n41 = n41 || 0.0;	this.n42 = n42 || 0.0;	this.n43 = n43 || 0.0;	this.n44 = n44 || 1.0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	this.clone = function() {
		return new Matrix3D( this.n11, this.n12, this.n13, this.n14,
							 this.n21, this.n22, this.n23, this.n24,
							 this.n31, this.n32, this.n33, this.n34,
							 this.n41, this.n42, this.n43, this.n44 );
	};

	// ------------------------------------------------------------------------
	this.concat = function(m) {
		var values = {};

		values.n11 = this.n11 * m.n11 + this.n12 * m.n21 + this.n13 * m.n31 + this.n14 * m.n41;
		values.n12 = this.n11 * m.n12 + this.n12 * m.n22 + this.n13 * m.n32 + this.n14 * m.n42;
		values.n13 = this.n11 * m.n13 + this.n12 * m.n23 + this.n13 * m.n33 + this.n14 * m.n43;
		values.n14 = this.n11 * m.n14 + this.n12 * m.n24 + this.n13 * m.n34 + this.n14 * m.n44;

		values.n21 = this.n21 * m.n11 + this.n22 * m.n21 + this.n23 * m.n31 + this.n24 * m.n41;
		values.n22 = this.n21 * m.n12 + this.n22 * m.n22 + this.n23 * m.n32 + this.n24 * m.n42;
		values.n23 = this.n21 * m.n13 + this.n22 * m.n23 + this.n23 * m.n33 + this.n24 * m.n43;
		values.n24 = this.n21 * m.n14 + this.n22 * m.n24 + this.n23 * m.n34 + this.n24 * m.n44;

		values.n31 = this.n31 * m.n11 + this.n32 * m.n21 + this.n33 * m.n31 + this.n34 * m.n41;
		values.n32 = this.n31 * m.n12 + this.n32 * m.n22 + this.n33 * m.n32 + this.n34 * m.n42;
		values.n33 = this.n31 * m.n13 + this.n32 * m.n23 + this.n33 * m.n33 + this.n34 * m.n43;
		values.n34 = this.n31 * m.n14 + this.n32 * m.n24 + this.n33 * m.n34 + this.n34 * m.n44;

		values.n41 = this.n41 * m.n11 + this.n42 * m.n21 + this.n43 * m.n31 + this.n44 * m.n41;
		values.n42 = this.n41 * m.n12 + this.n42 * m.n22 + this.n43 * m.n32 + this.n44 * m.n42;
		values.n43 = this.n41 * m.n13 + this.n42 * m.n23 + this.n43 * m.n33 + this.n44 * m.n43;
		values.n44 = this.n41 * m.n14 + this.n42 * m.n24 + this.n43 * m.n34 + this.n44 * m.n44;

		this.initialize(values);
	};

	// ------------------------------------------------------------------------
	this.initialize = function(values) {
		for(var i in values) this[i] = values[i];
	};

	// ------------------------------------------------------------------------
	this.createBox = function(	scalex, scaley, scalez,
								rotationx, rotationy, rotationz,
								tx, ty, tz ) {
		this.identity();
		if (rotationx != 0) this.rotateX( rotationx );
		if (rotationy != 0) this.rotateY( rotationy );
		if (rotationz != 0) this.rotateZ( rotationz );
		if (scalex != 1 || scaley != 1 || scalez != 1) this.scale( scalex, scaley, scalez );
		if (tx != 0 || ty != 0 || tz != 0) this.translate( tx, ty, tz );
	};


	// ------------------------------------------------------------------------
	this.identity = function() {
		this.initialize({ n11:1, n12:0, n13:0, n14:0,
						  n21:0, n22:1, n23:0, n24:0,
						  n31:0, n32:0, n33:1, n34:0,
						  n41:0, n42:0, n43:0, n44:1 });
	};


	// ------------------------------------------------------------------------
	/**
	 *
	 *	Rotation
	 *
	 */
	this.rotateX = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);

		this.concat(new Matrix3D(
			1, 0, 0, 0,
			0, cos, -sin, 0,
			0, sin, cos, 0,
			0, 0, 0, 1)
		);
	};

	this.rotateY = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);

		this.concat(new Matrix3D(
			cos, 0, sin, 0,
			0, 1, 0, 0,
			-sin, 0, cos, 0,
			0, 0, 0, 1)
		);
	};

	this.rotateZ = function(angle) {
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);

		this.concat(new Matrix3D(
			cos,  -sin, 0, 0,
			sin, cos, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1)
		);
	};

	/**
	 *
	 *	@param axis
	 *				FPoint3 xyz
	 *	@param angle
	 *				rotation angle in degrees
	 *
	 */
	this.setRotateAxis = function(axis, angle) {
		// Based on http://www.gamedev.net/reference/articles/article1199.asp

		var cos = Math.cos( angle );
		var sin = Math.sin( angle );

		var t = 1 - cos;

		var x = axis.x();
		var y = axis.y();
		var z = axis.z();

		var tx = t * x;
		var ty = t * y;

		this.concat(
			tx * x + cos,		tx * y - sin * z,	tx * z + sin * y,	0,
			tx * y + sin * z,	ty * y + cos,		ty * z - sin * x,	0,
			tx * z - sin * y,	ty * z + sin * x,	t * z * z + cos,	0,
			0, 0, 0, 1
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scaling
	 */
	this.scale = function(sx, sy, sz) {
		this.concat(new Matrix3D(
			sx, 0, 0, 0,
			0, sy, 0, 0,
			0, 0, sz, 0,
			0, 0, 0,  1)
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Translating
	 */
	this.translate = function(dx, dy, dz) {
		this.n41 += dx;
		this.n42 += dy;
		this.n43 += dz;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Transforming
	 */
	this.transformPoint = function(point) {
		return new Vertex3D(
			this.n11 * point.x + this.n21 * point.y + this.n31 * point.z + this.n41,
			this.n12 * point.x + this.n22 * point.y + this.n32 * point.z + this.n42,
			this.n13 * point.x + this.n23 * point.y + this.n33 * point.z + this.n43
		);
	};

	this.transformArray = function(arr) {
		var rVal=[];
		var numPoints=arr.length/3;

		for(var i=0; i<numPoints; i++) {
			var i3 = i*3;
			var x = arr[i3];
			var y = arr[i3+1];
			var z = arr[i3+2];

			rVal[i3]   = this.n11 * x + this.n21 * y + this.n31 * z + this.n41;
			rVal[i3+1] = this.n12 * x + this.n22 * y + this.n32 * z + this.n42;
			rVal[i3+2] = this.n13 * x + this.n23 * y + this.n33 * z + this.n43;
		}
		return rVal;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Position
	 */
	this.getPosition = function() {
		return [ this.n12, this.n13, this.n14 ];
	};

	/**
	 *
	 *	@param fpoint3
	 *				FPoint3 xyz
	 *
	 */
	this.setPosition = function(fpoint3) {
		this.n12 = fpoint3.x;
		this.n13 = fpoint3.y;
		this.n14 = fpoint3.z;
		return this;
	},

	/**
	 *
	 *	Frustrum
	 *	https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
	 *
	 */
	this.makeFrustum = function(left, right, bottom, top, near, far) {

		var values = {};

		var x = 2 * near / ( right - left );
		var y = 2 * near / ( top - bottom );

		var a = ( right + left ) / ( right - left );
		var b = ( top + bottom ) / ( top - bottom );
		var c = - ( far + near ) / ( far - near );
		var d = - 2 * far * near / ( far - near );

		values.n11 = x;	values.n12 = 0;	values.n13 = a;		values.n14 = 0;
		values.n21 = 0;	values.n22 = y;	values.n23 = b;		values.n24 = 0;
		values.n31 = 0;	values.n32 = 0;	values.n33 = c;		values.n34 = d;
		values.n41 = 0;	values.n42 = 0;	values.n43 = - 1;	values.n44 = 0;

		this.concat(values);
		// this.initialize(values);
	};

	/**
	 *
	 *	Presets modified from Three.js
	 *	https://github.com/mrdoob/three.js/blob/master/src/core/Matrix4.js
	 *
	 */
	// ------------------------------------------------------------------------
	this.makePerspective = function(fov, aspect, near, far) {
		var ymax = near * Math.tan( fov * Math.PI / 360 );
		var ymin = - ymax;
		var xmin = ymin * aspect;
		var xmax = ymax * aspect;

		this.makeFrustum( xmin, xmax, ymin, ymax, near, far );
	};

	// ------------------------------------------------------------------------
	this.makeOrtho = function(left, right, top, bottom, near, far) {

		var values = {};

		var w = right - left;
		var h = top - bottom;
		var p = far - near;

		var x = ( right + left ) / w;
		var y = ( top + bottom ) / h;
		var z = ( far + near ) / p;

		values.n11 = 2/w;	values.n12 = 0;		values.n13 = 0;		values.n14 = -x;
		values.n21 = 0;		values.n22 = 2/h;	values.n23 = 0;		values.n24 = -y;
		values.n31 = 0;		values.n32 = 0;		values.n33 = -2/p;	values.n34 = -z;
		values.n41 = 0;		values.n42 = 0;		values.n43 = 0;		values.n44 = 1;

		this.concat(values);
		// this.initialize(values);
	};


	// ------------------------------------------------------------------------
	this.toString = function() {
		return  this.n11 + ',' + this.n12 + ',' + this.n13 + ',' + this.n14 + ',' +
				this.n21 + ',' + this.n22 + ',' + this.n23 + ',' + this.n24 + ',' +
				this.n31 + ',' + this.n32 + ',' + this.n33 + ',' + this.n34 + ',' +
				this.n41 + ',' + this.n42 + ',' + this.n43 + ',' + this.n44;
	};
};










/*
 *
 *	F3D.js
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 *	code inspired by
 *	http://www.netmagazine.com/tutorials/build-your-own-html5-3d-engine
 *	https://github.com/mrdoob/three.js/
 *
 */


folio.F3D = {
	// ------------------------------------------------------------------------
	// Namespaces
	// ------------------------------------------------------------------------
	FScene3: {},

	FPoint3: {},
	FSize3: {},
	FPath3: function() {},


	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
};


/*
 *
 *	FPath3.js
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 */



folio.F3D.FPath3 = Path.extend(/** @lends Path# */{
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	_class: 'FPath3',
	_serializeFields: {
		segments: [],
		closed: false,

		// F3D
		scene: null,
		matrix: null,
		size: null,
		position3: null,
		fpoints3: [],
		rotation: null,
		translation: null
	},



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param scene
	 *				the scene to attach this path to
	 *
	 */
	initialize: function FPath3(scene) {
		this._closed = false;
		this._segments = [];

		this._scene = scene;
		this._matrix = new Matrix3D();
		this._size = new folio.F3D.FSize3();
		this._position3 = new folio.F3D.FPoint3();

		// setup 3D points array
		this._fpoints3 = [];

		// setup transformation
		this._rotation = new folio.F3D.FPoint3();
		this._translation = new folio.F3D.FPoint3();

		// set generic name
		this.name = 'FPath3';

		Path.call(this);

		this._initialize();
	},



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			scene to associate points with
	 */
	setScene: function(scene) {
		// the scene
		this._scene = scene;

		for(var i=0; i<this._fpoints3.length; i++) {
			this._fpoints3[i].setup( this._scene );
		}
	},

	/**
	 *	@param _fpoint3
	 *			add FPoint3 to path
	 */
	add3: function(fpoint3) {
		this._fpoints3[ this._fpoints3.length ] = fpoint3;
	},


	// setSegments: function(segments) {
	// }


	// ------------------------------------------------------------------------
	/**
	 *	@param arg0
	 *			FPoint3 for transformation
	 */
	/**
	 *	@param arg0
	 *			x point
	 *	@param arg1
	 *			y point
	 *	@param arg2
	 *			z point
	 */
	translate: function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this._translation.x = arg0;
			this._translation.y = arg1;
			this._translation.z = arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this._translation.x = arg0.x;
			this._translation.y = arg0.y;
			this._translation.z = arg0.z;
		}
		else {
			this._translation.x = (arg0 != undefined)
				? arg0
				: 0;
			this._translation.y = (arg1 != undefined)
				? arg1
				: 0;
			this._translation.z = (arg2 != undefined)
				? arg2
				: 0;
		}

		for(var i=0; i<this._fpoints3.length; i++) {
			var pt3 = this._fpoints3[i];
			pt3.setX( (pt3.x + this._translation.x) );
			pt3.setY( (pt3.y + this._translation.y) );
			pt3.setZ( (pt3.z + this._translation.z) );
		}
	},

	/**
	 *	@param val
	 *			degree value for x axis rotation
	 */
	rotateX:  function(val) {
		this._rotation.x = val;
	},

	/**
	 *	@param val
	 *			degree value for y axis rotation
	 */
	rotateY:  function(val) {
		this._rotation.y = val;
	},

	/**
	 *	@param val
	 *			degree value for z axis rotation
	 */
	rotateZ:  function(val) {
		this._rotation.z = val;
	},



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	get: function() {
		// clear segments
		this._segments = [];

		// push points into 2D path
		for(var i=0; i<this._fpoints3.length; i++) {
			var pt3 = this._fpoints3[i];
			this.add(
				new Point( pt3.x2D(), pt3.y2D() )
			);
		}
		return this;
	},


// }, new function() { // Scope for drawing

//	return {
//		_draw: function(ctx, param) {
//		},
//	};

// }, {

// statics: {

// }

});

/*
 *
 *	FPath3Constuctors.js
 *
 *	A collection of primitive 3D shapes for folio.F3D.FPath3
 *
 *	FBox
 *	FSphere
 *
 */



folio.F3D.FPath3.inject({

	//-----------------------------------------------------------------------------
	statics: new function() {
		return {

			/**
			 *
			 *	FBox
			 *	Create simple box
			 *
			 *	@param {folio.F3D.FScene3D} scene
			 *				the scene to attach the Box to
			 *	@param {folio.F3D.FPoint3} fpoint3
			 *	      		the position of the Box
			 *	@param {folio.F3D.FSize3} fsize3
			 *				the size of the Box
			 *
			 */
			FBox: function(scene, fpoint3, fsize3) {
				this._position3 = (fpoint3 != undefined)
					? fpoint3
					: new folio.F3D.FPoint3( 0,0,0 );

				this._size = (fsize3 != undefined)
					? fsize3
					: new folio.F3D.FSize3( 10,10,10 );

				var sides = new Array(6);
				var faceFRONT = [
					new folio.F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
				],
					faceTOP = [
					new folio.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5, -0.5, -0.5)	// corner
				],
					faceBOTTOM = [
					new folio.F3D.FPoint3(-0.5, 0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, 0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, 0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5, 0.5, -0.5)	// corner
				],
					faceLEFT = [
					new folio.F3D.FPoint3(-0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5, -0.5)	// corner
				],
					faceRIGHT = [
					new folio.F3D.FPoint3( 0.5, -0.5, -0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5, -0.5)	// corner
				],
					faceBACK = [
					new folio.F3D.FPoint3(-0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5, -0.5,	0.5),	// corner
					new folio.F3D.FPoint3( 0.5,	0.5,	0.5),	// corner
					new folio.F3D.FPoint3(-0.5,	0.5,	0.5)	// corner
				];

				var faces = [
					['front',	faceFRONT],
					['top',		faceTOP],
					['bottom',	faceBOTTOM],
					['left',	faceLEFT],
					['right',	faceRIGHT],
					['back',	faceBACK]
				];

				var vertices = [];
				for(var i=0; i<faces.length; i++) {
					sides[i] = new folio.F3D.FPath3();
					// sides[i].name = faces[i][0];
					sides[i].name = 'Z-TOP'; // hack until FScene3D is fixed

					vertices = faces[i][1];
					for(var j=0; j<vertices.length; j++) {
						sides[i].add3( new folio.F3D.FPoint3(
							vertices[j].x * this._size.width,
							vertices[j].y * this._size.height,
							vertices[j].z * this._size.depth
						));
					}

					// sides[i].fillColor = new Color( 0.0, 1.0, 0.7, 0.8 );
					sides[i].closed = true;
					sides[i].translate( fpoint3 );

					scene.addItem( sides[i] );
				}

				return new Group(sides);
			},

			/**
			 *
			 *	FSphere
			 *	Create simple sphere
			 *
			 *	@param {folio.F3D.FScene3D} scene
			 *				the scene to attach the Sphere to
			 *	@param {folio.F3D.FPoint3} fpoint3
			 *	      		the position of the Sphere
			 *	@param {folio.F3D.FSize3} radius
			 *				the radius of the Sphere
			 *	@param {Array} detail (optional)
			 *				the longitude and latitude detail
			 *				default: [6,6]
			 *				*** anything over [21,21] and you should probably be using Three.js ***
			 *
			 */
			FSphere: function(scene, fpoint3, radius, detail) {
				this._position3 = (fpoint3 != undefined)
					? fpoint3
					: new folio.F3D.FPoint3( 0,0,0 );

				this._size = (radius != undefined)
					? new folio.F3D.FSize3( radius, radius, radius )
					: new folio.F3D.FSize3( 10,10,10 );

				var _c = 0.5;

				var latlon;
				if (detail != undefined) {
					if (detail instanceof Array) {
						latlon = detail;
					}
					else {
						latlon = [detail, detail];
					}
				}
				else {
					latlon = [6,6];
				}


				var vertices = [];
				for(var i=0; i<=latlon[0]; i++) {
					var lat0 = (Math.PI * (-_c + ( (i-1)/latlon[0]) ));
					var z0   = Math.sin(lat0);
					var zr0  = Math.cos(lat0);

					var lat1 = (Math.PI * (-_c + ( i/latlon[0]) ));
					var z1   = Math.sin(lat1);
					var zr1  = Math.cos(lat1);

					for(var j=0; j<=latlon[1]; j++) {
						var lng = ((Math.PI*2) * ( (j-1)/latlon[1] ));
						var x = Math.cos(lng);
						var y = Math.sin(lng);

						vertices.push( new folio.F3D.FPoint3( x*zr0, y*zr0, z0 ) );
						vertices.push( new folio.F3D.FPoint3( x*zr1, y*zr1, z1 ) );
					} // _longs
				} // _lats
				var sides = new Array(vertices.length-2);

				for(var i=0; i<vertices.length-2; i++) {
					sides[i] = new folio.F3D.FPath3();
					sides[i].name = 'face'+i;

					sides[i].add3( new folio.F3D.FPoint3(
						vertices[i].x*(this._size.width*0.5),
						vertices[i].y*(this._size.height*0.5),
						vertices[i].z*(this._size.depth*0.5)
					));
					sides[i].add3( new folio.F3D.FPoint3(
						vertices[i+1].x*(this._size.width*0.5),
						vertices[i+1].y*(this._size.height*0.5),
						vertices[i+1].z*(this._size.depth*0.5)
					));
					sides[i].add3( new folio.F3D.FPoint3(
						vertices[i+2].x*(this._size.width*0.5),
						vertices[i+2].y*(this._size.height*0.5),
						vertices[i+2].z*(this._size.depth*0.5)
					));

					// sides[i].fillColor = new Color( 0.0, 1.0, 0.7, 0.8 );
					sides[i].closed = true;
					sides[i].translate( fpoint3 );

					scene.addItem( sides[i] );
				}

				return new Group(sides);
			}


		}; // end return

	} // end statics:
});


/*
 *
 *	FPoint3.js
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 *	@param arg0
 *			x coordinate
 *	@param arg1
 *			y coordinate
 *	@param arg2
 *			z coordinate
 */
folio.F3D.FPoint3 = this.FPoint3 = function(arg0, arg1, arg2) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/**
	 *	private
	 */
	var _scene = null;

	var _xIndex = 0;
	var _yIndex = 0;
	var _zIndex = 0;

	var _xIndex2D = 0;
	var _yIndex2D = 0;


	/**
	 *	public
	 */
	this.x = arg0 != undefined ? arg0 : 0;
	this.y = arg1 != undefined ? arg1 : 0;
	this.z = arg2 != undefined ? arg2 : 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	@param scene
	 *			the scene with which the points are
	 *			associated with
	 */
	this.setup = function(scene) {
		// setup scene
		_scene = scene;

		var index = _scene.setupPoint(this.x, this.y, this.z);
		var i3 = index*3;
		var i2 = index*2;

		// 3D indicies
		_xIndex = i3;
		_yIndex = i3+1;
		_zIndex = i3+2;

		// 2D indicies
		_xIndex2D = i2;
		_yIndex2D = i2+1;
	};


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return random point
	 *
	 */
	/**
	 *	@param minx
	 *				minmum x (default: 0)
	 *	@param maxx
	 *				maximum x (default: view.bounds.width)
	 *	@param miny
	 *				minmum y (default: 0)
	 *	@param maxy
	 *				maximum y (default: view.bounds.height)
	 *	@param minz
	 *				minmum z (default: 0)
	 *	@param maxz
	 *				maximum z (default: 1000)
	 *
	 *	@return random point
	 *
	 */
	this.random = function(minx, maxx, miny, maxy, minz, maxz) {
		minx = (minx != undefined) ? minx : 0;
		maxx = (maxx != undefined) ? maxx : view.bounds.width;
		miny = (miny != undefined) ? miny : 0;
		maxy = (maxy != undefined) ? maxy : view.bounds.height;
		minz = (minz != undefined) ? miny : 0;
		maxz = (maxz != undefined) ? maxy : 1000;

		this.x = paper.random(minx, maxx);
		this.y = paper.random(miny, maxy);
		this.z = paper.random(minz, maxz);

		return new folio.F3D.FPoint3(this.x, this.y, this.z);
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param val
	 *			set x value
	 */
	this.setX = function(val) {
		if( _scene != null ) _scene.points3D[_xIndex] = val;
		this.x = val;
	};

	/**
	 *
	 *	@param val
	 *			set y value
	 */
	this.setY = function(val) {
		if( _scene != null ) _scene.points3D[_yIndex] = val;
		this.y = val;
	};

	/**
	 *
	 *	@param val
	 *			set z value
	 */
	this.setZ = function(val) {
		if( _scene != null ) _scene.points3D[_zIndex] = val;
		this.z = val;
	};

	// ------------------------------------------------------------------------
	this.set = function(arg0, arg1, arg2) {
		this.setX(arg0);
		this.setY(arg1);
		this.setZ(arg2);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	@return a copy of this point
	 */
	this.get = function() {
		return new folio.F3D.FPoint3(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@return projected 2D x
	 */
	this.x2D = function() {
		return _scene.points2D[_xIndex2D];
	};

	/**
	 *	@return projected 2D y
	 */
	this.y2D = function() {
		return _scene.points2D[_yIndex2D];
	};

	// ------------------------------------------------------------------------
	this.getSceneIndex = function() {
		return _sceneIndex;
	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the magnitude (length) of the point
	 *
	 *	@return the magnitude of the point
	 */
	this.mag = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Add a point to this point
	 *
	 *	@param arg0
	 *			the FPoint3 to be added
	 */
	/**
	 *	Add a point to this point
	 *
	 *	@param arg0
	 *			the x point to be added
	 *	@param arg1
	 *			the y point to be added
	 *	@param arg2
	 *			the z point to be added
	 */
	this.add = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x += arg0;
			this.y += arg1;
			this.z += arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x += arg0.x();
			this.y += arg0.y();
			this.z += arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Subtract a point to this point
	 *
	 *	@param arg0
	 *			the FPoint3 to be subtracted
	 */
	/**
	 *	Subtract a point to this point
	 *
	 *	@param arg0
	 *			the x point to be subtracted
	 *	@param arg1
	 *			the y point to be subtracted
	 *	@param arg2
	 *			the z point to be subtracted
	 */
	this.sub = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x -= arg0;
			this.y -= arg1;
			this.z -= arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x -= arg0.x();
			this.y -= arg0.y();
			this.z -= arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Scale this point by a scalar
	 *
	 *	@param n
	 *			the value to scale by
	 */
	this.scale = function(n) {
		this.x *= n;
		this.y *= n;
		this.z *= n;
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the FPoint3 to be multiplied
	 */
	/**
	 *	Multiply each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the x point to be multiplied
	 *	@param arg1
	 *			the y point to be multiplied
	 *	@param arg2
	 *			the z point to be multiplied
	 */
	this.mult = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x *= arg0;
			this.y *= arg1;
			this.z *= arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x *= arg0.x();
			this.y *= arg0.y();
			this.z *= arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the FPoint3 to be divided
	 */
	/**
	 *	Divide each element of one point by the elements of another point.
	 *
	 *	@param arg0
	 *			the x point to be divided
	 *	@param arg1
	 *			the y point to be divided
	 *	@param arg2
	 *			the z point to be divided
	 */
	this.div = function(arg0, arg1, arg2) {
		if(typeof arg0 == 'number') {
			this.x /= arg0;
			this.y /= arg1;
			this.z /= arg2;
		}
		else if(typeof arg0 == 'object') { // FPoint3
			this.x /= arg0.x();
			this.y /= arg0.y();
			this.z /= arg0.z();
		}
		this.set(this.x, this.y, this.z);
	};


	// ------------------------------------------------------------------------
	/**
	 *	Calculate the Euclidean distance between two points (considering a point as a vector object)
	 *
	 *	@param _fpoint3
	 *			another point
	 *
	 *	@return the Euclidean distance between
	 */
	this.getDistance = function(_fpoint3) {
		var dx = this.x - _fpoint3.x();
		var dy = this.y - _fpoint3.y();
		var dz = this.z - _fpoint3.z();
		return Math.sqrt(dx*dx + dy*dy + dz*dz);
	};


	// ------------------------------------------------------------------------
	/**
	 * Calculate the angle between two points, using the dot product
	 *
	 * @param _fpoint3a
	 *				a point
	 * @param _fpoint3b
	 *				another point
	 *
	 * @return the angle between the points
	 */
	this.angleBetween = function(_fpoint3a, _fpoint3b) {
		var dot = _fpoint3a.x() * _fpoint3b.x() + _fpoint3a.y() * _fpoint3b.y() + _fpoint3a.z() * _fpoint3b.z();
		var _f1mag = Math.sqrt(_fpoint3a.x() * _fpoint3a.x() + _fpoint3a.y() * _fpoint3a.y() + _fpoint3a.z() * _fpoint3a.z());
		var _f2mag = Math.sqrt(_fpoint3b.x() * _fpoint3b.x() + _fpoint3b.y() * _fpoint3b.y() + _fpoint3b.z() * _fpoint3b.z());
		return Math.acos(dot / (_f1mag * _f2mag));
	};


	// ------------------------------------------------------------------------
	/**
  	 *	Normalize the point to length 1 (make it a unit point)
	 */
	this.normalize = function() {
	    var m = this.mag();
	    if (m != 0 && m != 1) {
   	  this.div(m);
	    }
	};


	// ------------------------------------------------------------------------
	this.toString = function() {
		return '[ ' + this.x + ', ' + this.y + ', ' + this.z + ' ]';
	};


	// ------------------------------------------------------------------------
	/**
	 *	Return a representation of this point as an array.
	 */
	this.array = function() {
		return [this.x, this.y, this.z];
	};

};



/*
 *
 *	FScene3.js
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 *
 *	TODO:	leave as is and accept or redo entire engine
 *			possibly look into using three.js as the engine
 *
 */
folio.F3D.FScene3D = this.FScene3D = function() {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	/**
	 *	private
	 */
	var _mode = 'PERSPECTIVE'; // default
	var _matrix = null;

	var _half = new folio.F3D.FSize3(0,0,0);

	// transfomrations
	var _sceneScale = 1;
	var _rotation = new folio.F3D.FPoint3(0,0,0);

	// items
	var _numPoints = 0;
	var _fpath3Arr = null;
	var _groupBot = null;
	var _groupTop = null;

	/**
	 *	public
	 */
	this.bounds = new folio.F3D.FSize3(0,0,0);

	this.points3D = [];
	this.points2D = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	/**
	 *	matrix for isometric projection
	 *
	 *	TODO: figure out why this has to be
	 *	configured like this?
	 */
	this._ortho = function() {
		_matrix.makeOrtho(
			-_half.height,	// left
			_half.height,	// right
			_half.height,	// top
			-_half.height,	// bottom
			-_half.height,	// near
			_half.height	// far
		);
	};

	/**
	 *	_perspective( for perspective projection
	 */
	this._perspective = function() {
		_matrix.makePerspective(
			50,		// fov
			0.5 * this.bounds.width/this.bounds.height,	// aspect
			_half.depth,		// near
			this.bounds.depth*2	// far
		);
	};


	// ------------------------------------------------------------------------
	/**
	 *	@param width
	 *				width of scene
	 *				default: view.bounds.width
	 *	@param height
	 *				height of scene
	 *				default: view.bounds.height
	 *	@param focalLength
	 *				focal length of scene
	 *				default: 1000
	 *	@param mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 *
	 */
	this.setup = function(width, height, focalLength, mode) {
		// setup point arrays
		this.points3D = [];
		this.points2D = [];

		// setup items array
		_fpath3Arr = [];

		// setup matrix
		_matrix = new Matrix3D();

		// setup world
		this.bounds.width  = width || paper.view.bounds.width;
		this.bounds.height = height || paper.view.bounds.height;
		this.bounds.depth = focalLength || 1000;

		_half.width = this.bounds.width*0.5;
		_half.height = this.bounds.height*0.5;
		_half.depth = this.bounds.depth*0.5;

		// set mode
		this.setMode(mode);

		// setup up group for items
		_groupBot = new Group();
		_groupTop = new Group();
	};

	// ------------------------------------------------------------------------
	/**
	 *	draws FPath3 objects
	 *
	 *	@return group of FPath3 objects
	 *
	 */
	this.draw = function() {
		// transformation matrix
		_matrix.identity();

		// set perspective mode
		if(_mode == 'ORTHO') this._ortho();
		else this._perspective();

		// implement transformations
		_matrix.scale(_sceneScale, _sceneScale, _sceneScale);
		_matrix.rotateX( _rotation.x );
		_matrix.rotateY( _rotation.y );
		_matrix.rotateZ( _rotation.z );
		_matrix.translate(0, 0, this.bounds.depth);

		// transformed points
		var transformed = _matrix.transformArray(this.points3D);

		// cycle through transformed 3D points
		// pull out screen 2D points
		for(var i=0; i<_numPoints; i++) {
			var i3 = i*3;
			var i2 = i*2;

			var x = transformed[ i3 ];
			var y = transformed[ i3+1 ];
			var z = transformed[ i3+2 ];

			var scale = this.bounds.depth/(z+this.bounds.depth);

			this.points2D[ i2 ]   = x*scale+_half.width;
			this.points2D[ i2+1 ] = y*scale+_half.height;
		}

		// determine depth order of items
		// very crude and rudimentary
		var tindex = 0;
		var depthArr = []; // temp array to correlate transformed points to items
		for(var i=0; i<_fpath3Arr.length; i++) {
			var fpath3 = _fpath3Arr[i];

			var avgz = this.averageZ(
				transformed,
				tindex,
				tindex+(fpath3._fpoints3.length*3)
			);

			var temp = {
				index: i,
				z: avgz
			};
			depthArr.push(temp);

			tindex += (fpath3._fpoints3.length*3)-1;
		}
		depthArr.sort(compare);

		// put the object into the group based on their z depth
		_groupBot.removeChildren(); // clear out in between draws
		_groupTop.removeChildren(); // clear out in between draws
		for(var i=0; i<depthArr.length; i++) {
			var path = _fpath3Arr[ depthArr[i].index ].get();

			if(path.name == 'Z-TOP') _groupTop.appendTop( path );
			else if(path.name == 'Z-BOTTOM') _groupBot.appendTop( path );
			else if(path != null) _groupBot.appendTop( path );
		}

		// TODO: fix this scaling issue
		if(_mode == 'ORTHO') {
			_groupTop.scale(200, _groupBot.position);
			_groupBot.scale(200, _groupBot.position);
		}

		return new Group( _groupBot,_groupTop );
	};


	// ------------------------------------------------------------------------
	/**
	 *	@param arg0
	 *				x coordinate
	 *	@param arg1
	 *				y coordinate
	 *	@param arg2
	 *				z coordinate
	 *
	 *	@return total number of points added to scene
	 *
	 */
	this.setupPoint = function(arg0, arg1, arg2) {
		var returnVal = _numPoints;

		this.points2D[ this.points2D.length ] = 0;
		this.points2D[ this.points2D.length ] = 0;

		this.points3D[ this.points3D.length ] = arg0;
		this.points3D[ this.points3D.length ] = arg1;
		this.points3D[ this.points3D.length ] = arg2;

		_numPoints++;

		return returnVal;
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param pointsArr
	 *				the array of points x[0], y[1], z[2]
	 *	@param start
	 *				start position in array
	 *	@param stop
	 *				stop position in array
	 *
	 *	@return average value of z
	 *
	 */
	this.averageZ = function(pointsArr, start, stop) {
		var avgz = 0;
		for(var i=start; i<stop; i+=2) {
		//	// console.log( 'x\t' + pointsArr[i] );
		//	// console.log( 'y\t' + pointsArr[i+1] );
		//	// console.log( 'z\t' + pointsArr[i+2] );
			avgz += parseInt( pointsArr[i+2] );
		}
		var num = (stop-start)/3;
		return avgz/num;
	};

	/**
	 *
	 *	comparator to sort object by z value
	 *
	 */
	function compare(a,b) {
		if (a.z < b.z) return -1;
		if (a.z > b.z) return 1;
		return 0;
	};



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *	@param mode
	 *				'PERSPECTIVE' objects scale to perspective
	 *				'ORTHO' objects do not scale (isometric)
	 */
	this.setMode = function(mode) {
		_mode = mode != undefined ? mode : 'PERSPECTIVE';
	};

	/**
	 *	@param item
	 *			an FPath3 item to add to the scene
	 */
	/**
	 *	@param item
	 *			an array of FPath3 items to add to the scene
	 */
	this.addItem = function(item) {
		if(item.length > 0) {
			for(var i=0; i<item.length; i++) {
				_fpath3Arr[ _fpath3Arr.length ] = item[i];
				item[i].setScene(this);
			}
		}
		else {
			_fpath3Arr[ _fpath3Arr.length ] = item;
			item.setScene(this);
		}
	};

	// ------------------------------------------------------------------------
	/**
	 *	@param val
	 *			degree value for x axis rotation
	 */
	this.rotateX = function(val) {
		_rotation.setX(val);
	};

	/**
	 *	@param val
	 *			degree value for y axis rotation
	 */
	this.rotateY = function(val) {
		_rotation.setY(val);
	};

	/**
	 *	@param val
	 *			degree value for z axis rotation
	 */
	this.rotateZ = function(val) {
		_rotation.setZ(val);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return scene path items as _groupBot
	 *
	 */
	this.get = function() {
		return _groupBot;
	};

	/**
	 *
	 *	@return scene size as array [width, height, depth]
	 *
	 */
	this.getBounds = function() {
		return [ this.bounds.width, this.bounds.height, this.bounds.depth ];
	};

	/**
	 *
	 *	@return scene transformation _matrix
	 *
	 */
	this.getMatrix = function() {
		return _matrix;
	};

	/**
	 *
	 *	@return scene focal length (depth)
	 *
	 */
	this.getFocalLength = function() {
		return this.bounds.depth;
	};

	/**
	 *
	 *	@return scene scale
	 *
	 */
	this.getScale = function() {
		return _sceneScale;
	};


};



/*
 *
 *	FSize3.js
 *
 *	A barebones collection of classes for primitive 3D rendering
 *
 */



/**
 *	TODO: finish this
 *
 *	@param arg0
 *			width
 *	@param arg1
 *			height
 *	@param arg2
 *			depth
 */
folio.F3D.FSize3 = this.FSize3 = function(arg0, arg1, arg2) {
	/**
	 *	public
	 */
	this.width = arg0 != undefined ? arg0 : 0;
	this.height = arg1 != undefined ? arg1 : 0;
	this.depth = arg2 != undefined ? arg2 : 0;



	// ------------------------------------------------------------------------
	// Sets
	// ------------------------------------------------------------------------
	/**
	 *
	 *	@param val
	 *			set width value
	 */
	this.setWidth = function(val) {
		this.width = val;
	};

	/**
	 *
	 *	@param val
	 *			set height value
	 */
	this.setHeight = function(val) {
		this.height = val;
	};

	/**
	 *
	 *	@param val
	 *			set depth value
	 */
	this.setDepth = function(val) {
		this.depth = val;
	};

	// ------------------------------------------------------------------------
	this.set = function(arg0, arg1, arg2) {
		this.setWidth(arg0);
		this.setHeight(arg1);
		this.setDepth(arg2);
	};



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	/**
	 *	Get a copy of this size
	 */
	this.get = function() {
		return new folio.F3D.FSize3(this.width, this.height, this.depth);
	};


	// ------------------------------------------------------------------------
	/**
	 *
	 *	@return random size
	 *
	 */
	/**
	 *	@param minw
	 *				minmum width (default: 0)
	 *	@param maxw
	 *				maximum width (default: view.bounds.width)
	 *	@param minh
	 *				minmum height (default: 0)
	 *	@param maxh
	 *				maximum height (default: view.bounds.height)
	 *	@param mind
	 *				minmum depth (default: 0)
	 *	@param maxd
	 *				maximum depth (default: 1000)
	 *
	 *	@return random size
	 *
	 */
	this.random = function(minw, maxw, minh, maxh, mind, maxd) {
		minw = (minw != undefined) ? minw : 0;
		maxw = (maxw != undefined) ? maxw : view.bounds.width;
		minh = (minh != undefined) ? minh : 0;
		maxh = (maxh != undefined) ? maxh : view.bounds.height;
		mind = (mind != undefined) ? mind : 0;
		maxd = (maxd != undefined) ? maxd : 1000;

		this.width = paper.random(minw, maxw);
		this.height = paper.random(minh, maxh);
		this.depth = paper.random(mind, maxd);
		return this;
	};

	/**
	 *
	 *	@return volume
	 *
	 */
	this.volume = function() {
		return (this.width * this.height * this.depth);
	};


};



/*
 *	Circle Packer
 *
 *	Original from onedayitwillmake
 *	http://onedayitwillmake.com/CirclePackJS/
 *
 *	MIT License
 *	http://www.opensource.org/licenses/mit-license.php
 *
 *
 *	Rewritten from AS3 to Javascript
 *	Jackson Rollins
 *	http://jacksonkr.com/
 *
 *
 *	Rewritten for Scriptographer/PaperJS
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */

/**
 *
 *	@param {Array} circleItems
 *					Array of Items
 *	@param {Number} iterations
 *					(optional) number of iterations per cycle (default: 11)
 *
 */
folio.FCirclePacker = function(circleItems, iterations) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	circleItems = circleItems;
	iterations = (iterations != undefined)
		? iterations
		: 11;

	var dampingAmt = 0.1; // the lower the slower
	var padding = 0;



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	var update = function() {
		circleItems = circleItems.sort( folio.distanceToCenter );
		var pp = new Point();

		// Push items away from each other
		for (var i = circleItems.length - 1; i >= 0; --i) {
			var ci = circleItems[i];
			var ciPt = ci.position;

			for (var j = i + 1; j < circleItems.length; j++) {
				var cj = circleItems[j];
				var cjPt = cj.position;

				if (i == j) continue;

				var dx = cjPt.x - ciPt.x;
				var dy = cjPt.y - ciPt.y;

				// this alogroithm is designed for circles,
				// so we assume every object is either a
				// circle or a square polygon packing is a much
				// larger challenge http://en.wikipedia.org/wiki/Packing_problem
				// hence why we just halve the "width" in
				// order to get the object's radius
				var r = (ci.bounds.size.width / 2) + (cj.bounds.size.width / 2) + padding;

				var d = (dx * dx) + (dy * dy);

				if (d < (r * r) - 0.01) {
					pp.x = dx;
					pp.y = dy;
					pp = pp.normalize(1.0);
					pp = pp.multiply( (r - Math.sqrt(d)) * 0.5 );

					try {
						// if(cj != this.dragCircle) {
						cjPt.x += pp.x;
						cjPt.y += pp.y;
						// }
						// if(ci != this.dragCircle) {
						ciPt.x -= pp.x;
						ciPt.y -= pp.y;
						// }
					}
					catch(err) {
						// not a valid item, get rid of it
						circleItems.slice(j, 1);
						break;
					}

				}
			}
		}

		// push items toward center
		var damping = dampingAmt / Number(iterations);

		for (var i = 0; i < circleItems.length; i++) {
			var c = circleItems[i];
			var cPt = c.position
			// if(c == this.dragCircle) continue;
			pp.x = cPt.x - artboard.bounds.center.x;
			pp.y = cPt.y - artboard.bounds.center.y;
			pp = pp.multiply(damping);
			cPt.x -= pp.x;
			cPt.y -= pp.y;
		}

		// if(this.dragCircle && this._mouseEvent) {
		//	this.dragCircle.x = this._mouseEvent.offsetX;//stage.mouseX;
		//	this.dragCircle.y = this._mouseEvent.offsetY;//stage.mouseY;
		// }
	};

	// ------------------------------------------------------------------------
	/**
	 *	TODO: if to be made autonomous, these
	 *	methods will have to be built in
	 *
	 *	Extend Path with some additional Methods
	 *	Necessary for CirclePacker()
	 *
	 */
	// Item.prototype.distanceToCenter = function() {
	//	var dx = this.position.x - activeDocument.activeArtboard.bounds.center.x;
	//	var dy = this.position.y - activeDocument.activeArtboard.bounds.center.y;
	//	var distance = (dx * dx + dy * dy) + 1;

	//	return distance;
	// };
	// Item.sortOnDistanceToCenter = function(a, b) {
	//	var valueA = a.distanceToCenter();
	//	var valueB = b.distanceToCenter();
	//	var comparisonValue = 0;

	//	if (valueA > valueB) comparisonValue = -1;
	//	else if (valueA < valueB) comparisonValue = 1;

	//	return comparisonValue;
	// };



	// ------------------------------------------------------------------------
	// sets
	// ------------------------------------------------------------------------
	/**
	 *	@param {Array} item
	 *			Array of Path.Items to add to circle packer
	 */
	/**
	 *	@param {Item} item
	 *			Path.Item to add to circle packer
	 */
	var add = function(item) {
		if( typeof item === 'array' ) {
			circleItems = circleItems.concat( item );
		}
		else {
			circleItems.push( item );
		}
	};

	/**
	 *	@param {Number} val
	 *			damping value
	 */
	var setDamping = function(val) {
		dampingAmt = val;
	};

	/**
	 *	@param {Number} val
	 *			padding around elements
	 */
	var setPadding = function(val) {
		padding = val;
	};


	// ------------------------------------------------------------------------
	// gets
	// ------------------------------------------------------------------------
	/**
	 *	could be dangerous
	 *
	 *	@return the Array of items being packed
	 */
	var getItems = function() {
		return circleItems;
	};

	/**
	 *	could be dangerous
	 *
	 *	@return an Item from the Array of items being packed
	 */
	var getItem = function(index) {
		return circleItems[index];
	};



	// ------------------------------------------------------------------------
	// gets
	// ------------------------------------------------------------------------
	return {
		update:		update,

		add:		add,
		setDamping:	setDamping,
		setPadding:	setPadding,

		getItems:	getItems,
		getItem:	getItem
	};

};
/*
 *	Travelling Salesman Problem Algorithm
 *
 *	Taken from "SVG Stipple Generator, v 1.0"
 *	Copyright (C) 2012 by Windell H. Oskay
 *
 *	http://www.evilmadscientist.com
 *	http://www.evilmadscientist.com/go/stipple
 *
 *
 *	Modified/Simplified for Paper.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */

/**
 *	@param  {PathItem} items
 *	       	an array of PathItems
 *	@param  {Number} iterations (optional)
 *	       	tests per frame (higher = better) default: 1000
 *
 *	@return {Array} an array of indices for the route through the input items
 *
 */
folio.FRoute = function(items, iterations) {
	// ------------------------------------------------------------------------
	// Properties
	// ------------------------------------------------------------------------
	var items = items;
	var iterations = (iterations != undefined)
		? iterations
		: 1000;

	var RouteStep = 0;
	var RouteNodes = [];



	// ------------------------------------------------------------------------
	// Methods
	// ------------------------------------------------------------------------
	function calculate() {
		var temp;
		var p1;

		if(RouteStep == 0) {
			//	Begin process of optimizing plotting route,
			//	by flagging nodes that will be shown.
			//	console.log("Optimizing plotting path");
			var RouteNodesLength = 0;
			var RouteNodesTemp = new Array(items.length);

			for(var i=0; i<items.length; ++i) {

				RouteNodesTemp[i] = false;
				var px = items[i].position.x;
				var py = items[i].position.y;

				if( (px >= view.bounds.width) || (py >= view.bounds.height) ||
					(px < 0) || (py < 0)) {
					continue;
				}
				else {
					RouteNodesTemp[i] = true;
					RouteNodesLength++;
				}
			}

			// These are the ONLY points to be drawn in the tour.
			RouteNodes = new Array(RouteNodesLength);
			var tempCounter = 0;
			for(var i=0; i<items.length; ++i) {
				if(RouteNodesTemp[i]) {
					RouteNodes[tempCounter] = i;
					tempCounter++;
				}
			}
		}

		var nodesNum = RouteNodes.length - 1;
		if(RouteStep < (RouteNodes.length - 2))  {
			//	console.log('Nearest neighbor ("Simple, Greedy") algorithm path optimization:');
			//	1000 steps per frame displayed; you can edit this number!
			var StopPoint = RouteStep + 1000;

			if(StopPoint > nodesNum)
				StopPoint = nodesNum;

			for(var i=RouteStep; i<StopPoint; ++i) {
				p1 = items[RouteNodes[RouteStep]].position;
				var ClosestNode = 0;
				var distMin = Number.MAX_VALUE;

				for(var j=RouteStep+1; j<nodesNum; ++j) {
					var p2 = items[ RouteNodes[j] ].position;

					var dx = p1.x - p2.x;
					var dy = p1.y - p2.y;
					var distance = (dx*dx+dy*dy);	// Only looking for closest; do not need sqrt factor!

					if(distance < distMin) {
						ClosestNode = j;
						distMin = distance;
					}
				}

				temp = RouteNodes[RouteStep + 1];
				//p1 = items[RouteNodes[RouteStep + 1]];
				RouteNodes[RouteStep + 1] = RouteNodes[ClosestNode];
				RouteNodes[ClosestNode] = temp;

				if(RouteStep < (nodesNum)) {
					RouteStep++;
				}
				else {
					console.log("Now optimizing plot path" );
				}
			}

		}
		//else {
			// Initial routing is complete
			// console.log('2-opt heuristic optimization');
			// Identify a pair of edges that would become shorter by reversing part of the tour.

			// var groupPath = new Group();
			for(var i=0; i<iterations; ++i) {

				var indexA = Math.floor( Math.random()*nodesNum );
				var indexB = Math.floor( Math.random()*nodesNum );

				// console.log('indexA', indexA);
				// console.log('indexB', indexB);

				if(Math.abs(indexA - indexB) < 2)
					continue;

				if(indexB < indexA) {
					// swap A, B.
					temp = indexB;
					indexB = indexA;
					indexA = temp;
				}

				var a0 = items[ RouteNodes[indexA] ].position;
				var a1 = items[ RouteNodes[indexA + 1] ].position;
				var b0 = items[ RouteNodes[indexB] ].position;
				var b1 = items[ RouteNodes[indexB + 1] ].position;

				// Original distance:
				var dx = a0.x - a1.x;
				var dy = a0.y - a1.y;
				var distance = (dx*dx+dy*dy);	// Only a comparison; do not need sqrt factor!
				dx = b0.x - b1.x;
				dy = b0.y - b1.y;
				distance += (dx*dx+dy*dy);	//	Only a comparison; do not need sqrt factor!

				// Possible shorter distance?
				dx = a0.x - b0.x;
				dy = a0.y - b0.y;
				var distance2 = (dx*dx+dy*dy);	//	Only a comparison; do not need sqrt factor!
				dx = a1.x - b1.x;
				dy = a1.y - b1.y;
				distance2 += (dx*dx+dy*dy);	// Only a comparison; do not need sqrt factor!

				if(distance2 < distance) {
					// Reverse tour between a1 and b0.

					var indexhigh = indexB;
					var indexlow = indexA + 1;

					while (indexhigh > indexlow) {
						temp = RouteNodes[indexlow];
						RouteNodes[indexlow] = RouteNodes[indexhigh];
						RouteNodes[indexhigh] = temp;

						indexhigh--;
						indexlow++;
					}
				}

			}
		// }
		//
	};



	// ------------------------------------------------------------------------
	// Instantiate
	// ------------------------------------------------------------------------
	calculate();



	// ------------------------------------------------------------------------
	// Gets
	// ------------------------------------------------------------------------
	return {
		route: RouteNodes
	};


};



/*
 *
 *	Delaunay Triangulation
 *	Joshua Bell
 *	inexorabletash@hotmail.com
 *
 *	http://www.travellermap.com/
 *	Inspired by: http://www.codeguru.com/cpp/data/mfc_database/misc/article.php/c8901/
 *
 *
 *	Modifications for specific use with Paper.js/Scriptographer
 *
 *	Ken Frederick
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 *
 *	Credit given where credit is due
 *
 *
 *	This work is hereby released into the Public Domain. To view a copy of the public
 *	domain dedication, visit http://creativecommons.org/licenses/publicdomain/ or send
 *	a letter to Creative Commons, 171 Second Street, Suite 300, San Francisco,
 *	California, 94105, USA.
 *
 */

/**
 *	@example
 *	var triangulate = new FTriangulate( points );
 *
 *	// draw faces
 *	for( var i=0; i<triangulate.length; i++ ) {
 *		var triangle = triangulate[i];
 *
 *		// draw triangle
 *		face = new Path();
 *		face.add( triangle.p1 );
 *		face.add( triangle.p2 );
 *		face.add( triangle.p3 );
 *		face.closed = true;
 *		face.strokeColor = 'white';
 *
 *	}
 *
 */



// ------------------------------------------------------------------------
// constants
// ------------------------------------------------------------------------
var EPSILON = 1.0e-6;



/**
 *	FTriangulate
 *
 *	@param points
 *			input vertices (Points)
 *
 */
folio.FTriangulate = function( points ) {
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	var _triangles;
	var _points = points;
	var _pointsNew = [];



	//-----------------------------------------------------------------------------
	// Classes
	//-----------------------------------------------------------------------------
	/**
	 *	Triangle
	 *
	 *	@param p1
	 *				first Point of Triangle
	 *	@param p2
	 *				second Point of Triangle
	 *	@param p3
	 *				third Point of Triangle
	 */
	// TODO: remove this and rely on Path.Triangle
	var Triangle = function( p1, p2, p3 ) {
		//-----------------------------------------------------------------------------
		// Properties
		//-----------------------------------------------------------------------------
		var _p1 = p1;
		var _p2 = p2;
		var _p3 = p3;



		//-----------------------------------------------------------------------------
		// Methods
		//-----------------------------------------------------------------------------
		/**
		 *	vertex (Edge) sharing
		 *
		 *	@param other
		 *				the triangle to check for vertex (Edge) sharing
		 */
		function sharesVertex(other) {
			return p1 == other.p1 || p1 == other.p2 || p1 == other.p3 ||
			p2 == other.p1 || p2 == other.p2 || p2 == other.p3 ||
			p3 == other.p1 || p3 == other.p2 || p3 == other.p3;
		}

		/**
		 *	@return circle
		 *			Point of the circle center
		 */
		function circumcenter() {
			var circle = new Point();
			var m1, m2;
			var mx1, mx2;
			var my1, my2;

			if ( Math.abs(_p2.y-_p1.y) < EPSILON ) {
				m2 = - (_p3.x-_p2.x) / (_p3.y-_p2.y);
				mx2 = (_p2.x + _p3.x) / 2.0;
				my2 = (_p2.y + _p3.y) / 2.0;
				circle.x = (_p2.x + _p1.x) / 2.0;
				circle.y = m2 *	(circle.x - mx2) + my2;

			}
			else if ( Math.abs(_p3.y-_p2.y) < EPSILON ) {
				m1 = - (_p2.x-_p1.x) / (_p2.y-_p1.y);
				mx1 = (_p1.x + _p2.x) / 2.0;
				my1 = (_p1.y + _p2.y) / 2.0;
				circle.x = (_p3.x + _p2.x) / 2.0;
				circle.y = m1 *	(circle.x - mx1) + my1;

			}
			else {
				m1 = - (_p2.x-_p1.x) / (_p2.y-_p1.y);
				m2 = - (_p3.x-_p2.x) / (_p3.y-_p2.y);
				mx1 = (_p1.x + _p2.x) / 2.0;
				mx2 = (_p2.x + _p3.x) / 2.0;
				my1 = (_p1.y + _p2.y) / 2.0;
				my2 = (_p2.y + _p3.y) / 2.0;
				circle.x = (m1 *	mx1 - m2 *	mx2 + my2 - my1) / (m1 - m2);
				circle.y = m1 *	(circle.x - mx1) + my1;
			}

			return circle;
		};

		//-----------------------------------------------------------------------------
		/**
		 *	@return center
		 *			Point of the centroid center
		 *
		 *	http://www.mathwords.com/c/centroid_formula.htm
		 */
		function centroid() {
			return new Point(
				(_p1.x + _p2.x + _p3.x)/3,
				(_p1.y + _p2.y + _p3.y)/3
			);
		};

		//-----------------------------------------------------------------------------
		/**
		 *	 @return
		 *			a sorted array (Edge) of the Triangle's Edges (shortest to longest)
		 */
		function distances() {
			var distances = [];
			distances[0] = new Edge(_p1, _p2);
			distances[1] = new Edge(_p1, _p3);
			distances[2] = new Edge(_p3, _p2);

			distances.sort();
			return distances;
		};

		//-----------------------------------------------------------------------------
		/**
		 *	http://www.btinternet.com/~se16/hgb/triangle.htm
		 */
		function width() {
			var x1 = 0;
			if(_p1.x < _p2.x && _p1.x < _p3.x) x1 = _p1.x;
			else if( _p2.x < _p1.x && _p2.x < _p3.x ) x1 = _p2.x;
			else if( _p3.x < _p1.x && _p3.x < _p2.x) x1 = _p3.x;

			var x2 = 0;
			if(_p1.x > _p2.x && _p1.x > _p3.x) x2 = _p1.x;
			else if( _p2.x > _p1.x && _p2.x > _p3.x ) x2 = _p2.x;
			else if( _p3.x > _p1.x && _p3.x > _p2.x) x2 = _p3.x;

			var f = Math.abs(x2 - x1);
			return f;
		};

		function height() {
			var y1 = 0;
			if(_p1.y < _p2.y && _p1.y < _p3.y) y1 = _p1.y;
			else if( _p2.y < _p1.y && _p2.y < _p3.y ) y1 = _p2.y;
			else if( _p3.y < _p1.y && _p3.y < _p2.y) y1 = _p3.y;

			var y2 = 0;
			if(_p1.y > _p2.y && _p1.y > _p3.y) y2 = _p1.y;
			else if( _p2.y > _p1.y && _p2.y > _p3.y ) y2 = _p2.y;
			else if( _p3.y > _p1.y && _p3.y > _p2.y) y2 = _p3.y;

			var g = Math.abs(y2 - y1);
			return g;
		};

		//-----------------------------------------------------------------------------
		function area() {
			var area = 0;
			area += (_p1.x + _p3.x) * (_p3.y - _p1.y);
			area += (_p2.x + _p1.x) * (_p1.y - _p2.y);
			area += (_p3.x + _p2.x) * (_p2.y - _p3.y);
			return area/2;
		};



		//-----------------------------------------------------------------------------
		// Gets
		//-----------------------------------------------------------------------------
		/**
		 *	 @return
		 *	 		the points of the triangle as a Point array
		 */
		function get() {
			var points = [_p1, _p2, _p3];
			return points;
		};

		//-----------------------------------------------------------------------------
		return {
			p1: _p1,
			p2: _p2,
			p3: _p3,

			sharesVertex: sharesVertex,
			getCentroid: centroid,

			getArea: area,
			getWidth: width,
			getHeight: height,

			getPoints: get
		};

	};

	/**
	 *	Edge
	 *	TODO: replace with paper.Segment
	 *
	 *	@param p1
	 *				first Point of Edge
	 *	@param p2
	 *				second Point of Edge
	 */
	var Edge = function( p1, p2 ) {
		//-----------------------------------------------------------------------------
		// Properties
		//-----------------------------------------------------------------------------
		var _p1 = p1;
		var _p2 = p2;
		var _dist = _p1.getDistance(_p2);



		//-----------------------------------------------------------------------------
		// Methods
		//-----------------------------------------------------------------------------
		/**
		 *	sorts edge by shortest to longest
		 *
		 *	@param o
		 *				Edge to compare against
		 */
		function compareTo(other) {
			return _dist < other.dist ? -1 : _dist > other.dist ? 1 : 0;
		};



		//-----------------------------------------------------------------------------
		// Gets
		//-----------------------------------------------------------------------------
		/**
		 *	 @return
		 *	 		the points of the edge as a Point array
		 */
		function get() {
			var points = [_p1, _p2];
			return points;
		};


		//-----------------------------------------------------------------------------
		return {
			p1: _p1,
			p2: _p2,
			dist: _dist,

			getPoints: get
		};

	};



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	/**
	 *	Triangulation subroutine
	 *
	 *	Returned is a list of triangular faces in the Array triangles
	 *	These triangles are arranged in a consistent clockwise order.
	 *
	 *	@return triangles
	 *			return Array of Triangles in clockwise order
	 *
	 */
	function init() {
		_triangles = [];

		if( _points.length != null ) {
			// remove duplicate points
			_points = uniquePoints( _points );

			// sort vertex array in increasing x values
			_points.sort( sortLeftToRight );
			// _points.sort( sortTopToBottom );


			// Find the maximum and minimum vertex bounds.
			// This is to allow calculation of the bounding triangle
			var xmin = (_points[0]).x;
			var ymin = (_points[0]).y;
			var xmax = xmin;
			var ymax = ymin;

			// z is used for storing misc. info i.e. normalized brightness data
			var z = (_points[0]).z;

			for( var i=0; i<_points.length; i++ ) {
				var p = _points[i];
				if(p.x < xmin) xmin = p.x;
				if(p.x > xmax) xmax = p.x;
				if(p.y < ymin) ymin = p.y;
				if(p.y > ymax) ymax = p.y;
			}

			var dx = xmax - xmin;
			var dy = ymax - ymin;
			var dmax = (dx > dy) ? dx : dy;
			var xmid = (xmax + xmin) / 2.0;
			var ymid = (ymax + ymin) / 2.0;

			_triangles = [];
			var complete = new HashSet(); // for complete Triangles


			// Set up the super triangle
			// This is a triangle which encompasses all the sample points.
			// The super triangle coordinates are added to the end of the
			// vertex list. The super triangle is the first triangle in
			// the triangle list.
			var superTriangle = new Triangle(
				new Point( xmid - 2.0 * dmax, ymid - dmax ),
				new Point( xmid, ymid + 2.0 * dmax ),
				new Point( xmid + 2.0 * dmax, ymid - dmax )
			);
			_triangles.push( superTriangle );


			// Include each point one at a time into the existing mesh
			var edges = [];
			for ( var i=0; i<_points.length; i++ ) {
				var p = _points[i];
				edges = [];


				// Set up the edge buffer.
				// If the point (xp,yp) lies inside the circumcircle then the
				// three edges of that triangle are added to the edge buffer
				// and that triangle is removed.
				var circle = new Point();

				for (var j=_triangles.length-1; j>=0; j--) {
					var t = _triangles[j];
					if(complete.contains(t)) {
						continue;
					}

					var inside = circumCircle( p, t, circle );

					if(circle.x + circle.z < p.x) {
						complete.add(t);
					}
					if(inside) {
						edges.push( new Edge(t.p1, t.p2) );
						edges.push( new Edge(t.p2, t.p3) );
						edges.push( new Edge(t.p3, t.p1) );
						_triangles.splice(j, 1);
					}
				}

				// remove duplicate edges
				edges = uniqueEdges( edges );

				// Tag multiple edges
				// Note: if all triangles are specified anticlockwise then all
				// interior edges are opposite pointing in direction.
				for (var j=0; j<edges.length-1; j++) {
					var e1 = edges[j];
					for (var k=j+1; k<edges.length; k++) {
						var e2 = edges[k];
						if(e1.p1 == e2.p2 && e1.p2 == e2.p1) {
							e1.p1 = null;
							e1.p2 = null;
							e2.p1 = null;
							e2.p2 = null;
						}
						// Shouldn't need the following, see note above
						if(e1.p1 == e2.p1 && e1.p2 == e2.p2) {
							e1.p1 = null;
							e1.p2 = null;
							e2.p1 = null;
							e2.p2 = null;
						}
					}
				}

				// Form new triangles for the current point
				// Skipping over any tagged edges.
				// All edges are arranged in clockwise order.
				for (var j=0; j<edges.length; j++) {
					var e = edges[j];
					if(e.p1 == null || e.p2 == null) {
						continue;
					}
					// determine if point in triangle is new
					// if it is mark it as so
					for( var k=0; k<_pointsNew.length; k++ ) {
						if( e.p1 == _pointsNew[k] ) e.p1.name = '__new';
						else e.p1.name = null;

						if( e.p2 == _pointsNew[k] ) e.p2.name = '__new';
						else e.p2.name = null;

						if( p == _pointsNew[k] ) p.name = '__new';
						else p.name = null;
					}
					_triangles.push( new Triangle(e.p1, e.p2, p) );
				}

			}

			// Remove triangles with super triangle vertices
			for (var i=_triangles.length-1; i>=0; i--) {
				var t = _triangles[i];
				if(t.sharesVertex(superTriangle)) {
					_triangles.splice(i, 1);
				}
			}

		}

		// return _triangles;
	};

	//-----------------------------------------------------------------------------
	/**
	 *	Return TRUE if a point (xp,yp) is inside the circumcircle made up
	 *	of the points (x1,y1), (x2,y2), (x3,y3)
	 *	The circumcircle center is returned in (xc,yc) and the radius r
	 *	NOTE: A point on the edge is inside the circumcircle
	 *
	 * @param p
	 *				Point to check
	 * @param t
	 *				Triangle to check
	 * @param circle
	 *				circle to check
	 *
	 */
	function circumCircle( p, t, circle ) {
		var m1, m2;
		var mx1, mx2;
		var my1, my2;
		var dx, dy;

		var rsqr;
		var drsqr;

		// Check for coincident points
		if( Math.abs(t.p1.y-t.p2.y) < EPSILON && Math.abs(t.p2.y-t.p3.y) < EPSILON ) {
			//System.err.println("CircumCircle: Points are coincident.");
			return false;
		}

		if( Math.abs(t.p2.y-t.p1.y) < EPSILON ) {
			m2 = - (t.p3.x-t.p2.x) / (t.p3.y-t.p2.y);
			mx2 = (t.p2.x + t.p3.x) / 2.0;
			my2 = (t.p2.y + t.p3.y) / 2.0;
			circle.x = (t.p2.x + t.p1.x) / 2.0;
			circle.y = m2 * (circle.x - mx2) + my2;
		}
		else if( Math.abs(t.p3.y-t.p2.y) < EPSILON ) {
			m1 = - (t.p2.x-t.p1.x) / (t.p2.y-t.p1.y);
			mx1 = (t.p1.x + t.p2.x) / 2.0;
			my1 = (t.p1.y + t.p2.y) / 2.0;
			circle.x = (t.p3.x + t.p2.x) / 2.0;
			circle.y = m1 * (circle.x - mx1) + my1;
		}
		else {
			m1 = - (t.p2.x-t.p1.x) / (t.p2.y-t.p1.y);
			m2 = - (t.p3.x-t.p2.x) / (t.p3.y-t.p2.y);
			mx1 = (t.p1.x + t.p2.x) / 2.0;
			mx2 = (t.p2.x + t.p3.x) / 2.0;
			my1 = (t.p1.y + t.p2.y) / 2.0;
			my2 = (t.p2.y + t.p3.y) / 2.0;
			circle.x = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
			circle.y = m1 * (circle.x - mx1) + my1;
		}

		dx = t.p2.x - circle.x;
		dy = t.p2.y - circle.y;
		rsqr = dx*dx + dy*dy;
		circle.z = Math.sqrt(rsqr);

		dx = p.x - circle.x;
		dy = p.y - circle.y;
		drsqr = dx*dx + dy*dy;

		return drsqr <= rsqr;
	};

	//-----------------------------------------------------------------------------
	/**
	 *	findClosest Triangle
	 *
	 *	Returns the closest Triangle based on the input Triangle
	 *
	 *	@param other
	 *			the input Triangle to find it's closest neighbor
	 *
	 *	@return
	 *			closest Triangle
	 */
	function findClosest(other) {
		var result;

		for(var i=0; i<_triangles.length; i++) {
			var iFind = _triangles[i];
			var d1 = other.getCentroid.getDistance( iFind.getCentroid );

			for(var j=0; j<_triangles.length; j++) {
				// var jFind = _triangles[i];
				var jFind = _triangles[j];
				var d2 = other.getCentroid.getDistance( jFind.getCentroid );

				if( d2 < d1 ) {
					result = jFind;
					break;
				}

			}
		}

		return result;
	};

	//-----------------------------------------------------------------------------
	/**
	 *
	 *	sort Point rray from left to right
	 *
	 *	@param a
	 *			Point A
	 *	@param b
	 *			Point A
	 *
	 */
	function sortLeftToRight(a,b) {
		if (a.x < b.x) return 1;
		else if (a.x > b.x) return -1;
		else return 0;
	};

	/**
	 *
	 *	sort Point array from top to bottom
	 *
	 *	@param a
	 *			Point A
	 *	@param b
	 *			Point A
	 *
	 */
	function sortTopToBottom(a,b) {
		if (a.y < b.y) return 1;
		else if (a.y > b.y) return -1;
		else return 0;
	};

	/**
	 *
	 *	remove Point duplicates
	 *
	 *	@param {Array} arr
	 *			array to remove duplicate points from
	 *
	 *	@return
	 *			the cleaned up array
	 *
	 */
	function uniquePoints(arr){
		arr.sort();
		for( var i=1; i<arr.length; ){
			if( arr[i-1].x == arr[i].x && arr[i-1].y == arr[i].y ) arr.splice(i, 1);
			else i++;
		}
		return arr;
	};

	/**
	 *
	 *	remove Edge duplicates
	 *
	 *	@param {Array} arr
	 *			array to remove duplicate edges from
	 *
	 *	@return
	 *			the cleaned up array
	 *
	 */
	function uniqueEdges(arr) {
		arr.sort();
		for( var i=1; i<arr.length; ){
			if( arr[i-1].p1 == arr[i].p1 && arr[i-1].p2 == arr[i].p2 ||
				arr[i-1].p1 == arr[i].p2 && arr[i-1].p2 == arr[i].p2 ) arr.splice(i, 1);
			else i++;
		}
		return arr;

		// TODO: This is O(n^2), make it O(n) with a hash or some such
		// var uniqueEdges = [];
		// for( var i=0; i<edges.length; i++ ) {
		//	var edge1 = edges[i];
		//	var unique = true;

		//	for( var j=0; j<edges.length; j++ ) {
		//		if( i != j ) {
		//			var edge2 = edges[j];
		//			if( ( edge1.p1 == edge2.p1 && edge1.p2 == edge2.p2 ) ||
		//				( edge1.p1 == edge2.p2 && edge1.p2 == edge2.p1 ) ) {
		//				unique = false;
		//				break;
		//			}
		//		}
		//	}

		//	if( unique ) {
		//		uniqueEdges.push( edge1 );
		//	}
		// }

		// return uniqueEdges;
	};



	//-----------------------------------------------------------------------------
	// sets
	//-----------------------------------------------------------------------------
	/**
	 *	add point(s) to Triangulation
	 *
	 *	@param point
	 *			a single Point or array of Points
	 *
	 */
	function addPoint(point) {
		_pointsNew = [];

		if( point instanceof Array ) {
			_pointsNew = point;
			// add points to points array
			_points = _points.concat( point );
		}
		else {
			_pointsNew[0] = point;
			// add point to points array
			_points.push( point );
		}

		// check for duplicate points
		_points = uniquePoints( _points );

		// console.log( _pointsNew );
		// create (new) triangulation
		init();
	};



	//-----------------------------------------------------------------------------
	// Gets
	//-----------------------------------------------------------------------------
	/**
	 *	@param index
	 *			index of Triangle to return (optional)
	 *
	 *	@return
	 *			the Triangles as array
	 */
	function getTriangles(index) {
		if( index != null ) {
			return _triangles[index];
		}
		else {
			return _triangles;
		}
	};

	/**
	 *	@param index
	 *			index of Point to return (optional)
	 *
	 *	@return
	 *			the points as a Point array
	 */
	function getPoints(index) {
		if( index != null ) {
			return _points[index];
		}
		else {
			return _points;
		}
	};



	//-----------------------------------------------------------------------------
	// Invocation
	//-----------------------------------------------------------------------------
	init();




	//-----------------------------------------------------------------------------
	return {
		// sets
		add: addPoint,

		// gets
		getTriangles: getTriangles,
		getPoints: getPoints,
		getClosest: findClosest
	};


};



/**
 *
 *	HashSet
 *	Phùng Văn Huy
 *	huyphungvan@gmail.com
 *
 *	http://code.huypv.net/2010/04/hashset-implementation-in-javascript.html
 *
 *
 *	Modifications
 *
 *	Ken Frederick
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */
var HashSet = function() {
	//-----------------------------------------------------------------------------
	// Properties
	//-----------------------------------------------------------------------------
	var _arr = new Array();



	//-----------------------------------------------------------------------------
	// Methods
	//-----------------------------------------------------------------------------
	function _add(e) {
		var arr = _arr;
		var i = arr.indexOf(e);
		if (i == -1) arr.push(e);
	};

	function _get(i) {
		return _arr[i];
	};

	function _size(i) {
		return _arr.length;
	};

	function _remove(e) {
		var arr =_arr;
		var i = arr.indexOf(e);
		if (i != -1) arr.splice(i, 1);
	};

	function _contains(o) {
		var b = false;
		for(var i=0; i<_arr.length; i++) {
			if(_arr[i] === o) b = true; // break;
		}
		return b;
	};



	//-----------------------------------------------------------------------------
	// Gets
	//-----------------------------------------------------------------------------
	function _toString() {
		return _arr.join(',');
	};



	//-----------------------------------------------------------------------------
	return {
		add: _add,
		get: _get,
		size: _size,
		remove: _remove,
		contains: _contains,
		toString: _toString
	};

};


