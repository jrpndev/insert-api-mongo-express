import books from "../models/books.js";
import uploadFile from "../utils/sendImage.js";

class BookController {

  static listBooks = (req, res) => {
    books.find()
      .populate('author')
      .exec((err, books) => {
        res.status(200).json(books);
      });
  }

  static getBookById = (req, res) => {
    const id = req.params.id;

    books.findById(id)
      .populate('author', 'name')
      .exec((err, book) => {
        if (err) {
          res.status(400).send({ message: `${err.message} - Book ID not found.` });
        } else {
          res.status(200).send(book);
        }
      });
  }

  static createBook = async (req, res) => {
    try {
      const { title, author, publisher, numPages, owner } = req.body;

      const book = new books({
        title,
        author,
        publisher,
        numPages,
        owner,
        imageUrl: '',
      });

      await book.save();

      res.status(201).send(await books.findById(book._id));
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Failed to create book.' });
    }
  }

  static uploadImage = async (req, res) => {
    try {
      const { owner, bookId } = req.params;
      const file = req.file;

      const metadata = {
        contentType : req.file.mimetype
      }
  
      if (!file) {
        return res.status(400).send({ message: 'No file provided.' });
      }
  
      const imageUrl = await uploadFile(owner, bookId, file.buffer, metadata, req.file.originalName);
  
      await books.findByIdAndUpdate(bookId, { $set: { imageUrl } });
  
      res.status(200).send({ imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Failed to upload image.' });
    }
  }
  


  static updateBook = (req, res) => {
    const id = req.params.id;

    books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Book updated successfully' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  }

  static deleteBook = (req, res) => {
    const id = req.params.id;

    books.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Book removed successfully' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  }

  static listBooksByPublisher = (req, res) => {
    const publisher = req.query.publisher;

    books.find({ 'publisher': publisher }, {}, (err, books) => {
      res.status(200).send(books);
    });
  }
}

export default BookController;
