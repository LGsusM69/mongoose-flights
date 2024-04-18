const Flight = require("../models/Flight");
const Ticket = require("../models/Ticket");

module.exports = {
    index,
    new: newFlight,
    create,
    show
};

async function index(req, res) {
const flights = await Flight.find({});
res.render("flights/index", {title: "All Flights", flights});

}

async function show(req, res) {
    try {
        const flight = await Flight.findById(req.params.id);
        const tickets = await Ticket.find({ flight: flight._id });
        flight.destinations.sort((a, b) => a.arrival - b.arrival);
        await flight.save();
        res.render('flights/show', { title: 'Flight Detail', flight, tickets });
    } catch (err) {
        console.log(err);
        res.redirect('/flights'); 
    }
}

function newFlight(req, res) {
    console.log('flights new function');
    res.render("flights/new", {title: 'New Flight'});
}

async function create(req, res) {
    console.log("create");
    console.log(new Date());
    if(req.body.departs === "") {
        //fix date
        let nextYear = new Date(new Date().setFullYear(
            new Date().getFullYear() + 1));
            req.body.departs = nextYear;
    }
    console.log(req.body);
    //if("date" in req.body) {
    //}
    for(let key in req.body) {
        if(req.body[key] === "") delete req.body[key];
    }
    try {
        const flight = await Flight.create(req.body);
        res.redirect("/flights");
    } catch(err) {
        console.log(err);
    }
}
