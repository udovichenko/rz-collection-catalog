import setupCanvas from './lib/setupCanvas.js'
import drawWaves from './lib/drawWaves.js'

function waves() {
	const width = 500
	const height = 700
	const { ctx } = setupCanvas({ id: 'canvas', width, height })

	drawWaves({ ctx, width, height })
}

waves()
