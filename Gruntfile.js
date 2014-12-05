module.exports = function(grunt) {

	grunt.registerTask('default', ['watch']);

	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: {
					'public/css/index.css' : 'public/css/index.scss'
				}
			}
		},
		watch: {
			scss: {
				files: [
					'public/css/index.scss'
				],
				tasks: ['sass']
			},
			livereload: {
				options: {
					livereload: true,
				},
				files: [
					'public/css/index.css',
					'public/*.js'
				]

			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',['watch']);

};