import path from 'path';
import webpack from 'webpack';

const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const modulesPath = path.resolve(__dirname, 'app/modules');
const vendors = ['react/dist/react.js', 'jquery/dist/jquery.js'];

const commonPlugin = new webpack.optimize.CommonsChunkPlugin({
  names: 'common',
  minChunks: 2
  });
let modules = {
  quiet: false,
  resolve: {
    extensions: ['', '.js', '.json', 'jsx'],
    root: [modulesPath],
    alias: {
    }
  },
  module: {
   noParse: [],
   loaders: [{
     test: /\.jsx?$/,
     exclude: [nodeModulesPath],
     loader: 'babel-loader'
   }]
  },
  plugins: [commonPlugin]
};


// Run through deps and extract the first part of the path,
// as that is what you use to require the actual node modules
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
// vendors.forEach(function (dep) {
//   var depPath = path.resolve(nodeModulesPath, dep);
//   modules.resolve.alias[dep.split(path.sep)[0]] = depPath;
//   modules.module.noParse.push(depPath);
// });

export {modules};
