export default function noisifyValue( value, noise = 0 ) {
	let result = value + (Math.random() - 0.5) * noise
	if (result < 0) result = 0
	if (result > 1) result = 1
	return result
}
