const imgs = Array.from(document.getElementsByTagName('img'));
const markerWrapper = document.getElementById('markerWrapper');

// TODO encapsulate and clean this shit up; maybe a class

// TODO: get marker size relative to face size
const getDimens = (img, box) => {
	const pct = {
		top: (box.y / img.naturalHeight) * 100,
		left: (box.x / img.naturalWidth) * 100,
	};
	const markerOffset = 16;
	return `
		top: ${pct.top}%;
		left: ${pct.left}%;
		transform: translate(-${markerOffset}px, -${markerOffset}px);
	`;
};

const markFeature = (img, feature) => {
	const marker = document.createElement('div');
	const attrs = {
		"class": "marker",
		"style": getDimens(img, feature),
	};
	Object.keys(attrs)
		.forEach(attr => {
			marker.setAttribute(attr, attrs[attr])
		});
	markerWrapper.appendChild(marker);
};

// TODO: avoid instantiating for every face; store data in a var
const detectFaces = (image) => {
	if (window.FaceDetector == undefined) {
		// TODO: link to feature flag for chrome user agent
		console.error('Your browser does not support face detection');
		return;
	}
	
	const Detector = new FaceDetector();
	Detector.detect(image)
		.then(faces => {
			console.dir(faces);
			faces
				.forEach(face => {
					face.landmarks
						.filter(feature => feature.type == "eye")
						.map(feature => feature.location)
						.forEach(feature => {
							markFeature(image, feature);
						})
				});
		});
	
};

// TODO async/await
imgs.forEach(img => {
	img.onload = detectFaces(img)
});
