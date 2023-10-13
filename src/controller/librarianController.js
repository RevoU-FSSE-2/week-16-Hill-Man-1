const db = require('../config/db.connection');

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

// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const sql = 'SELECT * FROM users';
        const [users] = await db.query(sql);
        res.status(200).json({ users });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error to Get Users', error });
    }
};


// UPDATE BOOKS STATUS
exports.updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { bookStatus } = req.body; 
        const sqlId = 'SELECT * FROM books WHERE bookId = ?';
        const [booksId] = await db.query(sqlId, [bookId]);

        if (booksId.length === 0) {
            return res.status(404).json({ message: 'Books Not Found' });
        }

        const updatedBook = await db.query('UPDATE books SET bookStatus = ? WHERE bookId = ?', [bookStatus, bookId]);
        if(bookStatus === 'booked'){
            return res.status(500).json({ message: 'Only User can Update to Booked'});    
        }
        res.status(200).json({ message: `Book Status Updated By Librarian` });
    } catch (error) {
        res.status(500).json({ message: 'Error updating Book Status', error: error.message });
    }
};

// CREATE NEW BOOK
exports.inputBook = async (req, res) => {
    try {
        const { bookName, author, yearRelease: yearRelease, genre} = req.body;
        const sql = 'INSERT INTO books (bookName, author, yearRelease, genre, bookStatus) VALUES (?, ?, ?, ?, ?)';
        const newBook = db.query(sql, [bookName, author, yearRelease, genre, "available"])
            res.json({ message: 'book added successfully'})
    } catch (error) {
        res.status(500).json({ message: 'Error updating Book Status', error: error.message });
    }
}


// DELETE BOOK FROM ID
exports.deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const sqlId = 'SELECT * FROM books WHERE bookId = ?';
        const [booksId] = await db.query(sqlId, [bookId]);

        if (booksId.length === 0) {
            return res.status(404).json({ message: 'Books Not Found' });
        }

        const sql = 'DELETE FROM books WHERE bookId = ?';
        const [deleteBook] = await db.query(sql, [bookId]);
        if (deleteBook.length === 0) {
            return res.status(404).json({ message: 'Books Not Found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' }); 
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Error deleting book', error });
    }
};
