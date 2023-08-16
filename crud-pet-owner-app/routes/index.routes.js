// Import the router
const router = require("express").Router()

/**
 * All of the routes are prefixed with /api
 */

router.use("/pets", require("./pets.routes"))
router.use("/humans", require("./humans.routes"))

// Export the router
module.exports = router
