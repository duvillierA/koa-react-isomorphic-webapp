import {resolve} from 'path';
let cwd = path => resolve(process.cwd() + path);

const views = {
  viewPath: cwd('/app/views'),
  partialsPath: cwd('/app/views/_partials'),
  layoutsPath: cwd('/app/views/_layouts'),
  defaultLayout: 'default'
};

const staticFile = {
  path: cwd('.public')
};

const routes = {
  path: '/app/**/routes.js'
};

const controllers = {
  path: cwd('/app/controllers')
};

export {views, staticFile, routes, controllers};
