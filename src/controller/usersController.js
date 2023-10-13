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

exports.searchBookStatus = async (req, res) => {
    try {
        const bookStatus = req.params.bookStatus;
        const sql = 'SELECT * FROM books WHERE bookStatus = ?';
        const [books] = await db.query(sql, [bookStatus]);

        if (books.length === 0) {
            return res.status(404).json({ message: 'Books Not Found' });
        }

        res.status(200).json({ books });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};



// UPDATE STATUS FROM AVAILABLE TO BOOKED
exports.updateBookStatus = async (req, res) => {
    try {
        const bookId = req.params.id;
        const { bookStatus } = req.body;

        const updatedBookResult = await db.query('UPDATE books SET bookStatus = ? WHERE bookId = ?', [bookStatus, bookId]);
        if (bookStatus !== "booked") {
            return res.status(400).json({ message: 'Book status can only be updated to "booked"' });
        }
        

        res.status(200).json({ message: 'Book status updated successfully' });
    } catch (error) {
        console.error('Error updating book status:', error);
        res.status(500).json({ message: 'An error occurred while updating book status', error: error.message });
    }
};












