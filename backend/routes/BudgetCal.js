const express = require('express');
const router = express.Router();
const Post = require('../models/budgetCal');

// GET ALL DATA ON TABLE POST
router.get('/', async (req, res) => {
    try {
        const spend = await Post.find();
        const dataPost = { data: spend }
        res.json(dataPost);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// SUBMMIT NEW DATA ON TABLE POST
router.post('/', async (req, res) => {
    const post = new Post({
        _id: req.body._id,
        charge: req.body.charge,
        amount: req.body.amount
    });

    try {
        const savedPost = await post.save();
        res.send({
            message: 'DATA HAS BEEN SAVED',
            body: savedPost,
        })
        next();
    } catch (err) {
        res.json({ message: err });
    }
});

// SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try {
        const findById = await Post.findById(req.params.postId);
        res.json(findById);
    } catch (err) {
        res.json({ message: err.message });
    }
});

// DELETE POST
router.delete('/:postId', async (req, res) => {
    try {
        const removeById = await Post.remove({ _id: req.params.postId });
        res.json(removeById);
    } catch (err) {
        res.json({ message: err.message });
    }
});

//UPDATE POST
router.patch('/:postId', async (req, res) => {
    try {
        const updateSpendById = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { charge: req.body.charge, amount: req.body.amount} },
        );
        res.json(updateSpendById);
    } catch (err) {
        res.json({ message: err.message });
    }
})

module.exports = router;