const express = require('express');
const router = express.Router();

const dbOperations = require('../db/db-operations');

//Declaro las rutas para su uso en el archivo app.js
router.get('/civilian', (req, res) => {
    res.render('civilian.html', {
        userId: req.query.userId
    });
});

router.get('/cop', (req, res) => {
    res.render('cop.html', {
        userId: req.query.userId
    });
});

router.get('/cops', async (req, res) => {
    const latitude = Number(req.query.lat);
    const longitude = Number(req.query.lng);
    const nearestCops = await dbOperations.fetchNearestCops([longitude, latitude], 2000);

    res.json({
        cops: nearestCops
    });
});

router.get('/cops/info', async (req, res) => {
    const userId = req.query.userId // xtract userId from query params
    const copDetails = await dbOperations.fetchCopDetails(userId);

    res.json({
        copDetails: copDetails
    });
    console.log(copDetails)
});

// fetch all requests
router.get('/requests/info', async (req, res) => {
    const results = await dbOperations.fetchRequests();
    const features = [];

    for (let i = 0; i < results.length; i++) {
        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: results[i].location.coordinates
            },
            properties: {
                status: results[i].status,
                requestTime: results[i].requestTime,
                address: results[i].location.address
            }
        });
    }

    const geoJsonData = {
        type: 'FeatureCollection',
        features: features
    }

    res.json(geoJsonData);
});



module.exports = router;