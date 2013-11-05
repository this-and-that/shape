module.exports = function(grunt) {
	// properties
	var pkg = grunt.file.readJSON("package.json");

	var name = '<%= pkg.filename %>';
	var srcFiles = [
		'./src/Core/*.js',

		'./src/FTime/FTime.js',
		'./src/FTime/Easing.js',
		'./src/FTime/FDate.js',
		'./src/FTime/FStepper.js',
		'./src/FTime/FStopwatch.js',

		'./src/FIO/*.js',

		'./src/F3D/Matrix3D.js',
		'./src/F3D/F3D.js',
		'./src/F3D/FPath3.js',
		'./src/F3D/FPath3Constructors.js',
		'./src/F3D/FPoint3.js',
		'./src/F3D/FScene3.js',
		'./src/F3D/FSize3.js',

		'./src/Extensions/*.js',
	];

	grunt.initConfig({
		// Metadata
		pkg : grunt.file.readJSON('package.json'),
		banner: grunt.file.read('./src/header.js')
			.replace(/@VERSION/, pkg.version)
			.replace(/@DATE/, grunt.template.today('dd. mmmm yyyy')),

		// Configure each task
		// jshint: {
		// 	options: {
		// 		curly: false,
		// 		quotmark: true,
		// 		asi: true,
		// 		trailing: true,
		// 		eqeqeq: false
		// 	},
		// 	target: {
		// 		src: ['src/**/*.js']
		// 	}
		// },

		concat: {
			options: {
				banner: '<%= banner %>',
			},
			paper: {
				dest: 'distribution/paper.' + name + '.js',
				src: ['./src/header.js', './src/folio.js', srcFiles]
			},
			scriptographer: {
				dest: 'distribution/scriptographer.' + name + '.js',
				src: ['./src/header.js', './src/folio-scriptographer.js', srcFiles]
			}
		},

		uglify: {
			options: {
				banner: '<%= banner %>',
				report: 'min'
			},
			paper: {
				src: '<%= concat.paper.dest %>',
				dest: 'distribution/paper.' + name + '.min.js'
			},
			scriptographer: {
				src: '<%= concat.scriptographer.dest %>',
				dest: 'distribution/scriptographer.' + name + '.min.js'
			}
		},

		jsdoc: {
			dist: {
				src: srcFiles,
				options: {
					destination: 'documentation'
				}
			}
		}

	});


	// load the NPM modules
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-jsdoc');

	// register tasks
	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('paper', ['concat:paper', 'uglify:paper']);
	grunt.registerTask('scriptographer', ['concat:scriptographer', 'uglify:scriptographer']);

	grunt.registerTask('doc', ['jsdoc']);
};
