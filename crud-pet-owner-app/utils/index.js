function getQuery(name, color) {
	const query = {}
	if (name) {
		const regexpName = new RegExp(name, "i")
		query.name = regexpName
	}
	if (color) {
		// color: 'Green'
		const regexColor = new RegExp(color, "i")
		query.colors = { $in: [regexColor] }
	}
	return query
}

module.exports = getQuery
