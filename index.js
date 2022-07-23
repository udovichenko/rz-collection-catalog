import imgList from './img-list.js'

imgList.map((img) => {
	img.el = document.createElement('img')
	img.el.src = img.localPath
	document.body.appendChild()
})
