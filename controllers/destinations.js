const Flight = require('../models/Flight');

module.exports = {
    create
}

async function create(req, res) {
    const flight = await Flight.findById(req.params.id);
    flight.destinations.push(req.body);
    //ADDED TO SORT BY DATE?
    // flight.destinations.sort('date');
    await flight.save();
    res.redirect(`/flights/${flight._id}`);
}