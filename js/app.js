import User from "./modules/user.js";
import Map from "./modules/map.js";
import Covid from "./modules/covid.js";
import QualityAir from "./modules/quality-air.js";
import MarsRover from "./modules/mars-rover.js";

function init() {
	User.searchUserByIP().then((user) => {
		Map.init(user);
		Covid.init(user);
		QualityAir.init();
		MarsRover.init();
	});
}

window.addEventListener("load", init);
