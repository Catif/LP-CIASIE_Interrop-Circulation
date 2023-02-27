import User from "./modules/user.js";
import Map from "./modules/map.js";
import Covid from "./modules/covid.js";

function init() {
	User.searchUserByIP().then((user) => {
		Map.init(user);
		Covid.init(user);
	});
}

window.addEventListener("load", init);
