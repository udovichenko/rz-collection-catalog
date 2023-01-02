export default async function createPatternsFromImages({ ctx, images }) {
	return await Promise.all(
		images.map((img) => {
			return new Promise((resolve) => {
				const image = new Image()
				image.src = img
				image.onload = () => {
					const pattern = ctx.createPattern(image, 'repeat')
					resolve(pattern)
				}
			})
		}
	))
}
