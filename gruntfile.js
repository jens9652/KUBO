module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          './public/css/style.css': './src/sass/style.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          './public/css/style.css': './src/sass/style.scss'
        }
      }
    },
    autoprefixer: {
      dist:{
        files:{
          './public/css/style.css':'./public/css/style.css'
        }
      }
    },
    uglify: {
      dev : {
        options: {
          mangle: false,
          compress: false,
          wrap: false,
          sourceMap: true,
          banner: '/*\n <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        },
        files: {
          './public/js/scripts.min.js': ['./src/js/*.js']
        }
      },
      dist: {
        options: {
          mangle: true,
          compress: true,
          sourceMap: false,
          banner: '/*\n <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        },
        files: {
          './public/js/scripts.min.js': ['./src/js/*.js']
        }
      }
    },
    watch: {
      css: {
        files: './src/sass/**/*.scss',
        tasks: ['sass:dev', 'autoprefixer']
      },
      js: {
        files: './src/js/**/*.js',
        tasks: ['uglify:dev']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '*.html',
          'public/css/*.css',
          'public/js/*.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['sass:dist', 'autoprefixer', 'uglify:dist']);
}
