const {Router} = require("express");

const router = Router();

const userToken = 'yeEfpyhCUpJ6YSZThn37BSuQPPabSx7LxuCJXzGZVHd4fX93k5TRh4GZ3UAAK8pJ';


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
                    message: "Incorrect auth data",
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
                errorMessage: 'Something went wrong'
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
                    errorMessage: errors.array(),
                    message: "Incorrect auth data",
                });
            }

            if (email === 'admin@admin' && password === 'test') {
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
                errorMessage: 'Something went wrong'
            });
        }
    }
);

module.exports = router;