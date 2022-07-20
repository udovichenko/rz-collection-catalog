import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const siteUrl = 'https://rzcollection.com/'
const urlList = await (await fetch(`${siteUrl}/tech/all-images-list`)).json()
const tmpImgDir = './tmp/artworks'

fs.mkdirSync(tmpImgDir, { recursive: true })

const downloadFile = async (url, path) => {
	const res = await fetch(url)
	const fileStream = fs.createWriteStream(path)
	fileStream.on('open', async () => {
		await new Promise((resolve, reject) => {
			res.body.pipe(fileStream)
			res.body.on('error', reject)
			fileStream.on('finish', resolve)
		})
	})
}

let imgList = urlList.filter((url) => !!url && url)
imgList = imgList.map((imgPath) => {
	if (imgPath) {
		return {
			url: `${siteUrl}${imgPath}`,
			imgPath,
			filename: path.basename(imgPath)
		}
	}
})

Promise.all(
	imgList.map(async (img) => await downloadFile(img.url, path.join(tmpImgDir, img.filename)))
)
