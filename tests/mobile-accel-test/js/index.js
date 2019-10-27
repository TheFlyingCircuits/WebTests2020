const $ = require('jquery'); // load jquery
const bootstrap = require('bootstrap'); // load bootstrap
const math = require('mathjs');

// const accelerometer = require('./accelerometer');

let self = {
    a : {
        x: 0,
        y: 0,
        z: 0
    },
    v : {
        x: 0,
        y: 0,
        z: 0
    },
    s: {
        x: 0,
        y: 0,
        z: 0
    }
};

let tick = function() {

};

let now = window.performance.now();
let last = window.performance.now();
let dt = 0;

window.ondevicemotion = function(event) {
    now = window.performance.now();
    dt = ( now - last ) * 1 / 1000;
    last = window.performance.now();

    self.a.x = event.acceleration.x;
    self.a.y = event.acceleration.y;
    self.a.z = event.acceleration.z;

    self.v.x = self.v.x + self.a.x * dt;
    self.v.y = self.v.y + self.a.y * dt;
    self.v.z = self.v.z + self.a.z * dt;

    self.s.x = self.s.x + self.v.x * dt;
    self.s.y = self.s.y + self.v.y * dt;
    self.s.z = self.s.z + self.v.z * dt;
};

function shelf(val, cap) {
    if (math.abs(val) < cap) return 0;
    else return val;
}

setInterval(function() {
    $(".accel .xValue").text(math.round(self.a.x, 3));
    $(".accel .yValue").text(math.round(self.a.y, 3));
    $(".accel .zValue").text(math.round(self.a.z, 3));

    $(".velocity .xValue").text(math.round(self.v.x, 3));
    $(".velocity .yValue").text(math.round(self.v.y, 3));
    $(".velocity .zValue").text(math.round(self.v.z, 3));

    $(".position .xValue").text(math.round(self.s.x, 3));
    $(".position .yValue").text(math.round(self.s.y, 3));
    $(".position .zValue").text(math.round(self.s.z, 3));
}, 250);