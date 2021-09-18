export const state = {
	bookmarks: [],
	places: [],
	names: [],
	buttons: [],
	days: [],
	clicked: undefined,
};

const apiKey = "30d6bc8e341d35206697841f60a7f8d2";

const capitalize = function (string) {
	return string[0].toUpperCase() + string.slice(1);
};

const findPlace = async function (name) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${apiKey}`
	).then((res) => {
		if (!res.ok) {
			throw res.status;
		}
		return res.json();
	});

	return response;
};

const findWeather = async function (lon, lat) {
	try {
		const apiCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,alerts&units=metric&appid=${apiKey}`;
		const jsonWeather = fetch(apiCall).then((res) => res.json());

		return jsonWeather;
	} catch (err) {}
};

const checkIfAlreadyExist = function (lon, lat) {
	return state.places.every((el) => el.lat !== lat && el.lon !== lon);
};

export const searchForPlace = async function (data = undefined) {
	try {
		let weatherObj, city, lon, lat;
		if (!data) {
			const inputPlace = document.querySelector(".input-place");
			city = capitalize(inputPlace.value);

			inputPlace.blur();
			inputPlace.value = "";
			if (!city) return;

			const cityObj = await findPlace(city);
			lon = cityObj.coord.lon;
			lat = cityObj.coord.lat;
		}

		if (data) {
			lon = data.lon;
			lat = data.lat;
			city = data.city;
		}

		if (checkIfAlreadyExist(lon, lat)) {
			weatherObj = await findWeather(lon, lat);
			// state.clicked = state.places.length;
			state.clicked = 0;
			// state.places.push(weatherObj);
			state.places.unshift(weatherObj);
			// state.names.push(city);
			state.names.unshift(city);
		} else {
			throw Error("You aready requested this city, dumb-ass!", { status: 20 });
		}
	} catch (err) {
		// if (err === 404 || err === 400) {
		// 	throw err;
		// } else {
		// 	throw err;
		// }
		throw err;
	}
};
