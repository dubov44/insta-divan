const express = require('express');
const router = express.Router();
const Entity = require('../models/Entity');

// Get all entities
router.get('/', async (req, res) => {
  try {
    const entities = await Entity.find();
    res.json(entities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new entity
router.post('/', async (req, res) => {
  const entity = new Entity({
    id: req.body.id,
    role: req.body.role,
    topics: req.body.topics
  });

  try {
    const newEntity = await entity.save();
    res.status(201).json(newEntity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update entity topics
router.patch('/:id', async (req, res) => {
  try {
    const entity = await Entity.findOne({ id: req.params.id });
    if (entity) {
      entity.topics = req.body.topics;
      const updatedEntity = await entity.save();
      res.json(updatedEntity);
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an entity
router.delete('/:id', async (req, res) => {
  try {
    const entity = await Entity.findOne({ id: req.params.id });
    if (entity) {
      await entity.deleteOne();
      res.json({ message: 'Entity deleted' });
    } else {
      res.status(404).json({ message: 'Entity not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 