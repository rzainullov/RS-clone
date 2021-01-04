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
		const isEnglish = JSON.parse(localStorage.getItem('settings')).find(el => el.settingName === "language").settingValue === "English";
		const wordsForSettingsModal = isEnglish ? language.settingsModalEnglish : language.settingsModalRussia

		const settingsObject = JSON.parse(localStorage.getItem('settings'))
		console.log(settingsObject)

		this.modal.innerHTML = '';
		const logo = document.createElement('div')
		logo.style.cssText = 'width: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center;'
		this.modal.appendChild(logo)
		const logoImg = document.createElement('div')
		logoImg.style.cssText = 'width: 103px; height: 106px; background: url("img/logo.png") no-repeat center center/cover;'
		logo.appendChild(logoImg)
		const logoText = document.createElement('div')
		logoText.innerText = wordsForSettingsModal[0]
		logoText.style.cssText = 'font-size: 36px; text-transform: uppercase;'
		logo.appendChild(logoText)

		const nav = document.createElement('div')
		nav.style.cssText = 'display: flex; flex-direction: column; align-items: center;  margin: 20px 0 0 0;'
		this.modal.appendChild(nav)

		const navTitle = document.createElement('div')
		navTitle.innerText = wordsForSettingsModal[1]
		navTitle.style.cssText = 'font-size: 48px; text-transform: uppercase;'
		nav.appendChild(navTitle)

		//** Settings */
		const navPlayers = document.createElement('div')
		let playersCount = settingsObject.find(el => el.settingName === "playersCount").settingValue
		navPlayers.innerText = `${wordsForSettingsModal[2]} ${playersCount}`
		navPlayers.classList.add('modal-settings__item')
		navPlayers.addEventListener('click', () => {
			playersCount = (playersCount % 4) + 1
			navPlayers.innerText = `${wordsForSettingsModal[2]} ${playersCount}`
		})
		nav.appendChild(navPlayers)

		const navLanguage = document.createElement('div')
		let languageType = settingsObject.find(el => el.settingName === "language").settingValue
		navLanguage.innerText = `${wordsForSettingsModal[3]} ${languageType}`
		navLanguage.classList.add('modal-settings__item')
		navLanguage.addEventListener('click', () => {
			if (languageType === "English") {
				languageType = "Русский"
			} else {
				languageType = "English"
			}
			navLanguage.innerText = `${wordsForSettingsModal[3]} ${languageType}`
		})
		nav.appendChild(navLanguage)

		const navSound = document.createElement('div')
		let soundType = settingsObject.find(el => el.settingName === "sound").settingValue
		navSound.innerText = `${wordsForSettingsModal[4]} ${soundType}`
		navSound.classList.add('modal-settings__item')
		navSound.addEventListener('click', () => {
			if (soundType === "on") {
				soundType = "off"
			} else {
				soundType = "on"
			}
			navSound.innerText = `${wordsForSettingsModal[4]} ${soundType}`
		})
		nav.appendChild(navSound)

		const navColor = document.createElement('div')
		let colorType = settingsObject.find(el => el.settingName === "color").settingValue
		navColor.innerText = `${wordsForSettingsModal[5]} ${colorType}`
		navColor.classList.add('modal-settings__item')
		navColor.addEventListener('click', () => {
			if (colorType === "red") {
				colorType = "green"
			} else {
				colorType = "red"
			}
			navColor.innerText = `${wordsForSettingsModal[5]} ${colorType}`
		})
		nav.appendChild(navColor)

		/** Save and back */
		const saveSettings = document.createElement('div')
		saveSettings.innerText = wordsForSettingsModal[6]
		saveSettings.classList.add('modal-settings__btn')
		saveSettings.addEventListener('click', () => {
			settingsObject.find(el => el.settingName === "playersCount").settingValue = playersCount
			settingsObject.find(el => el.settingName === "language").settingValue = languageType
			settingsObject.find(el => el.settingName === "sound").settingValue = soundType
			settingsObject.find(el => el.settingName === "color").settingValue = colorType
			localStorage.setItem('settings', JSON.stringify(settingsObject))
			this.createSettingsModal()
		})
		nav.appendChild(saveSettings)

		const backSettings = document.createElement('div')
		backSettings.innerText = wordsForSettingsModal[7]
		backSettings.classList.add('modal-settings__btn')
		backSettings.addEventListener('click', this.createMainModal)
		nav.appendChild(backSettings)
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