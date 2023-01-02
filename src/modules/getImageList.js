import imgList from '../../build/img-list.js'

export default function getImageList() {
	return imgList.map((img) => {
		return `build/artworks-resize/${img.filename}`
	})
}
