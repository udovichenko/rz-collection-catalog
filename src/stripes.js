import getImageList from './modules/getImageList.js'
import createPatternsFromImages from './modules/createPatternsFromImages.js'
import drawStripes from './lib/drawStripes.js'

async function stripes() {
	const ITERATIONS = 50
	const OFFSET = 100
	const images = getImageList({ iterations: ITERATIONS, offset: OFFSET })
	console.log(images)
	// const container = document.getElementById('container')
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	const patterns = await createPatternsFromImages({ ctx, images })

	console.log(patterns)

	drawStripes({ patterns,  ctx, width: canvas.width, height: canvas.height, iterations: ITERATIONS })
}

await stripes()
