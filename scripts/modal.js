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
	createMainModal() {
		this.modal.innerHTML = '';
		const logo = document.createElement('div')
		logo.style.cssText = 'width: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center;'
		this.modal.appendChild(logo)
		const logoImg = document.createElement('div')
		logoImg.style.cssText = 'width: 103px; height: 106px; background: url("img/logo.png") no-repeat center center/cover;'
		logo.appendChild(logoImg)
		const logoText = document.createElement('div')
		logoText.innerText = 'Poker'
		logoText.style.cssText = 'font-size: 36px; text-transform: uppercase;'
		logo.appendChild(logoText)

		const nav = document.createElement('div')
		nav.style.cssText = 'display: flex; flex-direction: column; align-items: center;  margin: 20px 0 0 0;'
		this.modal.appendChild(nav)
		const navTitle = document.createElement('div')
		navTitle.innerText = 'Menu'
		navTitle.style.cssText = 'font-size: 48px; text-transform: uppercase;'
		nav.appendChild(navTitle)
		const navNewGame = document.createElement('div')
		navNewGame.innerText = 'New game'
		navNewGame.style.cssText = 'cursor: pointer; margin: 26px 0 0 0; padding: 10px 50px; font-size: 28px; text-transform: uppercase; border: 2px solid #000000; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); border-radius: 15px;'
		nav.appendChild(navNewGame)
		const navSaveGame = document.createElement('div')
		navSaveGame.innerText = 'Save game'
		navSaveGame.style.cssText = 'cursor: pointer; margin: 19px 0 0 0; padding: 10px 50px; font-size: 28px; text-transform: uppercase; border: 2px solid #000000; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); border-radius: 15px;'
		nav.appendChild(navSaveGame)
		const navLoadGame = document.createElement('div')
		navLoadGame.innerText = 'Load game'
		navLoadGame.style.cssText = 'cursor: pointer; margin: 19px 0 0 0; padding: 10px 50px; font-size: 28px; text-transform: uppercase; border: 2px solid #000000; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); border-radius: 15px;'
		nav.appendChild(navLoadGame)
		const navSettings = document.createElement('div')
		navSettings.innerText = 'Settings'
		navSettings.style.cssText = 'cursor: pointer; margin: 19px 0 0 0; padding: 10px 50px; font-size: 28px; text-transform: uppercase; border: 2px solid #000000; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); border-radius: 15px;'
		nav.appendChild(navSettings)
		const navRules = document.createElement('div')
		navRules.innerText = 'Rules'
		navRules.style.cssText = 'cursor: pointer; margin: 19px 0 0 0; padding: 10px 50px; font-size: 28px; text-transform: uppercase; border: 2px solid #000000; filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)); border-radius: 15px;'
		nav.appendChild(navRules)
	};
	createSettingsModal() {
		this.modal.innerHTML = '';
	};
	createRulesModal() {
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
};