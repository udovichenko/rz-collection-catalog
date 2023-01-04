export default function getLightnessFromRgb({ r, g, b }) {
	return Math.sqrt( 0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2)
}
