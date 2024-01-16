const ContactModel = require("../models/Contact");

const fs = require('fs');
const path = require('path')


exports.getAllContacts = async (req, res, next) => {

    try {
        const totalContact = await ContactModel.find().countDocuments();
        const contacts = await ContactModel.find();
        res.status(200).json({ contacts, totalContact });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getSingleContact = async (req, res, next) => {
    const contactId = req.params.contactId;
    try {
        const contact = await ContactModel.findById(contactId);
        if (!contact) {
            const error = new Error('Could not find contact.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ contact });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createContact = async (req, res, next) => {
    try {
        const { fullname, phoneNumber, email, job, address, group } = req.body;
        const image = req.file? req.file.filename : "";


        // store something
        // await s3.putObject({
        //     Body: JSON.stringify({ key: "image" }),
        //     Bucket: "cyclic-easy-plum-raven-gear-ap-northeast-1",
        //     Key: `images/${req.file?.filename}`,
        //     // Key: `images/${req.file?.fieldname}_${Date.now()}${path.extname(req.file?.originalname)}`,
        // }).promise()
        // res.set('Content-type','multipart/form-data')
        // res.send('ok').end();


        // cloudinary.uploader.upload(req.file.path, function (err, result) {
        // })

        const contact = new ContactModel({
            fullname,
            image,
            phoneNumber,
            email,
            job,
            address,
            group
        });
        await contact.save();

        res.status(201).json({ message: 'contact created.', contact });



    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editContact = async (req, res, next) => {
    const contactId = req.params.contactId;
    try {
        let { fullname, phoneNumber, email, job, address, group } = req.body;
        const image = req.file?.filename;

        const contact = await ContactModel.findById(contactId);

        if (!contact) {
            const error = new Error('Could not find the contact.');
            error.statusCode = 404;
            throw error;
        }

        if (req.file) {
            if (image != contact.image) {

                const imagePath = contact.image;
                const filePath = path.join(__dirname, '..', 'public/images', imagePath);

                if (imagePath) {
                    fs.unlink(filePath, err => console.log(err));
                }
                contact.image = image;
            }

        }

        contact.fullname = fullname;
        contact.phoneNumber = phoneNumber;
        contact.email = email;
        contact.job = job;
        contact.address = address;
        contact.group = group;

        await contact.save();

        res.status(200).json({ message: 'contact updated.', contact });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.deleteContact = async (req, res, next) => {
    const contactId = req.params.contactId;

    try {
        const contact = await ContactModel.findById(contactId);
        if (!contact) {
            const error = new Error('Could not find the contact.');
            error.statusCode = 404;
            throw error;
        }


        const imagePath = contact.image;
        const filePath = path.join(__dirname, '..', 'public/images', imagePath);
        if (imagePath != "") {
            fs.unlink(filePath, err => console.log(err));
        }
        await ContactModel.findByIdAndDelete(contactId);

        res.status(200).json({ message: 'contact has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


};
