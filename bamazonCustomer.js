var mysql = require("mysql");
var prompt = require("prompt");
var inquirer = require("inquirer");

// connection to mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
  
    // Your password
    password: "Rx4S5d94&",
    database: "bamazon_DB",
  });

  connection.connect(function (err) { 
      if(err) throw err;
      console.log(`connected as id ${connection.threadId}`)
      connection.end();
   });