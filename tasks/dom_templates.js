/*
 * grunt-dom-templates
 * https://github.com/kodmax/grunt-dom-templates
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
    		root.innerHTML = "{{{ html }}}";
    		
    		var templates = {};
    		for (var i = 0; i < root.childNodes.length; i++) {
    			var child = root.childNodes [i];
    			templates [child.getAttribute('tpl-name')] = child;
    			child.removeAttribute('tpl-name');
    		}
    		
    		var findMarkedNodes = function (parentNode, nodeMap) {
    			for (var i = 0; i < parentNode.childNodes.length; i++) {
    				var child = parentNode.childNodes [i];

    				if (child.nodeType === 1) {
    					var nodeName = child.getAttribute('tpl-node-name');
    					if (nodeName) {
    						child.removeAttribute('tpl-node-name');
    						nodeMap [nodeName] = child;
    					}
    				
    					findMarkedNodes(child, nodeMap);
    				}			
    			}
    		};
    		
    		var DOMTree = function (tplNode) {
    			var cloned = tplNode.cloneNode(true);
    			var nodeMap = {};
    			
    			findMarkedNodes({ childNodes: [cloned] }, nodeMap);
    			
    			this.getRootNode = function () {
    				return cloned;
    			};
    			
    			this.getNodeByName = function (name) {
    				return nodeMap [name];
    			};
    			
    			this.getAllNamedNodes = function () {
    				return nodeMap;
    			};
    		};
    		
    		var f = function (templateName, options) {
    			var domTree = new DOMTree(templates [templateName]);
    			options = options || {};
    			
    			if (options.parent) {
    				options.parent.appendChild(domTree.getRootNode());
    			}
    			
    			return domTree;
    		};
    		
    		return f;
    	});
      }
      
      // Write the destination file.
      grunt.file.write(f.dest, (codeTpl + "").replace(/^function codeTpl\(\) {\r?\n/, '').replace(/^\s{5,6}/mg, '').replace(/}$/, '').replace("{{{ html }}}", src));

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
								    });
					});

};
