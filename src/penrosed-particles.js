import getImageList from './modules/getImageList.js'
import { drawPenrosedImage } from './lib/drawPenrosedImage.js'
import getImageAvgColor from './lib/getImageAvgColor.js'
import createPatternsFromImagesWithMeta from './modules/createPatternsFromImagesWithMeta.js'
import setupCanvas from './lib/setupCanvas.js'
import renderPreviews from './lib/renderPreviews.js'

async function penrosed(src) {
	const maxPatternsCount = 350
	const patternsOffset = 0
	const width = 2000
	const height = 3500
	const details = 8
	const noise = 0.1
	const darken = 0.0
	const lighten = 0.0

	const darkenAfter = 0.6

	const { ctx } = setupCanvas({ id: 'canvas', width, height })
	const { ctx: underlayCtx } = setupCanvas({ id: 'underlay', width, height })

	// ctx.scale(-1, -1)
	ctx.scale(1, -1)
	ctx.translate(0, -height)

	let patternImages = getImageList({ limit: maxPatternsCount, offset: patternsOffset, dir: 'artworks-resize' })

	const patterns = await createPatternsFromImagesWithMeta({ ctx, images: patternImages })
	// const underlayPatterns = await createPatternsFromImagesWithMeta({ ctx: underlayCtx, images: patternImages })

	const img = new Image()
	img.src = 'src/bg/img.png'
	await img.decode()
	underlayCtx.drawImage(img, 0, 0, width, height)

	// drawArcs({ patterns: underlayPatterns, ctx: underlayCtx, width, height, count: arcCount })
	underlayCtx.fillStyle = `rgba(0, 0, 0, ${darken})`
	underlayCtx.fillRect(0, 0, width, height)

	underlayCtx.fillStyle = `rgba(255, 255, 255, ${lighten})`
	underlayCtx.fillRect(0, 0, width, height)

	drawPenrosedImage({ width, height, ctx, imageCtx: underlayCtx, patterns, details, noise, mode: 'underlayIsGaps' })

	ctx.fillStyle = `rgba(0, 0, 0, ${darkenAfter})`
	ctx.fillRect(-width / 2, -height / 2, width, height)

	const { l } = await getImageAvgColor(src)
	document.body.style.backgroundColor = `rgb(${l}, ${l}, ${l})`

	renderPreviews(patternImages)
}

await penrosed('build/artworks-1500/anna-zholud_instead-of-landscape-2.jpg')
