import imgList from '../../build/img-list.js'

export default function getImageList() {
	let limit = 0
	let offset = 28

	const skipIds = [
		28, 99, 100, 107, 191, 97, 108, 98, 152, 101, 102, 103, 139, 131, 153, 132,
		165, 109, 106, 138, 105, 204, 206, 207, 232, 233, 234, 267, 268, 269, 270,
		271, 272, 273, 274, 275, 276, 277, 279, 282, 283, 287, 286, 311, 312, 313, 318
	]

	let counter = 0

	return imgList
		.filter((img) => {
			if (skipIds.includes(+img.id)) return false
			console.log('img.id', img.id)
			counter++
			if (counter < offset) return false
			if (counter > offset + limit) return false
			return true
		})
		.map((img) => {
			return `build/artworks-resize/${img.filename}`
		})
}
