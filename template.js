/**
 * RequireJS Template Plugin
 * Copyright 2013 Aurélien Scoubeau (@qur2)
 * template.js may be freely distributed under the MIT license.
 */
(function(global) {

// Cache used to map configuration options between load and write
var buildMap = {};

define(['text', 'underscore'], function(text, _) {
    var template = function(raw) {
		return _.template(raw);
	};

	/**
	 * Loads template file as plain text using the text! require plugin
	 * and compiles it with _.template.
	 */
	template.load = function(name, req, load, config) {
		var path = name;
		if (config.isBuild && '/' == name[0]) {
			path = config.dirBaseUrl + name.substring(1);
		}
		text.get(path, function(content) {
			// Compile the template
			var compiled = template(content);
			if (config.isBuild) {
				// Attach to the build map for use in the write method below.
				buildMap[name] = compiled;
			}
			load(compiled);
		});
	};

	/**
	 * Writes the source of the loaded and compiled template as
	 * a loadable module.
	 */
	template.write = function(pluginName, moduleName, write) {
		var compiled = buildMap[moduleName];
		write("define(" +
			"'" + pluginName + "!" + moduleName + "'" +
			", ['underscore'], function(_) { return " +
			compiled.source + ";});\n"
		);
	};

	return template;
});

})(this);
