import getImageList from './modules/getImageList.js'
import { drawPenrosedImage } from './lib/drawPenrosedImage.js'
import getImageAvgColor from './lib/getImageAvgColor.js'
import createPatternsFromImagesWithMeta from './modules/createPatternsFromImagesWithMeta.js'
import drawArcs from './lib/drawArcs.js'
import setupCanvas from './lib/setupCanvas.js'
import renderPreviews from './lib/renderPreviews.js'

async function penrosed(src) {
	const maxPatternsCount = 250
	const patternsOffset = 0
	// const arcCount = 50
	const width = 2000
	const height = 3000
	const details = 6.5
	const noise = 0.4
	const darken = 0.55

	// if (arcCount > maxPatternsCount) {
	// 	throw new Error(`arcCount (${arcCount}) cannot be greater than maxPatternsCount (${maxPatternsCount})`)
	// }

	const { ctx } = setupCanvas({ id: 'canvas', width, height })
	const { ctx: underlayCtx } = setupCanvas({ id: 'underlay', width, height })

	// ctx.scale(-1, -1)
	ctx.scale(1, -1)
	ctx.translate(0, -height)

	let patternImages = getImageList({ limit: maxPatternsCount, offset: patternsOffset, dir: 'artworks-resize' })

	const patterns = await createPatternsFromImagesWithMeta({ ctx, images: patternImages })
	// const underlayPatterns = await createPatternsFromImagesWithMeta({ ctx: underlayCtx, images: patternImages })


	const img = new Image()
	img.src = 'src/bg/bg1.jpg'
	await img.decode()
	underlayCtx.drawImage(img, 0, 0, width, height)

	// drawArcs({ patterns: underlayPatterns, ctx: underlayCtx, width, height, count: arcCount })
	underlayCtx.fillStyle = `rgba(0, 0, 0, ${darken})`
	underlayCtx.fillRect(0, 0, width, height)

	drawPenrosedImage({ width, height, ctx, imageCtx: underlayCtx, patterns, details, noise })

	const { l } = await getImageAvgColor(src)
	document.body.style.backgroundColor = `rgb(${l}, ${l}, ${l})`

	renderPreviews(patternImages)
}

await penrosed('build/artworks-1500/anna-zholud_instead-of-landscape-2.jpg')
