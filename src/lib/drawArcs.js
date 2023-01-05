export default function drawArcs({ ctx, width, height, patterns, count = 10 } = {}) {
	const CENTER_X = width / 2
	const CENTER_Y = height / 2
	const THICKNESS = width / ~~(count * 0.7)

	let shuffledPatterns = patterns.sort(() => Math.random() - 0.5)

	for (let i = count; i >= 0; i--) {
		ctx.fillStyle = shuffledPatterns[i].pattern
		ctx.beginPath();
		ctx.arc(CENTER_X, CENTER_Y, THICKNESS * i, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}
