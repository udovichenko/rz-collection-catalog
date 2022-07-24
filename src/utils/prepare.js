import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import { downloadFile } from './downloadFile.js'

const buildDir = './build'
const imgDir = './build/artworks'
const siteUrl = 'https://rzcollection.com'
const imgListUrl = `${siteUrl}/tech/all-images-list`

fs.mkdirSync(buildDir, { recursive: true })
fs.mkdirSync(imgDir, { recursive: true })

const imgListFilePath = `${buildDir}/img-list.js`
const urlList = await (await fetch(imgListUrl)).json()

let imgList = urlList.filter((img) => !!img.src && img)
imgList = imgList.map(({ id, src }) => {
	if (src) {
		return {
			id,
			url: `${siteUrl}${src}`,
			imgPath: src,
			filename: path.basename(src),
			localPath: path.join(imgDir, path.basename(src))
		}
	}
})

fs.writeFileSync(imgListFilePath, `export default ${JSON.stringify(imgList, null, 2)}`)

await Promise.all(
	imgList.map(async (img) => {
		console.log(img.url, img.localPath)
		await downloadFile(img.url, img.localPath)
	})
)

