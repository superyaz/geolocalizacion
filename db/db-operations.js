const dataModel = require('./data-model');

const Cop = dataModel.Cop;


function fetchNearestCops(coordinates, maxDistance) {
    return Cop.find({
        location: {
            $near: {
                $geometry: {
                    type: "point",
                    coordinates: coordinates
                },
                $maxDistance: maxDistance
            }
        }
    })
        .exec()
        .cath(error => {
            console.log(error);
        })
}

exports.fetchNearestCops = fetchNearestCops;