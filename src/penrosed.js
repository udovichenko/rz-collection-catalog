import getImageList from './modules/getImageList.js'
import createPatternsFromImages from './modules/createPatternsFromImages.js'
import { drawPenrosedImage } from './lib/drawPenrosedImage.js'

async function penrose() {
	const LIMIT = 10

	const images = getImageList({ iterations: LIMIT })
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	const { width, height } = canvas
	const patterns = await createPatternsFromImages({ ctx, images })

	// const imageCanvas = new OffscreenCanvas(width, height)
	const imageCanvas = document.getElementById('underlay')
	const imageCtx = imageCanvas.getContext('2d')
	imageCtx.scale(1, -1)
	imageCtx.translate(0, -height)
	imageCtx.translate(width / 2, height / 2)


	const underlayImage = new Image()
	underlayImage.src = 'build/artworks-1500/anna-zholud_instead-of-landscape-2.jpg'

	underlayImage.decode().then(() => {
		imageCtx.drawImage(underlayImage, -width / 2, -height / 2, width, height)

		drawPenrosedImage({ width, height, ctx, imageCtx, patterns })
	})
}

await penrose()
