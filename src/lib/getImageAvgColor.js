import getAvgPixelColor from './getAvgPixelColor.js'
import getLightnessFromRgb from './getLightnessFromRgb.js'

export default async function getImageAvgColor(imageSrc, size = 4) {
	const canvas = new OffscreenCanvas(size, size)
	const ctx = canvas.getContext('2d')

	const image = new Image()
	image.src = imageSrc

	await image.decode()
	console.log(image)
	ctx.drawImage(image, 0, 0, size, size)

	const { r, g, b, a } = getAvgPixelColor(ctx, 0, 0, size)
	const l = ~~getLightnessFromRgb({ r, g, b })

	console.log({ r, g, b, a, l })

	return { r, g, b, a, l }
}
