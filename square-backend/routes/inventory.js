const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { Client, Environment } = require('square');

// Function to update inventory based on item recommendations
async function updateInventory(client, location, itemIds, fromState, toState) {
    const { inventoryApi } = client;
    const date = new Date();
    let batchUpdate = {
        idempotencyKey: crypto.randomUUID(),
        changes: itemIds.map(itemId => ({
            type: 'ADJUSTMENT',
            adjustment: {
                fromState: fromState,
                toState: toState,
                locationId: location,
                catalogObjectId: itemId.id,
                quantity: String(itemId.quantity),
                occurredAt: date.toISOString(),
            },
        })),
    };
    const response = await inventoryApi.batchChangeInventory(batchUpdate);
    if (response.errors) throw response.errors;
    return response;
}

// Function to process items into item ids
async function processItems(client, items) {
    const { catalogApi } = client;
    let itemIds = await Promise.all(items.map(async item => {
        const filter = { textFilter: item.id };
        const searchResponse = await catalogApi.searchCatalogItems(filter);
        return { id: searchResponse.result.items[0].itemData.variations[0].id, quantity: item.quantity };
    }));
    return itemIds;
}

// Route to update the inventory of an item
router.post('/', async function (req, res) {
    const client = new Client({
        accessToken: process.env.SQUARE_ACCESS_TOKEN,
        environment: Environment.Sandbox,
    });
    const location = process.env.SQUARE_LOCATION_ID;
    const { fromState, toState, items } = req.body;
    try {
        const itemIds = await processItems(client, items);
        await updateInventory(client, location, itemIds, fromState, toState);
        res.sendStatus(200);
    } catch (err) {
        console.error('Error updating inventory', err);
        res.sendStatus(500);
    }
});

module.exports = router;
