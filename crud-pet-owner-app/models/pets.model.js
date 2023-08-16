const { Schema, model } = require("mongoose")

const petSchema = new Schema({
	name: {
		type: String,
		minLength: 2,
		maxLength: 50,
		required: true,
	},
	colors: {
		type: [String],
		default: ["transparent"],
	},
	type: {
		type: String,
		enum: ["Cat", "Dog", "Parrot", "Dolphin", "Gecko"],
		required: true,
	},

	// owner: {
	//   type: Schema.Types.ObjectId,
	//   ref: "Human"
	// }
})

const Pet = model("Pet", petSchema)

module.exports = Pet
