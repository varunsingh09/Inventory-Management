# Inventory-Management
An inventory management app used for cycle counting and recording your returns inventory

![Capture](https://user-images.githubusercontent.com/69001161/234136792-ed63c1b2-ac37-4dfa-89b8-f1c04b4f2ce1.PNG)

## Dev Set Up
### 1. Create .env File

- change .env.example in server folder and rename it to .env

### 2. Setup MongoDB

  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

### 3. Run Server

```
$ cd server
$ npm install
$ npm start
```

### 4. Run Client

```
# open new terminal
$ cd client
$ npm install
$ npm start
```
## Receive a Product

### Track your products as they get delivered

* On the navbar click Receive
* Click on the plus sign to add a product
* From the drop down menu select the product and enter the quantity
* Add as many products by clicking on the plus sign
* Clear a product entered by mistake by clicking the trash bin
* Click submit to receive all entered products and their counts will be updated


![Capture2](https://user-images.githubusercontent.com/69001161/234270104-9fb2a473-fae6-490e-aa26-8e4043cc7acd.PNG)

## Add a New Product

### Enter new products as they are created for future deliveries

* On the navbar click Add
* Enter the required fields
* Click submit to complete 

![Capture3](https://user-images.githubusercontent.com/69001161/234270109-134229a4-e075-41d4-8ed0-b855ac3283e8.PNG)

## New/Cycle Count

### Cycle and update your counts 

* On the navbar click New Count
* Enter new counts
* Click Submit to complete
* "Previous" values will now update to the "Counted" values and "Counted" values will now be the new entered counts.
* Reset Received button will reset all received counts to 0

![Capture4](https://user-images.githubusercontent.com/69001161/234270111-b1ad4716-4bfb-41f8-8cc2-2fac2796812d.PNG)

## In-line Editing

### Delete any product or update the values

* Click on any product row
* Update any value
* Right click to bring up context menu to submit, cancel or delete
* Product values will not update uless submit is clicked on the context menu

![Capture5](https://user-images.githubusercontent.com/69001161/234270116-2962d053-be62-45e6-b241-f83368e0baa1.PNG)


