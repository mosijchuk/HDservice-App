const staffBase = require("../data/staff");
const randomPlaces = require("../data/places");
const randomTime = require("../data/time");
const {userToken} = require("../data/authConfig");
const {Router} = require("express");
const {  v1: uuidv1 } = require('uuid');
const moment = require('moment');
const {getRandomBool, getRandomInt} = require("../helpers/functions");
const router = Router();

// /api/crm/getstaff
router.post(
    "/getstaff",
    (req, res) => {
        try {
            const {list, token} = req.body;

            if (!list || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: '@getstaff/Incorrect request data'
                });
            }

            if (list && token === userToken) {
                res.json({
                    resultCode: 1,
                    errorMessage: null,
                    staff: staffBase
                });
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@getstaff/Something went wrong '+ e.message
            });
        }
    }
);

// /api/crm/schedule
function getDaySchedule() {
    const hours = 10
    let currentHour = 10
    const res = []

    for(let i = 0; i < hours; i++) {
        res.push({
                'time': `${currentHour}:00`,
                'is_free': getRandomBool()
            },
            {
                'time': `${currentHour}:30`,
                'is_free': getRandomBool()
            })
        currentHour++
    }
    return res
}

function getUserPeriod(dates) {
    return dates.map(date => ({
        'date': date,
        'schedule': getDaySchedule()
    }))
}

function getPeriodSchedule(users, dates) {
    return users.map(userId => ({
        'userId': userId,
        'userPeriod': getUserPeriod(dates)
    }))
}

router.post(
    "/schedule",
    (req, res) => {
        try {
            const {users, dates, token} = req.body;

            if (!users.length || !dates.length || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: '@schedule/Incorrect request data'
                });
            }

            if (users.length && dates.length && token === userToken) {
                setTimeout(function (){
                    res.json({
                        resultCode: 1,
                        errorMessage: null,
                        periodSchedule: getPeriodSchedule(users, dates)
                    });
                }, 2000)
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@schedule/Something went wrong '+ e.message
            });
        }
    }
);


// /api/crm/meetings
function getRandomUserMeetings() {
    const meetings = []
    const periodArr = []

    for (let i = 0; i < 7; i++) {
        const isoDate = moment()
            .add(i, "day")
            .format("DD.MM.YYYY");
        periodArr.push(isoDate)
    }

    periodArr.forEach(date => {
        for (let i = 0; i <= getRandomInt(2,5); i++) {
            meetings.push({
                id: uuidv1(),
                address: randomPlaces[getRandomInt(0, randomPlaces.length-1)],
                date,
                time: randomTime[getRandomInt(0, randomTime.length-1)]
            })
        }
    })

    return meetings
}

router.get(
    "/meetings",
    (req, res) => {
        try {
            const {userId, token} = req.query;

            if (!userId || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: '@meetings/Incorrect request data'
                });
            }

            if (userId && token === userToken) {
                setTimeout(function (){
                    res.json({
                        resultCode: 1,
                        errorMessage: null,
                        userName: 'Courier',
                        userId: userId,
                        meetings: getRandomUserMeetings()
                    });
                }, 1000)
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@meetings/Something went wrong '+ e.message
            });
        }
    }
);

// /api/crm/reserve
router.get(
    '/reserve',
    (req, res)=>{
    try {
        res.json([]);
    }catch (e) {

    }
})

router.post(
    '/reserve',
    (req, res)=>{
        try {
            res.json({
                resultCode: 1,
                message: 'Time reserved successfully'
            });
        }catch (e) {

        }
    })

module.exports = router;