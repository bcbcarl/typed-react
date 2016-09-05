var path = require('path');
var express = require('express');

var webpack = require('webpack');
var config = require('./config/webpack.dev');
var compiler = webpack(config);

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var DashboardPlugin = require('webpack-dashboard/plugin');

var app = express();
var port = process.env.PORT || 3000;

compiler.apply(new DashboardPlugin());

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, (error) => {
  (error)
  ? console.error(error)
  : console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
});
