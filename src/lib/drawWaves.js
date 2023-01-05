export default function drawWaves({ ctx, width, height, firstSize = 0.25 } = {}) {
	const PHI = 0.8
	const gapPreventionShift = 0.5

	let firstHeight = firstSize * height
	let currHeight = firstHeight
	let top = 0
	ctx.strokeStyle = 'red'

	let isGradientReverse = false

	let isWhite = true
	function bwSwitcher() {
		const colorVal = isWhite ? 'white' : 'black'
		isWhite = !isWhite
		return colorVal
	}

	function drawNextRect(top, prevHeight) {
		currHeight = prevHeight * PHI
		const rectBottom = top + currHeight

		const gradient = ctx.createLinearGradient(0, top, 0, rectBottom)
		gradient.addColorStop(+!isGradientReverse, bwSwitcher())
		gradient.addColorStop(+isGradientReverse, bwSwitcher())
		isGradientReverse = !isGradientReverse
		ctx.fillStyle = gradient
		ctx.fillRect(0, top, width, currHeight + gapPreventionShift)

		return { rectBottom, currHeight }
	}

	while (top < height) {
		const { rectBottom } = drawNextRect(top, currHeight)
		top = rectBottom
	}
}
