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
