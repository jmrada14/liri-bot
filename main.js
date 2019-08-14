require("dotenv").config();

let keys = require("./keys");
let fs = require("fs");
let request = require("request");
let twitter = require("twitter");
let spotify = require("node-spotify-api")
let filename = './log.txt';
var inquirer = require('inquirer');
