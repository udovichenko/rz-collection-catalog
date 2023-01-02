import sharp from 'sharp'
import path from 'path'
import fs from 'fs'

export async function imgResize({ fileName, srcDir, destDir, width, quality }) {
	try {
		const src = path.join(srcDir, fileName)
		const dest = path.join(destDir, fileName)

		fs.mkdirSync(destDir, { recursive: true })

		await sharp(src).resize({ width }).toFormat('jpeg', { mozjpeg: true, quality }).toFile(dest)
	} catch (error) {
		console.log(error)
	}
}
