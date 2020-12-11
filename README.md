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

## Pharmacy
> WARNING : Calls corresponding to this part will be made in the form of :
>   __.../api/pharmacy/fonction_name__

### [GET] getPharmacyById
Allows you to retrieve a pharmacy based on his ID.
Parameter :
* pharmacy_id *
