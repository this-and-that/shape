/**
 *	helpers.js
 *
 *	Ken Frederick
 *	ken.frederick@gmx.de
 *
 *	http://kennethfrederick.de/
 *	http://blog.kennethfrederick.de/
 *
 */


module.exports.register = function(Handlebars, options) {

	// /**
	//  * {{md-p}}
	//  *
	//  * Include markdown content from the specified path,
	//  * and render a specific <p> index to HTML.
	//  *
	//  * @param  {[type]} path  [description]
	//  * @param  {[type]} index [description]
	//  * @return {[type]}       [description]
	//  * @example:
	//  *   {{md-p ../path/to/file.md 0}}
	//  */
	// Handlebars.registerHelper("md-p", function (path,index) {
	// 	var content = Glob.globFiles(path);
	// 	var tmpl = Handlebars.compile(content);
	// 	var md = tmpl(this);

	// 	if (index != undefined) {
	// 		var p = md.split('\n\n')[index];
	// 		var html = Markdown.convert(p);
	// 		return new Utils.safeString(html);
	// 	}
	// 	else {
	// 		return md.split('\n\n').length;
	// 	}
	// });

	/**
	 * {{atIndex}}
	 *
	 * Return the collection element at the given index
	 *
	 * @param  {[type]} arr  [description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 * @example:
	 *   {{index arr 0}}
	 */
 	Handlebars.registerHelper("atIndex", function (arr,index) {
		var a = [].concat(arr);
		return (index != undefined)
			? a[index]
			: a[0];
	});


	/**
	 * {{split}}
	 *
	 * Return part of string based on the split token,
	 * at the given index
	 *
	 * @param  {[type]} str   [description]
	 * @param  {[type]} token [description]
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 * @example:
	 *   {{index arr 0}}
	 */
 	Handlebars.registerHelper("split", function (str,token,index) {
 		index = (index != undefined) ? index : 0;
 		token = (token && typeof token === "string") ? token : " ";
		if(str && typeof str === "string") {
			return str.split(token)[index];
		}
	});

};




