import PlacesView from "./placeView.js";
import PageNavigationView from "./pageNavigationView.js";
import BookmarksView from "./bookmarksView.js";
import InputView from "./inputView.js";
import { state, searchForPlace } from "./model.js";

const bookmarkClick = function (el) {
	if (!el) return;

	const positionGlobal = [
		...document.querySelectorAll(".cityWraper[data-temp='false']"),
	].indexOf(el.closest(".cityWraper"));

	if (el.classList.contains("active")) {
		el.classList.remove("active");
		let found = state.bookmarks.find(
			(el) => el.city === state.names[positionGlobal]
		);

		let position = state.bookmarks.indexOf(found);
		state.bookmarks.splice(position, 1);

		BookmarksView.removeBookmark(found.city);
	} else {
		el.classList.add("active");
		state.bookmarks.push({
			city: state.names[positionGlobal],
			lon: state.places[positionGlobal].lon,
			lat: state.places[positionGlobal].lat,
		});
		BookmarksView.addToBookmarks();
	}
};

const updatePlace = function () {
	PageNavigationView.updateSlides();
};

const searchHandler = async function (obj = undefined) {
	try {
		const temp = document.querySelector('.cityWraper[data-temp="true"]');
		if (temp) temp.remove();

		document.querySelector(".cities").insertAdjacentHTML(
			"afterbegin",
			`
			<div class="cityWraper preloader">
			<div class="cityContainer tempContainer">
			<img src="./Imgs/preloader.svg" alt="preloader">
			</div>
			</div>
			`
		);
		PageNavigationView.updateSlides();

		await searchForPlace(obj);
		document.querySelector(".preloader").remove();
		PlacesView.renderPlace(updatePlace, bookmarkClick);
		PageNavigationView.updateSlides();
	} catch (err) {
		document.querySelector(".preloader").remove();

		if (err === 404 || err === 400) {
			PlacesView.addPlaceholder(
				"Sorry, couldn't find you place, try one more time)"
			);
		}
		PageNavigationView.updateSlides();
	}
};

const init = function () {
	PageNavigationView.initializeButtons();
	InputView.initializeBtn(searchHandler);
	BookmarksView.handleChange(bookmarkClick, searchHandler);
};

init();
// localStorage.clear();
