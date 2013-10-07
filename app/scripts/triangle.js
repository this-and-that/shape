console.log( 'triangle' );
/**
 *	FTriangle Example
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://cargocollective.com/kenfrederick/
 *	http://blog.kennethfrederick.de/
 *
 *	
 *	An example of FTriangle
 *
 */



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------
// the core frederickkPaper namespace
var f = frederickkPaper;

// ftime
var ft = f.FTime;

// background
var canvas = document.getElementById('canvas');
canvas.setAttribute('class', 'shaping');

// triangles
var points;
var triangulation;
var triangles;

// hatching density
var compareArea;
var density = {
	max: 30,
	min: 6,
	value: 1.0,
	strokeWidth: 1.5,
	background: true
	// clipmask: true
};

// reflection markers 
var reflectMarkers;

// hit paths
var hitPath;
var hitSegment;
var hitOptions = {
	segments: true,
	fill: true,
	tolerance: 20
};




// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// create initial points
	points = [
		new Point( view.bounds.width/2,140 ), // top
		new Point( view.bounds.width-18,view.bounds.height-140 ),
		new Point( 18, view.bounds.height-140 )
	];


	// create reflection pointers
	reflectMarkers = new Group();
	for( var i=0; i<4; i++ ) {
		reflectMarkers.appendTop( new Path() );
	}


	// create triangulation
	triangulation = new Triangulate( points );
	compareArea = triangulation.getTriangles(0).getArea(); //view.bounds.width*view.bounds.height;

	// Setup our holder group
	triangles = new Group();

	// draw initial triangle face
	face = new Path();
	face.name = 'triangle';
	face.add( triangulation.getTriangles(0).p1 );
	face.add( triangulation.getTriangles(0).p2 );
	face.add( triangulation.getTriangles(0).p3 );
	face.closed = true;
	face.fillColor = 'white';
	face.data = 'white';
	triangles.appendTop( face );

	// DrawTriangles();

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {

	UpdateTriangles(event);
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
	// // workaround for clearing redraws	
	// triangles.removeChildren();
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function DrawTriangles() {
	triangles.removeChildren();

	var total = triangulation.getTriangles().length;
	for( var i=0; i<total; i++ ) {
		var triangle = triangulation.getTriangles(i);
		var triArea = triangle.getArea();

		// draw triangle
		face = new Path();
		face.name = 'triangle';
		face.add( triangle.p1 );
		face.add( triangle.p2 );
		face.add( triangle.p3 );
		face.closed = true;

		console.log( '------' );
		console.log( 'p1', triangle.p1.name );
		console.log( 'p2', triangle.p2.name );
		console.log( 'p3', triangle.p3.name );


		if( triangle.p1.name === '__new' ) {
			var a = new Path.Circle( triangle.p1, 10 );
			a.fillColor = 'green';
			triangles.appendTop( a );
		}
		if( triangle.p2.name === '__new' ) {
			var b = new Path.Circle( triangle.p2, 10 );
			b.fillColor = 'blue';
			triangles.appendTop( b );
		}
		if( triangle.p3.name === '__new' ) {
			var c = new Path.Circle( triangle.p3, 10 );
			c.fillColor = 'yellow';
			triangles.appendTop( c );
		}


		var ratio = ((i+1)/total);
		var max = density.max * (triArea/compareArea);
		var pmax = max;
		var pstrokeWidth = 100 * (triArea/compareArea);

		// TODO: read CSS color
		// var col = new Color( 
		// 	clamp( ratio*(233/255), 0.33, 1.0 ),
		// 	clamp( ratio*(52/255),  0.1,  1.0 ),
		// 	clamp( ratio*(21/255),  0.05, 1.0 )
		// );
		// face.strokeColor = col;

		// if( face.data === 'white' ) {
		// 	face.fillColor = 'white';
		// 	triangles.appendTop( face );
		// }
		// else {
			var stepper = new ft.FStepper();
			stepper.setMillis( 250 );
			stepper.setDelta( 0 );
			face.data = {
				stepper: stepper
			};

			density.lerp = 0.9;
			density.value = ratio;
			density.max = max;
			density.strokeWidth = 

			triangles.appendTop( hatchFill(face, density) );
			density.max = pmax;
			density.strokeWidth = pstrokeWidth;
		// }

	}
	triangles.moveBelow( reflectMarkers );
};


function UpdateTriangles(event) {

	// var total = triangles.children.length;
	// for( var i=0; i<total; i++ ) {
	// 	var triangle = triangles.children[i];


	// 	if( triangle.hasChildren() ) {
	// 		var stepper;

	// 		for( var j=0; j<triangle.children.length; j++ ) {
	// 			var trianglette = triangle.children[j];

	// 			if( trianglette.name == '__background' || trianglette.name == '__mask' ) {
	// 			// 	stepper = trianglette.data.stepper;
	// 			// 	stepper.update(event.time);

	// 			// 	if( !stepper.isDone ) {
	// 			// 		stepper.toggle();
	// 			// 	}
	// 			// 	else {
	// 			// 		stepper.stop();
	// 			// 		console.log( event.time + ' x' );
	// 			// 	}

	// 			}
	// 			else {
	// 				trianglette.strokeColor = 'blue';
	// 				var point1 = trianglette.segments[0].point;
	// 				var point2 = trianglette.segments[1].point;
	// 				var lerped = point1.lerp( point2, stepper.delta );



	// 			}



	// 		}

	// 	}
	// 	// if( triangle.children['__background'] != undefined ) {
	// 	// 	
	// 	// 	

	// 	// }

	// }

};


// ------------------------------------------------------------------------
/**
 *	add point(s) to Triangulation
 *
 *	@param {Point} point
 *			a single Point or array of Points
 *
 */
function addPoint(point) {
	triangulation.add( point );

	// clear triangle group
	triangles.removeChildren();

	// re-draw faces
	DrawTriangles();
};

// ------------------------------------------------------------------------
/**
 *	reflect a point across all axes
 *
 *	@param {Point} point
 *			origin point of reflection
 *	@param {Point} axis (optional)
 *			axis to reflect points over, default reflects over center axis of canvas
 *
 */
function reflectPoint(point, axis) {
	axis = (axis == undefined)
		? new Point( view.bounds.width, view.bounds.height )
		: axis;

	return [
		// original point
		point,
		// reflection across the x axis
		new Point(axis.x - point.x, point.y),
		// reflection across the y axis
		new Point(point.x, axis.y - point.y),
		// reflection across both axes
		new Point(axis.x - point.x,axis.y - point.y)
	];
};

// ------------------------------------------------------------------------
/*
 *	fill path with a simple hatched line fill
 *
 *	@param {Path} path
 *			path to fill with hatching
 *	@param {Array} options
 *			{ max: 100, 			// maximum no. of lines
 *			  min: 10,				// minimum no. of lines)
 *			  value: 0.1,			// density 0.0 - 1.0
 *
 *			  lerp: 0.5,			// lerp value 0.0 - 1.0
 *			  strokeWidth: 2,		// width of stroke
 *			  strokeColor: 'white',	// color of stroke
 *
 *			  background: true,		// create a background shape from path
 *			  fillColor: 'blue',	// color of background (default: path.fillColor)
 *
 *			  clipMask: true 		// create a mask shape from path
 *			}
 */
function hatchFill(path, options) {
	var density = (options == undefined) 
		? Math.round(100 * 0.5)
		: Math.round(options.max * options.value) < options.min
			? options.min
			: Math.round(options.max * options.value);

	var groupHatch = new Group();


	// gather points
	var points = [];
	for( var i=0; i<path.segments.length; i++ ) {
		var seg = path.segments[i];
		points.push( seg.point );
	}

	// distances
	var distances = [];
	for( var i=0,j=points.length-1; i<points.length; i++,j--) {
		distances.push( 
			// first point v. last point
			points[i].getDistance( points[j] )
		);
	}

	// draw hatch lines
	for(var j=0; j<density; j++) {
		var ratio = (j/density);
		var linePt1 = new Point();
		var linePt2 = new Point();

		var m = parseInt( Math.max.apply( Math, distances ) );
		switch( m % 3 ) {
			case 0:
				linePt1.x = (points[0].x + (points[2].x - points[0].x) * ratio);
				linePt1.y = (points[0].y + (points[2].y - points[0].y) * ratio);
				linePt2.x = (points[1].x + (points[2].x - points[1].x) * ratio);
				linePt2.y = (points[1].y + (points[2].y - points[1].y) * ratio);
				break;
			case 1:
				linePt1.x = (points[1].x + (points[0].x - points[1].x) * ratio);
				linePt1.y = (points[1].y + (points[0].y - points[1].y) * ratio);
				linePt2.x = (points[2].x + (points[0].x - points[2].x) * ratio);
				linePt2.y = (points[2].y + (points[0].y - points[2].y) * ratio);
				break;
			case 2:
				linePt1.x = (points[0].x + (points[1].x - points[0].x) * ratio);
				linePt1.y = (points[0].y + (points[1].y - points[0].y) * ratio);
				linePt2.x = (points[2].x + (points[1].x - points[2].x) * ratio);
				linePt2.y = (points[2].y + (points[1].y - points[2].y) * ratio);
				break;
		}

		// if( options.lerp != undefined ) {
		// 	linePt2 = linePt1.lerp( linePt2, options.lerp );
		// }

		var line = new Path.Line( 
			linePt1,
			// linePt2
			( options.lerp != undefined ) 
				? linePt1.lerp( linePt2, options.lerp )
				: linePt2
		);
		line.strokeWidth = (options.strokeWidth != null) 
			? options.strokeWidth
			: 1;

		line.strokeColor = (options.strokeColor != undefined)
			? options.strokeColor
			: (options.background)
				? 'white'
				: path.strokeColor;

		line.strokeCap = 'square';
		line.fillColor = null;

		groupHatch.appendTop( line );
	}

	// // create background
	// if( options.background ) {
	// 	var background = path.clone();
	// 	background.name = '__background';
	// 	// ensure any internal data is copied over as well
	// 	background.data = path.data;

	// 	background.fillColor = (options.fillColor != undefined)
	// 		? options.fillColor
	// 		: path.strokeColor;
	// 	background.strokeColor = (options.fillColor != undefined)
	// 		? options.fillColor
	// 		: path.strokeColor;
	// 	groupHatch.appendBottom( background );
	// }

	// create mask
	// if( options.clipMask ) {
		var mask = path.clone();
		mask.name = '__mask';
		// ensure any internal data is copied over as well
		mask.data = path.data;

		mask.fillColor = 'white';
		mask.strokeColor = path.strokeColor; //null;
		mask.clipMask = true;
		groupHatch.appendTop( mask );
		// groupHatch.clipped = true;
	// }

	// clear path
	path.remove();

	return groupHatch;
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
	view.size = event.size;
};


// ------------------------------------------------------------------------
function onMouseUp(event) {
	var reflected = reflectPoint(event.point);
	reflectMarkers.removeChildren();

	var hitResult = project.hitTest(event.point, hitOptions);

	// check hit 
	if (hitResult) {
		hitPath = hitResult.item;
		if (hitResult.type == 'segment' && hitPath.name == 'triangle') {
			hitSegment = hitResult.segment;

			// TODO: find point in triangulation
			// match so that mesh adjusts itself
			// TODO: find matching reflected point!
		}
		else {
			// segment not hit? add a point
			addPoint( event.point );
			addPoint( reflected );
		}
	}
	else {
		// nothing hit at all? add a point
		addPoint( event.point );
		addPoint( reflected );
	}

};

function onMouseDown(event) {
	reflectMarkers.removeChildren();
};

function onMouseMove(event) {
	var hitResult = project.hitTest(event.point, hitOptions);
	project.activeLayer.selected = false;
	if (hitResult && hitResult.item && hitResult.item.name == 'triangle') {
		hitResult.item.selected = true;
	}
};

function onMouseDrag(event) {
	if (hitSegment) {
		hitSegment.point = event.point;
		Draw();
	}

	// draw reflection markers
	var reflected = reflectPoint(event.point);
	reflectMarkers.removeChildren();
	for( var i=0; i<4; i++ ) {
		var path = new Path.Circle( reflected[i], 10 );
		path.fillColor = new Color( 0.0, 1.0, 0.7, 0.7 );
		reflectMarkers.appendTop( path );
	}
};


// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};
