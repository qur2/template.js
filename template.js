/**
 * RequireJS Template Plugin
 * Copyright 2012 Aurélien Scoubeau (@qur2)
 * template.js may be freely distributed under the MIT license.
 */
(function(global) {

// Cache used to map configuration options between load and write
var buildMap = {};

define(['underscore'], function(_) {
    var template = function(raw) {
        return _.template(raw);
    };

    /**
     * Loads template file as plain text using the text! require plugin
     * and compiles it with _.template.
     */
    template.load = function(name, req, load, config) {
        // Dojo provides access to the config object through the req function.
        if (!config) {
            config = require.rawConfig;
        }
        var config = config.template || '';

        var fullName = 'text!' + config.base + name;

        // Load the template as plain text
        req([fullName], function(content) {
            // compile the template
            var compiled = template(content);
            // Attach to the build map for use in the write method below.
            buildMap[name] = compiled;
            load(compiled);
        });
    };

    /**
     * Writes the source of the loaded and compiled template as
     * a loadable module.
     */
    template.write = function(pluginName, moduleName, write) {
        var compiled = buildMap[moduleName];
        write([
            "define('", pluginName, "!", moduleName, "', ",
                "['underscore'], ", compiled.source,
            ");\n"
        ].join(""));
    };

    return template;
});

})(this);
