const express = require("express");
const router = express.Router();
const checkJWTToken = require('../tokenAuth')


router.get("/tours", async (req, res) => {
    const tours = await process.postgresql.query("SELECT * FROM tours");
    res.status(200).json(tours);
})


router.post("/newTour", checkJWTToken, async (req, res) => {
    try {
        const { title, description, price, location, departure, arrival, img, country, duration, available, rating } = req.body;
        await process.postgresql.query(`INSERT INTO tours (title, description, price, location, departure, arrival, img, country, duration, available, rating) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [title, description, price, location, departure, arrival, img, country, duration, available, rating]);
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
        await process.postgresql.query(`DELETE FROM tours WHERE id = $1`, [id]);
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
        const { title, description, price, location, departure, arrival, img, country, duration, available, rating } = req.body;
        await process.postgresql.query(`UPDATE tours SET title = $1, descripiton = $2, price = $3, location = $4, arrival = $5, img = $6, country = $7, duration = $8, available = $9, rating = $10 WHERE id = $11`, [title, description, price, location, departure, arrival, img, country, duration, available, rating, id]);
        res.status(200).json({
            message: 'Tour updated'
        })
    } catch (e) {
        res.status(400).json({
            message: e
        });
    }
})


router.get('/tourRezervations', checkJWTToken, async (req, res) => {
    const rezervations = await process.postgresql.query(`SELECT * FROM tour_rezervations`);
    res.status(200).json(rezervations);
})

router.delete('/tourRezervations/:id', checkJWTToken, async (req, res) => {
    try {
        const { id } = req.params;
        await process.postgresql.query(`DELETE FROM tour_rezervations WHERE id = $1`, [id]);
        res.status(200).json({
            message: 'Rezervation deleted',
        })
    } catch (e) {
        res.status(400).json(e);
    }
})

router.post("/newRezervationTour", async (req, res) => {
    try {
        const { firstName, lastName, email, phone, adults, children, tourName } = req.body;
        const tourData = await process.postgresql.query(`SELECT * FROM tours WHERE title = $1`, [tourName]);
        const people = parseInt(adults, 10) + parseInt(children, 10);
        const newAvailable = parseInt(tourData[0].available, 10) - people;
        const price = parseInt(tourData[0].price, 10) * people;
        await process.postgresql.query(`UPDATE tours SET available = $1 WHERE title = $2`, [newAvailable, tourName]);
        await process.postgresql.query(`INSERT INTO tour_rezervations (first_name, last_name, email, phone, adults, children, tour_name, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [firstName, lastName, email, phone, adults, children, tourName, price]);
        tourData[0].available = newAvailable;
        res.status(200).json({
            message: 'Rezervation created',
            tour: tourData[0]
        })
    } catch (e) {
        res.status(400).json(e);
    }
})

module.exports = router