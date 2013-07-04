var yaml = require('js-yaml') // register .yaml require handler
  , fs   = require('fs');

var extend = function(dest, from) {
  var props = Object.getOwnPropertyNames(from);
  props.forEach(function(name) {
    if (name in dest && typeof dest[name] == 'object') {
      extend(dest[name], from[name]);
    } else {
      var destination = Object.getOwnPropertyDescriptor(from, name);
      Object.defineProperty(dest, name, destination);
    }
  });
};

var readConfig = function(config_file, env) {
  if (!env) {
    env = process.env.NODE_ENV || 'development';
  }

  try {
    var config = require(config_file);

    var settings = config['default'] || {};
    var settings_env = config[env] || {};

    extend(settings, settings_env);

    return {config: settings, error: null};
  } catch(e) {
    return {config: null, error: e};
  }
}

module.exports.readConfig = readConfig;
