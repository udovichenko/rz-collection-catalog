// tile the canvas with penrose tiles
export function drawPenroseTiling({ container, patterns, canvas, ctx }) {
	const DEPTH = 7
	const PHI = (1 + Math.sqrt(5)) / 2
	// const PHI_SQ = PHI * PHI
	// const TRI_T_HEIGHT = Math.sqrt(PHI_SQ - 0.25)
	// const TRI_W_HEIGHT = PHI * Math.sqrt(1 - PHI_SQ / 4)
	const RATIO_T = 1 - 1 / PHI
	const RATIO_W = PHI / (PHI + 1)

	let verts
	let tris
	let invalidated

	function init() {
		generate()
		invalidated = true
	}

	const onResize = () => {
		generate()
		invalidated = true
	}

	function draw() {
		if (invalidated) {
			ctx.fillStyle = '#000'
			ctx.fillRect(0, 0, width, height)

			ctx.resetTransform()
			ctx.scale(1, -1)
			ctx.translate(0, -height)
			ctx.translate(width / 2, height / 2)
			drawTris()
			invalidated = false
		}
	}

	function generate() {
		initTris()
		for (let i = 0; i < DEPTH; i++) {
			runDeflation()
		}
	}

	function initTris() {
		verts = []
		tris = []

		const aInc = 2 * Math.PI / 5
		const aOff = 2 * Math.PI / 10
		const r2 = Math.sqrt(width * width + height * height) / 2
		const r = r2 * PHI
		for (let i = 0; i < 5; i++) {
			const vertIndex = verts.length
			const p1 = {
				x: 0,
				y: 0
			}
			const p2 = {
				x: r * Math.cos(i * aInc),
				y: r * Math.sin(i * aInc)
			}
			const p3 = {
				x: r2 * Math.cos(i * aInc + aOff),
				y: r2 * Math.sin(i * aInc + aOff)
			}
			const p4 = {
				x: r2 * Math.cos(i * aInc - aOff),
				y: r2 * Math.sin(i * aInc - aOff)
			}

			verts.push(p1, p2, p3, p4)
			tris.push(
				createTri('W', [vertIndex, vertIndex + 1, vertIndex + 2]),
				createTri('W', [vertIndex, vertIndex + 1, vertIndex + 3])
			)
		}
	}

	function runDeflation() {
		const newTris = []
		tris.forEach((tri) => {
			subdivideTri(tri, newTris)
		})
		tris = newTris
	}

	function createTri(type, verts) {
		return {
			type,
			verts,
			subVerts: []
		}
	}

	function subdivideTri(tri, triArray) {
		if (tri.type === 'T') {
			if (tri.subVerts.length === 0) {
				const p1 = verts[tri.verts[0]]
				const p2 = verts[tri.verts[2]]
				const sub1 = {
					x: p1.x + (p2.x - p1.x) * RATIO_T,
					y: p1.y + (p2.y - p1.y) * RATIO_T
				}

				const i = verts.length
				verts.push(sub1)
				tri.subVerts.push(i)
			}
			const subTri1 = createTri('T', [tri.subVerts[0], tri.verts[0], tri.verts[1]])
			const subTri2 = createTri('W', [tri.verts[1], tri.verts[2], tri.subVerts[0]])
			triArray.push(subTri1, subTri2)
		} else if (tri.type === 'W') {
			if (tri.subVerts.length === 0) {
				const p1 = verts[tri.verts[0]]
				const p2 = verts[tri.verts[1]]
				const p3 = verts[tri.verts[2]]
				const sub1 = {
					x: p1.x + (p2.x - p1.x) * RATIO_W,
					y: p1.y + (p2.y - p1.y) * RATIO_W
				}
				const sub2 = {
					x: p1.x + (p3.x - p1.x) * RATIO_W,
					y: p1.y + (p3.y - p1.y) * RATIO_W
				}

				const i = verts.length
				verts.push(sub1, sub2)
				tri.subVerts.push(i, i + 1)
			}
			const subTri1 = createTri('W', [tri.subVerts[0], tri.verts[0], tri.subVerts[1]])
			const subTri2 = createTri('W', [tri.verts[1], tri.verts[2], tri.subVerts[0]])
			const subTri3 = createTri('T', [tri.subVerts[1], tri.verts[2], tri.subVerts[0]])
			triArray.push(subTri1, subTri2, subTri3)
		}
	}

	function drawTris() {
		drawPass()
		drawPass(true)
	}

	function randPattern(patterns) {
		return patterns[Math.floor(Math.random() * patterns.length)]
	}

	function drawPass(antialias) {
		let offset = antialias ? 0.5 : 0
		tris.forEach((tri) => {
			const a = verts[tri.verts[0]]
			const b = verts[tri.verts[1]]
			const c = verts[tri.verts[2]]

			// ctx.fillStyle = colors[tri.type]
			ctx.fillStyle = randPattern(patterns)

			ctx.beginPath()
			ctx.moveTo(a.x + offset, a.y + offset)
			ctx.lineTo(b.x + offset, b.y + offset)
			ctx.lineTo(c.x + offset, c.y + offset)
			ctx.closePath()

			ctx.save()
			const randPatternOffsetX = Math.floor(Math.random() * 1000)
			const randPatternOffsetY = Math.floor(Math.random() * 1000)
			ctx.translate(randPatternOffsetX, randPatternOffsetY)
			ctx.fill()
			ctx.restore()
		})
	}

	let width, height

	const Time = {
		t: 0,
		dt: 0,
		frame: 0
	}

	window.addEventListener('resize', _setCanvasSize)

	function _setCanvasSize() {
		const bounds = container.getBoundingClientRect()
		width = bounds.width
		height = bounds.height
		canvas.width = width
		canvas.height = height
		onResize()
	}

	let _currentFrame = 0

	function _drawLoop() {
		Time.frame = _currentFrame
		draw()
		_currentFrame++
		requestAnimationFrame(_drawLoop)
	}

	_setCanvasSize()
	init()
	_drawLoop()
}
