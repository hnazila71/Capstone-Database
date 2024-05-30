const db = require('../config/db');
const { validationResult } = require('express-validator');

exports.hewan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.body;

  try {
    const [hewan] = await db.execute('SELECT * FROM hewan WHERE id = ?', [id]);
    if (hewan.length === 0) {
      return res.status(400).json({ error: true, message: 'Invalid credentials' });
    }

    res.send({ 
      error: false,
      message: 'Animal get successful',
      AnimalResult: {Id: hewan[0].id,
        nama: hewan[0].nama_hewan,
        linkFoto: hewan[0].link_foto,
        penjelasan: hewan[0].penjelasan
      } 
    });

  } catch (err) {
    console.error('Error during get animal:', err);
    res.status(500).send({ error: true, message: 'Server error' });
  }
};