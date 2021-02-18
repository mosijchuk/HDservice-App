const staffBase = require("../fakedb/staff");
const randomPlaces = require("../fakedb/places");
const randomTime = require("../fakedb/time");
const {userLogin, userPassword, userToken} = require("../fakedb/authConfig");
const {Router} = require("express");
const {  v1: uuidv1 } = require('uuid');
const moment = require('moment');
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
function getRandomBool() {
    const rand = Math.random() * (10 - 1) + 1
    if(rand > 4) return true
    return false
}

function getDaySchedule() {
    const hours = 10
    let currentHour = 10
    const res = []

    for(let i = 0; i < hours; i++) {
        res.push({
                'time': `${currentHour}:00`,
                'isFree': getRandomBool()
            },
            {
                'time': `${currentHour}:30`,
                'isFree': getRandomBool()
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
                res.json({
                    resultCode: 1,
                    errorMessage: null,
                    periodSchedule: getPeriodSchedule(users, dates)
                });
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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


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
        for (let i = 0; i < getRandomInt(1, 3); i++) {
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
            const {userId, token} = req.params;

            if (!userId || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: '@meetings/Incorrect request data'
                });
            }

            if (userId && token === userToken) {
                res.json({
                    resultCode: 1,
                    errorMessage: null,
                    userName: 'Courier',
                    userId: userId,
                    meetings: getRandomUserMeetings()
                });
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@meetings/Something went wrong '+ e.message
            });
        }
    }
);

module.exports = router;