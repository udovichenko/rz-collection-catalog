export default function drawArcs({ ctx, width, height, patterns, iterations = 10 } = {}) {
	// const CENTER_X = width / 2
	const CENTER_X = width
	const CENTER_Y = height / 2
	const THICKNESS = width / iterations

	for (let i = iterations; i > 0; i--) {
		ctx.beginPath();
		// console.log('THICKNESS * iterations', THICKNESS * iterations)
		ctx.arc(CENTER_X, CENTER_Y, THICKNESS * i, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fillStyle = patterns[i]
		ctx.fill();
	}
}
