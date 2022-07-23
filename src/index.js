import imgList from '../build/img-list.js'

imgList.map((img) => {
	img.el = document.createElement('img')
	img.el.src = `/${img.localPath}`
	img.el.classList.add('layer')
	document.body.appendChild(img.el)
})
