
const Ticket = require('../models/Ticket');

module.exports = {
    create,
    show
}

async function create(req, res) {
    const newTicket = await Ticket.create(req.body);
    newTicket.flight = req.params.id;
    await newTicket.save();
    res.redirect(`/flights/${req.params.id}`);
}

async function show(req, res) {
    const flightId = req.params.id;
    res.render('tickets/new', {flightId, errorMsg: ''});
}