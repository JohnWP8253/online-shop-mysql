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

function optionMenu() {
  console.log(chalk.green("Welcome to Bamazon!"));
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: ["Make a purchase", "Exit"],
    })
    .then(function (response) {
      switch (response.choice) {
        case "Make a purchase":
          showAllProd();
          break;
        case "Exit":
          connection.end();
          console.log("You have exited the program. Please come again!");
          break;
      }
    });
}

function showAllProd() {
  var sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    var greeting = chalk.yellow`\n Here are the current products on sale today!\n`;
    console.log(greeting);
    var table = new Table({
      head: ["ID", "Product", "Department", "Price", "In Stock"],
      // colWidths: [10, 30, 15, 10, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity,
      ]);
    }
    console.log(table.toString() + "\n");
    runShop();
  });
}

function runShop() {
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
        message: chalk.green`Is this correct?`,
        name: "confirmation",
        // Customer can just press the enter key for yes without typing y
        default: true,
      },
    ])
    .then(function (userResponse) {
      //  query the database for all items being sold
      if (userResponse.confirmation === false) {
        console.log(
          `Please re-enter your the item and quantity you want to purchase. `
        );
        runShop();
      } else {
        connection.query(
          "SELECT * FROM products WHERE ?",
          {
            // assigning the item-id column with the userResponse item chosen
            item_id: userResponse.itemID,
          },
          function (error, response) {
            if (error) throw error;

            // inform customer of how many units they ordered

            if (userResponse.units > response[0].stock_quantity) {
              console.log(
                chalk.red`\nOh no. We're all out of that item. Apologies.\n`
              );
              optionMenu();
            } else {
              console.log(
                `\nYou have chosen to buy ${userResponse.units} ${response[0].product_name}(s).\n`
              );
              console.log(`\nOrder processing...\n`);
              var totalCost = userResponse.units * response[0].price;
              var updateStock = response[0].stock_quantity - userResponse.units;
              var update =
                "UPDATE products SET stock_quantity = " +
                updateStock +
                " WHERE item_id = " +
                userResponse.itemID;
              connection.query(update, function (error, response) {
                if (error) throw error;

                console.log(
                  chalk.cyan`\nYour purchase is complete! Your total comes to\n`
                );
                console.log(`$${totalCost}\n`);
                console.log(chalk.cyan`We look forward to your next visit!`);
                connection.end();
              });
            }
          }
        );
      }
    });
}
