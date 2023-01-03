import { drawImgList } from './lib/imgList.js'
import { drawPenroseTiling } from './lib/penrose.js'
import getImageList from './modules/getImageList.js'
import createPatternsFromImages from './modules/createPatternsFromImages.js'

export default async function penrose() {
	const images = getImageList()
	const container = document.getElementById('container')
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	const patterns = await createPatternsFromImages({ ctx, images })

	console.log(patterns)

	drawPenroseTiling({ container, patterns, canvas, ctx })
}
