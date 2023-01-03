export default function drawStripes({ ctx, width, height, patterns, iterations = 10 } = {}) {
	for (let i = 0; i < iterations; i++) {
		ctx.fillStyle = patterns[i]
		ctx.fillRect(width / iterations * i, 0, width / iterations, height)
	}
}
