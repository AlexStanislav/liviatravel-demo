const express = require("express");
const router = express.Router();
const checkJWTToken = require('../tokenAuth')

const DATE_UTILS = {
  /**
   * Get the start date in the specified format.
   * If no input date is provided, default to '01/01/01'.
   * @param {string} inputDate - The input date string.
   * @param {boolean} format - Whether to format the date as 'MM/DD/YY'.
   * @returns {string} The start date in the specified format.
   */
  startDate: (inputDate, format = false) => {
    let dayOfMonth = "";
    let monthOfYear = "";
    let yearOfCentury = "";

    if (inputDate) {
      const date = new Date(inputDate);
      dayOfMonth = String(date.getDate()).padStart(2, "0");
      monthOfYear = String(date.getMonth() + 1).padStart(2, "0");
      yearOfCentury = String(date.getFullYear()).slice(-2);
    } else {
      dayOfMonth = "01";
      monthOfYear = "01";
      yearOfCentury = "01";
    }

    if (format) {
      return `${monthOfYear}/${dayOfMonth}/${yearOfCentury}`;
    } else {
      return `${dayOfMonth}/${monthOfYear}/${yearOfCentury}`;
    }
  },

  /**
   * Get the end date that is 7 days after the input date in the specified format.
   * If no input date is provided, default to '01/01/01'.
   * @param {string} inputDate - The input date string.
   * @param {boolean} format - Whether to format the date as 'MM/DD/YY'.
   * @returns {string} The end date in the specified format.
   */
  endDate: (inputDate, format = false) => {
    let yearOfCentury;
    let monthOfYear;
    let dayOfMonth;

    if (inputDate) {
      const millisecondsPerDay = 24 * 60 * 60 * 1000;
      const givenDateTimestamp = new Date(inputDate).getTime();
      const sevenDaysLaterTimestamp = givenDateTimestamp + 7 * millisecondsPerDay;
      const sevenDaysLaterDate = new Date(sevenDaysLaterTimestamp);

      yearOfCentury = String(sevenDaysLaterDate.getFullYear());
      monthOfYear = String(sevenDaysLaterDate.getMonth() + 1).padStart(2, "0");
      dayOfMonth = String(sevenDaysLaterDate.getDate()).padStart(2, "0");
    } else {
      yearOfCentury = "01";
      monthOfYear = "01";
      dayOfMonth = "01";
    }

    if (format) {
      return `${monthOfYear}/${dayOfMonth}/${yearOfCentury}`;
    } else {
      return `${dayOfMonth}/${monthOfYear}/${yearOfCentury}`;
    }
  },

  /**
   * Get an array of dates between the start and end dates (inclusive).
   * @param {string} startDate - The start date string.
   * @param {string} endDate - The end date string.
   * @returns {Array} The array of dates between the start and end dates.
   */
  dateRanges: (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);
    const endDateObj = new Date(endDate);

    while (current <= endDateObj) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  },
};


/**
 * Get all reservations from the database
 * @route GET /reservations
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.get('/rezervations', checkJWTToken, async (req, res) => {
    try {
        // Retrieve all reservations from the database
        const reservations = await process.postgresql.query(`SELECT * FROM rezervations`);
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json(error);
    }
});

/**
 * Delete a reservation by its ID
 * @route DELETE /reservations/:id
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.delete('/reservations/:id', checkJWTToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Delete a reservation by its ID
        await process.postgresql.query(`DELETE FROM reservations WHERE id = $1`, [id]);
        
        res.status(200).json({
            message: 'Reservation deleted',
        });
    } catch (error) {
        res.status(400).json(error);
    }
});

/**
 * Create a new reservation
 * @route POST /newReservation
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
router.post('/newRezervation', async (req, res) => {
    try {
        const { 
            firstName, 
            lastName, 
            email, 
            phone, 
            adults, 
            rooms, 
            children, 
            date, 
            offerName, 
            offerDuration 
        } = req.body;
        
        const disabledDatesArray = DATE_UTILS.dateRanges(
            DATE_UTILS.startDate(date, true),
            DATE_UTILS.endDate(date, true)
        );
        const people = parseInt(adults, 10) + parseInt(children, 10);
        const disabledDates = disabledDatesArray.join(",");
        
        // Retrieve the offer's price
        const offer = await process.postgresql.query(`SELECT price FROM offers WHERE title = $1`, [offerName]);
        const price = parseInt(offer[0].price, 10) * parseInt(rooms, 10);
        
        // Insert a new reservation into the database
        await process.postgresql.query(
            `INSERT INTO rezervations (first_name, last_name, email, phone, people, offer_name, offer_duration, offer_price, disabled_dates, rooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
            [firstName, lastName, email, phone, people, offerName, offerDuration, price, disabledDates, rooms]
        );
        
        res.status(200).json({
            message: 'Reservation created',
        });
    } catch (error) {
      console.log(error);
        res.status(400).json({
            message: error,
        });
    }
});


module.exports = router