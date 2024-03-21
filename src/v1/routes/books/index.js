const express = require('express');
const router = express.Router();
const BookController = require('../../controller/book.controller');
const asyncHandle = require('../../utils/asyncHandle');

router.post('/', asyncHandle(BookController.createBook));
router.get('/', asyncHandle(BookController.getAllBook));
router.get('/:id', asyncHandle(BookController.getBookById));
router.put('/:id', asyncHandle(BookController.updateBook));
router.delete('/:id', asyncHandle(BookController.deleteBook));
router.patch('/delete-multi', asyncHandle(BookController.deleteMultiBook));

module.exports = router;