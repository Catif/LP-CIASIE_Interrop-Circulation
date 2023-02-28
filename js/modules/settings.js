export default {
	zoom: 13,
	tiles: {
		url: "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
		maxZoom: 20,
		subdomains: ["mt0", "mt1", "mt2", "mt3"],
	},
	qualityAir: {
		url: "https://api.waqi.info",
		token: "cb9d9b652fb88402c87464a9daa1338d7119c949",
	},
};
