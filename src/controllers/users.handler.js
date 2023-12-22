import Book from "../models/books.js";
import User from "../models/users.js";

class UserController {
  
  static getUserBooks = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId).populate('ownedBooks');
      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }
      res.status(200).json(user.ownedBooks);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static getBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const book = await Book.findById(bookId);

      if (!book) {
        return res.status(404).send({ message: 'Book not found.' });
      }

      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static createBook = async (req, res) => {
    try {
      const userId = req.params.userId;
      const { title, author, publisher, numPages } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const newBook = new Book({ title, author, publisher, numPages, owner: userId });
      await newBook.save();

      user.ownedBooks.push(newBook);
      await user.save();

      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static updateBook = async (req, res) => {
    try {
      const bookId = req.params.bookId;
      const { title, author, publisher, numPages } = req.body;

      const book = await Book.findByIdAndUpdate(
        bookId,
        { title, author, publisher, numPages },
        { new: true, runValidators: true }
      );

      if (!book) {
        return res.status(404).send({ message: 'Book not found.' });
      }

      res.status(200).json(book);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  static deleteBook = async (req, res) => {
    try {
      const userId = req.params.userId;
      const bookId = req.params.bookId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      const index = user.ownedBooks.indexOf(bookId);
      if (index > -1) {
        user.ownedBooks.splice(index, 1);
      }

      await user.save();
      await Book.findByIdAndDelete(bookId);

      res.status(200).send({ message: 'Book deleted successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }
}

export default UserController;
