async function searchUserByIP(ip = "") {
	var url = "https://ipapi.co/json/" + ip;

	const response = await fetch(url);
	const data = await response.json();
	if (response.ok) {
		data.departement = await getDepartement(data);
		return data;
	} else {
		throw new Error("Erreur HTTP : " + response.status);
	}
}

async function getDepartement(user) {
	var url =
		"https://geo.api.gouv.fr/communes?codePostal=" + user.postal + "&nom=" + user.city + "&fields=departement&format=json&geometry=centre";

	const response = await fetch(url);
	const data = await response.json();
	if (response.ok) {
		document.querySelector("#userDepartement").innerHTML = data[0].departement.nom;
		return data[0].departement.nom;
	} else {
		throw new Error("Erreur HTTP : " + response.status);
	}
}

export default {
	searchUserByIP,
};
