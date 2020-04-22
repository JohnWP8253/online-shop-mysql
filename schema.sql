DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50),
    department_name VARCHAR(50),
    price DECIMAL(5,2) NOT NULL,
    stock_quantity INTEGER NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("KitchenAid Stand Mixer", "Kitchen and Bathroom", 259.99, 215);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Apple AirPods Pro", "Tech Accessories", 259.99, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Splash-free dog bowl", "Pet Supplies", 18.95, 169);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Waterfall Showerhead", "Kitchen and Bathroom", 75.00, 54);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Blue-light Screen Filter", "Tech Accessories", 62.85, 350);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Paw Washer", "Pet Suppies", 24.50, 173);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Hand-held Bidet", "Kitchen and Bathroom", 69.95, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Nori Seaweed", "Food and Pantry", 18.00, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Indonesian Fried noodles", "Food and Pantry", 14.75, 450);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUE ("Wifi Extender", "Tech Accessories", 45.00, 32);


