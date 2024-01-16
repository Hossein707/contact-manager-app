const GroupModel = require("../models/Group");

exports.getAllGroups = async (req, res, next) => {

    try {
        const totalGroup = await GroupModel.find().countDocuments();
        const groups = await GroupModel.find();
        res.status(200).json({ groups, totalGroup });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.getSingleGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        const group = await GroupModel.findById(groupId);
        if (!group) {
            const error = new Error('Could not find group.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ group });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.createGroup = async (req, res, next) => {
    try {
        const { name } = req.body;

        const group = new GroupModel({
            name
        });
        await group.save();
        res.status(201).json({ message: 'group created.', group });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.editGroup = async (req, res, next) => {
    const groupId = req.params.groupId;
    try {
        let { name } = req.body;

        const group = await GroupModel.findById(groupId);

        if (!group) {
            const error = new Error('Could not find the group.');
            error.statusCode = 404;
            throw error;
        }

        group.name = name;

        await group.save();

        res.status(200).json({ message: 'group updated.', group });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


exports.deleteGroup = async (req, res, next) => {
    const groupId = req.params.groupId;

    try {
        const group = await GroupModel.findById(groupId);
        if (!group) {
            const error = new Error('Could not find the group.');
            error.statusCode = 404;
            throw error;
        }

        await GroupModel.findByIdAndDelete(groupId);

        res.status(200).json({ message: 'group has been deleted.' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


};
