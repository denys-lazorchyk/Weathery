class InputView {
	constructor() {
		this.btnSearch = document.querySelector(".btn-search");
	}

	initializeBtn(handler) {
		this.btnSearch.addEventListener("click", (e) => {
			e.preventDefault();
			handler();
		});
	}
}

export default new InputView();
