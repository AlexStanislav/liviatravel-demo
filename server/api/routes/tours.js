const express = require("express");
const router = express.Router();
const checkJWTToken = require('../tokenAuth')


router.get("/api/tours", async (req, res) => {
    const tours = await process.postgresql.query("SELECT * FROM lt_tours");
    res.status(200).json(tours);
})


router.post("/newTour", checkJWTToken, async (req, res) => {
    try {
        const { title, description, price, location, departure, arrival, img, country, duration, available, rating, type } = req.body;
        await process.postgresql.query(`INSERT INTO lt_tours (title, description, price, location, departure, arrival, img, country, duration, available, rating, type, date_created) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, CURRENT_TIMESTAMP)`, [title, description, price, location, departure, arrival, img, country, duration, available, rating, type]);
        res.status(200).json({
            message: 'Tour created'
        })
    } catch (e) {
        res.status(400).json({
            message: e
        });
    }
})

router.delete("/tours/:id", checkJWTToken, async (req, res) => {
    try {
        const { id } = req.params;
        await process.postgresql.query(`DELETE FROM lt_tours WHERE id = $1`, [id]);
        res.status(200).json({
            message: 'Tour deleted'
        });
    } catch (e) {
        res.status(400).json({
            message: e
        });
    }
})

router.put("/tours/:id", checkJWTToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, location, departure, arrival, img, country, duration, available, rating, type } = req.body;
        await process.postgresql.query(`UPDATE lt_tours SET title = $1, description = $2, price = $3, location = $4, departure = $5, arrival = $6, img = $7, country = $8, duration = $9, available = $10, rating = $11, type = $12 WHERE id = $13`, [title, description, price, location, departure, arrival, img, country, duration, available, rating, type, id]);
        res.status(200).json({
            message: 'Tour updated'
        })
    } catch (e) {
        res.status(400).json({
            message: e
        });
    }
})

module.exports = router