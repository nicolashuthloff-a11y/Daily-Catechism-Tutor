// Browser Speech Synthesis Engine for Latin & English Devotional Prayers

class DevotionalAudioService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
    }
  }

  public checkSupported(): boolean {
    return this.isSupported;
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  public isSpeaking(): boolean {
    return this.synth ? this.synth.speaking : false;
  }

  public speakText(
    text: string,
    lang: "la" | "en" | "de" = "en",
    rate: number = 0.9,
    onEnd?: () => void,
    onError?: (err: any) => void
  ): void {
    if (!this.synth) {
      if (onError) onError("Speech synthesis is not supported on this browser.");
      return;
    }

    this.stop(); // cancel previous

    // Clean text of parentheses or meta tags
    const cleanText = text
      .replace(/\(V\.\)|\(R\.\)/g, "")
      .replace(/V\./g, "Versicle:")
      .replace(/R\./g, "Response:")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Pick appropriate voice
    const voices = this.synth.getVoices();
    if (lang === "la") {
      // Look for Italian or Latin voice which sounds very close to Ecclesiastical Latin
      const latinVoice = voices.find(
        (v) => v.lang.startsWith("la") || v.lang.startsWith("it") || v.name.includes("Italian")
      );
      if (latinVoice) {
        utterance.voice = latinVoice;
      } else {
        utterance.lang = "it-IT"; // Fallback to Italian phonetic mapping
      }
    } else if (lang === "de") {
      const germanVoice = voices.find(
        (v) => v.lang.startsWith("de") || v.lang.includes("de-DE") || v.name.includes("German") || v.name.includes("Deutsch")
      );
      if (germanVoice) {
        utterance.voice = germanVoice;
      }
      utterance.lang = "de-DE";
    } else {
      const englishVoice = voices.find(
        (v) => (v.lang.startsWith("en-GB") || v.lang.startsWith("en-US")) && !v.name.includes("Whisper")
      );
      if (englishVoice) {
        utterance.voice = englishVoice;
      }
      utterance.lang = "en-US";
    }

    utterance.rate = rate; // calm, reverent pace
    utterance.pitch = 1.0;

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      if (onError) onError(e);
    };

    this.synth.speak(utterance);
  }
}

export const devotionalAudio = new DevotionalAudioService();
