module.exports = function(grunt) {
	grunt.initConfig({
		watch: {
			options: {
				livereload: true,
			},
			files: [
				'index.html',
				'*.js',
				'src/*',
				'css/*'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');

};