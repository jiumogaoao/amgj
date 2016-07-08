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
		js:['amgj/public/js/page/**/*']
	},
		clean:{
			public:['amgjDist/public/js/**/*','amgjDist/public/css/**/*','amgjDist/public/img/**/*','amgjDist/public/font/**/*'],
			html:['amgjDist/application/views/page/**/*'],
			control:['amgjDist/application/controllers/**/*']
			},
		copy:{
			font:{expand: true, src: ['**'],cwd: 'amgj/public/font/', dest: 'amgjDist/public/font/'},
			html:{expand: true, src: ['**'],cwd: 'amgj/application/views/page/', dest: 'amgjDist/application/views/page/'},
			control:{expand: true, src: ['**'],cwd: 'amgj/application/controllers/', dest: 'amgjDist/application/controllers/'}
			},
        cssmin: {
            options: {                                       //配置
                stripBanners:true,
                banner: '/*! This is the grunt test ' +      //添加自定义的banner
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            basic: {cwd: 'amgj/public/css/', src: ['*.css'], dest: 'amgjDist/public/css/css.css'}
        },
        uglify: {
            options: {
                banner: '/*! This is uglify test - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
			bin: {src: ['amgj/public/js/bin/**/*'], dest: 'amgj/public/js/cache/bin.js'},
			page: {src: ['amgj/public/js/page/**/*'], dest: 'amgj/public/js/cache/page.js'},
			thirdParty:{src: ['amgj/public/js/thirdParty/**/*'], dest: 'amgj/public/js/cache/thirdParty.js'},
			end:{src: ['amgj/public/js/cache/bin.js','amgj/public/js/cache/thirdParty.js','amgj/public/js/cache/page.js'], dest: 'amgjDist/public/js/js.js'}
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
				 expand: true, cwd: 'amgj/public/img/', src: ['*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'amgjDist/public/img/'
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