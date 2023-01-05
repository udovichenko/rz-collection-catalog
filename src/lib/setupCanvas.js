export default function setupCanvas({ id, width, height } = {}) {
	const canvas = document.getElementById(id)
	const ctx = canvas.getContext('2d')
	canvas.width = width
	canvas.height = height
	return { canvas, ctx }
}
