import fs from 'fs'
import fetch from 'node-fetch'

export const downloadFile = async (url, path, force = false) => {
	if (fs.existsSync(path) && !force) return

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
