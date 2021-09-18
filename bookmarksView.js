import { state } from "./model.js";

class BookmarksView {
	constructor() {
		this._bookmarksContainer = document.querySelector(".bookmarksContainer");
		this._bookmarksIcon = document.querySelector(".bookmarks");
		this._selected = 0;

		this._retrieveBookmarks();
	}

	_addPlaceholder() {
		this._bookmarksContainer.insertAdjacentHTML(
			"beforeend",
			`	<div class="cityPreview tempBookmark">
					<h3 class="city-name"> <img src="./Imgs/question.svg" alt="Question icon">No bookmarks</h3>
				</div>`
		);
	}

	_retrieveBookmarks() {
		let bookmarksString = localStorage.getItem("bookmarks");
		const bookmarksObjs = JSON.parse(bookmarksString);

		if (!bookmarksObjs || !bookmarksObjs.bookmarksObjs.length) {
			this._addPlaceholder();
			return;
		}

		bookmarksObjs.bookmarksObjs.forEach((el) => {
			state.bookmarks.push({
				city: el.city,
				lon: el.lon,
				lat: el.lat,
			});
			this._renderBookmark(el.city);
		});
	}

	handleChange(handler1, handler2) {
		[this._bookmarksIcon, this._bookmarksContainer].forEach((el) => {
			el.addEventListener("mouseleave", () => {
				this._bookmarksContainer.style.transition = "opacity 0.5s";
				this._bookmarksContainer.classList.remove("active");
				this._timer = setTimeout(() => {
					this._bookmarksContainer.style.display = "none";
				}, 500);
				this._selected = 1;
			});
		});

		[this._bookmarksIcon, this._bookmarksContainer].forEach((el) => {
			el.addEventListener("mouseenter", () => {
				if (
					(this._selected && el === this._bookmarksContainer) ||
					el === this._bookmarksIcon
				) {
					this._bookmarksContainer.style.display = "block";
					this._bookmarksContainer.classList.add("active");
					clearTimeout(this._timer);
					this._selected = 0;
				}
			});
		});

		this._bookmarksContainer.addEventListener("click", (e) => {
			let cityPreview = e.target.closest(".cityPreview");
			if (e.target.classList.contains("cancel")) {
				let container = document.querySelector(
					`.cityWraper[data-city=${cityPreview.dataset.city}]`
				);

				if (container) handler1(container.querySelector(".bookmarkIcon"));

				if (!container) {
					let found = state.bookmarks.find(
						(el) => el.city === cityPreview.dataset.city
					);

					let position = state.bookmarks.indexOf(found);
					state.bookmarks.splice(position, 1);

					this.removeBookmark(found.city);
				}
			}

			if (
				e.target.classList.contains("city-name") &&
				!cityPreview.classList.contains("tempBookmark")
			) {
				const cityData = state.bookmarks.find(
					(el) => el.city === cityPreview.dataset.city
				);
				handler2(cityData);
			}
		});
	}

	_saveBookmarks() {
		let bookmarksObjs = state.bookmarks;
		localStorage.setItem("bookmarks", JSON.stringify({ bookmarksObjs }));
	}

	_renderBookmark(name) {
		this._bookmarksContainer.insertAdjacentHTML(
			"beforeend",
			`
				<div class="cityPreview" data-city="${name}">
                    <h3 class="city-name">
						<img src="./Imgs/city.svg" alt="City icon">
							${name}
						<img src="./Imgs/cancel.svg" class="cancel" alt="Cancel icon">
                    </h3>
                </div>
	`
		);
	}

	removeBookmark(name) {
		this._bookmarksContainer
			.querySelector(`.cityPreview[data-city="${name}"]`)
			.remove();

		this._saveBookmarks();

		if (state.bookmarks.length < 1) this._addPlaceholder();
	}

	addToBookmarks() {
		let noBookmarks = document.querySelector(".tempBookmark");
		if (noBookmarks) noBookmarks.remove();

		this._renderBookmark(state.bookmarks[state.bookmarks.length - 1].city);
		this._saveBookmarks();
	}
}

export default new BookmarksView();
