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

const imgListFilePath = `${buildDir}/images-list.json`
const urlList = await (await fetch(imgListUrl)).json()

let imgList = urlList.filter((url) => !!url && url)
imgList = imgList.map((imgPath) => {
	if (imgPath) {
		return {
			url: `${siteUrl}${imgPath}`,
			imgPath,
			filename: path.basename(imgPath),
			localPath: path.join(imgDir, path.basename(imgPath))
		}
	}
})

fs.writeFileSync(imgListFilePath, JSON.stringify(imgList, null, 2))

await Promise.all(
	imgList.map(async (img) => {
		console.log(img.url, img.localPath)
		await downloadFile(img.url, img.localPath)
	})
)

