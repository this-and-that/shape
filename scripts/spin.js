/**
*	Spin
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/


// ------------------------------------------------------------------------
// properties
// ------------------------------------------------------------------------
var rasterUrl = 'http://cache.krop.com/patrickhoelck-4a9d8c27f7870.jpg';
var num = 0;
var divRasterIdName;

var values = new Array();
values.num = 10;
values.angle = 90;
values.bTrans = 'false';
values.bScale = 'false';

var bVerbose = true;



// ------------------------------------------------------------------------
// methods
// ------------------------------------------------------------------------
function addElement() {
	// http://forum.codecall.net/javascript-css/7114-javascript-add-text-input-field.html
	var ni = document.getElementById('myDiv');
	var numi = document.getElementById('addButton');

	var numVal = document.getElementById('theValue');
	num = (document.getElementById('theValue').value -1) + 2;
	numVal.value = num;


	// the input field(s)
	var newdiv = document.createElement('div');
	divRasterIdName = 'my' + num + 'Div';

	newdiv.setAttribute('id', divRasterIdName);
	newdiv.innerHTML =	"<input type='text' id=" + divRasterIdName + " onChange='setValues()' value=\'" + rasterUrl + "\' />&nbsp;&nbsp;";
	//newdiv.innerHTML += "<input type='button' id='minusButton' class='minus' onClick'removeElement(" + divRasterIdName + ")' value='' /><br />";
	ni.appendChild(newdiv);
	
	addImage(rasterUrl);
}


// ------------------------------------------------------------------------
function addImage(imgurl) {
	if(bVerbose) console.log( 'addImage(' + imgurl + ')' );
	
	var imgi = document.getElementById('rasterImages');

	// add image(s)
	var newImg = document.createElement('img');
	var imgIdName = 'theRaster';
	
	newImg.setAttribute('src', imgurl);
	newImg.setAttribute('id', imgIdName);
	imgi.appendChild(newImg);
}



// ------------------------------------------------------------------------
// sets
// ------------------------------------------------------------------------
function setValues() {
	if(bVerbose) console.log( 'setValues()' );

	rasterUrl = document.getElementById(divRasterIdName).firstChild.value;
	var newImg = document.getElementById('theRaster');
	newImg.src = rasterUrl;


	values.num = document.getElementById('num').value;
	values.angle = document.getElementById('angle').value;
	values.bTrans = document.getElementById('bTrans').checked;
	values.bScale = document.getElementById('bScale').checked;


	// update canvas and redraw
	onload();
}






/**
*	Item Spin Mask 0.0
*
*	Ken Frederick
*	ken.frederick@gmx.de
*
*	http://cargocollective.com/kenfrederick/
*	http://kenfrederick.blogspot.com/
*
*/



// document properties
var groupHolder;
var raster;



// ------------------------------------------------------------------------
// Setup
// http://paperjs.org/tutorials/getting-started/using-javascript-directly/
// ------------------------------------------------------------------------
paper.install(window);
window.onload = function() {
	paper.setup('canvas');

	// if running for first time,
	// initialize <form and <img
	if(num == 0) addElement();

	groupHolder = new Group();
	raster = new Raster('theRaster');

	Main();
	view.draw();
}


function Setup() {
}



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update() {
}



// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
function Main() {
	raster.position = view.center;
	Spin( raster );
}



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function Spin(obj) {
	for(var i=0; i<parseInt(values.num)+1; i++) {
		var sz = i/(parseInt(values.num)+1);
		var circle = Path.Circle(obj.position, (obj.bounds.width*sz)/2)
		var factor = circle.bounds.width / obj.bounds.width;

		var temp = obj.clone();
		var container = new Group();

		container.appendTop(temp);
		container.appendTop(circle);
		container.clipped = true;
		circle.clipMask = true;

		temp.rotate( -values.angle*sz );
		if(values.bScale == true) temp.scale( sz*2 ); //factor*2 );
		if(values.bTrans == true) temp.opacity = sz;

		groupHolder.appendBottom( container );
	}

	temp.remove();
	//groupHolder.appendBottom(obj);
}

// ------------------------------------------------------------------------
function SpinAlternate(obj) {
	var num = obj.length;
	for(var i=0; i<parseInt(values.num)+1; i++) {
		var sz = i/(parseInt(values.num)+1);
		var circle = Path.Circle(obj[0].position, (obj[0].bounds.width*sz)/2);
		var factor = circle.bounds.width / obj.bounds.width;

		var temp = obj[i%num].clone();
		var container = new Group();

		container.appendTop(temp);
		container.appendTop(circle);
		container.clipped = true;
		circle.clipMask = true;

		temp.position = circle.position;
		temp.rotate( -values.angle*sz );
		if(values.bScale == true) temp.scale( sz*2 ); //factor*2 );
		if(values.bTrans == true) temp.opacity = sz;

		if(values.bTrans) container.opacity = sz;
		groupHolder.appendBottom( container );
	}

	temp.remove();
	//groupHolder.appendBottom(obj);
}



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onFrame(event) {
	//Update();
}


