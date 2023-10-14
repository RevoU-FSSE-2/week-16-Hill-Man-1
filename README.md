# My Library App
This application is a simple library management system that allows users to interact with the library resources. It is built using Node.js with Express and includes different user roles such as Admin, Librarian, and User.

## Features

-   User Registration & Login: Users can register and log in to access library resources.
-   Role-Based Access Control: The application includes role-based access control with different roles for Admin, Librarian, and User.
-   Book Management: Admin and Librarian can add, update, delete books and view all books.
-   User Management: Admin can view all users, delete users, and update user roles.
-   Password Reset: Users can request for password reset.
-   Search Books: Users can search for books based on their status.
-   Book Booking: Users can book available books.
## Getting Started
### Prerequisites
1. Make sure you have installed:

- Node.js
- MySQL
- Installation
- Clone the repository:

```sh
git clone https://github.com/your-username/your-repository
```

2. Install the required packages:


```sh
npm install
```
3. Create a .env file in the root directory of your project and add your environment variables:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DATABASE=your_db_database
```
4. Initialize your MySQL database and import the necessary data.


Usage
To run the application, execute the following command:


```sh
npm start
```

This will start the server on http://localhost:3000/.


### Routes
#### Authentication

- POST /auth/register: Register a new user.
- POST /auth/login: Log in a user.
- POST /auth/logout: Log out a user.
- POST /auth/refresh: Refresh the access token.

##### Password Reset

- POST /password/requestreset: Request for password reset.
- POST /password/reset: Reset the password.

#### Admin

- GET /admin/books: Get all books.
- GET /admin/users: Get all users.
- GET /admin/user/:id: Get a user by ID.
- POST /admin/book: Add a new book.
- PATCH /admin/user/:id: Update a user's role.
- PATCH /admin/book/:id: Update a book's status.
- DELETE /admin/book/:id: Delete a book.
- DELETE /admin/user/:id: Delete a user.

##### Librarian

- GET /librarian/allbooks: Get all books.
- GET /librarian/users: Get all users.
- POST /librarian/inputbook: Add a new book.
- PATCH /librarian/updatebook/:id: Update a book's status.
- DELETE /librarian/deletebook/:id: Delete a book.

#### User

- GET /user/allbooks: Get all books.
- GET /user/books/:bookStatus: Get books by status.
- PATCH /user/updatebookstatus/:id: Update a book's status.

#### Contributing
If you would like to contribute, feel free to open a pull request. Make sure to provide a clear description of the changes you have made.

#### License
This project is licensed under the MIT License - see the LICENSE.md file for details.

© 2023 Hilman Syarifudin F