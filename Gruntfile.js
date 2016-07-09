// JavaScript Document
module.exports = function(grunt){
	'use strict';
    grunt.initConfig({
	jshint:{
		options:{
		  "curly": true,
		  "eqnull": true,
		  "eqeqeq": true,
		  "globals": {
			"jQuery": true
		  }
		},
		bin:[],
		js:['source/public/js/page/**/*']
	},
		clean:{
			public:['dist/public/js/**/*','dist/public/css/**/*','dist/public/img/**/*','dist/public/font/**/*'],
			html:['dist/application/views/page/**/*'],
			control:['dist/application/controllers/**/*']
			},
		copy:{
			font:{expand: true, src: ['**'],cwd: 'source/public/font/', dest: 'dist/public/font/'},
			html:{expand: true, src: ['**'],cwd: 'source/application/views/page/', dest: 'dist/application/views/page/'},
			control:{expand: true, src: ['**'],cwd: 'source/application/controllers/', dest: 'dist/application/controllers/'}
			},
        cssmin: {
            options: {                                       //配置
                stripBanners:true,
                banner: '/*! This is the grunt test ' +      //添加自定义的banner
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            basic: {cwd: 'source/public/css/', src: ['*.css'], dest: 'dist/public/css/css.css'}
        },
        uglify: {
            options: {
                banner: '/*! This is uglify test - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
			bin: {src: ['source/public/js/bin/**/*'], dest: 'source/public/js/cache/bin.js'},
			page: {src: ['source/public/js/page/**/*'], dest: 'source/public/js/cache/page.js'},
			thirdParty:{src: ['source/public/js/thirdParty/**/*'], dest: 'source/public/js/cache/thirdParty.js'},
			end:{src: ['source/public/js/cache/bin.js','source/public/js/cache/thirdParty.js','source/public/js/cache/page.js'], dest: 'dist/public/js/js.js'}
            },
		htmlmin:{
			options: {
                removeComments: true,
				 removeCommentsFromCDATA: true,
				 collapseWhitespace: true,
				 collapseBooleanAttributes: true,
				 removeAttributeQuotes: true,
				 removeRedundantAttributes: true,
				 useShortDoctype: true,
				 removeEmptyAttributes: true,
				 removeOptionalTags: true
            },
			html:{
				 expand: true, cwd: 'html', src: ['*.html'], dest: 'dist/html'
			}
			},
		imagemin:{
         options: {
            optimizationLevel: 7,
            pngquant: true
          },
			img:{
				 expand: true, cwd: 'source/public/img/', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/public/img/'
			}
			},
        watch: {
            another: {
                files: ['bin/**/*.js','api/**/*.js','control/**/*.js'],
                tasks: ['jshint']
            }
        }
    });
	grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['jshint','clean','copy','cssmin','uglify','imagemin']);
	grunt.registerTask('watch', ['jshint']);
}