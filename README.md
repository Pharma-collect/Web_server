# Web-Server

### To start the server use :

```
npm install
```
then
```
node server
```

### If your are in a local environment you can install __nodemon__ :

```
npm install -g nodemon
```
then

```
nodemon server
```

### If you want to deploy the server in production mode :

```
NODE_ENV=production node server
```

## Postman

Send data in __x-www-form-urlencoded__ or __raw__ with JSON settings

You also need to add a header with __Key__ : "Host" and __Value__ : "nodehttp.docker"

# Web Services

Here is the list of available web-services as well as the parameters necessary for their proper functioning :

> WARNING (1): Query parameters must be sent in JSON format

> WARNING (2): You must respect the syntax of the parameters to be sent to the server

> WARNING (3): Mandatory parameters will be noted with " * "

> WARNING (4): You need to add a header with __Key__ : "Host" and __Value__ : "nodehttp.docker"

## User_client
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/user_client/fonction_name__

### [GET] - getAllUserClient
Allows you to retrieve all the customers present in the database.
No parameters required.

### [POST] - getUserClientById
Allows you to retrieve a customer based on his ID.
Parameter :
* user_id *

### [POST] - getUserClientByUsername
Allows you to retrieve a customer based on his username.
Parameter :
* username *

### [POST] - deleteUserClientById
Delete a customer according to his ID.
Parameter :
* user_id *

### [POST] - registerClient
Allows you to create a customer.
Parameters :
* name *
* lastname *
* password *
* phone *
* mail *
* birth * (for the moment pass a string for example : JJ/MM/AAAA)
* username (if it is not filled in then it will be generated automatically if the combination is available, otherwise it will have to be filled in)
* image_url

### [POST] - loginClient
Allows you to login.
Parameters :
* username *
* password *

## User_pro
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/user_pro/fonction_name__

### [GET] - getAllUserPro
Allows you to retrieve all the professionals  present in the database.
No parameters required.

### [POST] - getUserProByPharmacy
Allows you to retrieve a pro based on his pharmacy.
Parameter :
* pharmacy_id *

### [POST] - getUserProByUsername
Allows you to retrieve a pro based on his username.
Parameter :
* username *

### [POST] - deleteUserProByUsername
Delete a pro according to his username.
Parameter :
* username *

### [POST] - createUserPro
Allows you to create a pro.
Parameters :
* username *
* password *
* pharmacy_id *

### [POST] - loginPro
Allows you to login as a pro.
Parameters :
* username *
* password *

## Pharmacy
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/pharmacy/fonction_name__

### [POST] - getPharmacyById
Allows you to retrieve a pharmacy based on his ID.
Parameter :
* pharmacy_id *

### [POST] - getPharmacyByName
Allows you to retrieve a pharmacy based on his name.
Parameter :
* name *

### [POST] - getPharmacyByCity
Allows you to retrieve all the pharmacies in a given city.
Parameter :
* city *

### [POST] - getPharmacyByPostCode
Allows you to retrieve all the pharmacies in a given post code.
Parameter :
* post_code *

### [POST] - getPharmacyByBoss
Allows you to retrieve all the pharmacies owned by a given boss
Parameter :
* boss *

### [POST] - getPharmacyWithShop
Allows you to retrieve all the pharmacies with a shop
Parameter :
    none

### [POST] - getPharmacyWithoutShop
Allows you to retrieve all the pharmacies without a shop
Parameter :
    none

### [POST] - createPharmacy
Allows you to create a pharmacy.
Parameter :
* name *
* has_shop *
* road_nb *
* road *
* phone *
* post_code *
* city * 
* boss *

### [POST] - updatePharmacyNameById
Allows you to update the name of a pharmacy.
Parameter :
* pharmacy_id *
* name *

### [POST] - updatePharmacyPhoneById
Allows you to update the phone number of a pharmacy.
Parameter :
* pharmacy_id *
* phone *

### [POST] - updatePharmacyShopById
Allows you to update if a pharmacy has a shop or not.
Parameter :
* pharmacy_id *
* has_shop *

### [POST] - updatePharmacyBossById
Allows you to update the name of the boss of a pharmacy.
Parameter :
* pharmacy_id *
* boss *

### [POST] - deletePharmacyById
Allows you to delete a pharmacy based on his ID.
Parameter :
* pharmacy_id *

### [POST] - deletePharmacyByBoss
Allows you to delete a pharmacy based on his boss.
Parameter :
* boss *

## Product
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/product/fonction_name__

### [GET] - getAllProducts
Allows you to retrieve all the products present in the database.
No parameters required.

### [POST] - getProductsByPharmacy
Allows you to retrieve all the products based on a pharmacy ID.
Parameter :
* pharmacy_id *

### [POST] - getProductById
Allows you to retrieve a product based on his ID.
Parameter :
* product_id *

### [POST] - createProduct
Allows you to create a product.
Parameters :
* title *
* price *
* pharmacy_id *
* description
* capacity
* image_url



## Container
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/container/fonction_name__

### [POST] - getContainerById
Allows you to retrieve a container based on his ID.
Parameter :
* container_id *

### [GET] - getAllContainers
Allows you to retrieve all the containers
Parameter :
    none

### [POST] - getContainerByPharmacy
Allows you to retrieve the containers based on the pharmacy ID
Parameter :
* pharmacy_id *

### [POST] - getEmptyContainerByPharmacy
Allows you to retrieve empty containers based on the pharmacy ID
Parameter :
* pharmacy_id * 

### [POST] - getContainerStatusById
Allows you to retrieve the status of a container based on his ID
Parameter :
* container_id *

### [POST] - getContainerNumberById
Allows you to retrieve the number of a container based on his ID
Parameter :
* number_id *

### [POST] - getContainerPharmacyById
Allows you to retrieve the ID of the pharmacy owning a container based on the container ID
Parameter :
* container_id *

### [POST] - addXContainerToPharmacy
Allows you to add X containers to a pharmacy based on the pharmacy ID
Parameter :
* pharmacy_id *
* nb_of_containers *

### [POST] - updateContainerStatusById
Allows you to update the status of a container based on his ID
Parameter :
* container_id *
* status *

### [POST] - deleteContainerById
Allows you to delete a container based on his ID
Parameter :
* container_id *

### [POST] - deleteAllContainersFromPharma
Allows you to delete all the containers of a pharmacy based on the phamracy ID
Parameter :
* pharmacy_id *



## Order
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/order/fonction_name__

### [POST] - getOrderById
Allows you to retrieve an order based on his ID
Parameter :
* order_id *

### [POST] - getOrderByPharmacy
Allows you to retrieve all the orders addressed to a pharmacy, based on the pharmacy ID 
Parameter :
* pharmacy_id *

### [POST] - getOrderByClient
Allows you to retrieve all the orders of a client, based on the client ID
Parameter :
* client_id *

### [POST] - getOrderByStatus
Allows you to retrieve all the orders with the required status
Parameter :
* order_status * must be a string : pending, ready, container or finish

### [POST] - getOrderByPreparator
Allows you to retrieve all the orders prepared by a given preparator
Parameter :
* id_preparator *

### [GET] - getAllOrders
Allows you to retrieve all the orders
Parameter :
    none

### [POST] - createOrder
Allows you to create a new order
Parameter :
* detail *
* id_client *
* id_pharmacy *
* total_price *

### [POST] -  deleteOrderById
Allows you to delete an order based on his ID
Parameter :
* order_id *

### [POST] - updateOrder
Allows you to update an order depending on the settings you send.
Please send only what you want to change
Parameter :
* order_id *
* status *




## Order_detail
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/order_detail/fonction_name__

### [GET] - getOrderDetailById
Allows you to retrieve an order detail based on his ID
Parameter :
* order_detail_id *

### [POST] - createOrderDetail
Allows you to create an order detail based on a JSON formatted array of products and the id of the order
Parameter :
* products *
* order_id *

### [POST] - deleteOrderDetailById
Allows you to delete an order detail based on his id 
Parameter :
* order_detail_id *

## Upload/Download Images
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/fonction_name__

### [POST] - uploadFile
Allows you to upload files
*need to be a **form-data format**
Parameter :
* file *

### [GET] - getFile/"filename"
Allows you to get a static file by his filename




