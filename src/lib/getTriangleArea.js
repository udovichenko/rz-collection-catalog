export default function getTriangleArea(x1, y1, x2, y2, x3, y3) {
	return 0.5 * Math.abs((x1 * y2 + x2 * y3 + x3 * y1) - (y1 * x2 + y2 * x3 + y3 * x1))
}
