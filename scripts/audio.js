/* eslint-disable linebreak-style */
export class Audio {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  createOscillator() {
    this.oscillator = this.context.createOscillator();
    this.oscillator.type = "sine";
  }

  createGain() {
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
    this.oscillator.connect(this.gain);
  }

  playNote(frequency) {
    this.createOscillator();
    this.createGain();

    this.oscillator.frequency.value = frequency;
    this.now = this.context.currentTime;
    this.gain.gain.setValueAtTime(1, this.now);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.now + 1);
    this.oscillator.start(this.now);
    this.oscillator.stop(this.now + 1);
  }

  chooseNote(note) {
    if (note === "A0") {
      this.playNote(27.50);
    } else if (note === "A1") {
      this.playNote(55);
    } else if (note === "A2") {
      this.playNote(110);
    } else if (note === "A3") {
      this.playNote(220);
    } else if (note === "A4") {
      this.playNote(440);
    } else if (note === "A5") {
      this.playNote(880);
    } else if (note === "A6") {
      this.playNote(1760);
    } else if (note === "A7") {
      this.playNote(3520);
    }
  }
}
