import imgList from '../../build/img-list_OLD.js'

export default function getImageList({ limit = 100, offset = 0, dir = 'artworks' } = {}) {
	// const skipIds = [
	const skipIds = [
		28, 97, 98, 99, 100, 101, 102, 103, 105, 106, 107, 108, 109,
		131, 132, 135, 136, 137, 138,
		139,
		// 140,
		144, 152, 153, 165, 178, 191, 199, 200, 204, 206,
		207, 223, 225, 230, 231, 232, 233, 234, 240, 247, 267, 268, 269, 270, 271,
		272, 273, 274, 275, 276, 277, 279, 282, 283, 285, 286, 287,
		298, 299, 300, 311, 312, 313, 318
	]

	const filteredImgList = imgList
		.filter((img) => !skipIds.includes(+img.id))
		.slice(offset, limit)
		.map((img) => {
			// console.log(`${img.id}: http://localhost:3000/build/${dir}/${img.filename}`)
			return `build/${dir}/${img.filename}`
		})

	return filteredImgList
}
