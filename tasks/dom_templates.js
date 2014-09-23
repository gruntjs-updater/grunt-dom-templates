/*
 * grunt-dom-tpl
 * https://github.com/kodmax/grunt-dom-tpl
 *
 * Copyright (c) 2014 kodmax
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('dom_templates', 'The best Grunt plugin ever.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
          
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath).replace(/\r?\n/g, '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      }).join(grunt.util.normalizelf(''));

      // Handle options.

      function codeTpl () {
    	define([], function () {
    		'use strict';
    		
    		var root = document.createElement('div');
    		root.innerHTML = "<ul class=\"home\" tpl-name=\"home\">	<li rv-each-item=\"items\">{ item.label }</li></ul><ul tpl-name=\"home2\">    <li rv-each-item=\"items\">{ item.label }</li></ul><ul tpl-name=\"list\">	<li rv-each-item=\"items\">{ item.label }</li></ul>";
    		
    		var templates = {};
    		for (var i = 0; i < root.childNodes.length; i++) {
    			var child = root.childNodes [i];
    			templates [child.getAttribute('tpl-name')] = child;
    			child.removeAttribute('tpl-name');
    		}
    		
    		var f = function (templateName, options) {
    			var cloned = templates [templateName].cloneNode(true);
    			options = options || {};
    			
    			if (options.parent) {
    				options.parent.appendChild(cloned);
    			}
    			
    			return cloned;
    		};
    		
    		return f;
    	});
      };
      
      // Write the destination file.
      grunt.file.write(f.dest, (codeTpl + "").replace(/^function codeTpl\(\) {\n/, '').replace(/^\s{5}/mg, '').replace(/}$/, '').replace("{{{ html }}}", src));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
