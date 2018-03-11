/*
###############################################################################
#
# The MIT License (MIT)
#
# Copyright (c) 2016 IBM Corp.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#
###############################################################################
*/

// ===========================  DEPENDENCIES =========================
// Load modules as object
var express = require("express");       // node express module
var path = require("path");          // path helper functions; working with files & directory paths
// var bodyParser = require("body-parser")    // bodyParser to populate and parse body property of request object

// ===========================  CONSTANTS =========================
// Define Routes load contents and assign to constant
const node_port = process.env.PORT || parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 3002;
const client_dir = path.join(__dirname, "/../client");
const assets_dir = path.join(client_dir, "/assets");
const application_url = 'point.sg.ibm.com';
// const application_url = 'localhost';
// const application_port = 9500;


// ===========================  MIDDLEWARES =========================
/*
    Routing refers to determining how an application responds to a client request to a particular endpoint, 
    which is a URI (or path) and a specific HTTP request method (GET, POST, and so on).
    Note: __dirname is the absolute path of the application directory.
    Note: if Route Handler '/' defined before the public (CLIENT_FOLDER) folder, 
        root (/) would hit this Handler and server would not look for index.html from public folder.
*/
// Define Routes load contents and assign to constant
// Create Express app instance
var app = express();
//method of use
app.use(express.static("client/public"));
app.use(express.static(client_dir));
app.use(express.static(assets_dir));
app.use("/libs", express.static(path.join(client_dir, "/bower_components")));
app.use("/libs", express.static(path.join(__dirname, "/../node_modules")));
// console.log("absolute path of the application directory: %s", __dirname);
// console.log("absolute path of the application directory: %s", assets_dir);

/*
// Populates req.body info; Expected content type is application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Default $http content type is application/json; use json as the parser type
app.use(bodyParser.json());
*/

// ===========================  ERROR HANDLING =========================
/*
    Note: Express 404 responses are not error result and not capture.
*/
// Handles 404 Not Found. Add error-handler middleware 404 function.
app.use(function (req, res) {
    res.status(404).sendFile(path.join(assets_dir, "/msg/404.html"));
});
// Handles 501 Server Error.
app.use(function (err, req, res, next) {
    res.status(501).sendFile(path.join(assets_dir, "/msg/501.html"));
});


// ===========================  SERVER / PORT SETUP =========================
// Start server on specific port
app.listen(node_port, function () {
    console.log("%s \nApplication started at http://%s:%d", new Date(), application_url, node_port);
});



