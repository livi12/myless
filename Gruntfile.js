module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      bar: {
        files:[{
          src: ['css/reset.css','css/*.css','!css/normalize.css','!css/doc.css'],
          dest: 'dist/css/myless.css'
        }]
      }
    },
    watch: {
      docstyle:{
        files:['less/doc.less'],
        task:['less:docless'],
        options: {
          debounceDelay: 150,
        },
      },
      style: {
        files: ['less/**/*.less','!less/variables.less','!less/doc.less'],
        tasks: ['less:bar'],
        options: {
          interrupt: true,
          debounceDelay: 250,
        },
      },
      concatcss: {
        files: 'css/**/*.css',
        tasks: ['concat'],
      },
      autoprefixercss: {
        files: 'dist/css/myless.css',
        tasks: ['autoprefixer','csscomb','cssmin'],

      }
    },

    cssmin: {
      option:{banner:'/*cssmin*/\n'},
      bar:{
        files: [{
          src: ['dist/css/myless.css'],
          dest: 'dist/css/myless.min.css'}
        ]
      }
    },

    less: {
      bar: {
        files: [
          {
            expand: true, //启用动态扩展
            cwd: 'less/', //批匹配相对lib目录的src来源
            src: '*.less', //实际的匹配模式  //   **/*匹配子目录下的所有less文件
            dest: 'css/', //目标路径前缀
            ext: '.css' //目标文件路径中文件的扩展名.
          }
        ]
      },
      docless: {
        files: [{
          src: ['less/doc.less'],
          dest: 'css/doc.css'}
        ]
      }
    }
    ,
    autoprefixer : {
      dist : {
        files: [{
          src: ['dist/css/myless.css'],
          dest: 'dist/css/myless.css'}
        ]
      }
    },
    csscomb :{
      dist : {
        files: [{
          src: ['dist/css/myless.css'],
          dest: 'dist/css/myless.css'}
        ]
      },
      // dynamic_mappings: {
      //   expand: true,
      //   cwd: 'css/',
      //   src: ['.css', '!.resorted.css'],
      //   dest: 'css/',
      //   ext: '.css'
      // }
    }

    // postcss: {
    //   options: {
    //     // We need to `freeze` browsers versions for testing purposes.
    //     browsers: ['opera 12', 'ff 15', 'chrome 25']
    //   },
    //   multiple_files: {
    //     expand: true,
    //     flatten: true,
    //     cwd: 'css/', //批匹配相对lib目录的src来源
    //     src: '*.css', //实际的匹配模式  //   **/*匹配子目录下的所有less文件
    //     dest: 'autoCss/', //目标路径前缀
    //     ext: '.css' //目标文件路径中文件的扩展名.
    //   },
    // }

  });

  // Load the plugin that provides the "uglify" task.
  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  //grunt.loadNpmTasks('grunt-autoprefixer' );

  // Default task(s).
  grunt.registerTask('default', ['cssmin:bar','concat:bar','less','postcss','autoprefixer','csscomb:dist','watch']);

};