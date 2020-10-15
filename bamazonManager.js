// global variables
// ************************************
const mysql = require("mysql");
const prompt = require("prompt");
const inquirer = require("inquirer");
const Table = require("cli-table3");
const chalk = require("chalk");

// connection to Mysql database
// ************************************
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",

    // Your password
  password: "Rx4S5d94&",
  database: "bamazon_DB",
});

connection.connect(function (err){
    if (err) throw err;
    console.log(`You are connected as ${connection.threadId}`);

    optionMenu();
})