require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Sachify backend running!'));
const PORT = process.env.PORT || 4000;

let notes = [];
let nextId = 1;

// Helper: generate summary (simple first 20 words)
function generateSummary(content) {
  return content.split(/\s+/).slice(0, 20).join(' ') + (content.split(/\s+/).length > 20 ? '...' : '');
}

// GET /notes?page=
app.get('/notes', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = 10;
  const sorted = [...notes].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const paged = sorted.slice((page - 1) * pageSize, page * pageSize);
  res.json({ notes: paged, page, total: notes.length });
});

// POST /notes
app.post('/notes', (req, res) => {
  const { title, content, company, participants, date, time } = req.body;
  const created_at = date && time ? new Date(`${date}T${time}`) : new Date();
  const note = {
    id: nextId++,
    title,
    content,
    summary: generateSummary(content),
    company,
    participants,
    created_at,
    updated_at: created_at,
  };
  notes.push(note);
  res.status(201).json(note);
});

// PUT /notes/:id
app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Note not found' });
  const { title, content, company, participants, date, time } = req.body;
  const updated_at = new Date();
  notes[idx] = {
    ...notes[idx],
    title,
    content,
    summary: generateSummary(content),
    company,
    participants,
    updated_at,
    created_at: date && time ? new Date(`${date}T${time}`) : notes[idx].created_at,
  };
  res.json(notes[idx]);
});

// GET /notes/:id
app.get('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = notes.find(n => n.id === id);
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// DELETE /notes/:id
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idx = notes.findIndex(n => n.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Note not found' });
  notes.splice(idx, 1);
  res.status(204).end();
});

// GET /search?q=
app.get('/search', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const results = notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.content.toLowerCase().includes(q) ||
    n.company.toLowerCase().includes(q) ||
    n.participants.toLowerCase().includes(q)
  );
  res.json({ notes: results });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
