# Node JS MySql Database Connection Demo

Replace user and password in index.js with yours.

### Run the Node JS app

##### 1. Start MySQL Database

Open XAMPP Control Panel and start MySQL module.

##### 2. Start the Node JS app

```shell
cd mysql-demo

npm install

nodemon
```

The app will run on port 3000.


### Create Database

```
1. Do not include database key-value in the config of mysql.createConnection method.

2. Start the server and load the URL: localhost:3000/createdb.

3. Now your database is created in phpmyadmin, you can now add the database in the config of mysql.createConnection method.
```

### Create table

```
1. Open browser and enter URL: http://localhost:3000/createtable
```

### Insert user

```
1. Open postman to send POST request.

2. POST to URL: http://localhost:3000/adduser

3. Body:
    {
        "fname": "Bob",
        "lname": "Ross",
        "email": "bob.ross@yahoo.com"
    }
```


### Update user

```
1. Open postman to send POST request.

2. POST to URL: http://localhost:3000/updateuser/1

3. Body:
    {
        "fname": "Clara",
        "lname": "Wills",
        "email": "clara.wills@gmail.com"
    }
```


### Get users

```
GET URL: http://localhost:3000/getusers
```
