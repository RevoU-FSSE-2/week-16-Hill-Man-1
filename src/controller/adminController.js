const db = require('../config/db.connection');

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [users] = await db.query(sql);
        res.status(200).json({ users });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error Get Users', error });
    }
};

// GET USER BY ID
exports.getUsersById = async (req, res) => {
    try {
        const userId = req.params.id;
        const sql = 'SELECT * FROM users WHERE userId = ?';
        const [users] = await db.query(sql, [userId]);

        if (users.length === 0) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        res.status(200).json({ users });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error Get Users', error });
    }
};


// GET ALL BOOKS
exports.getAllBooks = async (req, res) => {
    try {
        const sql = 'SELECT * FROM books';
        const [books] = await db.query(sql);
        res.status(200).json({ books });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error to Get Books', error });
    }
};


// UPDATE ROLE STATUS WHEN REGISTER

exports.updateRoleStatus = async (req, res) => {
    try {
        const userId = req.params.id;
        const sqlId = 'SELECT * FROM users WHERE userId = ?';
        const [idUser] = await db.query(sqlId, [userId]);

        if (idUser.length === 0) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        const { roleStatus } = req.body; 

        const updatedRole = await db.query('UPDATE users SET roleStatus = ? WHERE userId = ?', [roleStatus, userId]);
        res.status(200).json({ message: `Role Status Updated for ID ${userId}` });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role status', error: error.message });
    }
};


// UPDATE BOOKS STATUS
exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const sqlId = 'SELECT * FROM books WHERE bookId = ?';
        const [booksId] = await db.query(sqlId, [bookId]);

        if (booksId.length === 0) {
            return res.status(404).json({ message: 'Books Not Found' });
        }

        const { bookStatus } = req.body; 
        const updatedBook = await db.query('UPDATE books SET bookStatus = ? WHERE bookId = ?', [bookStatus, bookId]);
        if(bookStatus === 'booked'){
            return res.status(500).json({ message: 'Only User can Update to Booked'});    
        }
        res.status(200).json({ message: `Book Status Updated By Admin` });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Book Status', error: error.message });
    }
};

// CREATE NEW BOOK
exports.inputBook = async (req, res) => {
    try {
        const { bookName, author, yearRelease, genre} = req.body;
        const sql = 'INSERT INTO books (bookName, author, yearRelease, genre, bookStatus) VALUES (?, ?, ?, ?, ?)';
        db.query(sql, [bookName, author, yearRelease, genre, "available"], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'An error occurred while input book' });
            } else {
                res.json({ message: 'book added successfully', id: result.insertId })
                }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Book Status', error: error.message });
    }
}


// DELETE BOOK
exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const sql = 'DELETE FROM books WHERE bookId = ?';
        const [deleteBook] = await db.query(sql, [bookId]); 
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error deleting book', error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const sqlId = 'SELECT * FROM users WHERE userId = ?';
        const [idUser] = await db.query(sqlId, [userId]);

        if (idUser.length === 0) {
            return res.status(404).json({ message: 'User Not Found' });
        }

        const sql = 'DELETE FROM users WHERE userId = ?';
        const [deleteUser] = await db.query(sql, [userId]); 
        res.status(200).json({message: 'User deleted successfully'});
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error deleting book', error });
    }
};



