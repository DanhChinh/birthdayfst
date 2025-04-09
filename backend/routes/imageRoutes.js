const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const db = require('../db');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// GET - Danh sách ảnh
router.get('/', (req, res) => {
    db.query('SELECT * FROM images', (err, results) => {
        if (err) return res.status(500).json({ error: 'Lỗi DB' });
        res.json(results);
    });
});

// POST - Upload ảnh
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Không có file' });
    const url = `/uploads/${req.file.filename}`;
    db.query('INSERT INTO images (url) VALUES (?)', [url], err => {
        if (err) return res.status(500).json({ error: 'Lỗi ghi DB' });
        res.json({ success: true, url });
    });
});

// DELETE - Xóa ảnh
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT url FROM images WHERE id = ?', [id], (err, result) => {
        if (err || result.length === 0) return res.status(404).json({ error: 'Không tìm thấy ảnh' });
        const imagePath = path.join(__dirname, '..', result[0].url);
        fs.unlink(imagePath, () => {
            db.query('DELETE FROM images WHERE id = ?', [id], err => {
                if (err) return res.status(500).json({ error: 'Lỗi xoá DB' });
                res.json({ success: true });
            });
        });
    });
});

module.exports = router;