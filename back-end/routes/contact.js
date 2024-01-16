const express = require('express');
const router = express.Router();
const multer = require('multer')
const path = require('path')
const contactController = require('../controllers/contact');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
      
    }
})

const upload = multer({
    storage: storage
})

router.get('/contacts', contactController.getAllContacts);

router.get('/contacts/:contactId', contactController.getSingleContact);

router.post('/contacts', upload.single('image'), contactController.createContact);

router.put('/contacts/:contactId', upload.single('image'), contactController.editContact);

router.delete('/contacts/:contactId', contactController.deleteContact);

module.exports = router;