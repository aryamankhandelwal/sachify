const express = require('express');
const { Op } = require('sequelize');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    // Build where clause for filtering
    const whereClause = {};
    
    if (req.query.companyName) {
      whereClause.companyName = { [Op.iLike]: `%${req.query.companyName}%` };
    }
    
    if (req.query.subject) {
      whereClause.subject = { [Op.iLike]: `%${req.query.subject}%` };
    }
    
    if (req.query.date) {
      whereClause.date = req.query.date;
    }
    
    if (req.query.participants) {
      whereClause.participants = { [Op.iLike]: `%${req.query.participants}%` };
    }
    
    // Get total count for pagination
    const total = await Note.count({ where: whereClause });
    
    // Get notes with pagination
    const notes = await Note.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
      offset: offset,
      limit: limit
    });
    
    res.json({
      notes,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ 
      error: 'Failed to fetch notes',
      message: error.message 
    });
  }
});

// GET single note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    
    if (!note) {
      return res.status(404).json({ 
        error: 'Note not found',
        message: 'No note found with the provided ID' 
      });
    }
    
    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ 
      error: 'Failed to fetch note',
      message: error.message 
    });
  }
});

// POST create new note
router.post('/', async (req, res) => {
  try {
    const {
      companyName,
      subject,
      date,
      startTime,
      endTime,
      participants,
      aiSummary,
      notes
    } = req.body;
    
    // Validate required fields (subject and aiSummary can be empty)
    if (!companyName || !date || !startTime || !endTime || !participants || !notes) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Required fields: companyName, date, startTime, endTime, participants, notes'
      });
    }
    
    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({
        error: 'Invalid time format',
        message: 'Start time and end time must be in HH:MM format'
      });
    }
    
    const newNote = await Note.create({
      companyName,
      subject,
      date,
      startTime,
      endTime,
      participants,
      aiSummary,
      notes
    });
    
    res.status(201).json({
      message: 'Note created successfully',
      note: newNote
    });
  } catch (error) {
    console.error('Error creating note:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({
        error: 'Validation error',
        message: errors.join(', ')
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to create note',
      message: error.message 
    });
  }
});

// PUT update note by ID
router.put('/:id', async (req, res) => {
  try {
    const {
      companyName,
      subject,
      date,
      startTime,
      endTime,
      participants,
      aiSummary,
      notes
    } = req.body;
    
    // Validate required fields (subject and aiSummary can be empty)
    if (!companyName || !date || !startTime || !endTime || !participants || !notes) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Required fields: companyName, date, startTime, endTime, participants, notes'
      });
    }
    
    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return res.status(400).json({
        error: 'Invalid time format',
        message: 'Start time and end time must be in HH:MM format'
      });
    }
    
    const note = await Note.findByPk(req.params.id);
    
    if (!note) {
      return res.status(404).json({ 
        error: 'Note not found',
        message: 'No note found with the provided ID' 
      });
    }
    
    const updatedNote = await note.update({
      companyName,
      subject,
      date,
      startTime,
      endTime,
      participants,
      aiSummary,
      notes
    });
    
    res.json({
      message: 'Note updated successfully',
      note: updatedNote
    });
  } catch (error) {
    console.error('Error updating note:', error);
    
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      return res.status(400).json({
        error: 'Validation error',
        message: errors.join(', ')
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to update note',
      message: error.message 
    });
  }
});

// DELETE note by ID
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id);
    
    if (!note) {
      return res.status(404).json({ 
        error: 'Note not found',
        message: 'No note found with the provided ID' 
      });
    }
    
    await note.destroy();
    
    res.json({
      message: 'Note deleted successfully',
      note: note
    });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ 
      error: 'Failed to delete note',
      message: error.message 
    });
  }
});

// GET search notes
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        error: 'Search query required',
        message: 'Please provide a search query parameter "q"'
      });
    }
    
    const notes = await Note.findAll({
      where: {
        [Op.or]: [
          { companyName: { [Op.iLike]: `%${q}%` } },
          { subject: { [Op.iLike]: `%${q}%` } },
          { participants: { [Op.iLike]: `%${q}%` } },
          { aiSummary: { [Op.iLike]: `%${q}%` } },
          { notes: { [Op.iLike]: `%${q}%` } }
        ]
      },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      notes,
      searchQuery: q,
      totalResults: notes.length
    });
  } catch (error) {
    console.error('Error searching notes:', error);
    res.status(500).json({ 
      error: 'Failed to search notes',
      message: error.message 
    });
  }
});

module.exports = router; 