var currentChart;

async function init(user) {
	showData(await _getDataCovid(user.region, user.departement, 30));

	document.querySelector("#nbJours").addEventListener("change", (event) => {
		console.log("test");
		_getDataCovid(user.region, user.departement, event.target.value).then((data) => {
			currentChart.destroy();
			showData(data);
		});
	});
}

async function _getDataCovid(region, departement, nbDay = 10) {
	var url =
		"https://data.opendatasoft.com/api/records/1.0/search/" +
		"?dataset=donnees-hospitalieres-covid-19-dep-france%40public" +
		`&rows=${nbDay}` +
		`&sort=date` +
		`&refine.region_min=${region}` +
		`&refine.nom_dep_min=${departement}` +
		`&refine.sex=Tous`;

	const response = await fetch(url);
	const data = await response.json();
	if (response.ok) {
		data.records = data.records.reverse();
		return data;
	} else {
		throw new Error("Erreur HTTP : " + response.status);
	}
}

function showData(dataToShow) {
	const ctx = document.getElementById("chartContainer");

	const data = {
		labels: dataToShow.records.map((record) => record.fields.date),
		datasets: [
			{
				label: "Total contanimés avec retour à domicile",
				data: dataToShow.records.map((record) => record.fields.tot_out),
				backgroundColor: "rgba(255, 99, 132, 0.2)",
				borderColor: "rgb(255, 99, 132)",
				pointBackgroundColor: "rgb(255, 99, 132)",
				pointBorderColor: "#fff",
				pointStyle: "circle",
				pointRadius: 4,
				pointHoverRadius: 8,
			},
		],
	};

	currentChart = new Chart(ctx, {
		type: "line",
		data: data,
		options: {
			responsive: true,
			plugins: {
				title: {
					display: true,
					text: (ctx) =>
						"Statistique Covid-19 sur " + ctx.chart.data.labels[0] + " à " + ctx.chart.data.labels[ctx.chart.data.labels.length - 1],
				},
			},
		},
	});
}

export default {
	init,
};
