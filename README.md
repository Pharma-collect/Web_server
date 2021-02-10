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


## STATUS RETURNED
> WARNING : In case of an error or not, the server can return different status

* missing parameter : __422__
* success : __200__
* success get but empty result : __204__
* login fail : __401__
* custom : __> 1000__


# Web Services


Here is the list of available web-services as well as the parameters necessary for their proper functioning :

> WARNING (1): Query parameters must be sent in JSON format

> WARNING (2): You must respect the syntax of the parameters to be sent to the server

> WARNING (3): Mandatory parameters will be noted with " * "

> WARNING (4): You need to add a header with __Key__ : "Host" and __Value__ : "node"

## User_client
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/user_client/fonction_name__

### [GET] - getAllUserClient
Allows you to retrieve all the customers present in the database.
No parameters required.

### [POST] - getUserClientById
> WARNING : Calls corresponding to this function are secured. 
> To access a user's information you must be that user and you will have to send your identification toker in the __Header__ :
> __Key__ : "Authorization" and __Value__ : "<your_token>"

Allows you to retrieve a customer based on his ID.
Parameter :
* user_id *

### [POST] - getUserClientByUsername
Allows you to retrieve a customer based on his username.
Parameter :
* username *

### [POST] - deleteUserClient
Delete a customer according to his ID.
Parameter :
* user_id *

### [POST] - registerClient
Allows you to create a customer.
Parameters :
* name *
* lastname *
* password * (needs to be encrypted with bcrypt & salt of 10)
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

### [POST] - getUserProById
Allows you to retrieve a pro based on his id.
Parameter :
* user_id *

### [POST] - deleteUserPro
Delete a pro according to his Id.
Parameter :
* user_id *

### [POST] - createUserPro
Allows you to create a pro.
Parameters :
* username *
* password * (needs to be encrypted with bcrypt & salt of 10)
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

### [POST] - getProductsById
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

### [POST] - getOrderById
Allows you to retrieve an order based on his ID
Parameter :
* order_id *

### [POST] - getOrderByHash
Allows you to retrieve an order based on his hash
Parameter :
* order_hash *

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
* order_status *

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
* id_client *
* id_pharmacy *
* total_price (€) *
* products * (JSON formatted array of products)
* detail
* id_prescription

> JSON Code example :
```
    "products" : [
                    {"id_product" : 3, "quantity" : 1 },
                    {"id_product" : 2, "quantity" : 1 }    
    ],
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
* status (if there is an prescription affiliated with the order then its status will be correlated)
* detail
* id_client
* id_preparator
* id_qrcode
* id_pharmacy
* total_price
* id_prescription
* id_container (if there is an affiliated container and the status of the order is "container" then the status of the container will also be modified.)


## Order_detail
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/order_detail/fonction_name__

### [POST] - getOrderDetailById
Allows you to retrieve an order detail based on his ID
Parameter :
* order_detail_id *

### [POST] - getOrderDetailsByOrder
Allows you to retrieve details of order
Parameter :
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
* filetype * (avatar, prescription or product)

### [GET] - getFile/"filename"
Allows you to get a static file by his filename

## Prescription
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/prescription/fonction_name__

### [POST] - createPrescription
> WARNING : need to be a FORM_DATA format 

Allows you to create a prescription
Parameter :
* file *
* id_client *
* id_pharmacy*
* detail

### [POST] - updatePrescription
Allows you to update the status of an order based on his ID.
You only have to send the data you want to change.
Parameter :
* id_prescription *
* detail
* id_preparator
* id_pharmacy
* status

### [POST] - deletePrescription
Allows you to delete an prescription based on his id 
Parameter :
* id_prescription *

### [POST] - getPrescriptionById
Allows you to retrieve an prescription based on his ID.
Parameter :
* prescription_id *

### [POST] - getPrescriptionsByPharmacy
Allows you to retrieve all the prescriptions addressed to a pharmacy, based on the pharmacy ID. 
Parameter :
* pharmacy_id *

### [POST] - getPrescriptionsByClient
Allows you to retrieve all the prescriptions of a client, based on the client ID.
Parameter :
* client_id *

### [POST] - getPrescriptionsByStatus
Allows you to retrieve all the prescriptions with the required status
Parameter :
* status *

## Extra
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/data/fonction_name__

### [POST] - getFamousProducts

Allows you to retrieve the most frequently purchased products from a pharmacy.
Parameter :
* pharmacy_id *

### [POST] - getSalesRevenue

Recovers the total amount of purchases.
Parameter :
* pharmacy_id *

## SWAGGER :warning:

To get a better visualisation of the route :
* Download swagger-viewer extension for chrome
    * [Download extension Link](https://chrome.google.com/webstore/detail/swagger-viewer/nfmkaonpdmaglhjjlggfhlndofdldfag?hl=en)
* Go to docs/swagger.yml
* Put the extension on

