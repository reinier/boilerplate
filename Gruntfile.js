module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			build: {
		        files: {
		            './public/css/site.css': './src/site.scss'
		        }
		    }
	    },
		watch: {
			build: {
				files: ['src/*.scss','src/*.html','src/html_includes/*.html'],
				tasks: ['sass','cssmin','bake']
			},
		},
		cssmin: {
			combine: {
				files: {
					'./public/css/full.min.css': ['./bower_components/normalize.css/normalize.css','./public/css/site.css']
				}
			}
		},
		bake: {
	        build: {
	            files: [{
			        expand: true,
			        cwd: './src',
			        src: ['*.html'],
			        dest: './public',
			        ext: '.html'
				}]
	        },
	    },
		connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    base: './public',
                    open: true
                }
            }
        }
	});

	grunt.registerTask('default',['watch:build']);
	grunt.registerTask('render',['sass','cssmin','bake']);
	grunt.registerTask('serve', ['connect:server','default']);
};
