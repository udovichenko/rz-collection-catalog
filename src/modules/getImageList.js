import imgList from '../../build/img-list.js'

export default function getImageList({ iterations = 100, offset = 0, dir = 'artworks' } = {}) {

	const skipIds = [
		28, 97, 98, 99, 100, 101, 102, 103, 105, 106, 107, 108,
		109, 131, 132, 138, 139, 152, 153, 165, 178, 191, 204, 206,
		207, 223, 232, 233, 234, 240, 247, 267, 268, 269, 270, 271, 272, 273,
		274, 275, 276, 277, 279, 282, 283, 286, 287, 298, 299, 300,
		311, 312, 313, 318
	]

	let counter = offset

	return imgList
		.filter((img) => {
			if (skipIds.includes(+img.id)) return false
			if (counter < offset) return false
			if (counter > offset + iterations) return false
			counter++
			return true
		})
		.sort(() => Math.random() - 0.5) // shuffle images
		.map((img) => {
			// console.log(`${img.id}: http://localhost:3000/build/${dir}/${img.filename}`)
			return `build/${dir}/${img.filename}`
		})
}
