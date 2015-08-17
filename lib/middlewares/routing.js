import glob from 'glob';
import fs from 'fs';
import {resolve} from 'path';
import router from 'koa-route';
import _ from 'underscore';
import compose from 'koa-compose';

let getRoutes = routesPath => {
  return glob.sync(routesPath).map((routepath) => {
    return require(resolve(routepath));
  }).reduce((prev, current) => {
    return _.defaults(prev, current);
  });
};

let getControllerInfos = (key, value) => {
  let [, method, path] = key.match(/^(get|put|delete|post) (.*)$/i);
  let [, filename, fn] = value.match(/^(.*)#(.*)$/);
  return {
    filename,
    path,
    method,
    fn
  };
};

/**
 * @description Routing middleware using `koa-route`
 * @param routesPath {string} routes files path (via `glob`)
 * @param controllersPath {string} Controllers dir path
 * @return Composition of routes;
 */

export default function ({routesPath, controllersPath}) {
  var routesGenerators = [];
  let routes = getRoutes(routesPath);
  for (let key in routes) {
    let {filename, path, method, fn} = getControllerInfos(key, routes[key]);
    let controller = require(resolve(controllersPath, filename))[fn];
    routesGenerators.push(router[method](path, controller));
  }
  return compose(routesGenerators);
}
