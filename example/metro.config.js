const path = require('path');
const {getDefaultConfig} = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const root = path.resolve(__dirname, '..');

const config = getDefaultConfig(__dirname);

// Watch the library source (one level up) so live edits reload the example.
config.watchFolders = [root];

// The library root carries its own react / react-native (as devDependencies for
// typechecking). Those must NOT be bundled — otherwise there are two copies of
// react-native and AppRegistry.runApplication() fails with
// "Module has not been registered as callable (n = 0)". Block the root copies
// and force every import to resolve the example's single copy.
config.resolver.blockList = exclusionList([
  new RegExp(`${path.join(root, 'node_modules', 'react')}/.*`),
  new RegExp(`${path.join(root, 'node_modules', 'react-native')}/.*`),
]);

config.resolver.nodeModulesPaths = [path.resolve(__dirname, 'node_modules')];

config.resolver.extraNodeModules = new Proxy(
  {},
  {
    get: (_target, name) =>
      path.resolve(__dirname, 'node_modules', name.toString()),
  },
);

module.exports = config;
