import express from 'express';
import moviesController from './controller/MoviesController.js';
import reservationController from './controller/reservationController.js';
import ticketPriceController from './controller/ticketPriceController.js';

const router = express.Router();

// NOTE: use socket.io or server sent events for handling this
// get what seats are free or reserved by other people
router.get('/seats/:screening_id');

// get info for a specific reservation
router.get(
  '/reservation/:reservationNum',
  reservationController.getSpecificReservation
);

// get ticket price
router.get('/ticket', ticketPriceController.getTicketPrice);

// create a reservation for a movie screening - body: {seats, email or userId}
router.post('/reservation');

// remove seats from reservation (if we send a new request to replace the old one, maybe PUT instead of PATCH)
// body: {reservationNum, seatsToRemove}
router.patch('/reservation');

// cancel a reservation - body: {reservationNum}
router.delete('/reservation');

// find a movie from url
router.get('/movie/:id', moviesController.getSpecificMovie);

// find movie(s) by filtering (age, date) (use req.query for filtering or split into separate routes?)
router.get('/movie');

// register a member - body: {email, password, firstName, lastName}
router.post('/user/register');

// log out
router.delete('/user');

// log in - body: {email, password}
router.post('/user');

// update user info - body: {email?, password?, firstName?, lastName?}
router.patch('/user');

export default router;
