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

  managerOptionMenu();
});

// function to show option menu to managers
const managerOptionMenu = () => {
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
    // switch case for different options in the function
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

const showAllProd = () => {
  const sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    const greeting = chalk.yellow`\n Here are the current products for sale today.\n`;

    // show greeting variable in terminal
    console.log(greeting);
    const table = new Table({
      head: ["ID", "Product", "Department", "Price", "In Stock"],
    });
    // loop through columns to present data
    for (let i = 0; i < res.length; i++) {
      table.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity,
      ]);
    }
    console.log(table.toString() + "\n");
    // return to manger's option menu
    managerOptionMenu();
  });
};

// function to show items with an inventory less than 5 items.
const showLowInv = () => {
  const lowInvQuery = "SELECT * FROM products WHERE stock_quantity <= 5";
  connection.query(lowInvQuery, function (err, res) {
    if (err) throw err;
    const greeting = chalk.red`\n Here are the current products with low inventory today!\n`;
    console.log(greeting);
    console.table(res);
    managerOptionMenu();
  });
};

// prompt function to add inventory to the database
const addInv = (inventory) => {
  const sqlQuery = "SELECT * FROM products";
  connection.query(sqlQuery, function (err, res) {
    if (err) throw err;
    let allProducts = new Table({
      head: ["ID", "Product", "Department", "Price", "In Stock"],
    });
    for (let i = 0; i < res.length; i++) {
      allProducts.push([
        res[i].item_id,
        res[i].product_name,
        res[i].department_name,
        res[i].price,
        res[i].stock_quantity,
      ]);
    }
    let inventory = res;
    console.log(`\n`);
    console.table(allProducts.toString() + "\n");
  
  // console.table(inventory);
  inquirer
    .prompt([
      {
        // prompt to ask manager for the id of the item they want to add
        type: "input",
        message: `\n Please enter the ID of the item you would like to add to.`,
        name: "choice",
        validate: function (val) {
          if (isNaN(val) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (val) {
      let choiceId = parseInt(val.choice);
      let product = checkInventory(choiceId, inventory);

      // if an item can be found with chosen id
      if (product) {
        // pass chosen ID to promptManagerForQuantity
        let selectedProduct = new Table ({
          head: ["ID", "Product", "Department", "Price", "In Stock"],
        });
        selectedProduct.push([
          product.item_id,
          product.product_name,
          product.department_name,
          product.price,
          product.stock_quantity,
        ]);
        console.table(selectedProduct.toString() + "\n");
        promptManagerForQuantity(product);
      } else {
        // Otherwise let manager know doesn't exist and reload managerOptionMenu
        console.log(`\nThat item is not in our inventory.`);
        managerOptionMenu();
      }
    });
  })
};

// function to check if chosen product exists in inventory
const checkInventory = (choiceId, inventory) => {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // If product is a match, return that product
      return inventory[i];
    }
  }
  // Otherwise return null
  return null;
};

// function to ask manager for quantity to add to chosen product in database
const promptManagerForQuantity = (product) => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to add?",
        validate: function (val) {
          return val > 0;
        },
      },
    ])
    .then(function (val) {
      let quantity = parseInt(val.quantity);
      addQuantity(product, quantity);
    });
};

const addQuantity = (product, quantity) => {
  connection.query(
    // schema for MySQL to add the quantity to the chosen item
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: product.stock_quantity + quantity,
      }, 
      {
        item_id: product.item_id,
      }],
    function (err) {
      if (err) throw err;
      // Alert the manager that the addition to the inventory was successful
      console.log(
        `\nSuccessfully added ${quantity} ${product.product_name}s!\n`
      );
      showAllProd();
    }
  );
};
