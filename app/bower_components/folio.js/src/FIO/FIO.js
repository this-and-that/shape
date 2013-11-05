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


