class PageNavigationView {
	constructor() {
		this._arrowRight = document.querySelector(".arrow-right");
		this._arrowLeft = document.querySelector(".arrow-left");
		this._slides = [...document.querySelectorAll(".cityWraper")];
		this._position = 0;
	}

	_goToSlide(value = 100) {
		this._slides.forEach(
			(s, i) =>
				(s.style.transform = `translateX(${(i - this._position) * value}%)`)
		);
	}

	_screenAdapt() {
		if (window.screen.width >= 2700) {
			return 3;
		}

		if (window.screen.width >= 1850 && window.screen.width < 2700) {
			return 2;
		}

		if (window.screen.width < 1850) {
			return 1;
		}
	}

	initializeButtons() {
		this._arrowRight.addEventListener("click", () => {
			let counter = this._screenAdapt();

			// if (counter >= this._slides.length && this._position) this._position = 0;
			if (counter >= this._slides.length) return;
			if (this._position === this._slides.length - counter) this._position = 0;
			else this._position++;

			// if (this._position < counter) return;
			this._goToSlide();
		});

		this._arrowLeft.addEventListener("click", () => {
			let counter = this._screenAdapt();

			// if (counter >= this._slides.length && this._position) this._position = 0;
			if (counter >= this._slides.length) return;
			if (!this._position) this._position = this._slides.length - counter;
			else this._position--;

			this._goToSlide();
		});
	}

	updateSlides() {
		this._slides = [...document.querySelectorAll(".cityWraper")];
		this._goToSlide();
	}
}

export default new PageNavigationView();
