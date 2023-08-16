const { Schema, model } = require("mongoose")

const humanSchema = new Schema({
	name: {
		type: String,
		minLength: 2,
		maxLength: 50,
		required: true,
	},
	pets: [
		{
			type: Schema.Types.ObjectId,
			ref: "Pet",
		},
	],
})

const Human = model("Human", humanSchema)

module.exports = Human
