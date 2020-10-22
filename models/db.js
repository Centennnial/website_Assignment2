// mongoose connection file

var mongoose = require("mongoose");

var dbURI = "mongodb+srv://myDb:akshay123@cluster0-ovbi0.mongodb.net/chinese_checkers?retryWrites=true&w=majority";
mongoose.connect(dbURI);

// checking for successful connection
mongoose.connection.on('connected', function () {
    console.log("yeahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log('Mongoose connected to ' + dbURI);
});
// checking for error
mongoose.connection.on('error',function (err) {
console.log('Mongoose connection error: ' + err);
});
// checking for disconnection
mongoose.connection.on('disconnected', function () {
console.log('Mongoose disconnected');
});

// callback for connection close
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
   };
//for nodemon restart
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
//for app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
//for heroku termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./users');