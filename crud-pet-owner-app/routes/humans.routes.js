const Human = require("../models/human.model")

// Import the router
const router = require("express").Router()

router.post("/", async (req, res, next) => {
	try {
		let { name, pets } = req.body
		if (!name) {
			return res
				.status(400)
				.json({ message: "We need a name to create a human" })
		}
		if (!pets) {
			pets = []
		}
		const createdHuman = await Human.create({ name, pets })
		res.status(201).json(createdHuman)
	} catch (error) {
		console.log(error)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const oneHuman = await Human.findById(req.params.id, {
			name: 1,
			_id: 0,
		}).populate("pets")
		res.json(oneHuman)
	} catch (error) {
		console.log(error)
	}
})

// Export the router
module.exports = router
