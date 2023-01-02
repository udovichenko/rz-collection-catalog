prepare:
	node src/utils/prepare.js

dev:
	browser-sync start --server . -f src build --startPath src/index.html

img-resize:
	echo "Initial subcategories images size `du -sh build/artworks/`"
	node src/utils/imgDirResize.js build/artworks build/artworks-resize
	echo "Output subcategories images size `du -sh build/artworks-resize`"
