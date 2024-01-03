import express from 'express';
import uploadFile from '../utils/sendImage.js';
class ModelController {
  constructor(Model) {
    this.Model = Model;
    this.router = express.Router();

    this.list = this.list.bind(this);
    this.listById = this.listById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.remove = this.remove.bind(this);
    this.getByField = this.getByField.bind(this);
    this.uploadFile = this.uploadFile.bind(this);

    this.router.get('/getByField', this.getByField);
    this.router.get('/', this.list);
    this.router.get('/:id', this.listById);
    this.router.post('/', this.create);
    this.router.put('/:id', this.update);
    this.router.delete('/:id', this.remove);
    this.router.post(`/uploadFile/:owner/:itemId/:type/:field`, this.uploadFile);

  }

  async list(req, res) {
    try {
      const items = await this.Model.find();
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async listById(req, res) {
    try {
      const item = await this.Model.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(item);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async create(req, res) {
    try {
      const newItem = new this.Model(req.body);
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async update(req, res) {
    try {
      const updatedItem = await this.Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(updatedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async remove(req, res) {
    try {
      const deletedItem = await this.Model.findByIdAndRemove(req.params.id);
      if (!deletedItem) {
        return res.status(404).json({ message: 'Item not found' });
      }
      res.json(deletedItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async uploadFile(req, res) {
    try {
      const owner = req.params.owner;
      const itemId = req.params.itemId;
      const type = req.params.type;
      const field = req.params.field;


      const metadata = {
        contentType: req.file.mimetype
      };

      if (!req.file) {
        return res.status(400).send({ message: 'No file provided.' });
      }

      const imageUrl = await uploadFile(owner, itemId, req.file.buffer, metadata, req.file.originalname, type);

      await this.Model.findByIdAndUpdate(itemId, { $set: { field } });

      res.status(200).send({ imageUrl });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Failed to upload image.' });
    }
  }

  async getByField(req, res) {
    try {
      const { field, value } = req.query;
      if (!field || !value) {
        return res.status(400).json({ message: 'Field and value are required in query parameters.' });
      }

      const query = {};
      query[field] = value;

      const items = await this.Model.find(query);
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

export default ModelController;
