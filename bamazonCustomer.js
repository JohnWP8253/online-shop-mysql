// packages to be required
var mysql = require("mysql");
var prompt = require("prompt");
var inquirer = require("inquirer");
var Table = require("cli-table3");
var chalk = require("chalk");

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
  if (err) throw err;
  console.log(`You are connected as ${connection.threadId}`);

  optionMenu();
});

function showAllProd() {
  var sqlQuery = "SELECT *FROM products";
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    var greeting = chalk.yellow`\n Here are the current products on sale today!\n`;
    console.log(greeting);
    var table = new Table({
      head: ["ID", "Product", "Department", "Price", "In Stock"],
      // colWidths: [10, 30, 15, 10, 10, 15]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        "$" + res[i].price,
        res[i].stock_quantity,
      ]);
    }
    console.log(table.toString() + "\n");
    connection.end();
  });
}

function optionMenu() {
  console.log(chalk.green`Welcome to Bamazon!\n $$$$$$$$$$$$$$$$$$$$$$$$$$$$`);
  inquirer
    .prompt([
      {
        type: "input",
        message: `\n Please enter the ID number of the product you want to buy.\n`,
        name: "itemID",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        type: "input",
        message: `\nHow many items would you like to buy?\n`,
        name: "units",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        type: "confirm",
        message: chalk.green `Is this correct?`,
        name: 'confirmation',
        default: true
      },
    ])
    .then(function (userResponse) {
     
      connection.query("SELECT * FROM products WHERE ?", {
        item_id: userResponse.itemID
      }, function (error, response) {
        console.log(`\nYou have chosen to buy ${userResponse.units}`)
      }
      )
    });
}
