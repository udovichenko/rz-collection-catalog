export default function renderPreviews(imgList) {

	imgList.forEach((img) => {
		const imgEl = document.createElement('img')
		imgEl.src = img
		imgEl.height = 200
		document.body.appendChild(imgEl)
	})
}
