/**
*	Shape
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/



// ------------------------------------------------------------------------
// Properties
// ------------------------------------------------------------------------

// document properties
var can;
var ctx;
var canvasWidth;
var canvasHeight;

var groupHolder;
var shapeArray = new Array(4);

var raster;
var mouseLocation;


// box2d
var world;

var bodies = new Array();
var boxes = new Array();
var circles = new Array();
var triangles = new Array();


// values
var values = new Array();


// Shapes
values.bSquare			=	'true';
values.bTriangle		=	'true';
values.bCircle			=	'true';
values.bCross			=	'true';

values.crossWeight		=	24;
values.bCrossFit		=	'true';
values.crossCap			=	'round';


// Settings
values.res				=	100;
values.bRotate			=	'false';
values.bScale			=	'false';
values.bColor			=	'true';
values.colorDkPct		=	0.2;


// Options
values.globalRotation	=	0.0;
values.globalScalar		=	100.0;

var hitOptions = {
	segments: true,
	stroke: true,
	fill: true,
	tolerance: 5
};

var bVerbose = true;
var bDebug = false;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
paper.install(window);
window.onload = function() {
	init();

	// Events
	view.onFrame = function(event) {
		if(bDebug == false) Update();
	}

	// Mouse Events
	var hitResult;
	tool.onMouseDown = function(event) {
		for(var i=0; i<bodies.length; i++) {
			hitResult = bodies[i].path.hitTest(event.point, hitOptions);
			
			if (hitResult) {
				if(bVerbose) console.log(i);
				if(bVerbose) console.log(hitResult);
				var body = bodies[i].body;
				var shape = body.GetShapeList();

				console.log(body);
				console.log(shape.GetType());

				shape.m_type = 2;
				shape.m_density = 1.0;
				
				// console.log(body.IsSleeping());
				// console.log(body.IsStatic());
				
				body.e_staticFlag = false;
				body.m_mass = 1.0;
				body.WakeUp();

				path = hitResult.item;
				path.strokeColor = new RgbColor(1,0,0);
				console.log('---');
			}
		}


	}
	tool.onMouseDrag = function(event) {
		mouseLocation = event.point;
		//if(bVerbose) console.log(event.point.x);
	}
	tool.onMouseUp = function(event) {
		// if(bVerbose) console.log('You released the mouse!');
	}
	
}

// ------------------------------------------------------------------------
function init() {
	paper.setup('canvas');

	Setup();
	Main();
	if(bDebug == true) Update();

	// view.draw();
}

// ------------------------------------------------------------------------
function Setup() {
	canvasWidth = view.bounds.width;
	canvasHeight = view.bounds.height;
	
	world = createWorld();
	
	setShapeArray();
	groupHolder = new Group();
	mouseLocation = new Point();
}



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update() {
	worldUpdate();

	for(var i=0; i<bodies.length; i++) {
		var body = bodies[i].body;
		var shape = body.GetShapeList();
		
		var pos = new Point(shape.m_position.x, shape.m_position.y);
		var angle = body.GetRotation();

		var form = bodies[i].path;
		form.position = pos;
		form.rotate(angle);
	}

}



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Main() {
	if(bVerbose) console.log('Main()');
	if(bVerbose) console.log(values);

	var size = new Size(values.res,values.res);
	var index = 0;

	for(var y=100; y<canvasHeight-100; y+=values.res) {
		for(var x=100; x<canvasWidth-100; x+=values.res) {

			var pos 			= new Point(x,y);
			var pixelRGB		= new RgbColor(norm(x, 0,canvasWidth), 0, norm(y, 0,canvasHeight));	//raster.getPixel( pos );
			var pixelRGBDark	= pixelRGB.darken(values.colorDkPct);
			pixelRGB			= pixelRGB.lighten(values.colorDkPct);
			var pixelGray		= pixelRGB.gray;
			
			var body;
			
			
			// ------------------------------------
			// random
			// ------------------------------------
			var rand = parseInt( random(0,4) );
			if(shapeArray[rand] == 0) {
				while(shapeArray[rand] == 0) {
					rand = parseInt( random(0,4) );
				}
			}
			
			
			// ------------------------------------
			// shapes
			// ------------------------------------
			//var form = new Path();
			var cwidth,cheight;
			
			if(values.bSquare == 'true' && rand == 0) {
				// add corresponding physics form
				body = addBox(world, x,y, size.width*0.5,size.height*0.5, false);

				body.path = Path.Rectangle(new Point(0,0), size);
			}
			
			else if(values.bTriangle == 'true' && rand == 1) {
				// add corresponding physics form
				//body = addPolygon(world, x,y, sides, size.width*0.5,size.height*0.5, false);
				body = addBox(world, x,y, size.width*0.5,size.height*0.5, true);

				var sides = 3;
				// body.path = Path.RegularPolygon(new Point(0,0), sides, (size.height*0.5)*1.33);
				for (var i=0; i<sides; i++) {
					var _y = (size.height*0.6 * Math.cos(i * 2 * Math.PI / sides));
					var _x = (size.width*0.6 * Math.sin(i * 2 * Math.PI / sides));
					body.path.add({x: _x, y: _y});
				}
				// body.path.position = new Point(0,0); //pos;
			}
			
			
			else if(values.bCircle == 'true' && rand == 2) {
				// add corresponding physics form
				body = addCircle(world, x,y, size.width*0.5, true);

				body.path = Path.Circle( new Point(0,0), size.width*0.5);
			}
			
			else if(values.bCross == 'true' && rand == 3) {
				// add corresponding physics form
				body = addBox(world, x,y, size.width*0.5,size.height*0.5, true);
				//body = addCircle(world, x,y, size.width*0.5, false);

				if(values.bCrossFit == 'true') {
					cwidth = (size.width*0.5) - values.crossWeight;
					cheight = (size.height*0.5) - values.crossWeight;
				} else {
					cwidth = size.width*0.5;
					cheight = size.height*0.5;
				}
				body.path = Cross(new Point(0,0), new Size(cwidth,cheight));

			}
			
			body.path.position = pos;
			//body.path.fillColor = pixelRGB;
			
			
			
			// ------------------------------------
			// color
			// ------------------------------------
			var origin			= new Point(body.path.position.x, body.path.position.y - body.path.bounds.height*0.5);
			var destination		= new Point(body.path.position.x, body.path.position.y + body.path.bounds.height*0.5);
			var gradient		= new Gradient([pixelRGB, pixelRGBDark]);
			var gradientColor	= new GradientColor(gradient, origin, destination);
			
			if(values.bColor) {
				if(values.bCross == 'true' && rand == 3) {
					body.path.children[0].strokeColor = pixelRGB;
					body.path.children[1].strokeColor = pixelRGBDark;
				} else {
					body.path.fillColor = gradientColor;
				}
			} else {
				if(values.bCross == 'true' && rand == 3) {
					body.path.strokeColor = new RgbColor(0,0,0);
				} else {
					body.path.fillColor = new RgbColor(0,0,0);
				}
			}
			
			if(values.bCross == 'true' && rand == 3) {
				body.path.children[0].strokeCap = values.crossCap;
				body.path.children[1].strokeCap = values.crossCap;
				body.path.strokeWidth = values.crossWeight;
			}
			
			
			// add to group
			//groupHolder.appendBottom(form);

			// add to array
			//body.path = form;
			bodies.push(body);
			//bodies.push([body,form]);
			
			index++;
		}
	}

	if(bVerbose) console.log('groupHolder.children.length:\t' + groupHolder.children.length);
	if(bVerbose) console.log('bodies.length:\t\t\t' + bodies.length);

}



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function random(minr, maxr) {
	return minr + Math.random() * (maxr - minr);
}
function norm(val,start,stop) {
	return (val - start) / (stop - start);
}
function radians(val) {
	return val * (Math.PI/180);
}
function boolToInt(val) {
	return (val) ? 1:0;
}

// ------------------------------------------------------------------------
Color.prototype.darken = function(pct) {
	nred = this.red - pct;
	ngreen = this.green - pct;
	nblue = this.blue - pct;
	return new RgbColor(nred,ngreen,nblue);
}
Color.prototype.lighten = function(pct) {
	nred = this.red + pct;
	ngreen = this.green + pct;
	nblue = this.blue + pct;
	return new RgbColor(nred,ngreen,nblue);
}

// ------------------------------------------------------------------------
function setShapeArray() {
	shapeArray[0] = boolToInt(values.bSquare);
	shapeArray[1] = boolToInt(values.bTriangle);
	shapeArray[2] = boolToInt(values.bCircle);
	shapeArray[3] = boolToInt(values.bCross);
	if(bVerbose) console.log('setShapeArray() ' + shapeArray);
}



/*
 *	cross
 */
function Cross(point, size) {
	var crossGroup = new Group();
	line1 = new Path.Line(point.x + size.width, point.y - size.height, point.x - size.width, point.y + size.height);
	line2 = new Path.Line(point.x + size.width, point.y + size.height, point.x - size.width, point.y - size.height);

	crossGroup.appendTop(line1);
	crossGroup.appendTop(line2);
	crossGroup.fillColor = null;
	crossGroup.strokeColor = new RgbColor(0,0,0);
	crossGroup.strokeCap = 'round';

	return crossGroup;
}


/*
 *	Drag & Drop functionality idea taken from 
 *	http://paperjs.org/examples/q-bertify/
 *	
 *	Jürg Lehni
 *	Jonathan Puckey
 */



/**
*	Box2Djs 
*
*	Ando Yasushi
*	andyjpn@gmail.com
*
*	http://d.hatena.ne.jp/technohippy/
*
*	Methods taken from Box2Djs included demos
*
*/


function createWorld() {
	if(bVerbose) console.log('creating box2d world...');

	// setup world
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-canvasWidth, -1000);
	worldAABB.maxVertex.Set(canvasWidth, 1000);

	var gravity = new b2Vec2(0, 300);
	var world = new b2World(worldAABB, gravity, true);

	// setup ground
	// x = vertical start point of ground, y = horizontal start point of ground
	var groundPoint = new Point(-100, canvasHeight);
	// width = ground width, height = thickness of ground
	var groundSize = new Size(canvasWidth+Math.abs(groundPoint.x*2),2);

	var groundShapeDef = new b2BoxDef();
	groundShapeDef.extents.Set(groundSize.width,groundSize.height);
	groundShapeDef.restitution = 0.5;
	groundShapeDef.friction = 0.5;

	var groundBodyDef = new b2BodyDef();
	groundBodyDef.AddShape(groundShapeDef);
	groundBodyDef.position.Set(groundPoint.x,groundPoint.y);


	// setup walls
	var wallPoint = {
		left:	new Point(0,0),
		right:	new Point(canvasWidth-2,0)
	};
	var wallSize = {
		left:	new Size(2,canvasHeight),
		right:	new Size(2,canvasHeight)
	};


	// add ground + walls to world
	world.CreateBody(groundBodyDef);
	addBox(world, wallPoint.left.x,wallPoint.left.y,
				  wallSize.left.width,wallSize.left.height);
	addBox(world, wallPoint.right.x,wallPoint.right.y,
				  wallSize.right.width,wallSize.right.height);


	// draw ground and walls
	var wallLeft = new Path.Rectangle( wallPoint.left, wallSize.left );			wallLeft.fillColor = new RgbColor(1,1,1);
	var wallRight = new Path.Rectangle( wallPoint.right, wallSize.right );		wallRight.fillColor = new RgbColor(1,1,1);
	var groundPath = new Path.Rectangle( groundPoint, groundSize );				groundPath.fillColor = new RgbColor(1,1,1);

	return world;
}

function worldUpdate() {
	var timeStep = 1.0/60;
	var iteration = 1;
	world.Step(timeStep, iteration);
}


/*
 *	Circle Bodies
 */
function addCircle(world, x,y, r, fixed) {
	// if(bVerbose) console.log('addCircle(' + x + ',' + y + ', ' + r + ')');

	var Circle = {
		bodyDef:	new b2BodyDef(),
		shapeDef:	new b2CircleDef(),
		body:		null,
		path:		new Path()
	};

	// if (typeof(fixed) == 'undefined') fixed = true;
	// if (!fixed) Circle.shapeDef.density = 1.0;
	Circle.shapeDef.radius = r || 10;
	Circle.shapeDef.restitution = 0.1;
	Circle.shapeDef.friction = 0.7;

	Circle.bodyDef.AddShape(Circle.shapeDef);
	Circle.bodyDef.position.Set(x,y);

	Circle.body = world.CreateBody(Circle.bodyDef);

	return Circle; //world.CreateBody(Circle.bodyDef);
}


/*
 *	Box Bodies
 */
function addBox(world, x, y, width, height, fixed) {
	// if(bVerbose) console.log('addBox(' + x + ',' + y + ', ' + width + ',' + height + ')');

	var Box = {
		bodyDef:	new b2BodyDef(),
		shapeDef:	new b2BoxDef(),
		body:		null,
		path:		new Path()
	};

	if (typeof(fixed) == 'undefined') fixed = true;
	if (!fixed) Box.shapeDef.density = 1.0;
	Box.shapeDef.restitution = 0.1;
	Box.shapeDef.friction = 0.7;
	Box.shapeDef.extents.Set(width, height);

	Box.bodyDef.AddShape(Box.shapeDef);
	Box.bodyDef.position.Set(x,y);

	Box.body = world.CreateBody(Box.bodyDef);

	return Box; //world.CreateBody(boxBd)
}


/*
 *	Triangle Bodies
 */
function addPolygon(world, x,y, sides, width,height, fixed) {
	var Triangle = {
		bodyDef:	new b2BodyDef(),
		shapeDef:	new b2PolyDef(),
		body:		null,
		path:		new Path()
	};

	// if (typeof(fixed) == 'undefined') fixed = true;
	// if (!fixed) Triangle.shapeDef.density = 1.0;
	Triangle.shapeDef.restitution = 0.1;
	Triangle.shapeDef.friction = 0.7;
	Triangle.shapeDef.vertexCount = sides;
	for(var i=0; i<sides; i++) {
		var _y = (height*0.6 * Math.cos(i * 2 * Math.PI / sides));
		var _x = (width*0.6 * Math.sin(i * 2 * Math.PI / sides));
		Triangle.shapeDef.vertices[i].Set(_x,_y);
	}

	Triangle.bodyDef.AddShape(Triangle.shapeDef);
	Triangle.bodyDef.position.Set(x,y);

	Triangle.body = world.CreateBody(Triangle.bodyDef);

	return Triangle;
}



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// Execution
// ------------------------------------------------------------------------


