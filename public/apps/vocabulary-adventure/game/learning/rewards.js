const kindFactor = {
  discover: 0,
  hear: 0,
  build: 1.2,
  know: 1,
  use: 1.35,
  synonym: 1.05,
  antonym: 1.05,
  distinguish: 1.15
};

export function calculateReward(entry, kind, correct, hintLevel = 0, repeatCount = 0) {
  if (!correct || kind === "hear" || kind === "discover") return 0;
  const hintFactor = hintLevel >= 2 ? 0.45 : hintLevel === 1 ? 0.75 : 1;
  const repeatFactor = repeatCount >= 2 ? 0.25 : repeatCount === 1 ? 0.65 : 1;
  return Math.max(1, Math.round(entry.baseReward * (kindFactor[kind] || 1) * hintFactor * repeatFactor));
}

export function applyCreditTransaction(profile, transactionId, amount) {
  const transactions = profile.creditTransactions || {};
  if (transactions[transactionId]) return profile;
  return {
    ...profile,
    credits: profile.credits + amount,
    creditTransactions: { ...transactions, [transactionId]: amount }
  };
}
