import imgList from '../../build/img-list.js'

export function drawImgList() {
	const offset = 0
	const limit = 60
	let leftMarginStep = 20
	let topMarginStep = 7
	const sizeStep = 0
	const sizeBiggest = 250
	const skipIds = [
		28, 99, 100, 107, 191, 97, 108, 98, 152, 101, 102, 103, 139, 131, 153, 132,
		165, 109, 106, 138, 105, 204, 206, 207, 232, 233, 234, 267, 268, 269, 270,
		271, 272, 273, 274, 275, 276, 277, 279, 282, 283, 287, 286
	]

	let counter = 0
	let offsetCounter = 0

	let isRandom = true
	let isRight = true
	let isBottom = true

	const root = document.getElementById('root')

	let sortedImgList = imgList
	if (isRandom) {
		sortedImgList = imgList.sort(() => Math.random() - 0.5)
	}

	if (isRight) {
		document.body.classList.add('isRight')
	}

	// topMarginStep = isBottom ? -topMarginStep : topMarginStep
	// leftMarginStep = isRight ? -leftMarginStep : leftMarginStep

	sortedImgList.forEach((img) => {
		if (skipIds.includes(+img.id)) return false

		counter++
		if (counter < offset) return false
		if (counter > offset + limit) return false

		img.el = document.createElement('img')
		img.el.id = img.id
		img.el.src = `/${img.localPath}`
		img.el.classList.add('layer')

		img.el.style[isRight ? 'right' : 'left'] = `${offsetCounter * leftMarginStep}px`
		img.el.style[isBottom ? 'bottom' : 'top'] = `${offsetCounter * topMarginStep}px`
		img.el.style.objectPosition = isRight ? 'left' : 'right'

		img.el.style.width = img.el.style.height = `${sizeBiggest - (limit - offsetCounter) * sizeStep}vh`
		offsetCounter++

		root.appendChild(img.el)
	})
}
