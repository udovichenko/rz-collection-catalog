prepare:
	node src/utils/prepare.js

dev:
	browser-sync start --server . -f src build --startPath src/index.html

img-resize:
	echo "Initial subcategories images size `du -sh build/artworks/`"
	node src/utils/imgDirResize.js build/artworks build/artworks-1500
	echo "Output subcategories images size `du -sh build/artworks-1500`"
