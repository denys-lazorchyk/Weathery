export default class Bookmarks {
	_bookmarksContainer;
	_bookmarksIcon;
	_selected;

	constructor(parentEl, bookmarksIcon) {
		this._bookmarksContainer = parentEl;
		this._bookmarksIcon = bookmarksIcon;
		this._selected = 0;

		this._initializeContainers();
		this._retrieveBookmarks();
	}

	_initializeContainers() {
		this._bookmarksIcon.addEventListener("mouseenter", () => {
			this._bookmarksContainer.classList.add("active");
		});

		this._bookmarksIcon.addEventListener("mouseleave", () => {
			this._bookmarksContainer.style.transition = "opacity 0.5s";
			this._bookmarksContainer.classList.remove("active");
			this._selected = 1;
		});

		this._bookmarksContainer.addEventListener("mouseenter", () => {
			if (this._selected) {
				this._bookmarksContainer.classList.add("active");
				this._selected = 0;
			}
		});

		this._bookmarksContainer.addEventListener("mouseleave", () => {
			this._bookmarksContainer.style.transition = "opacity 0.5s";
			this._bookmarksContainer.classList.remove("active");
		});

		this._bookmarksContainer.addEventListener("click", (e) => {
			if (e.target.classList.contains("cancel")) {
				this.removeBookmark(e.target.closest(".cityPreview"), true);
			}
		});
	}

	_retrieveBookmarks() {
		let bookmarksString = localStorage.getItem("bookmarks");
		console.log(bookmarksString);
		if (!bookmarksString) {
			this._bookmarksContainer.insertAdjacentHTML(
				"beforeend",
				`	<div class="cityPreview tempBookmark">
                    <h3 class="city-name"> <img src="./Imgs/question.svg" alt="Question icon">No bookmarks</h3>
                </div>`
			);
			return;
		}

		const bookmarksObjs = JSON.parse(bookmarksString);

		bookmarksObjs.bookmarkObjs.forEach((el) => {
			this._renderBookmark(el.cityName, el.lon, el.lat);
		});
	}

	_saveBookmarks() {
		const bookmarksToSave = [...document.querySelectorAll(".cityPreview")];
		let bookmarkObjs = bookmarksToSave.map((el) => {
			let elObj = {
				cityName: el.dataset.city,
				lon: +el.dataset.lon,
				lat: +el.dataset.lat,
			};
			return elObj;
		});
		// console.log(bookmarksObjs);
		let finalString = JSON.stringify({ bookmarkObjs });

		localStorage.setItem("bookmarks", finalString);
	}

	_renderBookmark(name, lon, lat) {
		this._bookmarksContainer.insertAdjacentHTML(
			"beforeend",
			`
				<div class="cityPreview" data-city="${name}" data-lon="${lon}" data-lat="${lat}">
                    <h3 class="city-name">
						<img src="./Imgs/city.svg" alt="City icon">
							${name}
						<img src="./Imgs/cancel.svg" class="cancel" alt="Cancel icon">
                    </h3>
                </div>
	`
		);
	}

	removeBookmark(name, el = false) {
		if (el) {
			name.remove();
			return;
		}

		this._bookmarksContainer
			.querySelector(`.cityPreview[data-city="${name}]"`)
			.remove();
		this._saveBookmarks();
		// this._retrieveBookmarks();
	}

	addToBookmarks(parentEl) {
		let noBookmarks = document.querySelector(".tempBookmark");
		if (noBookmarks) noBookmarks.remove();

		this._renderBookmark(
			parentEl.dataset.city,
			parentEl.dataset.lon,
			parentEl.dataset.lat
		);

		this._saveBookmarks();
	}

	changeState(el) {
		if (el.classList.contains("active")) {
			el.classList.remove("active");
			this.removeBookmark(el.closest(".cityWraper").dataset.city);
		} else {
			el.classList.add("active");
			console.log(el.closest(".cityWraper"));
			this.addToBookmarks(el.closest(".cityWraper"));
		}
		this._saveBookmarks();
	}
}
