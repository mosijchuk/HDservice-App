const randomPlaces = require("../data/places");
const {getRandomInt, getRandomFullInt} = require("../helpers/functions");
const {userToken} = require("../data/authConfig");
const {Router} = require("express");
const router = Router();

// /api/geo/find_address
function getRandomSearchAddress() {
    const resCount = getRandomInt(1, 6)
    const res = []

    for (let i = 0; i < resCount; i++) {
        const randAddress = randomPlaces[getRandomInt(0, randomPlaces.length - 1)].split(',')
        randAddress.pop() //delete Kyiv

        res.push({
            address: randAddress.join(),
            description: 'Kyiv, Ukraine',
            position: `${+getRandomFullInt(50, 52)}, ${+getRandomFullInt(40, 43)}`
        })
    }

    return res
}

router.get(
    "/find_address",
    (req, res) => {
        try {
            const {address, token} = req.query;

            if (!address || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: '@find_address/Incorrect request data'
                });
            }

            if (address && token === userToken) {
                res.status(200).json({
                    resultCode: 1,
                    errorMessage: null,
                    results: getRandomSearchAddress()
                });
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@find_address/Something went wrong ' + e.message
            });
        }
    }
);

// /api/geo/address
function getRandomDistance() {
    const radius = 30
    const distance = +getRandomFullInt(5, 40)
    const kmh = 40
    const duration = 60 / (kmh / distance)

    return {
        allowedRadius: `${radius} km`,
        allowedRadiusVal: radius,
        distanceText: `${distance.toFixed(1)} km`,
        distanceValue: distance,
        durationText: `${duration.toFixed(1)} min`,
        durationValue: duration
    }
}

router.get(
    "/address",
    (req, res) => {
        try {
            const {o, d, token} = req.query;

            if (!o || !d || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: '@address/Incorrect request data'
                });
            }

            if (o && d && token === userToken) {
                setTimeout(function () {
                    res.json({
                        resultCode: 1,
                        errorMessage: null,
                        ...getRandomDistance()
                    });
                }, 100)
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@address/Something went wrong ' + e.message
            });
        }
    }
);

module.exports = router;