import Settings from "./settings.js";

var map;
var userMarker;
var user;

async function init() {
	user = await _searchUserByIP();
	_createMap([user.latitude, user.longitude], Settings.zoom);

	userMarker._icon.style.filter = "hue-rotate(180deg)";
	userMarker.bindPopup("Vous êtes ici ! (environ)");

	_showInfoRoute();
}

async function _searchUserByIP(ip = "") {
	var url = "https://ipapi.co/json/" + ip;

	const response = await fetch(url);
	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error("Erreur HTTP : " + response.status);
	}
}

async function _createMap(lonLat, zoom) {
	map = L.map("LeafletMap").setView(lonLat, zoom);
	userMarker = L.marker(lonLat, {}).addTo(map);

	L.tileLayer(Settings.tiles.url, {
		maxZoom: Settings.tiles.maxZoom,
		subdomains: Settings.tiles.subdomains,
		attribution: '&copy; <a href="https://google.fr/maps">Google Maps</a>',
	}).addTo(map);
}

async function _createMarker(lonLat) {
	return L.marker(lonLat).addTo(map);
}

async function _createMarkerWithMessage(lonLat, message) {
	var marker = await _createMarker(lonLat);
	marker.bindPopup(message);
}

async function _showInfoRoute() {
	const response = await fetch("https://carto.g-ny.org/data/cifs/cifs_waze_v2.json");
	const data = await response.json();
	if (response.ok) {
		data.incidents.forEach((item) => {
			_createMarkerWithMessage(item.location.polyline.split(" "), item.description);
		});
	} else {
		throw new Error("Erreur HTTP : " + response.status);
	}
}

export default {
	init,
};
