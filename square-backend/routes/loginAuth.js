const express = require('express');
const users = require('../data/users');
const models = require('../data/models');
const router = express.Router();

// Request format: {store: 'store name', password: 'password'}
// Returns true if credentials are valid. Feel free to modify this.
router.post('/', async function (req, res) {
    const { store: storeName, password } = req.body;
    const allUsers = await users.getAllUsers();

    // Find the store
    const user = allUsers.find(user => user.name === storeName && user.pass === password);

    if (user) {
        let storeInfo;
        try {
            const model = await models.getModelById(user._id);
            storeInfo = { ...user, artifactOutputUri: model.artifactOutputUri };
        } catch (err) {
            console.log('No model defined for this store');
            storeInfo = { ...user };
        }

        return res.status(200).json(storeInfo);
    }

    return res.status(400).json({ error: 'Store not found' });
});

module.exports = router;
