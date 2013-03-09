// /**
*	Spin
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/












// /**
// *	Spin
// *
// *	Ken Frederick
// *	ken.frederick@gmx.de
// *
// *	http://cargocollective.com/kenfrederick/
// *	http://kenfrederick.blogspot.com/
// *
// */
// 
// 
// // ------------------------------------------------------------------------
// // properties
// // ------------------------------------------------------------------------
// var fanSymbol;
// var mouse = new paper.Point(0,0);
// 
// 
// 
// // ------------------------------------------------------------------------
// // Setup
// // http://paperjs.org/tutorials/getting-started/using-javascript-directly/
// // ------------------------------------------------------------------------
// paper.install(window);
// window.onload = function() {
// 	console.log('onload');
// 
// 	paper.setup('canvas');
// 
// 	// activate tools
// 	tool = new Tool();
// 	tool.activate();
// 
// 	fanSymbol = Fan();
// 	Main();
// 
// 	// update each frame
//     view.onFrame = function(event) {
//         Update(event);
//     }
// 
//     // events
//     tool.onMouseDown = function(event) {
//         mouse = event.point;
//     }
//     tool.onMouseDrag = function(event) {
//         mouse = event.point;
//     }
// 
// 	// view.draw();
// }
// 
// 
// // ------------------------------------------------------------------------
// // Update
// // ------------------------------------------------------------------------
// function Update(event) {
// 	// Main();
// }
// 
// 
// 
// // ------------------------------------------------------------------------
// // Main
// // ------------------------------------------------------------------------
// function Main() {
// 	fanSymbol.translate( view.center );
// 	// fanSymbol.rotate( mouse.x );
// }
// 
// 
// function Fan() {
// 	console.log('Fan()');
// 
// 	var fan = new Group();
// 
// 	var blade = new Path(
// 		{ x: 24.29883, y: -0 },
// 		{ x: 19.04883, y: 5.25 },
// 		{ x: 18.06055, y: 6.80078 },
// 		{ x: 9.69336, y: 6.21289 },
// 		{ x: 0.07129, y: 12.74609 },
// 		{ x: 6.92383, y: 23.48242 },
// 		{ x: 19.07617, y: 21.38281 },
// 		{ x: 23.31445, y: 11.7793 },
// 		{ x: 24.29883, y: 10.5 },
// 		{ x: 29.54883, y: 5.25 }
// 	);
// 	blade.fillColor = { red: 0, green: 0, blue: 0 };
// 	blade.segments[0].handleIn = { x: 2.89844, y: 0 };
// 	blade.segments[0].handleOut = { x: -2.89844, y: 0 };
// 	blade.segments[1].handleIn = { x: 0, y: -2.89844 };
// 	blade.segments[1].handleOut = { x: 0.02539, y: 0.56641 };
// 	blade.segments[2].handleIn = { x: 0.66406, y: -0.23633 };
// 	blade.segments[2].handleOut = { x: -1.96094, y: 0.70312 };
// 	blade.segments[3].handleIn = { x: 3.13574, y: 1.74414 };
// 	blade.segments[3].handleOut = { x: -5.33594, y: -2.96875 };
// 	blade.segments[4].handleIn = { x: -0.72949, y: -4.98828 };
// 	blade.segments[4].handleOut = { x: 0.64648, y: 4.42383 };
// 	blade.segments[5].handleIn = { x: -3.47266, y: -1.80664 };
// 	blade.segments[5].handleOut = { x: 5.1875, y: 2.70703 };
// 	blade.segments[6].handleIn = { x: -3.03906, y: 3.30273 };
// 	blade.segments[6].handleOut = { x: 1.99609, y: -2.16406 };
// 	blade.segments[7].handleIn = { x: -0.16016, y: 3.62695 };
// 	blade.segments[7].handleOut = { x: 0.03906, y: -0.85352 };
// 	blade.segments[8].handleIn = { x: -0.5625, y: 0.02539 };
// 	blade.segments[8].handleOut = { x: 2.89844, y: 0 };
// 	blade.segments[9].handleIn = { x: 0, y: 2.90039 };
// 	blade.segments[9].handleOut = { x: 0, y: -2.89844 };
// 	blade.closed = true;
// 
// 	var hole = new Path(
// 		{ x: 24.29883, y: 7.71875 },
// 		{ x: 21.83398, y: 5.25195 },
// 		{ x: 24.29883, y: 2.78711 },
// 		{ x: 26.76367, y: 5.25195 }
// 	);
// 	hole.fillColor = { red: 0, green: 0, blue: 0 };
// 	hole.segments[0].handleIn = { x: 1.35938, y: 0 };
// 	hole.segments[0].handleOut = { x: -1.36328, y: 0 };
// 	hole.segments[1].handleIn = { x: 0, y: 1.36328 };
// 	hole.segments[1].handleOut = { x: 0, y: -1.36133 };
// 	hole.segments[2].handleIn = { x: -1.36328, y: 0 };
// 	hole.segments[2].handleOut = { x: 1.35938, y: 0 };
// 	hole.segments[3].handleIn = { x: 0, y: -1.36133 };
// 	hole.segments[3].handleOut = { x: 0, y: 1.36328 };
// 	hole.closed = true;
// 
// 	var bladePath = new CompoundPath(blade, hole);
// 	bladePath.remove();
// 
// 	// rotate for fan
// 	for(var i=0; i<361; i+=90) {
// 		var b = bladePath.clone();
// 		b.rotate(i, b.children[1].position);
// 		fan.appendTop(b);
// 	}
// 	
// 	fanSymbol = new Symbol(fan);
// 	return fanSymbol.place(0,0);
// }
// 
// 
// 
// 
