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

connection.connect(function (err) {
  if (err) throw err;
  console.log(`You are connected as ${connection.threadId}`);

  optionMenu();
});
// function to show option menu to managers
const optionMenu = () => {
  console.log(chalk.green("Welcome to Bamazon Manager's Portal."));
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add Inventory",
        "Add New Product",
        "Exit",
      ],
    })
    .then(function (response) {
      switch (response.choice) {
        case "View Products for Sale":
          showAllProd();
          break;
        case "View Low Inventory":
          showLowInv();
          break;
        case "Add Inventory":
          addInv();
          break;
        case "Add New Product":
          addNew();
          break;
        case "Exit":
          connection.end();
          console.log("You have exited the program.");
          break;
      }
    });
};
