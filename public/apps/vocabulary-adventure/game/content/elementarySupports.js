export const elementaryConceptSupports = {
  observe: {
    visual: "observe",
    title: "Look closely",
    prompt: "A quick look can miss details. Observing means slowing down and noticing what is really there.",
    memoryLine: "Observe = look carefully + notice details."
  },
  sturdy: {
    visual: "strength",
    title: "Which one can take a bump?",
    prompt: "A sturdy thing stays useful when it is pushed, carried, or used again and again.",
    memoryLine: "Sturdy things are strong and hard to damage."
  },
  fragile: {
    visual: "fragile",
    title: "Handle this one gently",
    prompt: "Fragile things can crack, tear, or break if we are rough with them.",
    memoryLine: "Fragile = easy to break or damage."
  },
  protect: {
    visual: "protect",
    title: "Keep it safe",
    prompt: "Protection puts something safer between a danger and the thing we care about.",
    memoryLine: "Protect = help keep safe from harm."
  },
  collect: {
    visual: "collect",
    title: "Bring them together",
    prompt: "When separate things move into one group or place, we collect them.",
    memoryLine: "Collect = gather together."
  },
  scatter: {
    visual: "scatter",
    title: "Spread them apart",
    prompt: "When things move away from one group in many directions, they scatter.",
    memoryLine: "Scatter = spread apart in many directions."
  },
  compare: {
    visual: "compare",
    title: "Same and different",
    prompt: "Comparing means looking at two things closely enough to notice what matches and what does not.",
    memoryLine: "Compare = look for what is the same and what is different."
  },
  predict: {
    visual: "predict",
    title: "What might happen next?",
    prompt: "A prediction uses clues you already have to make a smart guess about what comes next.",
    memoryLine: "Predict = use clues to make a smart guess about what happens next."
  },
  narrow: {
    visual: "narrow",
    title: "Not much room side to side",
    prompt: "A narrow path has only a small amount of width from one side to the other.",
    memoryLine: "Narrow = not very wide."
  },
  distant: {
    visual: "distance",
    title: "Far from here",
    prompt: "Something distant is not close to you. It may look smaller because it is far away.",
    memoryLine: "Distant = far away."
  },
  shelter: {
    visual: "shelter",
    title: "A safer place",
    prompt: "A shelter gives cover from weather or another kind of danger.",
    memoryLine: "Shelter = a place that helps keep you safe."
  },
  patient: {
    visual: "patient",
    title: "Some things need time",
    prompt: "Being patient means waiting calmly while something takes the time it needs.",
    memoryLine: "Patient = able to wait calmly."
  },
  habitat: {
    visual: "habitat",
    title: "A living thing's home",
    prompt: "A habitat gives a plant or animal the food, water, space, and shelter it needs to live.",
    memoryLine: "Habitat = the natural home of a plant or animal."
  },
  adapt: {
    visual: "adapt",
    title: "Change to fit",
    prompt: "To adapt is to change something about what you do so you can handle a new situation.",
    memoryLine: "Adapt = change to fit a new situation."
  }
};

export function getElementaryConceptSupport(wordId) {
  return elementaryConceptSupports[wordId] || null;
}

export const elementaryZones = [
  { id: "orchard-gate", name: "Orchard Gate", note: "Notice what is around you." },
  { id: "butterfly-bend", name: "Butterfly Bend", note: "Look for small details and connections." },
  { id: "stream-crossing", name: "Stream Crossing", note: "Use meaning to choose the safest path." },
  { id: "greenhouse-path", name: "Greenhouse Path", note: "Build words carefully, one part at a time." },
  { id: "reading-grove", name: "Reading Grove", note: "Use words inside a real sentence." },
  { id: "garden-arbor", name: "Garden Arbor", note: "Bring an older word back from memory." }
];

export function getElementaryZone(zoneId) {
  return elementaryZones.find((zone) => zone.id === zoneId) || elementaryZones[0];
}
