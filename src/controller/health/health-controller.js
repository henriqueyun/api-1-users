const healthService = require("../../service/health/health-service");

function check(_, res) {
    return res.status(200).json({ status: healthService.ok() });
}

module.exports = { check };