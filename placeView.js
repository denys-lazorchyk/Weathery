import { state } from "./model.js";

class PlacesView {
	constructor() {
		this._parentEl = document.querySelector(".cities");
	}

	renderPlace(handler1, handler2) {
		// this._curName = state.names[state.names.length - 1];
		this._curName = state.names[0];
		// this._currentObj = state.places[state.places.length - 1];
		this._currentObj = state.places[0];

		this._addToParentObj();
		this._renderDays();
		this._activateButtons(handler1);
		this._activateBookmark(handler2);
	}

	addPlaceholder(note = undefined) {
		let text = `
			<div class="cityWraper" data-temp="true">
			<div class="cityContainer tempContainer">
			<h3>${
				note
					? note
					: "Search for new places and they will be added automatcally"
			}</h3>
			</div>
			</div>
			`;
		this._parentEl.insertAdjacentHTML("afterbegin", text);
	}

	_addToParentObj() {
		let text = `
            <div class="cityWraper" data-city="${this._curName}" data-lat="${this._currentObj.lat}" data-lon="${this._currentObj.lon}">
                <img src="./Imgs/bookmark 3.svg" alt="bookmark" class="bookmarkIcon" >    
                <img src="./Imgs/close.svg" alt="Close icon" class="closeIcon">
                <div class="cityContainer" data-city="${this._curName}">
                    <div class="navigation">
                        <button class="btn-day active" data-day='0'>Today</button>
                        <button class="btn-day" data-day='1'>29/07</button>
                        <button class="btn-day" data-day='2'>30/07</button>
                        <button class="btn-day" data-day='3'>31/07</button>
                        <button class="btn-day" data-day='4'>32/07</button>
                        <button class="btn-day" data-day='5'>33/07</button>
                        <button class="btn-day" data-day='6'>34/07</button>
                    </div>        
                </div>
            </div>`;
		this._parentEl.insertAdjacentHTML("afterbegin", text);
	}

	_renderDays() {
		let container = this._parentEl.querySelector(
			`.cityContainer[data-city=${this._curName}]`
		);

		this._buttons = [
			...this._parentEl.querySelectorAll(
				`.cityContainer[data-city=${this._curName}] .btn-day`
			),
		];

		// state.buttons.push(this._buttons);
		state.buttons.unshift(this._buttons);
		this._currentObj.daily.map((el, index) => {
			if (index === 7) return;
			let text = `
            <div class="single-item" data-day='${index}'>
                            <div class="shortReport" style="background-image: url('./Imgs/Weather\ photos/${
															el.weather[0].icon
														}.jpg');">
                                <div>
                                    <img class='weather-icon' src="http://openweathermap.org/img/wn/${
																			el.weather[0].icon
																		}@2x.png" alt="${
				el.weather[0].description
			}">
                                    <div>
                                        <h3 class="mainWeather"><span class="city">${
																					this._curName
																				} - </span>${el.weather[0].main}</h3>
                                        <h3>${el.weather[0].description}</h3>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/celsius.svg" alt="Temperature icon">
                                            <span class="temp">${
																							el.temp.day
																						}</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div class="details">
                                <h2>Weather details:</h2>
                                <ul class="weather-details">
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/wind.svg" alt="Wind">
                                            Wind:
                                        </h3>
                                        <ul class="detailed">
                                            <li>
                                                speed:
                                                <span class="wind-speed">${
																									el.wind_speed
																								} m/s</span>
                                            </li>
                                            <li>
                                                deg:
                                                <span class="wind-deg">${
																									el.wind_deg
																								} deg</span>

                                            </li>
                                            <li>
                                                gust:
                                                <span class="wind-gust">${
																									el.wind_gust
																								} m/s</span>
                                            </li>
                                        </ul>

                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/celsius.svg" alt="Temperature icon">
                                            Temperature:
                                        </h3>
                                        <ul class="detailed">
                                            <li>
                                                feels-like:
                                                <span class="feels-like">${
																									el.feels_like.day
																								}</span>
                                            </li>
                                            <li>
                                                min:
                                                <span class="temp-min">${
																									el.temp.min
																								}</span>
                                            </li>
                                            <li>
                                                max:
                                                <span class="temp-max">${
																									el.temp.max
																								}</span>

                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/humidity.svg" alt="Himidity icon">
                                            Humidity:
                                            <span class="humidity">${
																							el.humidity
																						}%</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/visibility.svg" alt="Uvi icon">
                                            Uvi index:
                                            <span class="uvi">${el.uvi}</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/wind.svg" alt="Clouds icon">
                                            Clouds:
                                            <span class="clouds">${
																							el.clouds
																						}%</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/clouds.svg" alt="Pressure icon">
                                            Pressure:
                                            <span class="pressure">${
																							el.pressure
																						} hPa</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/dew.svg" alt="Dew icon">
                                            Dew:
                                            <span class="dew">${
																							el.dew_point
																						}</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/rain.svg" alt="Rain icon">
                                            Rain:
                                            <span class="rain">${
																							el.rain ?? 0
																						}mm</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/sunrise.svg" alt="Sunrise icon">
                                            Sunrise:
                                            <span class="sunrise">${this._validTime(
																							el.sunrise * 1000
																						)}</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/sunset.svg" alt="Sunset icon">
                                            Sunset:
                                            <span class="seunset">${this._validTime(
																							el.sunset * 1000
																						)}</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/moonrise.svg" alt="Moonrise icon">
                                            Moonrise:
                                            <span class="moonrise">${this._validTime(
																							el.moonrise * 1000
																						)}</span>
                                        </h3>
                                    </li>
                                    <li>
                                        <h3 class="characteristic">
                                            <img src="./Imgs/weather icons/moonset.svg" alt="Moonset icon">
                                            Moonset:
                                            <span class="moonset">${this._validTime(
																							el.moonset * 1000
																						)}</span>
                                        </h3>
                                    </li>
                                </ul>
                            </div>
                        </div>
            `;
			container.insertAdjacentHTML("beforeend", text);

			if (index && index !== 7) {
				this._buttons[index].textContent = this._validTime(el.dt * 1000, true);
			}
		});
		this._me = this._parentEl.querySelector(
			`.cityWraper[data-city=${this._curName}]`
		);
		this._days = [...this._me.querySelectorAll(`.single-item`)];
		this._closeIcons = [...document.querySelectorAll(".closeIcon")];
		this._navigation = this._me.querySelector(".navigation");
		// state.days.push(this._days);
		state.days.unshift(this._days);
	}

	_validTime(secs, day = false) {
		let dateObj = new Date(secs);
		if (!day) {
			return `${
				dateObj.getHours() < 10 ? "0" + dateObj.getHours() : dateObj.getHours()
			}:${
				dateObj.getMinutes() < 10
					? "0" + dateObj.getMinutes()
					: dateObj.getMinutes()
			}`;
		} else {
			return `${
				dateObj.getUTCDate() < 10
					? "0" + dateObj.getUTCDate()
					: dateObj.getUTCDate()
			}/${
				dateObj.getMonth() < 9
					? "0" + (1 + dateObj.getMonth())
					: 1 + dateObj.getMonth()
			}`;
		}
	}

	_activateButtons(handler) {
		this._goToSlide(0);

		this._navigation.addEventListener("click", (e) => {
			let btn = e.target.closest(".btn-day");
			if (btn) {
				this._resetButtons(e.target);
				btn.classList.add("active");
				this._goToSlide(+btn.dataset.day);
			}
		});

		this._me.querySelector(".closeIcon").addEventListener("click", (e) => {
			state.buttons.splice(state.clicked, 1);
			state.days.splice(state.clicked, 1);
			state.places.splice(state.clicked, 1);
			state.names.splice(state.clicked, 1);
			e.target.closest(".cityWraper").remove();
			handler();
			this._closeIcons = [...document.querySelectorAll(".closeIcon")];
			if (!state.places.length)
				this.addPlaceholder(
					"Search for new places and they will be added automatically)"
				);
		});
	}

	_activateBookmark(handler) {
		const bookmarkIcon = this._me.querySelector(".bookmarkIcon");

		const alreadyClicked = state.bookmarks.find(
			(el) => el.city === state.names[state.clicked]
		);

		if (alreadyClicked) bookmarkIcon.classList.add("active");

		bookmarkIcon.addEventListener("click", (e) => {
			handler(e.target);
		});
	}

	_resetButtons(button) {
		const closestNavigation = button.closest(".navigation");
		const position = [...document.querySelectorAll(".cityWraper")].indexOf(
			closestNavigation.closest(".cityWraper")
		);
		state.clicked = position;

		const buttons = [...closestNavigation.querySelectorAll(".btn-day")];

		buttons.forEach((btn) => {
			btn.classList.remove("active");
		});
	}

	_goToSlide(slide, value = 100) {
		state.days[state.clicked].forEach(
			(s, i) => (s.style.transform = `translateX(${(i - slide) * value}%)`)
		);
	}
}

export default new PlacesView();
