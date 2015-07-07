module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        concat: {
            options: {
                separator: ';'
            },
            global: {
                src: ['content/js/global_dev/*.js'],
                dest: 'content/js/base/global.js'
            },
            common: {
                options:{separator: ''},
                src: ['content/css/common_dev/reset.css',
                    'content/css/common_dev/general.css',
                    'content/css/common_dev/structure.css',
                    'content/css/common_dev/components.css'],
                dest: 'content/css/common.css'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('global', ['concat:global']);
    grunt.registerTask('common', ['concat:common']);

};
