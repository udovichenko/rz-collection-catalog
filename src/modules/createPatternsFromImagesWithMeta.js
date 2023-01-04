import getImageAvgColor from '../lib/getImageAvgColor.js'

export default async function createPatternsFromImagesWithMeta({ ctx, images } = {}) {
	return await Promise.all(
		images
			.map((img) => {
				return new Promise((resolve) => {
					const image = new Image()
					image.src = img
					image.onload = async () => {
						const pattern = ctx.createPattern(image, 'repeat')
						resolve({
							pattern,
							color: await getImageAvgColor(image.src)
						})
					}
				})
			})
	)
}
