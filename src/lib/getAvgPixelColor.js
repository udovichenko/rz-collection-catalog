export default function getAvgPixelColor(ctx, startX, startY, size) {
	const imageData = ctx.getImageData(startX, startY, size, size)
	const data = imageData.data
	let i = 0

	let count = 0
	let r = 0
	let g = 0
	let b = 0
	let a = 0

	while ((i += 4) < data.length) {
		r += data[i]
		g += data[i + 1]
		b += data[i + 2]
		a += data[i + 3]
		count++
	}

	r = ~~(r / count)
	g = ~~(g / count)
	b = ~~(b / count)

	return { r, g, b, a }
}
