// Generated on 2013-07-13 using generator-bootstrap-less 2.0.3
'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

// php
// https://github.com/revathskumar/yeoman-php/
var gateway = require('gateway');
var phpGateway = function (dir){
    return gateway(require('path').resolve(dir), {
        '.php': 'php-cgi'
    });
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		watch: {
			less: {
				options: {
					paths: ['<%= yeoman.app %>/styles']
				},
				files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
				tasks: ['less']
			},
			livereload: {
				files: [
					'<%= yeoman.app %>/*.html',
					'{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
					'{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
					'<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
					// # This-and-That/Baker Specific
					// https://github.com/this-and-that/
					// https://github.com/Simbul/baker
					// typefaces
					'<%= yeoman.app %>/typefaces/{,*/}*.{ttf,svg,otf,eot,woff}',
					// copy (article text)
					'<%= yeoman.app %>/copy/{,*/}*.{json,md}',
					// php
					'<%= yeoman.app %>/*.php'
				],
				tasks: ['livereload']
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
				// hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							phpGateway('app'), // php
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'app')
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, 'dist')
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.options.port %>/index.html']
				}
			}
		},
		less: {
			options: {
				paths: ['<%= yeoman.app %>/styles'],
				report: true
			},
			// http://stackoverflow.com/questions/15094667/compile-less-files-with-grunt-contrib-less-wont-work
			// http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically
			src: {
				expand: true,
				cwd:    '<%= yeoman.app %>/styles',
				src:    'main.less',
				dest:   '<%= yeoman.app %>/styles',
				ext:    '.css'
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		// not enabled since usemin task does concat and uglify
		// check index.html to edit your build targets
		// enable this task if you prefer defining your build targets here
		/*uglify: {
			dist: {}
		},*/
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
						// # This-and-That/Baker Specific
						'<%= yeoman.dist %>/typefaces/{,*/}*.{ttf,svg,otf,eot,woff}',
						'<%= yeoman.dist %>/copy/{,*/}*.{json,md}',
						'<%= yeoman.dist %>book.json'
					]
				}
			}
		},
		useminPrepare: {
			// html: '<%= yeoman.app %>/index.html',
			// build:js for all .html files
			html: '<%= yeoman.app %>/{,*/}*.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				dirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},
		cssmin: {
			dist: {
				files: {
					'<%= yeoman.dist %>/styles/main.css': [
						'.tmp/styles/{,*/}*.css',
						'<%= yeoman.app %>/styles/{,*/}*.css'
					]
				}
			}
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,txt}',
						'.htaccess',
						'images/{,*/}*.{webp,gif}',
						// # This-and-That/Baker Specific
						'typefaces/{,*/}*.{ttf,svg,otf,eot,woff}',
						'copy/{,*/}*.{json,md}',
						'book.json'
					]
				}]
			},
			server: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>/bower_components/bootstrap/img/',
					dest: '<%= yeoman.app %>/images/',
					src: ['*']
				}]
			}
		},
		concurrent: {
			dist: [
				'less',
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		}
	});

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'less',
			'copy:server',
			'livereload-start',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'less',
		'copy:server',
		'connect:test',
		'mocha'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'copy:server',
		'useminPrepare',
		'concurrent',
		'cssmin',
		'concat',
		'uglify',
		'copy',
		'rev',
		'usemin'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);
};
