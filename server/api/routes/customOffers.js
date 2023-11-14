const express = require("express");
const router = express.Router();
const checkJWTToken = require('../tokenAuth')

/**
 * Retrieve custom offers from the database.
 * @route GET /customOffers
 * @middleware checkJWTToken - Middleware for checking JWT token.
 */
router.get("/customOffers", checkJWTToken, async (req, res) => {
    try {
        const offers = await process.postgresql.query(`SELECT * FROM custom_offers`);
        res.status(200).json(offers);
    } catch (error) {
        res.status(400).json(error);
    }
})

/**
 * Delete a custom offer from the database.
 * @route DELETE /customOffers/:id
 * @middleware checkJWTToken - Middleware for checking JWT token.
 * @param {string} id - The ID of the custom offer to be deleted.
 */
router.delete('/customOffers/:id', checkJWTToken, async (req, res) => {
    try {
        const { id } = req.params;
        await process.postgresql.query(`DELETE FROM custom_offers WHERE id = $1`, [id]);
        res.status(200).json({
            message: 'Custom offer deleted',
        })
    } catch (error) {
        res.status(400).json(error);
    }
})

/**
 * Create a new custom offer in the database.
 * @route POST /newCustomOffer
 * @param {string} firstName - First name of the customer.
 * @param {string} lastName - Last name of the customer.
 * @param {string} emailAddress - Email address of the customer.
 * @param {string} phoneNumber - Phone number of the customer.
 * @param {number} adults - Number of adults in the group.
 * @param {number} children - Number of children in the group.
 * @param {string} startDate - Start date of the offer.
 * @param {string} endDate - End date of the offer.
 * @param {number} duration - Duration of the offer in days.
 * @param {string} destination - Destination of the offer.
 * @param {string} transport - Type of transport for the offer.
 * @param {string} stayType - Type of accommodation for the offer.
 * @param {number} budget - Maximum budget for the offer.
 * @param {string} currency - Currency of the budget.
 * @param {string} comment - Additional comments for the offer.
 */

router.post("/newCustomOffer", async (req, res) => {
    try {
        const { first_name, last_name, email, phone, adults, children, start_date, end_date, duration, destination, transport, stay_type, budget, currency, comment } = req.body;

        // Insert the new offer into the database
        const query = `INSERT INTO custom_offers (first_name, last_name, email, phone, adults, children, departure_date, return_date, duration, destination, transport_type, accomodation, max_budget, coin_type, details) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`;

        await process.postgresql.query(query, [first_name, last_name, email, phone, adults, children, start_date, end_date, duration, destination, transport, stay_type, budget, currency, comment]);
        
        res.status(200).json({
            message: 'Custom offer created'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})
module.exports = router