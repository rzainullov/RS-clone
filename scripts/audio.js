/* eslint-disable linebreak-style */
export class Audio {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
    this.notes = [
      { noteName: "A0", noteFrequency: "27,5" },
      { noteName: "A1", noteFrequency: "55" },
      { noteName: "A2", noteFrequency: "110" },
      { noteName: "A3", noteFrequency: "220" },
      { noteName: "A4", noteFrequency: "440" },
      { noteName: "A5", noteFrequency: "880" },
      { noteName: "A6", noteFrequency: "1760" },
      { noteName: "A7", noteFrequency: "3520" }
    ];
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

  playNote(note) {
    const frequency = this.notes.find(el => el.noteName === note).noteFrequency;
    this.createOscillator();
    this.createGain();

    this.oscillator.frequency.value = frequency;
    this.now = this.context.currentTime;
    this.gain.gain.setValueAtTime(1, this.now);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.now + 1);
    this.oscillator.start(this.now);
    this.oscillator.stop(this.now + 1);
  }
}
