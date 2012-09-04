template.js
===========
  
Created by Aurélien Scoubeau [(@qur2)](http://qur2.eu/)

Template.js works with RequireJS. It's up to you to check if it's working with
other AMD loaders/builders as well.

This plugin enables loading a template and directly compiles it. So when the
dependency is loaded, the template *function* is available.
This enables your code to omit compiling steps (in Backbone views, for
instance).


## Download & Include ##

For template loading, the [text](http://requirejs.org/docs/api.html#text)
plugin is required:

``` javascript
require.config({
  paths: {
    "text": "plugins/text"
  }
});
```

You need to set the path of the template plugin as well:

``` javascript
require.config({
  paths: {
    "text": "plugins/text",
    "template": "path/of/this/plugin"
  }
});
```

You can specify a root folder to avoid repetition in template paths:

``` javascript
require.config({
  paths: {
    "text": "plugins/text",
    "template": "path/of/this/plugin"
  },
  template: {
    base: "path/of/templates"
  }
});
```


## Usage ##

Simply prefix the path to load by `template!`.

``` javascript
require(["template!forms/login.tpl"], function(template) {
  console.log(template); // is the compiled template!
});
```
