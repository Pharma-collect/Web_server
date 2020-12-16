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

You also need to add a header with __Key__ : "Host" and __Value__ : "node"

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

### [GET] - getUserClientById
> WARNING (1): Calls corresponding to this part will be made in the form of :
>   __.../api/user_client/fonction_name__

> WARNING (2) : Calls corresponding to this function are secured. 
> To access a user's information you must be that user and you will have to send your identification toker in the __Header__ :
> __Key__ : "Authorization" and __Value__ : "<your_token>"

Allows you to retrieve a customer based on his ID.
Parameter :
* user_id *

### [GET] - getUserClientByUsername
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

### [GET] - getUserProByPharmacy
Allows you to retrieve a pro based on his pharmacy.
Parameter :
* pharmacy_id *

### [GET] - getUserProByUsername
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

### [GET] - getPharmacyById
Allows you to retrieve a pharmacy based on his ID.
Parameter :
* pharmacy_id *

### [GET] - getPharmacyByName
Allows you to retrieve a pharmacy based on his name.
Parameter :
* name *

### [GET] - getPharmacyByCity
Allows you to retrieve all the pharmacies in a given city.
Parameter :
* city *

### [GET] - getPharmacyByPostCode
Allows you to retrieve all the pharmacies in a given post code.
Parameter :
* post_code *

### [GET] - getPharmacyByBoss
Allows you to retrieve all the pharmacies owned by a given boss
Parameter :
* boss *

### [GET] - getPharmacyWithShop
Allows you to retrieve all the pharmacies with a shop
Parameter :
    none

### [GET] - getPharmacyWithoutShop
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

### [POST] - updatePharmacy
Allows you to update a pharmacy.
You only have to send the data you want to change.
Parameter :
* pharmacy_id *
* name
* has_shop
* road_nb
* road
* phone
* post_code
* city
* boss

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
Allows you to retrieve all the product based on a pharmacy ID.
Parameter :
* pharmacy_id *

### [POST] - createProduct
Allows you to create a product.
Parameters :
* title *
* price *
* pharmacy_id *
* description
* capacity
* image_url

### [POST] - updateProduct
Allows you to update a product. 
You only have to send the data you want to change.
Parameters :
* product_id *
* title 
* price 
* pharmacy_id 
* description
* capacity
* image_url



## Container
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/container/fonction_name__

### [GET] - getContainerById
Allows you to retrieve a container based on his ID.
Parameter :
* container_id *

### [GET] - getAllContainers
Allows you to retrieve all the containers
Parameter :
    none

### [GET] - getContainerByPharmacy
Allows you to retrieve the containers based on the pharmacy ID
Parameter :
* pharmacy_id *

### [GET] - getEmptyContainerByPharmacy
Allows you to retrieve empty containers based on the pharmacy ID
Parameter :
* pharmacy_id * 

### [POST] - addXContainerToPharmacy
Allows you to add X containers to a pharmacy based on the pharmacy ID
Parameter :
* pharmacy_id *
* nb_of_containers *

### [POST] - updateContainer
Allows you to update the status of a container based on his ID
Parameter :
* container_id *
* status *

### [POST] - deleteContainerById
Allows you to delete a container based on his ID
Parameter :
* container_id *

### [POST] - deleteAllContainersFromPharma
Allows you to delete all the containers of a pharmacy based on the pharmacy's ID
Parameter :
* pharmacy_id *



## Order
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/order/fonction_name__

### [GET] - getOrderById
Allows you to retrieve an order based on his ID
Parameter :
* order_id *

### [GET] - getOrderByPharmacy
Allows you to retrieve all the orders addressed to a pharmacy, based on the pharmacy ID 
Parameter :
* pharmacy_id *

### [GET] - getOrderByClient
Allows you to retrieve all the orders of a client, based on the client ID
Parameter :
* client_id *

### [GET] - getOrderByStatus
Allows you to retrieve all the orders with the required status
Parameter :
* order_status *

### [GET] - getOrderByPreparator
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
* id_client *
* id_pharmacy *
* total_price (€) *
* products * (JSON formatted array of products)
* detail

> JSON Code example :
```
{
    id_client: <your id>,
    id_pharmacy: <your pharmacy>,
    total_price: 200,
    "products" : [
                    {"id_product" : 3, "quantity" : 1 },
                    {"id_product" : 2, "quantity" : 1 }    
    ],
    detail: "call me"
}
```

### [POST] -  deleteOrderById
Allows you to delete an order based on his ID
Parameter :
* order_id *

### [POST] - updateOrder
Allows you to update the status of an order based on his ID.
You only have to send the data you want to change.
Parameter :
* order_id *
* status
* detail
* id_client
* id_preparator
* id_qrcode
* id_pharmacy
* total_price


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

> JSON Code example :
```
{
    "products" : [
                    {"id_product" : 3, "quantity" : 1 },
                    { "id_product" : 2, "quantity" : 1 }    
    ],
    "order_id" : 5
}
```

### [POST] - deleteOrderDetailById
Allows you to delete an order detail based on his id 
Parameter :
* order_detail_id *



