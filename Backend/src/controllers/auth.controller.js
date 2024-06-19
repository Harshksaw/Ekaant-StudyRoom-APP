const { UserService } = require("../services");
const { UserRepository } = require("../repositories");
const { StatusCodes } = require("http-status-codes");
const logger = require("../config/logger.config");



let pingCounter = 0;

function pingAuthController(req, res) {
    // logger.error("ping error logs for ping controller");
    pingCounter++;
    return res.json({ message: 'Auth controller is up', pingCount: pingCounter });
}

async function signUp(req, res, next) {
    try {
        const newUser = await userService.createUser(req.body);

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User created successfully",
            error: {},
            data: newUser,
        });
    } catch (error) {
        next(error);
    }
}

async function signIn(req, res, next) {
    try {
        const { email, password } = req.body;
        const token = await userService.authenticateUser(email, password);

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User authenticated successfully",
            error: {},
            data: { token },
        });
    } catch (error) {
        next(error);
    }
}

function updateProfile(req, res) {
    // Implement the logic to update user profile
}

module.exports = {
    signUp,
    signIn,
    updateProfile,
    pingAuthController
};
