// Import the router
const router = require("express").Router()
const Pet = require("./../models/pets.model")
const getQuery = require("./../utils/index")
/**
 * All of the routes are prefixed with
 * ! /api/pets
 */

// This route will be able to receive some queries
router.get("/", async (req, res, next) => {
	console.log(req.query)
	const { name, color } = req.query
	const query = getQuery(name, color)

	// if (name) {
	// 	const regexpName = new RegExp(name, "i")
	// 	query.name = regexpName
	// }
	// if (color) {
	// 	// color: 'Green'
	// 	const regexColor = new RegExp(color, "i")
	// 	query.colors = { $in: [regexColor] }
	// }
	/**
	 * query :
	 * {name: 'Illiu'}
	 *
	 * query :
	 * {}
	 */
	try {
		const allPets = await Pet.find(query)
		res.json(allPets)
	} catch (error) {
		console.log(error)
	}
})

router.get("/:id", (req, res, next) => {
	Pet.findById(req.params.id)
		.then((dbDocument) => {
			res.json(dbDocument)
		})
		.catch((e) => console.log(e))
})

router.post("/", (req, res, next) => {
	const { name, colors, type } = req.body
	if (!name || !type) {
		return res.json({
			message: "A pet needs a name, type and colors.",
		})
	}

	const petToCreate = { name, colors, type }

	// const createdPet = new Pet(petToCreate)

	// createdPet.save()

	// create takes an Object / Array as argument, creating either:
	// One document
	// Multiple documents
	// It automatically save those documents in our database.

	Pet.create(petToCreate)
		.then((petDocument) => {
			res.status(201).json({ message: "Pet created", data: petDocument })
		})
		.catch((e) => console.log(e))
})

router.delete("/:petId", async (req, res, next) => {
	// params works just like in react :)
	console.log(req.params.petId)
	const id = req.params.petId
	try {
		await Pet.findByIdAndDelete(id)
		res.json({ message: `Pet ${id} was mercifulessly deleted.` })
	} catch (error) {
		console.log(error)
	}
})

/**
 * Update Route
 */

router.put("/:petId", async (req, res, next) => {
	try {
		const { name, type, colors } = req.body
		const id = req.params.petId
		const petToUpdate = { name, type, colors }
		// {new: true} allow us to get the new version of the document.
		const newPet = await Pet.findByIdAndUpdate(id, petToUpdate, { new: true })

		res.json(newPet)
	} catch (error) {
		console.log(error)
	}
})

// Export the router
module.exports = router
