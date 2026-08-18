import { getElementaryConceptSupport } from "../content/elementarySupports.js";

function normalized(value) {
  return String(value || "").trim().toLowerCase();
}

export function getElementaryTeachingResponse(entry, challenge, response = "") {
  if (!entry || entry.stage !== "Elementary") return null;
  const support = getElementaryConceptSupport(entry.id);
  const answer = normalized(response);
  const synonymSet = new Set((entry.synonyms || []).map(normalized));
  const antonymSet = new Set((entry.antonyms || []).map(normalized));

  if (challenge?.kind === "build") {
    return {
      id: "build-by-parts",
      title: "Build it in little pieces",
      message: `The letters belong to ${entry.syllables.length === 1 ? "one word part" : `${entry.syllables.length} word parts`}: ${entry.syllables.join(" · ")}.`,
      strategy: "Say each part slowly, then rebuild the whole word from left to right."
    };
  }

  if (challenge?.kind === "synonym" && antonymSet.has(answer)) {
    return {
      id: "same-not-opposite",
      title: "Same family, not opposite",
      message: `${response} points away from the meaning of ${entry.word}. A Connect question asks for a word that means almost the same thing.`,
      strategy: `Think: “Could I swap the two words and keep almost the same meaning?”`
    };
  }

  if (challenge?.kind === "antonym" && synonymSet.has(answer)) {
    return {
      id: "opposite-not-same",
      title: "Opposite, not same family",
      message: `${response} is close to the meaning of ${entry.word}. A Contrast question asks for a word that points the other way.`,
      strategy: `Think: “What would the opposite picture look like?”`
    };
  }

  if (challenge?.kind === "use") {
    return {
      id: "picture-the-sentence",
      title: "Picture what the sentence is doing",
      message: support?.memoryLine || `${entry.word} means ${entry.simpleDefinition || entry.definition}.`,
      strategy: `Read the sentence like a tiny scene. Ask whether the action or description really matches ${entry.word}.`
    };
  }

  if (["know", "synonym", "antonym"].includes(challenge?.kind)) {
    return {
      id: "meaning-anchor",
      title: support?.title || "Hold onto the meaning",
      message: support?.memoryLine || `${entry.word} means ${entry.simpleDefinition || entry.definition}.`,
      strategy: support?.prompt || "Say the meaning in your own words before you choose again."
    };
  }

  return {
    id: "try-another-way",
    title: "Try it another way",
    message: `${entry.word} means ${entry.simpleDefinition || entry.definition}.`,
    strategy: "Use the meaning first. The answer comes after the idea is clear."
  };
}
