// console.log( 'circle' );
// /**
//  *	FTriangle Example
//  *
//  *	Ken Frederick
//  *	ken.frederick@gmx.de
//  *
//  *	http://cargocollective.com/kenfrederick/
//  *	http://blog.kennethfrederick.de/
//  *
//  *	
//  *	An example of FTriangle
//  *
//  */



// // ------------------------------------------------------------------------
// // Properties
// // ------------------------------------------------------------------------
// // the core frederickkPaper namespace
// var f = frederickkPaper;

// // background
// var background;

// // circles
// var circles;

// // gradient
// var gradient;

// // hit paths
// var hitPath;
// var hitSegment;
// var hitOptions = {
// 	segments: true,
// 	fill: true,
// 	tolerance: 20
// };




// // ------------------------------------------------------------------------
// // Setup
// // ------------------------------------------------------------------------
// function Setup() {
// 	// Setup our holder group
// 	circles = new Group();

// 	// create gradient color
// 	var topLeft = view.bounds.center;
// 	var bottomRight = new Point(0,0);

// 	var blue = new Color( 25/255, 37/255, 210/255 );

// 	gradient = {
// 		gradient: {
// 			stops: [blue, blue.lighten(0.05, true)]
// 		},
// 		origin: 		view.bounds.topCenter,
// 		destination:	view.bounds.bottomCenter
// 	};

// 	// create circles/rings
// 	for( var i=0; i<6; i++ ) {
// 		var ratio = (i/6);

// 		var circle = Path.Circle(
// 			view.bounds.center,
// 			(view.bounds.width * ratio)/2
// 		);
// 		circle.name = 'circle';
// 		// circle.fillColor = new Color(
// 		// 	ratio*(250/255),
// 		// 	ratio*(225/255),
// 		// 	ratio*(0/255)
// 		// );
// 		circle.fillColor = gradient;
// 		circles.appendBottom( circle );

// 	}

// 	// create background
// 	// background = new Path.Rectangle( view.bounds );
// 	// background.fillColor = gradient;
// 	// background.moveBelow( circles );

// };



// // ------------------------------------------------------------------------
// // Update
// // ------------------------------------------------------------------------
// function Update(event) {

// 	// for( var i=0; i<circles.children.length; i++ ) {
// 	// 	var circle = circles.children[i];
// 	// 	circle.rotate((i+1)*0.125);
// 	// }

// };



// // ------------------------------------------------------------------------
// // Draw
// // ------------------------------------------------------------------------
// function Draw() {

// 	for( var i=0; i<circles.children.length; i++ ) {
// 		var circle = circles.children[i];
// 		circle.fillColor = gradient;
// 	}
// 	// background.fillColor = gradient;

// };



// // ------------------------------------------------------------------------
// // Methods
// // ------------------------------------------------------------------------




// // ------------------------------------------------------------------------
// // Events
// // ------------------------------------------------------------------------
// function onResize(event) {
// 	view.size = event.size;
// };


// // ------------------------------------------------------------------------
// function onMouseUp(event) {
// };

// function onMouseDown(event) {
// 	gradient.origin = event.point;
// 	Draw();

// 	var hitResult = project.hitTest(event.point, hitOptions);

// 	// check hit 
// 	if (hitResult) {
// 		hitPath = hitResult.item;
// 		if (hitResult.type == 'segment') {
// 			hitSegment = hitResult.segment;
// 		}
// 	}
// };

// function onMouseMove(event) {
// 	var hitResult = project.hitTest(event.point, hitOptions);
// 	project.activeLayer.selected = false;
// 	if (hitResult && hitResult.item) {
// 		hitResult.item.selected = true;
// 	}
// };

// function onMouseDrag(event) {
// 	if (hitSegment) {
// 		hitSegment.point = event.point;
// 		// Draw();
// 	}
// };


// // ------------------------------------------------------------------------
// function onKeyDown(event) {
// };

// function onKeyUp(event) {
// };
