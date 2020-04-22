
var inquirer = require("inquirer");
var mySQL = require("mysql");
var Table = require("cli-table3");
const chalk = require("chalk");

var connection = mySQL.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (error) {
    if (error) throw error;
    console.log("Connected as ID:", connection.threadId + "\n");
    optionMenu();
});

function optionMenu() {
    console.log((chalk.green("Welcome to Bamazon!")))
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["Make a purchase", "Exit"]
    }).then(function (response) {
        switch (response.choice) {
            case "Make a purchase":
                inventoryItem();
                break;
            case "Exit":
                connection.end();
                console.log("You have exited the program. Please come again!")
                break;
        }
    })
}

function inventoryItem() {
    var query = "SELECT * FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
        var divider = "\n------------------------------------------------------------\n";
        var greeting = "\n" + "Here is the current available inventory:" + "\n"
        console.log(greeting);
        var table = new Table({
            head: ["ID", "Item", "Price", "In Stock"]
        });
        for (var i = 0; i < response.length; i++) {
            table.push([
                response[i].item_id,
                response[i].product_name,
                '$' + response[i].price,
                response[i].stock_quantity
            ]);
        }
        console.log(table.toString() + "\n");
        runProgram();
    })
}

function runProgram() {
    inquirer
        .prompt([{
                type: "input",
                message: "\n" + "Please enter the ID of the product you would like to buy:",
                name: "itemId",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "input",
                message: "How many would you like to buy?",
                name: "units",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                type: "confirm",
                message: (chalk.green("Is this correct?")),
                name: "confirmation",
                default: true
            }
        ]).then(function (userResponse) {

            connection.query("SELECT * FROM products WHERE ?", {
                item_id: userResponse.itemId
            }, function (error, response) {
                console.log("\nYou have chosen to buy " + userResponse.units + " " + response[0].product_name + "(s).");
                if (userResponse.units > response[0].stock_quantity) {
                    console.log("\n" + (chalk.red("Oh no. We do not have enough in stock! We are sorry.")) + "\n")
                    optionMenu();
                } else {
                    console.log("\nProcessing your order....\n");
                    var totalCost = userResponse.units * response[0].price;
                    var updateStock = response[0].stock_quantity - userResponse.units;
                    var update = "UPDATE products SET stock_quantity = " + updateStock + " WHERE item_id = " + userResponse.itemId;
                    connection.query(update, function (error, response) {
                        if (error) throw error
                        console.log("Transaction complete! The total cost of your purchase was: $" + totalCost + ".")
                        console.log("Please come back again. :)")
                    })
                }
            })
        });
}

