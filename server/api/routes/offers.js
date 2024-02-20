const express = require("express");
const router = express.Router();
const checkJWTToken = require("../tokenAuth");
const multer = require('multer');

// Set up the storage configuration for multer
const storage = multer.diskStorage({
    // Specify the destination directory for the uploaded files
    destination: (req, file, cb) => {
        cb(null, './images');
    },
    // Set the filename for the uploaded files
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

// Create an image upload middleware using multer and the storage configuration
const imageUpload = multer({
    storage: storage
})

/**
 * Handle HTTP POST request for '/imageOffers' route
 * Uploads an image file and returns a response with a status code and message
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/imageOffers', imageUpload.single("offerImage"), (req, res) => {
    const uploadedFile = req.file;
    if (uploadedFile) {
        // File uploaded successfully
        res.status(200).json({
            message: 'File uploaded successfully'
        });
    } else {
        // No file uploaded
        res.status(400).json({
            message: 'No file uploaded'
        });
    }
});

router.get('/offers', async (req, res) => {
    const offers = await process.postgresql.query(`SELECT * FROM lt_offers`);
    res.status(200).json({ offers });
})

/**
 * Handles the POST request for creating a new offer
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {Promise} - The promise representing the asynchronous operation
 */
router.post('/newOffer', checkJWTToken, async (req, res) => {
    try {
        // Destructure the required data from the request body
        const { title, description, price, location, rating, details, img, country, duration, is_special, type } = req.body;
        
        // Execute the PostgreSQL query to insert the offer data
        const { rows } = await process.postgresql.query(
            `INSERT INTO lt_offers (title, description, price, location, rating, details, img, country, duration, is_special, type, date_created)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, CURRENT_TIMESTAMP)`,
            [title, description, price, location, rating, details, img, country, duration, is_special, type]
        );
        
        // Send the response with the inserted rows
        res.status(200).json(rows);
    } catch (error) {
        // Send the error response
        res.status(400).json(error);
    }
});

/**
 * Delete an offer by ID
 * @route DELETE /offers/:id
 * @param {string} id - The ID of the offer to delete
 * @returns {object} - The response object
 */
router.delete('/offers/:id', checkJWTToken, async (req, res) => {
    try {
        const { id } = req.params;
        await process.postgresql.query(`DELETE FROM lt_offers WHERE id = $1`, [id]);
        res.status(200).json({
            message: 'Offer deleted',
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

// Update an offer by ID
router.put('/offers/:id', checkJWTToken, async (req, res) => {
    try {
        // Extract the offer ID from the request parameters
        const { id } = req.params;


        // Extract the offer details from the request body
        const { title, description, price, location, rating, details, img, country, duration, is_special, type } = req.body;

        // const offer = await process.postgresql.query(`SELECT * FROM offers WHERE id = $1`, [id]);

        // console.log(offer);

        // // Update the offer in the database using a PostgreSQL query
        await process.postgresql.query(
            'UPDATE lt_offers SET title = $1, description = $2, price = $3, location = $4, rating = $5, details = $6, img = $7, country = $8, duration = $9, is_special = $10, type = $11 WHERE id = $12', [title, description, price, location, rating, details, img, country, duration, is_special, type, id]
        )

        // Send a success response with a message
        res.status(200).json({
            message: 'Offer updated',
        });
    } catch (error) {
        // Send an error response with the error details
        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router