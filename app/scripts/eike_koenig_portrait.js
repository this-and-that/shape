console.log( 'Eike König Loaded' );
/**
*	Eike König 0.0
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
// the core folio namespace
var f = folio;

var Eike; // raster image
var EikeDotRadius = 30;
var EikeSize = new Size();

var EikeDot = function(index, x, y, hexRGB_1, hexRGB_2) {
	this.index = index;
	this.x = x;
	this.y = y;
	this.color1 = String( hexRGB_1 );
	this.color2 = String( hexRGB_2 );
};

var EikeDots = [  // 19 x 26 matrix = 494 points
	new EikeDot( 0, 0, 0, '#ffffff', '#ced7c5' ),
	new EikeDot( 1, 30, 0, '#ffffff', '#ced7c9' ),
	new EikeDot( 2, 60, 0, '#ffffff', '#dfe5d8' ),
	new EikeDot( 3, 90, 0, '#ffffff', '#dfe3d6' ),
	new EikeDot( 4, 120, 0, '#ffffff', '#d7dfcd' ),
	new EikeDot( 5, 150, 0, '#ffffff', '#ced8c3' ),
	new EikeDot( 6, 180, 0, '#ffffff', '#cedac5' ),
	new EikeDot( 7, 210, 0, '#ffffff', '#d0dbc5' ),
	new EikeDot( 8, 240, 0, '#ffffff', '#ccd8bf' ),
	new EikeDot( 9, 270, 0, '#ffffff', '#c0c7b0' ),
	new EikeDot( 10, 300, 0, '#ffffff', '#dbe3cc' ),
	new EikeDot( 11, 330, 0, '#ffffff', '#c5d1ba' ),
	new EikeDot( 12, 360, 0, '#ffffff', '#d6e2ce' ),
	new EikeDot( 13, 390, 0, '#ffffff', '#d4ded0' ),
	new EikeDot( 14, 420, 0, '#ffffff', '#d8e3d6' ),
	new EikeDot( 15, 450, 0, '#ffffff', '#d4ded0' ),
	new EikeDot( 16, 480, 0, '#ffffff', '#dae3d5' ),
	new EikeDot( 17, 510, 0, '#ffffff', '#d4e0d1' ),
	new EikeDot( 18, 540, 0, '#ffffff', '#d4ded0' ),
	new EikeDot( 19, 0, 30, '#ffffff', '#ccd5c0' ),
	new EikeDot( 20, 30, 30, '#ffffff', '#ccd6c1' ),
	new EikeDot( 21, 60, 30, '#ffffff', '#cedac4' ),
	new EikeDot( 22, 90, 30, '#ffffff', '#d9dfc9' ),
	new EikeDot( 23, 120, 30, '#ffffff', '#c6cfb5' ),
	new EikeDot( 24, 150, 30, '#141414', '#cccdb4' ),
	new EikeDot( 25, 180, 30, '#cdcdc3', '#645749' ),
	new EikeDot( 26, 210, 30, '#cdcdc3', '#5c4b44' ),
	new EikeDot( 27, 240, 30, '#141414', '#816553' ),
	new EikeDot( 28, 270, 30, '#141414', '#77604c' ),
	new EikeDot( 29, 300, 30, '#141414', '#75624d' ),
	new EikeDot( 30, 330, 30, '#141414', '#846e54' ),
	new EikeDot( 31, 360, 30, '#141414', '#998d73' ),
	new EikeDot( 32, 390, 30, '#ffffff', '#d2ddcd' ),
	new EikeDot( 33, 420, 30, '#ffffff', '#d6dfd0' ),
	new EikeDot( 34, 450, 30, '#ffffff', '#d4ded0' ),
	new EikeDot( 35, 480, 30, '#ffffff', '#d4ded2' ),
	new EikeDot( 36, 510, 30, '#ffffff', '#d4e1d4' ),
	new EikeDot( 37, 540, 30, '#ffffff', '#d0ddd0' ),
	new EikeDot( 38, 0, 60, '#ffffff', '#ccd6c1' ),
	new EikeDot( 39, 30, 60, '#ffffff', '#ced8c3' ),
	new EikeDot( 40, 60, 60, '#ffffff', '#ccd8bf' ),
	new EikeDot( 41, 90, 60, '#141414', '#949175' ),
	new EikeDot( 42, 120, 60, '#cdcdc3', '#634f44' ),
	new EikeDot( 43, 150, 60, '#141414', '#483d3d' ),
	new EikeDot( 44, 180, 60, '#141414', '#333333' ),
	new EikeDot( 45, 210, 60, '#cdcdc3', '#534340' ),
	new EikeDot( 46, 240, 60, '#cdcdc3', '#544242' ),
	new EikeDot( 47, 270, 60, '#cdcdc3', '#705347' ),
	new EikeDot( 48, 300, 60, '#cdcdc3', '#55413f' ),
	new EikeDot( 49, 330, 60, '#cdcdc3', '#4f4141' ),
	new EikeDot( 50, 360, 60, '#cdcdc3', '#6a5346' ),
	new EikeDot( 51, 390, 60, '#141414', '#8f7e5d' ),
	new EikeDot( 52, 420, 60, '#141414', '#a2a694' ),
	new EikeDot( 53, 450, 60, '#ffffff', '#d6ddd0' ),
	new EikeDot( 54, 480, 60, '#ffffff', '#d0ddd0' ),
	new EikeDot( 55, 510, 60, '#ffffff', '#d4e1d4' ),
	new EikeDot( 56, 540, 60, '#ffffff', '#d4e0d3' ),
	new EikeDot( 57, 0, 90, '#ffffff', '#dde2d5' ),
	new EikeDot( 58, 30, 90, '#ffffff', '#ced8c3' ),
	new EikeDot( 59, 60, 90, '#141414', '#897862' ),
	new EikeDot( 60, 90, 90, '#141414', '#333333' ),
	new EikeDot( 61, 120, 90, '#141414', '#353433' ),
	new EikeDot( 62, 150, 90, '#141414', '#333333' ),
	new EikeDot( 63, 180, 90, '#141414', '#353433' ),
	new EikeDot( 64, 210, 90, '#141414', '#333333' ),
	new EikeDot( 65, 240, 90, '#141414', '#433b3c' ),
	new EikeDot( 66, 270, 90, '#cdcdc3', '#504141' ),
	new EikeDot( 67, 300, 90, '#141414', '#534242' ),
	new EikeDot( 68, 330, 90, '#141414', '#443b3b' ),
	new EikeDot( 69, 360, 90, '#cdcdc3', '#493d3d' ),
	new EikeDot( 70, 390, 90, '#cdcdc3', '#614b41' ),
	new EikeDot( 71, 420, 90, '#141414', '#5c4c42' ),
	new EikeDot( 72, 450, 90, '#ffffff', '#d8e3d5' ),
	new EikeDot( 73, 480, 90, '#ffffff', '#d5e3d1' ),
	new EikeDot( 74, 510, 90, '#ffffff', '#d6e2d5' ),
	new EikeDot( 75, 540, 90, '#ffffff', '#d4ded2' ),
	new EikeDot( 76, 0, 120, '#ffffff', '#c9d3c0' ),
	new EikeDot( 77, 30, 120, '#ffffff', '#ccd9c1' ),
	new EikeDot( 78, 60, 120, '#141414', '#443b3b' ),
	new EikeDot( 79, 90, 120, '#141414', '#383636' ),
	new EikeDot( 80, 120, 120, '#141414', '#353433' ),
	new EikeDot( 81, 150, 120, '#141414', '#333333' ),
	new EikeDot( 82, 180, 120, '#141414', '#333333' ),
	new EikeDot( 83, 210, 120, '#141414', '#333333' ),
	new EikeDot( 84, 240, 120, '#141414', '#333333' ),
	new EikeDot( 85, 270, 120, '#cdcdc3', '#4d4040' ),
	new EikeDot( 86, 300, 120, '#cdcdc3', '#4d4040' ),
	new EikeDot( 87, 330, 120, '#cdcdc3', '#504141' ),
	new EikeDot( 88, 360, 120, '#141414', '#55433f' ),
	new EikeDot( 89, 390, 120, '#cdcdc3', '#574540' ),
	new EikeDot( 90, 420, 120, '#cdcdc3', '#655245' ),
	new EikeDot( 91, 450, 120, '#141414', '#9f9987' ),
	new EikeDot( 92, 480, 120, '#ffffff', '#d2dfd1' ),
	new EikeDot( 93, 510, 120, '#ffffff', '#d2ded1' ),
	new EikeDot( 94, 540, 120, '#ffffff', '#d4ded1' ),
	new EikeDot( 95, 0, 150, '#ffffff', '#ced9c6' ),
	new EikeDot( 96, 30, 150, '#ffffff', '#ccd6c0' ),
	new EikeDot( 97, 60, 150, '#141414', '#333333' ),
	new EikeDot( 98, 90, 150, '#cdcdc3', '#493d3d' ),
	new EikeDot( 99, 120, 150, '#141414', '#333333' ),
	new EikeDot( 100, 150, 150, '#cdcdc3', '#493d3d' ),
	new EikeDot( 101, 180, 150, '#cdcdc3', '#6a4945' ),
	new EikeDot( 102, 210, 150, '#cdcdc3', '#594343' ),
	new EikeDot( 103, 240, 150, '#141414', '#433b3c' ),
	new EikeDot( 104, 270, 150, '#141414', '#423b3c' ),
	new EikeDot( 105, 300, 150, '#cdcdc3', '#4d4040' ),
	new EikeDot( 106, 330, 150, '#141414', '#333333' ),
	new EikeDot( 107, 360, 150, '#cdcdc3', '#4f4141' ),
	new EikeDot( 108, 390, 150, '#141414', '#463e3e' ),
	new EikeDot( 109, 420, 150, '#cdcdc3', '#493d3d' ),
	new EikeDot( 110, 450, 150, '#cdcdc3', '#604c42' ),
	new EikeDot( 111, 480, 150, '#ffffff', '#d4e1d4' ),
	new EikeDot( 112, 510, 150, '#ffffff', '#d6e0d4' ),
	new EikeDot( 113, 540, 150, '#ffffff', '#d0ddd0' ),
	new EikeDot( 114, 0, 180, '#ffffff', '#ccd6c5' ),
	new EikeDot( 115, 30, 180, '#ffffff', '#ced7c3' ),
	new EikeDot( 116, 60, 180, '#cdcdc3', '#564640' ),
	new EikeDot( 117, 90, 180, '#141414', '#333333' ),
	new EikeDot( 118, 120, 180, '#141414', '#3e3939' ),
	new EikeDot( 119, 150, 180, '#fae100', '#7f5845' ),
	new EikeDot( 120, 180, 180, '#fae100', '#704c43' ),
	new EikeDot( 121, 210, 180, '#fae100', '#976b52' ),
	new EikeDot( 122, 240, 180, '#fae100', '#815046' ),
	new EikeDot( 123, 270, 180, '#cdcdc3', '#694947' ),
	new EikeDot( 124, 300, 180, '#141414', '#734f46' ),
	new EikeDot( 125, 330, 180, '#141414', '#3c3939' ),
	new EikeDot( 126, 360, 180, '#141414', '#333333' ),
	new EikeDot( 127, 390, 180, '#141414', '#443b3b' ),
	new EikeDot( 128, 420, 180, '#141414', '#3c3939' ),
	new EikeDot( 129, 450, 180, '#141414', '#483d3d' ),
	new EikeDot( 130, 480, 180, '#ffffff', '#d8e3d6' ),
	new EikeDot( 131, 510, 180, '#ffffff', '#d6e0d3' ),
	new EikeDot( 132, 540, 180, '#ffffff', '#d0ddd0' ),
	new EikeDot( 133, 0, 210, '#ffffff', '#ccd6c2' ),
	new EikeDot( 134, 30, 210, '#ffffff', '#ced8c2' ),
	new EikeDot( 135, 60, 210, '#141414', '#3c3939' ),
	new EikeDot( 136, 90, 210, '#141414', '#333333' ),
	new EikeDot( 137, 120, 210, '#141414', '#333333' ),
	new EikeDot( 138, 150, 210, '#fae100', '#937450' ),
	new EikeDot( 139, 180, 210, '#fae100', '#9d835a' ),
	new EikeDot( 140, 210, 210, '#fae100', '#a99270' ),
	new EikeDot( 141, 240, 210, '#fae100', '#b79f7d' ),
	new EikeDot( 142, 270, 210, '#fae100', '#b59f83' ),
	new EikeDot( 143, 300, 210, '#fae100', '#b5a388' ),
	new EikeDot( 144, 330, 210, '#fae100', '#b8a58f' ),
	new EikeDot( 145, 360, 210, '#fae100', '#a98d6f' ),
	new EikeDot( 146, 390, 210, '#fae100', '#9b6b52' ),
	new EikeDot( 147, 420, 210, '#cdcdc3', '#5d4545' ),
	new EikeDot( 148, 450, 210, '#141414', '#5d4a41' ),
	new EikeDot( 149, 480, 210, '#ffffff', '#d2ded1' ),
	new EikeDot( 150, 510, 210, '#ffffff', '#d6e0d4' ),
	new EikeDot( 151, 540, 210, '#ffffff', '#cbd5cb' ),
	new EikeDot( 152, 0, 240, '#ffffff', '#d0d8c6' ),
	new EikeDot( 153, 30, 240, '#ffffff', '#d0d9c9' ),
	new EikeDot( 154, 60, 240, '#141414', '#333333' ),
	new EikeDot( 155, 90, 240, '#141414', '#333333' ),
	new EikeDot( 156, 120, 240, '#fae100', '#86624c' ),
	new EikeDot( 157, 150, 240, '#fae100', '#9c7e57' ),
	new EikeDot( 158, 180, 240, '#fae100', '#a98d69' ),
	new EikeDot( 159, 210, 240, '#fae100', '#956d52' ),
	new EikeDot( 160, 240, 240, '#fae100', '#9a7b57' ),
	new EikeDot( 161, 270, 240, '#fae100', '#a68e6b' ),
	new EikeDot( 162, 300, 240, '#fae100', '#a98a68' ),
	new EikeDot( 163, 330, 240, '#fae100', '#af9675' ),
	new EikeDot( 164, 360, 240, '#fae100', '#b29c7c' ),
	new EikeDot( 165, 390, 240, '#fae100', '#af9f7c' ),
	new EikeDot( 166, 420, 240, '#fae100', '#b7ad8c' ),
	new EikeDot( 167, 450, 240, '#cdcdc3', '#6a5b4e' ),
	new EikeDot( 168, 480, 240, '#ffffff', '#d6e2d5' ),
	new EikeDot( 169, 510, 240, '#ffffff', '#d2dfd1' ),
	new EikeDot( 170, 540, 240, '#ffffff', '#d8e4d5' ),
	new EikeDot( 171, 0, 270, '#ffffff', '#ced9c7' ),
	new EikeDot( 172, 30, 270, '#ffffff', '#d0d9c4' ),
	new EikeDot( 173, 60, 270, '#cdcdc3', '#5d4545' ),
	new EikeDot( 174, 90, 270, '#141414', '#383636' ),
	new EikeDot( 175, 120, 270, '#fae100', '#9a7b55' ),
	new EikeDot( 176, 150, 270, '#fae100', '#997954' ),
	new EikeDot( 177, 180, 270, '#fae100', '#8e6a4f' ),
	new EikeDot( 178, 210, 270, '#fae100', '#967358' ),
	new EikeDot( 179, 240, 270, '#fae100', '#8e6249' ),
	new EikeDot( 180, 270, 270, '#fae100', '#6d4a47' ),
	new EikeDot( 181, 300, 270, '#fae100', '#935f48' ),
	new EikeDot( 182, 330, 270, '#fae100', '#9d7553' ),
	new EikeDot( 183, 360, 270, '#fae100', '#814f47' ),
	new EikeDot( 184, 390, 270, '#fae100', '#704a48' ),
	new EikeDot( 185, 420, 270, '#fae100', '#6b4a46' ),
	new EikeDot( 186, 450, 270, '#cdcdc3', '#918f7a' ),
	new EikeDot( 187, 480, 270, '#ffffff', '#d3e0d4' ),
	new EikeDot( 188, 510, 270, '#ffffff', '#d6e3d5' ),
	new EikeDot( 189, 540, 270, '#ffffff', '#d4e0d3' ),
	new EikeDot( 190, 0, 300, '#ffffff', '#ccd8c4' ),
	new EikeDot( 191, 30, 300, '#ffffff', '#c9d7c1' ),
	new EikeDot( 192, 60, 300, '#fae100', '#9e7058' ),
	new EikeDot( 193, 90, 300, '#141414', '#554141' ),
	new EikeDot( 194, 120, 300, '#fae100', '#957452' ),
	new EikeDot( 195, 150, 300, '#fae100', '#936b4f' ),
	new EikeDot( 196, 180, 300, '#fae100', '#5f4545' ),
	new EikeDot( 197, 210, 300, '#fae100', '#987e67' ),
	new EikeDot( 198, 240, 300, '#cdcdc3', '#92806f' ),
	new EikeDot( 199, 270, 300, '#141414', '#493d3d' ),
	new EikeDot( 200, 300, 300, '#fae100', '#a88363' ),
	new EikeDot( 201, 330, 300, '#fae100', '#b49f89' ),
	new EikeDot( 202, 360, 300, '#fae100', '#694848' ),
	new EikeDot( 203, 390, 300, '#cdcdc3', '#aaa392' ),
	new EikeDot( 204, 420, 300, '#141414', '#333333' ),
	new EikeDot( 205, 450, 300, '#fae100', '#b9c2b4' ),
	new EikeDot( 206, 480, 300, '#ffffff', '#d2dfcf' ),
	new EikeDot( 207, 510, 300, '#ffffff', '#cbd8cb' ),
	new EikeDot( 208, 540, 300, '#ffffff', '#d6e0d4' ),
	new EikeDot( 209, 0, 330, '#ffffff', '#c7cfbd' ),
	new EikeDot( 210, 30, 330, '#ffffff', '#cdd2be' ),
	new EikeDot( 211, 60, 330, '#fae100', '#986d54' ),
	new EikeDot( 212, 90, 330, '#fae100', '#886451' ),
	new EikeDot( 213, 120, 330, '#fae100', '#9d7855' ),
	new EikeDot( 214, 150, 330, '#fae100', '#927453' ),
	new EikeDot( 215, 180, 330, '#fae100', '#997656' ),
	new EikeDot( 216, 210, 330, '#fae100', '#9e735c' ),
	new EikeDot( 217, 240, 330, '#fae100', '#784948' ),
	new EikeDot( 218, 270, 330, '#fae100', '#a58f6f' ),
	new EikeDot( 219, 300, 330, '#fae100', '#b39977' ),
	new EikeDot( 220, 330, 330, '#fae100', '#bdaa95' ),
	new EikeDot( 221, 360, 330, '#fae100', '#b19b77' ),
	new EikeDot( 222, 390, 330, '#fae100', '#9d6753' ),
	new EikeDot( 223, 420, 330, '#fae100', '#9e826b' ),
	new EikeDot( 224, 450, 330, '#fae100', '#d0ddd1' ),
	new EikeDot( 225, 480, 330, '#ffffff', '#d4ded1' ),
	new EikeDot( 226, 510, 330, '#ffffff', '#d0ddd1' ),
	new EikeDot( 227, 540, 330, '#ffffff', '#cdd9cc' ),
	new EikeDot( 228, 0, 360, '#ffffff', '#cad6c2' ),
	new EikeDot( 229, 30, 360, '#ffffff', '#c9d2be' ),
	new EikeDot( 230, 60, 360, '#fae100', '#a48468' ),
	new EikeDot( 231, 90, 360, '#fae100', '#795647' ),
	new EikeDot( 232, 120, 360, '#fae100', '#947251' ),
	new EikeDot( 233, 150, 360, '#fae100', '#a27e5b' ),
	new EikeDot( 234, 180, 360, '#fae100', '#a68367' ),
	new EikeDot( 235, 210, 360, '#fae100', '#b89983' ),
	new EikeDot( 236, 240, 360, '#fae100', '#b89e80' ),
	new EikeDot( 237, 270, 360, '#fae100', '#af9675' ),
	new EikeDot( 238, 300, 360, '#fae100', '#b09776' ),
	new EikeDot( 239, 330, 360, '#fae100', '#c7b2a0' ),
	new EikeDot( 240, 360, 360, '#fae100', '#ab8667' ),
	new EikeDot( 241, 390, 360, '#fae100', '#af9881' ),
	new EikeDot( 242, 420, 360, '#fae100', '#a68d6f' ),
	new EikeDot( 243, 450, 360, '#ffffff', '#ccdbcc' ),
	new EikeDot( 244, 480, 360, '#ffffff', '#cdd7cd' ),
	new EikeDot( 245, 510, 360, '#ffffff', '#c7d4c8' ),
	new EikeDot( 246, 540, 360, '#ffffff', '#cad7c9' ),
	new EikeDot( 247, 0, 390, '#ffffff', '#c9d2be' ),
	new EikeDot( 248, 30, 390, '#ffffff', '#ccd8c2' ),
	new EikeDot( 249, 60, 390, '#fae100', '#9ea389' ),
	new EikeDot( 250, 90, 390, '#141414', '#694b45' ),
	new EikeDot( 251, 120, 390, '#fae100', '#87614c' ),
	new EikeDot( 252, 150, 390, '#fae100', '#986d54' ),
	new EikeDot( 253, 180, 390, '#fae100', '#ad8b74' ),
	new EikeDot( 254, 210, 390, '#fae100', '#b79881' ),
	new EikeDot( 255, 240, 390, '#fae100', '#ac8d6f' ),
	new EikeDot( 256, 270, 390, '#fae100', '#b69173' ),
	new EikeDot( 257, 300, 390, '#fae100', '#b9a18a' ),
	new EikeDot( 258, 330, 390, '#fae100', '#b19679' ),
	new EikeDot( 259, 360, 390, '#fae100', '#ad9476' ),
	new EikeDot( 260, 390, 390, '#fae100', '#a8896b' ),
	new EikeDot( 261, 420, 390, '#fae100', '#af8d75' ),
	new EikeDot( 262, 450, 390, '#ffffff', '#ced7c8' ),
	new EikeDot( 263, 480, 390, '#ffffff', '#d4e0d3' ),
	new EikeDot( 264, 510, 390, '#ffffff', '#ccdac9' ),
	new EikeDot( 265, 540, 390, '#ffffff', '#d4e1d1' ),
	new EikeDot( 266, 0, 420, '#ffffff', '#c7d2bd' ),
	new EikeDot( 267, 30, 420, '#ffffff', '#c9d1bc' ),
	new EikeDot( 268, 60, 420, '#cdcdc3', '#91917f' ),
	new EikeDot( 269, 90, 420, '#cdcdc3', '#6a4f44' ),
	new EikeDot( 270, 120, 420, '#141414', '#5f4544' ),
	new EikeDot( 271, 150, 420, '#fae100', '#8c5e4a' ),
	new EikeDot( 272, 180, 420, '#fae100', '#a57d66' ),
	new EikeDot( 273, 210, 420, '#fae100', '#a47c62' ),
	new EikeDot( 274, 240, 420, '#fae100', '#9a5d4b' ),
	new EikeDot( 275, 270, 420, '#fae100', '#895345' ),
	new EikeDot( 276, 300, 420, '#fae100', '#483d3d' ),
	new EikeDot( 277, 330, 420, '#fae100', '#4d4040' ),
	new EikeDot( 278, 360, 420, '#fae100', '#504141' ),
	new EikeDot( 279, 390, 420, '#fae100', '#7e4b4a' ),
	new EikeDot( 280, 420, 420, '#fae100', '#a06d58' ),
	new EikeDot( 281, 450, 420, '#ffffff', '#cddacb' ),
	new EikeDot( 282, 480, 420, '#ffffff', '#cbd8cb' ),
	new EikeDot( 283, 510, 420, '#ffffff', '#cedcca' ),
	new EikeDot( 284, 540, 420, '#ffffff', '#cad9c9' ),
	new EikeDot( 285, 0, 450, '#ffffff', '#cbd4be' ),
	new EikeDot( 286, 30, 450, '#ffffff', '#c9d2bc' ),
	new EikeDot( 287, 60, 450, '#141414', '#a4a894' ),
	new EikeDot( 288, 90, 450, '#cdcdc3', '#5b4442' ),
	new EikeDot( 289, 120, 450, '#cdcdc3', '#604743' ),
	new EikeDot( 290, 150, 450, '#fae100', '#8f614d' ),
	new EikeDot( 291, 180, 450, '#fae100', '#976e54' ),
	new EikeDot( 292, 210, 450, '#fae100', '#975c4b' ),
	new EikeDot( 293, 240, 450, '#fae100', '#8e654f' ),
	new EikeDot( 294, 270, 450, '#141414', '#8e6550' ),
	new EikeDot( 295, 300, 450, '#141414', '#4d4040' ),
	new EikeDot( 296, 330, 450, '#141414', '#4d4040' ),
	new EikeDot( 297, 360, 450, '#141414', '#584242' ),
	new EikeDot( 298, 390, 450, '#141414', '#564040' ),
	new EikeDot( 299, 420, 450, '#fae100', '#895046' ),
	new EikeDot( 300, 450, 450, '#ffffff', '#d1dece' ),
	new EikeDot( 301, 480, 450, '#ffffff', '#ccdacb' ),
	new EikeDot( 302, 510, 450, '#ffffff', '#ccdac9' ),
	new EikeDot( 303, 540, 450, '#ffffff', '#cad7c6' ),
	new EikeDot( 304, 0, 480, '#ffffff', '#c9cfbc' ),
	new EikeDot( 305, 30, 480, '#ffffff', '#cdcdb8' ),
	new EikeDot( 306, 60, 480, '#141414', '#836654' ),
	new EikeDot( 307, 90, 480, '#141414', '#3e3939' ),
	new EikeDot( 308, 120, 480, '#141414', '#504142' ),
	new EikeDot( 309, 150, 480, '#fae100', '#624746' ),
	new EikeDot( 310, 180, 480, '#fae100', '#95674d' ),
	new EikeDot( 311, 210, 480, '#fae100', '#554141' ),
	new EikeDot( 312, 240, 480, '#141414', '#674844' ),
	new EikeDot( 313, 270, 480, '#cdcdc3', '#5d4645' ),
	new EikeDot( 314, 300, 480, '#cdcdc3', '#5e4545' ),
	new EikeDot( 315, 330, 480, '#cdcdc3', '#5e4545' ),
	new EikeDot( 316, 360, 480, '#cdcdc3', '#483d3d' ),
	new EikeDot( 317, 390, 480, '#141414', '#333333' ),
	new EikeDot( 318, 420, 480, '#cdcdc3', '#584440' ),
	new EikeDot( 319, 450, 480, '#ffffff', '#cbd8ca' ),
	new EikeDot( 320, 480, 480, '#ffffff', '#cad7c9' ),
	new EikeDot( 321, 510, 480, '#ffffff', '#c8d7c6' ),
	new EikeDot( 322, 540, 480, '#ffffff', '#c8d7c4' ),
	new EikeDot( 323, 0, 510, '#ffffff', '#bcc0af' ),
	new EikeDot( 324, 30, 510, '#141414', '#624645' ),
	new EikeDot( 325, 60, 510, '#fae100', '#977154' ),
	new EikeDot( 326, 90, 510, '#141414', '#353433' ),
	new EikeDot( 327, 120, 510, '#141414', '#333333' ),
	new EikeDot( 328, 150, 510, '#fae100', '#504141' ),
	new EikeDot( 329, 180, 510, '#fae100', '#634744' ),
	new EikeDot( 330, 210, 510, '#141414', '#3c3939' ),
	new EikeDot( 331, 240, 510, '#fae100', '#855946' ),
	new EikeDot( 332, 270, 510, '#cdcdc3', '#7b4a4a' ),
	new EikeDot( 333, 300, 510, '#cdcdc3', '#864c4d' ),
	new EikeDot( 334, 330, 510, '#cdcdc3', '#90474e' ),
	new EikeDot( 335, 360, 510, '#cdcdc3', '#785248' ),
	new EikeDot( 336, 390, 510, '#141414', '#333333' ),
	new EikeDot( 337, 420, 510, '#141414', '#858679' ),
	new EikeDot( 338, 450, 510, '#ffffff', '#ccd7c9' ),
	new EikeDot( 339, 480, 510, '#ffffff', '#c8d7c9' ),
	new EikeDot( 340, 510, 510, '#ffffff', '#cad6c4' ),
	new EikeDot( 341, 540, 510, '#ffffff', '#c9d7c3' ),
	new EikeDot( 342, 0, 540, '#cdcdc3', '#aeada1' ),
	new EikeDot( 343, 30, 540, '#141414', '#3e3939' ),
	new EikeDot( 344, 60, 540, '#fae100', '#7e5346' ),
	new EikeDot( 345, 90, 540, '#141414', '#333333' ),
	new EikeDot( 346, 120, 540, '#141414', '#383636' ),
	new EikeDot( 347, 150, 540, '#cdcdc3', '#333333' ),
	new EikeDot( 348, 180, 540, '#141414', '#333333' ),
	new EikeDot( 349, 210, 540, '#141414', '#3e3939' ),
	new EikeDot( 350, 240, 540, '#fae100', '#694b44' ),
	new EikeDot( 351, 270, 540, '#fae100', '#694945' ),
	new EikeDot( 352, 300, 540, '#141414', '#3e3939' ),
	new EikeDot( 353, 330, 540, '#141414', '#333333' ),
	new EikeDot( 354, 360, 540, '#fae100', '#4c3f3f' ),
	new EikeDot( 355, 390, 540, '#141414', '#433b3c' ),
	new EikeDot( 356, 420, 540, '#ffffff', '#cad9cb' ),
	new EikeDot( 357, 450, 540, '#ffffff', '#cad6c6' ),
	new EikeDot( 358, 480, 540, '#ffffff', '#d4e4d5' ),
	new EikeDot( 359, 510, 540, '#ffffff', '#c5d3be' ),
	new EikeDot( 360, 540, 540, '#ffffff', '#c8d5c1' ),
	new EikeDot( 361, 0, 570, '#cdcdc3', '#c2c5b6' ),
	new EikeDot( 362, 30, 570, '#cdcdc3', '#b3b0a1' ),
	new EikeDot( 363, 60, 570, '#141414', '#5f4845' ),
	new EikeDot( 364, 90, 570, '#141414', '#423b3c' ),
	new EikeDot( 365, 120, 570, '#141414', '#333333' ),
	new EikeDot( 366, 150, 570, '#141414', '#333333' ),
	new EikeDot( 367, 180, 570, '#141414', '#333333' ),
	new EikeDot( 368, 210, 570, '#141414', '#524341' ),
	new EikeDot( 369, 240, 570, '#fae100', '#72564a' ),
	new EikeDot( 370, 270, 570, '#141414', '#5b4443' ),
	new EikeDot( 371, 300, 570, '#fae100', '#5b4444' ),
	new EikeDot( 372, 330, 570, '#fae100', '#4d4040' ),
	new EikeDot( 373, 360, 570, '#fae100', '#574540' ),
	new EikeDot( 374, 390, 570, '#141414', '#64574f' ),
	new EikeDot( 375, 420, 570, '#cdcdc3', '#bec8b7' ),
	new EikeDot( 376, 450, 570, '#ffffff', '#c6d5c2' ),
	new EikeDot( 377, 480, 570, '#ffffff', '#ccdac8' ),
	new EikeDot( 378, 510, 570, '#ffffff', '#c5d3be' ),
	new EikeDot( 379, 540, 570, '#ffffff', '#c1d0ba' ),
	new EikeDot( 380, 0, 600, '#cdcdc3', '#d7d6d7' ),
	new EikeDot( 381, 30, 600, '#cdcdc3', '#bfc0b4' ),
	new EikeDot( 382, 60, 600, '#141414', '#333333' ),
	new EikeDot( 383, 90, 600, '#fae100', '#734b45' ),
	new EikeDot( 384, 120, 600, '#141414', '#333333' ),
	new EikeDot( 385, 150, 600, '#cdcdc3', '#333333' ),
	new EikeDot( 386, 180, 600, '#141414', '#3c3939' ),
	new EikeDot( 387, 210, 600, '#141414', '#534242' ),
	new EikeDot( 388, 240, 600, '#141414', '#4f423e' ),
	new EikeDot( 389, 270, 600, '#141414', '#333333' ),
	new EikeDot( 390, 300, 600, '#141414', '#333333' ),
	new EikeDot( 391, 330, 600, '#141414', '#333333' ),
	new EikeDot( 392, 360, 600, '#141414', '#3e3939' ),
	new EikeDot( 393, 390, 600, '#cdcdc3', '#abafa0' ),
	new EikeDot( 394, 420, 600, '#cdcdc3', '#b6bbb1' ),
	new EikeDot( 395, 450, 600, '#cdcdc3', '#b9c2b5' ),
	new EikeDot( 396, 480, 600, '#ffffff', '#bac5b6' ),
	new EikeDot( 397, 510, 600, '#ffffff', '#b9c6b3' ),
	new EikeDot( 398, 540, 600, '#ffffff', '#b8c2b1' ),
	new EikeDot( 399, 0, 630, '#cdcdc3', '#cccbc2' ),
	new EikeDot( 400, 30, 630, '#cdcdc3', '#b5b3a7' ),
	new EikeDot( 401, 60, 630, '#141414', '#333333' ),
	new EikeDot( 402, 90, 630, '#141414', '#353433' ),
	new EikeDot( 403, 120, 630, '#fae100', '#5f4545' ),
	new EikeDot( 404, 150, 630, '#141414', '#333333' ),
	new EikeDot( 405, 180, 630, '#141414', '#333333' ),
	new EikeDot( 406, 210, 630, '#141414', '#333333' ),
	new EikeDot( 407, 240, 630, '#141414', '#353433' ),
	new EikeDot( 408, 270, 630, '#cdcdc3', '#333333' ),
	new EikeDot( 409, 300, 630, '#cdcdc3', '#333333' ),
	new EikeDot( 410, 330, 630, '#cdcdc3', '#333333' ),
	new EikeDot( 411, 360, 630, '#fae100', '#a9a495' ),
	new EikeDot( 412, 390, 630, '#cdcdc3', '#b0b1a4' ),
	new EikeDot( 413, 420, 630, '#cdcdc3', '#adb0a3' ),
	new EikeDot( 414, 450, 630, '#cdcdc3', '#b1b0a8' ),
	new EikeDot( 415, 480, 630, '#cdcdc3', '#aeb2a5' ),
	new EikeDot( 416, 510, 630, '#ffffff', '#bac5b6' ),
	new EikeDot( 417, 540, 630, '#ffffff', '#b2bba7' ),
	new EikeDot( 418, 0, 660, '#cdcdc3', '#bebbb2' ),
	new EikeDot( 419, 30, 660, '#cdcdc3', '#d8d6d4' ),
	new EikeDot( 420, 60, 660, '#cdcdc3', '#acaea2' ),
	new EikeDot( 421, 90, 660, '#141414', '#333333' ),
	new EikeDot( 422, 120, 660, '#fae100', '#5b4444' ),
	new EikeDot( 423, 150, 660, '#fae100', '#5d4545' ),
	new EikeDot( 424, 180, 660, '#141414', '#433b3c' ),
	new EikeDot( 425, 210, 660, '#141414', '#333333' ),
	new EikeDot( 426, 240, 660, '#141414', '#333333' ),
	new EikeDot( 427, 270, 660, '#141414', '#333333' ),
	new EikeDot( 428, 300, 660, '#141414', '#333333' ),
	new EikeDot( 429, 330, 660, '#fae100', '#3c3939' ),
	new EikeDot( 430, 360, 660, '#141414', '#918b7b' ),
	new EikeDot( 431, 390, 660, '#cdcdc3', '#a4a397' ),
	new EikeDot( 432, 420, 660, '#cdcdc3', '#9f9e92' ),
	new EikeDot( 433, 450, 660, '#cdcdc3', '#a0a293' ),
	new EikeDot( 434, 480, 660, '#cdcdc3', '#a3a296' ),
	new EikeDot( 435, 510, 660, '#cdcdc3', '#b2b9a8' ),
	new EikeDot( 436, 540, 660, '#141414', '#333333' ),
	new EikeDot( 437, 0, 690, '#cdcdc3', '#b6b2ac' ),
	new EikeDot( 438, 30, 690, '#cdcdc3', '#cbcbc7' ),
	new EikeDot( 439, 60, 690, '#cdcdc3', '#bcbdb3' ),
	new EikeDot( 440, 90, 690, '#141414', '#333333' ),
	new EikeDot( 441, 120, 690, '#141414', '#333333' ),
	new EikeDot( 442, 150, 690, '#fae100', '#544142' ),
	new EikeDot( 443, 180, 690, '#fae100', '#584242' ),
	new EikeDot( 444, 210, 690, '#fae100', '#383636' ),
	new EikeDot( 445, 240, 690, '#fae100', '#4a3f40' ),
	new EikeDot( 446, 270, 690, '#fae100', '#433b3c' ),
	new EikeDot( 447, 300, 690, '#fae100', '#353433' ),
	new EikeDot( 448, 330, 690, '#141414', '#4c3f3f' ),
	new EikeDot( 449, 360, 690, '#141414', '#837a71' ),
	new EikeDot( 450, 390, 690, '#cdcdc3', '#9e9a8b' ),
	new EikeDot( 451, 420, 690, '#cdcdc3', '#979181' ),
	new EikeDot( 452, 450, 690, '#cdcdc3', '#9d998a' ),
	new EikeDot( 453, 480, 690, '#cdcdc3', '#a2a193' ),
	new EikeDot( 454, 510, 690, '#141414', '#333333' ),
	new EikeDot( 455, 540, 690, '#141414', '#333333' ),
	new EikeDot( 456, 0, 720, '#cdcdc3', '#c0bab4' ),
	new EikeDot( 457, 30, 720, '#cdcdc3', '#d1cdcd' ),
	new EikeDot( 458, 60, 720, '#cdcdc3', '#b1b0a7' ),
	new EikeDot( 459, 90, 720, '#cdcdc3', '#87524b' ),
	new EikeDot( 460, 120, 720, '#141414', '#333333' ),
	new EikeDot( 461, 150, 720, '#fae100', '#554141' ),
	new EikeDot( 462, 180, 720, '#fae100', '#5e4545' ),
	new EikeDot( 463, 210, 720, '#fae100', '#674848' ),
	new EikeDot( 464, 240, 720, '#fae100', '#574242' ),
	new EikeDot( 465, 270, 720, '#fae100', '#383636' ),
	new EikeDot( 466, 300, 720, '#fae100', '#383636' ),
	new EikeDot( 467, 330, 720, '#fae100', '#3c3939' ),
	new EikeDot( 468, 360, 720, '#141414', '#37373a' ),
	new EikeDot( 469, 390, 720, '#fae100', '#8e8674' ),
	new EikeDot( 470, 420, 720, '#cdcdc3', '#8f8471' ),
	new EikeDot( 471, 450, 720, '#cdcdc3', '#938373' ),
	new EikeDot( 472, 480, 720, '#141414', '#333333' ),
	new EikeDot( 473, 510, 720, '#141414', '#333333' ),
	new EikeDot( 474, 540, 720, '#141414', '#333333' ),
	new EikeDot( 475, 0, 750, '#cdcdc3', '#bbb5b3' ),
	new EikeDot( 476, 30, 750, '#cdcdc3', '#cac6c3' ),
	new EikeDot( 477, 60, 750, '#cdcdc3', '#b4b1a9' ),
	new EikeDot( 478, 90, 750, '#cdcdc3', '#b2aea7' ),
	new EikeDot( 479, 120, 750, '#141414', '#353433' ),
	new EikeDot( 480, 150, 750, '#141414', '#333333' ),
	new EikeDot( 481, 180, 750, '#fae100', '#534242' ),
	new EikeDot( 482, 210, 750, '#fae100', '#5f4545' ),
	new EikeDot( 483, 240, 750, '#fae100', '#5d4645' ),
	new EikeDot( 484, 270, 750, '#fae100', '#584242' ),
	new EikeDot( 485, 300, 750, '#fae100', '#564040' ),
	new EikeDot( 486, 330, 750, '#fae100', '#544242' ),
	new EikeDot( 487, 360, 750, '#141414', '#333333' ),
	new EikeDot( 488, 390, 750, '#fae100', '#80705f' ),
	new EikeDot( 489, 420, 750, '#fae100', '#807261' ),
	new EikeDot( 490, 450, 750, '#141414', '#333333' ),
	new EikeDot( 491, 480, 750, '#141414', '#333333' ),
	new EikeDot( 492, 510, 750, '#141414', '#333333' ),
	new EikeDot( 493, 540, 750, '#141414', '#333333' )
];


var hitOptions = {
	// fill: true,
	center: true,
	tolerance: EikeDotRadius/2
	// visible: true
};
var hitPath;

var clipGroup = [];
var clipCount = 0;



// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------
function Setup() {
	// Eike = new paper.Raster('eike');
	// Eike = new paper.Raster('eike@2');

	// Eike.position = view.bounds.center;


	// overall size of illustration
	EikeSize.width = 19*(EikeDotRadius);
	EikeSize.height = 26*(EikeDotRadius);

	var translation = new Point(
		(view.bounds.width/2)-(EikeSize.width/2),
		(view.bounds.height/2)-(EikeSize.height/2)+18
	);


	// initial dots
	var EikeMask = new Group();
	for( var i=0; i<EikeDots.length; i++ ) {
		var point = new Point(
			(EikeDots[i].x+EikeDotRadius/2) + translation.x,
			(EikeDots[i].y+EikeDotRadius/2) + translation.y
		);
		var path = new Path.Circle( point, EikeDotRadius/2 );
		path.fillColor = EikeDots[i].color1;
		path.strokeColor = null;
	}

	// for( var i=0; i<400; i++ ) {
	// 	// mask
	// 	var point = new Point(
	// 		(EikeDots[i].x+EikeDotRadius/2) + translation.x,
	// 		(EikeDots[i].y+EikeDotRadius/2) + translation.y
	// 	);
	// 	var circle = new Path.Circle( point, EikeDotRadius/2 );
	// 	circle.clipMask = true;
	// 	if(i == 0) {
	// 		clipGroup[i] = new Group(circle, Eike);
	// 	}
	// 	else {
	// 		clipGroup[i] = new Group(circle, Eike.clone());
	// 	}
	// 	clipGroup[i].clipped = true;
	// 	clipGroup[i].opacity = 0.99;

	// 	EikeMask.addChild( clipGroup[i] );
	// }

};



// ------------------------------------------------------------------------
// Update
// ------------------------------------------------------------------------
function Update(event) {
};



// ------------------------------------------------------------------------
// Draw
// ------------------------------------------------------------------------
function Draw() {
};



// ------------------------------------------------------------------------
// Methods
// ------------------------------------------------------------------------
function createDotMask(count, pt) {
	// mask
	var circle = new Path.Circle( t, EikeDotRadius/2 );
	circle.clipMask = true;
	if(count == 0) {
		clipGroup[count] = new Group(circle, Eike);
	}
	else {
		clipGroup[count] = new Group(circle, Eike.clone());
	}
	clipGroup[count].clipped = true;
	clipGroup[count].opacity = 0.99;
};



// ------------------------------------------------------------------------
// Events
// ------------------------------------------------------------------------
function onResize(event) {
};

function onMouseUp(event) {
};

// ------------------------------------------------------------------------
function onMouseDown(event) {
	hitPath = null;
	var hitResult = project.hitTest(event.point, hitOptions);

	if (hitResult) {
		hitPath = hitResult.item;
		var hexCol = new f.FColor().ColorToHex(hitPath.fillColor);
		if( hexCol == EikeDots[ hitPath.id-2 ].color1 ) {
			hitPath.fillColor = EikeDots[ hitPath.id-2 ].color2;
		}
		else if( hexCol == EikeDots[ hitPath.id-2 ].color2 ) {
			hitPath.visible = false;
			fillColor = EikeDots[ hitPath.id-2 ].color2;
		}
		else {
			hitPath.fillColor = EikeDots[ hitPath.id-2 ].color1;
		}
	}
};

// ------------------------------------------------------------------------
function onMouseMove(event) {
};

// ------------------------------------------------------------------------
function onMouseDrag(event) {
	hitPath = null;
	var hitResult = project.hitTest(event.point, hitOptions);

	if (hitResult) {
		hitPath = hitResult.item;
		hitPath.fillColor = EikeDots[ hitPath.id-2 ].color2;
	}
};

// ------------------------------------------------------------------------
function onKeyDown(event) {
};

function onKeyUp(event) {
};
