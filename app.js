require('babel/register');
var koa = require('koa');
var hbs = require('koa-hbs');
var logger = require('koa-logger');
var responseTime = require('koa-response-time');
var serveStatic = require('koa-static');
var router = require('koa-route');
var resolve = require('path').resolve;
var config = require('./lib/config');
var routing = require('./lib/middlewares/routing');
var dir = __dirname;

var app = koa();

app.use(logger());
app.use(responseTime());

app.use(hbs.middleware({
  viewPath: config.views.viewPath,
  partialsPath: config.views.partialsPath,
  layoutsPath: config.views.layoutsPath,
  defaultLayout: config.views.defaultLayout
}));

app.use(serveStatic(resolve(dir, '.public')));

app.use(routing({
  routesPath: 'app/**/routes.js',
  controllersPath: resolve(dir, 'app/controllers')
}));

if (!module.parent) app.listen(process.argv[2] || 3000);
