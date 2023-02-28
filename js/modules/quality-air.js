import Settings from "./settings.js";

var el = {
	img: document.querySelector(".quality-air img"),
	userAirQuality: document.querySelector(".quality-air #userAirQuality"),
	input: document.querySelector("input#airQuality"),
};

async function init() {
	let qualityAir = await _getQualityAir();
	_showQualityAir(qualityAir);

	el.input.addEventListener("change", (e) => {
		_showQualityAir(e.target.value);
	});
}

async function _getQualityAir() {
	let url = Settings.qualityAir.url + "/feed/here/?token=" + Settings.qualityAir.token;

	const response = await fetch(url);
	const data = await response.json();

	return data.data.aqi;
}

async function _showQualityAir(qualityAir) {
	el.img.src = _convertQualityAirToUrlPicture(qualityAir);
	el.userAirQuality.innerHTML = `(${qualityAir})`;
	el.input.value = qualityAir;
}

function _convertQualityAirToUrlPicture(qualityAir) {
	let urlPicture;
	switch (true) {
		case qualityAir <= 40:
			urlPicture = "https://em-content.zobj.net/thumbs/120/samsung/349/grinning-face_1f600.png";
			break;
		case qualityAir <= 60:
			urlPicture = "https://em-content.zobj.net/thumbs/120/samsung/349/neutral-face_1f610.png";
			break;
		case qualityAir <= 80:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/face-with-raised-eyebrow_1f928.png";
			break;
		case qualityAir <= 100:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/sneezing-face_1f927.png";
			break;
		case qualityAir <= 130:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/face-with-medical-mask_1f637.png";
			break;
		case qualityAir <= 180:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/nauseated-face_1f922.png";
			break;
		case qualityAir <= 250:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/exploding-head_1f92f.png";
			break;
		case qualityAir <= 300:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/skull_1f480.png";
			break;
		case qualityAir > 300:
			urlPicture = "https://em-content.zobj.net/thumbs/72/samsung/349/zombie_1f9df.png";
			break;
	}
	return urlPicture;
}

export default {
	init,
};
