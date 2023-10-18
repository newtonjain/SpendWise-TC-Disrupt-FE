const express = require('express');
const { Client, Environment } = require('square');

const router = express.Router();

// Gets the price of an item (in dollars)
async function getItemPrice(client, label) {
    console.log(`Getting price of ${label}`);
    const { catalogApi } = client;

    const filter = {
        textFilter: label,
    };

    try {
        const searchResponse = await catalogApi.searchCatalogItems(filter);
        const itemPrice = Number(searchResponse.result.items[0].itemData.variations[0].itemVariationData.priceMoney.amount);
        return itemPrice;
    } catch (err) {
        console.error(`Error getting item price: ${err}`);
        throw err;
    }
}

router.post('/', async (req, res) => {
    const client = new Client({
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        environment: Environment.Sandbox,
    });

    const label = req.body.label;

    try {
        const itemPrice = await getItemPrice(client, label);
        res.json({ price: itemPrice });
    } catch (err) {
        res.status(500).json({ error: err.toString() });
    }
});

module.exports = router;