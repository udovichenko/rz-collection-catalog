import getImageList from './modules/getImageList.js'
import createPatternsFromImages from './modules/createPatternsFromImages.js'
import drawArcs from './lib/drawArcs.js'

async function arcs() {
	const ITERATIONS = 50
	const OFFSET = 150
	const images = getImageList({ iterations: ITERATIONS, offset: OFFSET })
	// console.log(images)
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	const patterns = await createPatternsFromImages({ ctx, images })

	// console.log(patterns)
	drawArcs({ patterns,  ctx, width: canvas.width, height: canvas.height, iterations: ITERATIONS })
}

await arcs()
