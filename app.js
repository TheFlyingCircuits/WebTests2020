const express = require('express');
const path = require('path');
const browserify = require('browserify-middleware');

const app = express(); // create Express.js app
app.set('strict routing', true);

const sharedModules = ['mathjs', 'jquery', 'bootstrap', 'popper.js', 'chart.js'];

// route for bundled file for shared modules
app.get('/*/bundle.js', browserify(sharedModules, {
    // cache: false // disable caching for rapid changes,
}));

// route for test indicies
app.get('/:testId', function(req, res) {
    res.redirect('/' + req.params.testId + '/');
});

// route for test indicies
app.get('/:testId/', function(req, res) {
    res.sendFile(path.join(__dirname, './tests', req.params.testId, 'index.html'));
});

// route for test indicies
app.get('/:testId/favicon.ico/*', function(req, res) {
    res.send(404);
});




// route for js
app.get('/:testId/index.js', function(req, res, next) {
    res.setHeader('content-type', 'application/javascript');
    browserify(path.join(__dirname, './tests/', req.params.testId, '/js/index.js'), { external: sharedModules })(req, res, next);
});

app.listen(3000); // TODO create config for port