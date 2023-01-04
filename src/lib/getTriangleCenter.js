export default function getTriangleCenter(x1, y1, x2, y2, x3, y3) {
	const xc = (x1 + x2 + x3) / 3
	const yc = (y1 + y2 + y3) / 3
	return [xc, yc]
}
