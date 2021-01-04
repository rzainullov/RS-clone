import {Language} from "./language.js";
const language = new Language();

export class Modal {
	constructor() {
		this.burger = document.querySelector("[data-burger]");
		this.burger.addEventListener("click", () => {
			const isModalActive = this.burger.classList.contains("active") ? true : false;
			if (isModalActive) {
				this.makeUnactive();
			} else {
				this.makeActive();
			}
		});
		this.modal = document.querySelector("[data-modal]");
		this.nav = document.querySelectorAll("[data-modal-nav]");
	};
	createMainModal = () => {
		const isEnglish = JSON.parse(localStorage.getItem('settings')).find(el => el.settingName === "language").settingValue === "English";
		const wordsForMainModal = isEnglish ? language.mainModalEnglish : language.mainModalRussia
		this.modal.innerHTML = '';
		const logo = document.createElement('div')
		logo.style.cssText = 'width: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center;'
		this.modal.appendChild(logo)
		const logoImg = document.createElement('div')
		logoImg.style.cssText = 'width: 103px; height: 106px; background: url("img/logo.png") no-repeat center center/cover;'
		logo.appendChild(logoImg)
		const logoText = document.createElement('div')

		logoText.innerText = wordsForMainModal[0]
		logoText.style.cssText = 'font-size: 36px; text-transform: uppercase;'
		logo.appendChild(logoText)

		const nav = document.createElement('div')
		nav.style.cssText = 'display: flex; flex-direction: column; align-items: center;  margin: 20px 0 0 0;'
		this.modal.appendChild(nav)

		const navTitle = document.createElement('div')
		navTitle.innerText = wordsForMainModal[1]
		navTitle.style.cssText = 'font-size: 48px; text-transform: uppercase;'
		nav.appendChild(navTitle)

		const navNewGame = document.createElement('div')
		navNewGame.innerText = wordsForMainModal[2]
		navNewGame.classList.add('modal-main__item')
		navNewGame.addEventListener('click', this.newGame)
		nav.appendChild(navNewGame)

		const navSaveGame = document.createElement('div')
		navSaveGame.innerText = wordsForMainModal[3]
		navSaveGame.classList.add('modal-main__item')
		navSaveGame.addEventListener('click', this.saveGame)
		nav.appendChild(navSaveGame)

		const navLoadGame = document.createElement('div')
		navLoadGame.innerText = wordsForMainModal[4]
		navLoadGame.classList.add('modal-main__item')
		navLoadGame.addEventListener('click', this.loadGame)
		nav.appendChild(navLoadGame)

		const navSettings = document.createElement('div')
		navSettings.innerText = wordsForMainModal[5]
		navSettings.classList.add('modal-main__item')
		navSettings.addEventListener('click', this.createSettingsModal)
		nav.appendChild(navSettings)

		const navRules = document.createElement('div')
		navRules.innerText = wordsForMainModal[6]
		navRules.classList.add('modal-main__item')
		navRules.addEventListener('click', this.createRulesModal)
		nav.appendChild(navRules)
	};

	createSettingsModal = () => {
		this.modal.innerHTML = '';
	};
	createRulesModal = () => {
		this.modal.innerHTML = '';
	};

	makeActive() {
		this.burger.classList.add("active");
		this.modal.classList.add("active");
	};
	makeUnactive() {
		this.burger.classList.remove("active");
		this.modal.classList.remove("active");
	};

	newGame = () => {
		this.makeUnactive();
		console.log('New game')
	}
	saveGame = () => {
		this.makeUnactive();
		console.log('Save game')
	}
	loadGame = () => {
		this.makeUnactive();
		console.log('Load game')
	}
};