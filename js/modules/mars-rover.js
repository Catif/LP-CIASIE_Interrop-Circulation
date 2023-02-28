var listImageEl = document.querySelector(".list-images");
var picturesMars = [];
var offset = 0;
var limit = 10;

function init() {
	_showMarsRover();

	document.querySelector("#btnLoadImages button").addEventListener("click", () => {
		_showPictures(offset, limit);
	});
}

async function _getMarsRover() {
	let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY";

	const response = await fetch(url);
	const data = await response.json();

	return data;
}

async function _showMarsRover() {
	let data = await _getMarsRover();
	picturesMars = data.photos;

	_showPictures();
}

async function _showPictures() {
	let pictures = picturesMars.slice(offset, offset + limit);

	pictures.forEach((picture) => {
		let img = document.createElement("img");
		img.src = picture.img_src;
		img.alt = picture.camera.full_name;
		img.title = picture.camera.full_name;
		listImageEl.appendChild(img);
	});

	offset += limit;
}

export default {
	init,
};
