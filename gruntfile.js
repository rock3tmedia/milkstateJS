module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/functions/**/*.js', 'src/app.js'],
        dest: 'dist/milkstate.dev.js'
      }
    },
    uglify: {
      options: {
        banner: '<!-- date here -->'
      },
      dist: {
        files: {
          'dist/milkstate.min.js': ['dist/milkstate.dev.js']
        }
      }
    },
    obfuscator: {
        options: {
            compact: false
        },
        task1: {
            files: {
                'dist/milkstate.obf.min.js': [
                    'milkstate.min.js'
                ]
            }
        }
    },
    jshint: {
      files: ['gruntfile.js', 'src/functions/**/*.js', 'src/app.js'],
      options: {
        // options here to override JSHint defaults
        "esversion":6,
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['dev']
    }
  });

  //initiate plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-obfuscator');

  //check for code errors
  grunt.registerTask('check', ['jshint']);

  //check for code errors
  grunt.registerTask('css', ['less']);

  //concat(comebine files) and minify
  grunt.registerTask('minify', ['concat', 'obfuscator', 'uglify']);

  //concat(comebine files) and minify
  grunt.registerTask('dev', ['concat']);

};