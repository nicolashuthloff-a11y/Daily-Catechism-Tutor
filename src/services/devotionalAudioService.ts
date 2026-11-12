// Browser Speech Synthesis Engine for Latin, English & German Devotional Prayers

export interface AudioPlaybackState {
  isSpeaking: boolean;
  isPaused: boolean;
  title: string;
  lang: "la" | "en" | "de";
  rate: number;
}

type AudioListener = (state: AudioPlaybackState) => void;

class DevotionalAudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSupported: boolean = false;
  private listeners: Set<AudioListener> = new Set();

  private state: AudioPlaybackState = {
    isSpeaking: false,
    isPaused: false,
    title: "",
    lang: "en",
    rate: 0.9,
  };

  private currentText: string = "";
  private onEndCallback?: () => void;
  private onErrorCallback?: (err: any) => void;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
    }
  }

  public checkSupported(): boolean {
    return this.isSupported;
  }

  public subscribe(listener: AudioListener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const copy = { ...this.state };
    this.listeners.forEach((fn) => {
      try {
        fn(copy);
      } catch (e) {
        console.error("Audio state listener error", e);
      }
    });
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
    this.state = {
      ...this.state,
      isSpeaking: false,
      isPaused: false,
      title: "",
    };
    this.notify();
  }

  public pause(): void {
    if (this.synth && this.state.isSpeaking && !this.state.isPaused) {
      this.synth.pause();
      this.state = { ...this.state, isPaused: true };
      this.notify();
    }
  }

  public resume(): void {
    if (this.synth && this.state.isSpeaking && this.state.isPaused) {
      this.synth.resume();
      this.state = { ...this.state, isPaused: false };
      this.notify();
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  public getState(): AudioPlaybackState {
    return { ...this.state };
  }

  public setRate(rate: number): void {
    this.state = { ...this.state, rate };
    this.notify();
    // If currently speaking, restart from current text with new rate
    if (this.state.isSpeaking && this.currentText) {
      this.speakText(
        this.currentText,
        this.state.lang,
        rate,
        this.onEndCallback,
        this.onErrorCallback,
        this.state.title
      );
    }
  }

  public speakText(
    text: string,
    lang: "la" | "en" | "de" = "en",
    rate: number = 0.9,
    onEnd?: () => void,
    onError?: (err: any) => void,
    title?: string
  ): void {
    if (!this.synth) {
      if (onError) onError("Speech synthesis is not supported on this browser.");
      return;
    }

    this.stop(); // cancel previous

    this.currentText = text;
    this.onEndCallback = onEnd;
    this.onErrorCallback = onError;

    // Clean text of parentheses, HTML, or versicle rubrics
    const cleanText = text
      .replace(/\(V\.\)|\(R\.\)/g, "")
      .replace(/V\./g, "Versicle:")
      .replace(/R\./g, "Response:")
      .replace(/<[^>]*>?/gm, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Pick appropriate voice
    const voices = this.synth.getVoices();
    if (lang === "la") {
      // Look for Italian or Latin voice which sounds closest to Ecclesiastical Latin
      const latinVoice = voices.find(
        (v) => v.lang.startsWith("la") || v.lang.startsWith("it") || v.name.includes("Italian")
      );
      if (latinVoice) {
        utterance.voice = latinVoice;
      } else {
        utterance.lang = "it-IT";
      }
    } else if (lang === "de") {
      const germanVoice = voices.find(
        (v) =>
          v.lang.startsWith("de") ||
          v.lang.includes("de-DE") ||
          v.name.includes("German") ||
          v.name.includes("Deutsch")
      );
      if (germanVoice) {
        utterance.voice = germanVoice;
      }
      utterance.lang = "de-DE";
    } else {
      const englishVoice = voices.find(
        (v) =>
          (v.lang.startsWith("en-GB") || v.lang.startsWith("en-US")) &&
          !v.name.includes("Whisper")
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.lang = "en-US";
    }

    const effectiveRate = rate || this.state.rate || 0.9;
    utterance.rate = effectiveRate;
    utterance.pitch = 1.0;

    this.state = {
      isSpeaking: true,
      isPaused: false,
      title: title || (lang === "la" ? "Latin Prayer Recitation" : "Devotional Audio"),
      lang,
      rate: effectiveRate,
    };
    this.notify();

    utterance.onend = () => {
      this.state = {
        ...this.state,
        isSpeaking: false,
        isPaused: false,
        title: "",
      };
      this.notify();
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.state = {
        ...this.state,
        isSpeaking: false,
        isPaused: false,
        title: "",
      };
      this.notify();
      if (onError) onError(e);
    };

    this.synth.speak(utterance);
  }
}

export const devotionalAudio = new DevotionalAudioService();
