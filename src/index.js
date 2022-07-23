import imgList from '../build/img-list.js'

const offset = 155
const limit = 50
const leftMarginStep = 22
const topMarginStep = 8
const sizeStep = 0.3
const sizeBiggest = 60

let counter = 0
let offsetCounter = 0

imgList.forEach((img) => {
	counter++
	if (counter < offset) return false
	if (counter > offset + limit) return false

	img.el = document.createElement('img')
	img.el.src = `/${img.localPath}`
	img.el.classList.add('layer')
	img.el.style.top = `${offsetCounter * topMarginStep}px`
	img.el.style.left = `${offsetCounter * leftMarginStep}px`
	img.el.style.width = img.el.style.height = `${sizeBiggest - (limit - offsetCounter) * sizeStep}vh`
	offsetCounter++

	document.body.appendChild(img.el)
})
