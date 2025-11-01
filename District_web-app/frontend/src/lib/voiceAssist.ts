export function speak(text: string, lang: string = 'hi-IN') {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported in this browser');
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function getLangCode(lang: string): string {
  const langMap: Record<string, string> = {
    hi: 'hi-IN',
    en: 'en-IN',
    aw: 'hi-IN', // Awadhi uses Hindi synthesis
    bh: 'hi-IN', // Bhojpuri uses Hindi synthesis
  };
  return langMap[lang] || 'hi-IN';
}
