# THIS IS AN EXAMPLE LIBRARY DATABASE

## ABOUT APP
this is an example of a library API that uses authentication and authorization. There are several authentications and authorizations that I created such as admin, librarian and user and they have their respective authorizations, you can see them in the following flowchart

## FLOW CHART
![flowchart](./asset/1.png)
![flowchart](./asset/2.png)
![flowchart](./asset/3.png)


## API AUTH

#### REGISTER
http://localhost:6592/auth/register

### LOGIN
http://localhost:6592/auth/login

## API LINK ADMIN

### CHANGE ROLE STATUS
http://localhost:6592/admin/user/:id

### GET ALL USERS
http://localhost:6592/admin/allusers

### UPDATE BOOK STATUS
http://localhost:6592/admin/book/:id

### GET BOOKS
http://localhost:6592/admin/books

### GET USER BY ID
http://localhost:6592/admin/user/:id

### INPUT BOOK
http://localhost:6592/admin/book

### DELETE BOOK
http://localhost:6592/admin/book/:id

### DELETE USER
http://localhost:6592/admin/user/19
## API LINK LIBRARIAN

### INPUT BOOK
http://localhost:6592/librarian/inputbook

### GET ALL BOOKS
http://localhost:6592/librarian/allbooks

### UPDATE BOOK STATUS
http://localhost:6592/librarian/updatebook/4

### GET ALL USERS
http://localhost:6592/librarian/users

### DELETE BOOK BY ID
http://localhost:6592/librarian/deletebook/:id

## API LINK USER


 ### GET BOOKS
 http://localhost:6592/user/allbooks

 ### GET BOOK BY STATUS
 http://localhost:6592/user/books/:statusBook

 ### UPDATE BOOK STATUS
 http://localhost:6592/user/updatebookstatus/:id

## OPENAPI LINK
http://localhost:6592/api-docs
## DEPLOYMENT LINK
http://localhost:6592

