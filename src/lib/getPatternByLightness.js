export default function getClosestPatternByLightness(patterns, lightness, noise) {
	let noisyLightness = lightness + (Math.random() - 0.5) * noise * 255
	if (noisyLightness < 0) noisyLightness = 0
	if (noisyLightness > 255) noisyLightness = 255

	const closestPattern = patterns.reduce((prev, curr) => {
		return Math.abs(curr.color.l - noisyLightness) < Math.abs(prev.color.l - noisyLightness) ? curr : prev
	})

	return closestPattern.pattern
}
