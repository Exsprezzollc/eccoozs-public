export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;
}

export function speakWord(word, slow = false) {
  if (!canSpeak()) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.rate = slow ? 0.62 : 0.84;
  utterance.pitch = 1;
  utterance.lang = "en-US";
  window.speechSynthesis.speak(utterance);
  return true;
}

export function speakSequence(words, slow = false) {
  if (!canSpeak()) return false;
  const queue = (words || []).map((word) => String(word || "").trim()).filter(Boolean);
  if (!queue.length) return false;
  window.speechSynthesis.cancel();
  for (const word of queue) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.rate = slow ? 0.58 : 0.8;
    utterance.pitch = 1;
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  }
  return true;
}
