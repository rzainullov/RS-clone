export class Settings {
	constructor() {
		this.initialSettings = [
			{ settingName: "playersCount", settingValue: "4" },
			{ settingName: "playersNames", settingValue: ["Player1", "Player2", "Player3", "Player4"] },
			{ settingName: "language", settingValue: "English" },
			{ settingName: "sound", settingValue: "on" },
			{ settingName: "color", settingValue: "red" },
			{ settingName: "currentPlayer", settingValue:"Player1" },
			{ settingName: "currentCombination", settingValue: null },
			{ settingName: "currentRound", settingValue: "1" }
		]
	}
	initSettings() {
		if (localStorage.getItem('settings') === null) {
			localStorage.setItem("settings", JSON.stringify(this.initialSettings))
		}
	}
}