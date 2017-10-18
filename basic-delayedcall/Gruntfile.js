module.exports = function (grunt) {
    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: '\n\r'
            },
            dist: {
                src: [
                    'src/DelayedCall.js',//依赖basic-help,basic-event,basic-juggler
                    'src/DelayedCallPool.js'//DelayedCall,basic-help
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            build: {
                src: 'dist/<%= pkg.name %>.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    // 默认任务
    grunt.registerTask('default', ['concat', 'uglify']);
};