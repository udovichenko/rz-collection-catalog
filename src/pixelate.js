const PIXEL_SIZE = 10

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')
let { width, height } = canvas

let image = document.getElementById('img')

image.decode().then(() => {
	ctx.drawImage(image, 0, 0, width, height)

	let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
	let startX = 0
	let startY = 0
	let currentColor = ''
	let data = imageData.data
	let rectangles = []

	for (let y = 0; y < height; y += PIXEL_SIZE) {
		for (let x = 0; x < width; x += PIXEL_SIZE) {
			let i = (y * imageData.width + x) * 4
			let r = data[i]
			let g = data[i + 1]
			let b = data[i + 2]
			let a = data[i + 3]

			currentColor = 'rgba(' + r + ',' + g + ',' + b + ',' + (a / 255) + ')'

			rectangles.push({
				color: currentColor,
				x: startX,
				y: startY,
				width: PIXEL_SIZE,
				height: PIXEL_SIZE
			})

			startX += PIXEL_SIZE
		}
		startY += PIXEL_SIZE
		startX = 0
	}

	rectangles.forEach((rect) => {
		ctx.fillStyle = rect.color
		ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
	})
})
