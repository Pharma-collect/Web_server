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

### [GET] getAllUserClient
Allows you to retrieve all the customers present in the database.
No parameters required.

### [GET] getUserClientById
Allows you to retrieve a customer based on his ID.
Parameter :
* user_id *

### [GET] getUserClientByUsername
Allows you to retrieve a customer based on his username.
Parameter :
* username *

### [POST] deleteUserClientById
Delete a customer according to his ID.
Parameter :
* user_id *

### [POST] registerClient
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

### [POST] loginClient
Allows you to login.
Parameters :
* username *
* password *

## User_pro
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/user_pro/fonction_name__

### [GET] getAllUserPro
Allows you to retrieve all the professionals  present in the database.
No parameters required.

### [GET] getUserProByPharmacy
Allows you to retrieve a pro based on his pharmacy.
Parameter :
* pharmacy_id *

### [GET] getUserProByUsername
Allows you to retrieve a pro based on his username.
Parameter :
* username *

### [POST] deleteUserProByUsername
Delete a pro according to his username.
Parameter :
* username *

### [POST] createUserPro
Allows you to create a pro.
Parameters :
* username *
* password *
* pharmacy_id *

### [POST] loginPro
Allows you to login as a pro.
Parameters :
* username *
* password *

## Pharmacy
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/pharmacy/fonction_name__

### [GET] getPharmacyById
Allows you to retrieve a pharmacy based on his ID.
Parameter :
* pharmacy_id *

### [GET] getPharmacyByName
Allows you to retrieve a pharmacy based on his name.
Parameter :
* name *

### [GET] getPharmacyByCity
Allows you to retrieve all the pharmacies in a given city.
Parameter :
* city *

### [GET] getPharmacyByPostCode
Allows you to retrieve all the pharmacies in a given post code.
Parameter :
* post_code *

### [GET] getPharmacyByBoss
Allows you to retrieve all the pharmacies owned by a given boss
Parameter :
* boss *

### [GET] getPharmacyWithShop
Allows you to retrieve all the pharmacies with a shop
Parameter :
    none

### [GET] getPharmacyWithoutShop
Allows you to retrieve all the pharmacies without a shop
Parameter :
    none

### [POST] createPharmacy
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

### [POST] updatePharmacyNameById
Allows you to update the name of a pharmacy.
Parameter :
* pharmacy_id *
* name *

### [POST] updatePharmacyPhoneById
Allows you to update the phone number of a pharmacy.
Parameter :
* pharmacy_id *
* phone *

### [POST] updatePharmacyShopById
Allows you to update if a pharmacy has a shop or not.
Parameter :
* pharmacy_id *
* has_shop *

### [POST] updatePharmacyBossById
Allows you to update the name of the boss of a pharmacy.
Parameter :
* pharmacy_id *
* boss *

### [POST] deletePharmacyById
Allows you to delete a pharmacy based on his ID.
Parameter :
* pharmacy_id *

### [POST] deletePharmacyByBoss
Allows you to delete a pharmacy based on his boss.
Parameter :
* boss *

## Product
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/product/fonction_name__

### [GET] getAllProducts
Allows you to retrieve all the products present in the database.
No parameters required.

### [GET] getProductsByPharmacy
Allows you to retrieve all the product based on a pharmacy ID.
Parameter :
* pharmacy_id *

### [POST] createProduct
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

### [GET] getContainerById
Allows you to retrieve a container based on his ID.
Parameter :
* container_id *

### [GET] getAllContainers
Allows you to retrieve all the containers
Parameter :
    none

### [GET] getContainerByPharmacy
Allows you to retrieve the containers based on the pharmacy ID
Parameter :
* pharmacy_id *

### [GET] getEmptyContainerByPharmacy
Allows you to retrieve empty containers based on the pharmacy ID
Parameter :
* pharmacy_id * 

### [GET] getContainerStatusById
Allows you to retrieve the status of a container based on his ID
Parameter :
* container_id *

### [GET] getContainerNumberById
Allows you to retrieve the number of a container based on his ID
Parameter :
* number_id *

### [GET] getContainerPharmacyById
Allows you to retrieve the ID of the pharmacy owning a container based on the container ID
Parameter :
* container_id *

### [POST] addXContainerToPharmacy
Allows you to add X containers to a pharmacy based on the pharmacy ID
Parameter :
* pharmacy_id *
* nb_of_containers *

### [POST] updateContainerStatusById
Allows you to update the status of a container based on his ID
Parameter :
* container_id *
* status *

### [POST] deleteContainerById
Allows you to delete a container based on his ID
Parameter :
* container_id *

### [POST] deleteAllContainersFromPharma
Allows you to delete all the containers of a pharmacy based on the phamracy ID
Parameter :
* pharmacy_id *



## Order
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/order/fonction_name__

### [GET] getOrderById
Allows you to retrieve an order based on his ID
Parameter :
* order_id *

### [GET] getOrderByPharmacy
Allows you to retrieve all the orders addressed to a pharmacy, based on the pharmacy ID 
Parameter :
* pharmacy_id *

### [GET] getOrderByClient
Allows you to retrieve all the orders of a client, based on the client ID
Parameter :
* client_id *

### [GET] getOrderStatusById
Allows you to retrieve the status of an order based on his ID
Parameter :
* order_id * 

### [GET] getOrderDetailById
Allows you to retrieve the detail of an order based on his ID
Parameter :
* order_id *

### [GET] getOrderByStatus
Allows you to retrieve all the orders with the required status
Parameter :
* order_status *

### [GET] getOrderByPreparator
Allows you to retrieve all the orders prepared by a given preparator
Parameter :
* id_preparator *

### [GET] getOrderPreparatorById
Allows you to retrieve the id of the preparator of an order thanks to the id of the order
Parameter :
* order_id *

### [GET] getOrderContainerById
Allows you to retrieve the id of the container where the order is placed thanks to the id of the order
Parameter :
* order_id *

### [GET] getOrderQrCodeById
Allows you to retrieve the id of the qrcode associated to an order thanks to the id of the order
Parameter :
* order_id *

### [GET] getOrderPharmacyById
Allows you to retrieve the id of the pharmacy associated to an order thanks to the id of the order
Parameter :
* order_id *

### [GET] getOrderTotalPriceById
Allows you to retrieve the total price of an order thanks to the id of the order
Parameter :
* order_id *

### [GET] getAllOrders
Allows you to retrieve all the orders
Parameter :
    none

### [POST] createOrder
Allows you to create a new order
Parameter :
* detail *
* id_client *
* id_pharmacy *
* total_price *

### [POST] deleteOrderById
Allows you to delete an order based on his ID
Parameter :
* order_id *

### [POST] updateOrderStatusById
Allows you to update the status of an order based on his ID
Parameter :
* order_id *
* status *

### [POST] updateOrderPreparatorById
Allows you to update the preparator of an order based on his ID
Parameter :
* order_id *
* preparator_id *

### [POST] updateOrderContainerById
Allows you to update the container of an order based on his ID
Parameter :
* order_id *
* container_id *

### [POST] updateOrderQrCodeById
Allows you to update the QRCode of an order based on his ID
Parameter :
* order_id *
* qrcode_id *



## Order_detail
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/order_detail/fonction_name__

### [GET] getOrderDetailById
Allows you to retrieve an order detail based on his ID
Parameter :
* order_detail_id *

### [POST] createOrderDetail
Allows you to create an order detail based on a JSON formatted array of products and the id of the order
Parameter :
* products *
* order_id *

### [POST] deleteOrderDetailById
Allows you to delete an order detail based on his id 
Parameter :
* order_detail_id *



