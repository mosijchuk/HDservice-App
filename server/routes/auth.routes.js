const {userLogin, userPassword, userToken} = require("../data/authConfig");
const {Router} = require("express");

const router = Router();


// /api/auth/authme
router.post(
    "/authme",
    (req, res) => {
        try {
            const {token} = req.body;

            if (!token || token !== userToken) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: errors.array(),
                    message: "@authme/Incorrect auth data",
                });
            }

            if (token === userToken) {
                res.json({
                    resultCode: 1,
                    errorMessage: null,
                    token: userToken
                });
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@authme/Something went wrong'
            });
        }
    }
);

// /api/auth/login
router.post(
    "/login",
    (req, res) => {
        try {
            const {email, password} = req.body;

            if (!email || !password) {
                res.status(400).json({
                    resultCode: 0,
                    errorMessage: "@login/Incorrect auth data"
                });
            }

            if (email === userLogin && password === userPassword) {
                res.cookie('token', userToken)
                res.json({
                    resultCode: 1,
                    errorMessage: null,
                    token: userToken
                });
            }
        } catch (e) {
            res.status(500).json({
                resultCode: 0,
                errorMessage: '@login/Something went wrong'
            });
        }
    }
);

module.exports = router;