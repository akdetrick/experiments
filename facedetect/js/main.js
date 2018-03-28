const LIST_IMG_ELS = Array.from(document.getElementsByTagName('img'));
const EL_MARKER_WRAPPER = document.getElementById('markerWrapper');
const CLASS_MARKER = 'marker';

// TODO: add typeflow annotations. Create actual types for image dimens
// TODO encapsulate and clean this shit up; maybe a class

const addEyes = (img, face, markerWrapper) => {
	const maxScale = 0.62;
	const minScale = 0.4;

	face.landmarks
		.filter(landmark => landmark.type === 'eye')
		.map(eye => (
			{
				x: eye.location.x,
				y: eye.location.y,
				size: face.boundingBox.width * (Math.random() * (maxScale - minScale) + minScale),
			}
		))
		.forEach(eyeRect => {
			console.info(`0.${Math.random() * (maxScale - minScale) + minScale}`);
			const marker = document.createElement('div');
			marker.setAttribute('class', CLASS_MARKER);
			marker.setAttribute('style', `
				width: ${eyeRect.size}px;
				height: ${eyeRect.size}px;
				top: ${(eyeRect.y / img.naturalHeight) * 100}%;
				left: ${(eyeRect.x / img.naturalWidth) * 100}%;
				transform: translate(-${eyeRect.size / 2}px, -${eyeRect.size / 2}px);
			`);
			markerWrapper.appendChild(marker);
		});
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

			faces
				.forEach(face => {
					console.dir(face);
					addEyes(image, face, EL_MARKER_WRAPPER);
				});
		});
	
};

// TODO async/await
LIST_IMG_ELS.forEach(img => {
	img.onload = detectFaces(img)
});
