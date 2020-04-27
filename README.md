# online-shop-mysql
Repository for linking a MySQL database with a command line node shpping app that takes in parameters and updates a database based on the user input of what the customer wants to buy, e.g. subtracting inventory of each product. 


## Author
John Pendergrass

## Purpose of app
The purpose was to use "backend" technologies such as Node.js along with NPM (Node Package Manager) libraries in tandem with a relational database management system in order to create an online shop. 

## App organization
### `optionMenu`

  `node bamazon.js`

   * This will give the customer the option of making a purchase or exiting the program. If the customer chooses to make a purchase, they will continue on. If not, the connection will end. 

### `showAllProd`

  Using this funtion, the customer will then see a table with columns that represent the:
   
    ```
      * ID
      * Product
      * Department name
      * Price
      * Quantity in stock
    ```

### `runShop`

  `node liri.js movie-this <movie name here>`

  * This function then asks the customer the ID of the item they would like to buy and the quantity. Then the customer will be presented with a confimation question. If the answer is 'no', the customer is taken back to the beginning of runShop. If the customer answers 'yes', they will then continue through the function which will present:

    ```
      * the item they bought.
      * the number of items bought.
      * and the total retail price. 
    ```

## Instructions
1. To start the program type in:  `node bamazon.js` in the terminal. 
2. To make a purchase, hit enter. If not, use the arrow keys to select exit and hit enter.
3. If you made the choice to make a purchase, then you will be presented with a table of items for sale.
4. Choose the item id and write it in and hit enter. 
5. Then choose the amount you would like to purchase. 
6. You will be asked to confirm: If you would like to change your order, choose 'no' and start over. If you choose yes, you will be presented with the number of items and the total price. 

## Screenshots and videos
Link to the video: https://1drv.ms/v/s!AsTLbKRukIAN9DYEzz5MLQEZhEWW?e=ngSTbX

## Links
* Link to video: https://1drv.ms/v/s!AsTLbKRukIAN9DYEzz5MLQEZhEWW?e=ngSTbX
* Link to repository: https://github.com/JohnWP8253/online-shop-mysql

## Tech used
    * JavaScript
    * Node.js
    * MySQL
