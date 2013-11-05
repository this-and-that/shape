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

