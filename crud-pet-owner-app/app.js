// 0. Give access to node to your environment variables
require("dotenv").config()
// 1. Connect to DB:
require("./config/db")

/**
 * We need express, morgan, cors
 */
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
/**
 * We now create our application
 */

const app = express()
/**
 * Settings (middlewares)
 */
app.use(morgan("dev"))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/**
 * Healthcheck
 */
app.get("/", (req, res) =>
	res.json({
		message: "Everything is good",
		availableEndpoints: ["/api/humans", "/api/pets"],
	})
)

/**
 * Main route handler
 */
app.use("/api", require("./routes/index.routes"))

/**
 * 404
 */
app.use((req, res, next) => {
	res.status(404).json({
		message: "This is a 404",
		availableEndpoints: ["/api/humans", "/api/pets", "/"],
	})
})
app.listen(process.env.PORT, () =>
	console.log(`server running on http://localhost:${process.env.PORT}`)
)
