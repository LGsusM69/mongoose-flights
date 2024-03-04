const Flight = require("../models/flight");

module.exports = {
    index,
    new: newFlight,
    create
};

async function index(req, res) {
const flights = await Flight.find({});
res.render("flights/index", {title: "All Flights", flights});

}
function newFlight(req, res) {
    res.render("flights/new");
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
        res.redirect("flights/new");
    } catch(err) {
        console.log(err);
    }
}
