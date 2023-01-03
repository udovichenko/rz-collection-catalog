import fs from 'fs'
import { imgResize } from './imgResize.js'

const SRC_DIR = process.argv[2]
const DEST_DIR = process.argv[3]
const WIDTH = 1500
const QUALITY = 98

const imgDirResize = function (srcDir) {
	const files = fs.readdirSync(srcDir)

	files.forEach((fileName) => {
		if (fs.statSync(srcDir + '/' + fileName).isDirectory()) {
			imgDirResize(srcDir + '/' + fileName)
		} else if (fs.statSync(srcDir + '/' + fileName).isFile()) {
			const destDir = srcDir.replace(SRC_DIR, DEST_DIR)
			imgResize({ fileName, srcDir, destDir, width: WIDTH, quality: QUALITY })
		}
	})
}

imgDirResize(SRC_DIR)
