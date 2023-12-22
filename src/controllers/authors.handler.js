import authors from "../models/authors.js";

class AuthorController {

  static listAuthors = (req, res) => {
    authors.find((err, authors) => {
      res.status(200).json(authors);
    });
  }

  static getAuthorById = (req, res) => {
    const id = req.params.id;

    authors.findById(id, (err, author) => {
      if (err) {
        res.status(400).send({ message: `${err.message} - Author ID not found.` });
      } else {
        res.status(200).send(author);
      }
    });
  }

  static createAuthor = (req, res) => {
    let author = new authors(req.body);

    author.save((err) => {
      if (err) {
        res.status(500).send({ message: `${err.message} - Failed to create author.` });
      } else {
        res.status(201).send(author.toJSON());
      }
    });
  }

  static updateAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndUpdate(id, { $set: req.body }, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Author updated successfully' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  }

  static deleteAuthor = (req, res) => {
    const id = req.params.id;

    authors.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: 'Author removed successfully' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  }
}

export default AuthorController;
