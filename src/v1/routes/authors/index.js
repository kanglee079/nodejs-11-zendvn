const express = require('express');
const router = express.Router();
const AuthorController = require('../../controller/author.controller');
const asyncHandle = require('../../utils/asyncHandle');

router.post('/', asyncHandle(AuthorController.createAuthor));
router.get('/', asyncHandle(AuthorController.getAuthors));
router.get('/:id', asyncHandle(AuthorController.getAuthorById));
router.put('/:id', asyncHandle(AuthorController.updateAuthor));
router.delete('/:id', asyncHandle(AuthorController.deleteAuthor));
router.patch('/delete-multi', asyncHandle(AuthorController.deleteMultiAuthor));


module.exports = router;