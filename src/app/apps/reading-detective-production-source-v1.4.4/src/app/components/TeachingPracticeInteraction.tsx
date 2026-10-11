import { useEffect, useMemo, useState } from "react";
import type { TeachingPracticeItem } from "../../domain";

type Props = {
  item: TeachingPracticeItem;
  onChoice: (answerId: string) => void;
  onStructuredAnswer: (correct: boolean) => void;
  onSpeak?: (text: string) => void;
  simpleMode?: boolean;
  allowChoiceAudio?: boolean;
};

function SpeakerButton({ text, onSpeak, label }: { text?: string; onSpeak?: (text: string) => void; label: string }) {
  if (!text || !onSpeak) return null;
  return (
    <button
      type="button"
      className="inline-audio"
      aria-label={label}
      title={label}
      onClick={() => onSpeak(text)}
    >
      🔊
    </button>
  );
}

export function TeachingPracticeInteraction({ item, onChoice, onStructuredAnswer, onSpeak, simpleMode = false, allowChoiceAudio = false }: Props) {
  const interaction = item.interaction ?? "choice";

  if (interaction === "choice") {
    return (
      <div className={`choice-list teaching-choice-list ${simpleMode ? "pre-reader-choice-list" : ""}`} data-interaction="choice">
        {item.choices.map((choice) => (
          <div className="choice-audio-row" key={choice.id}>
            <button className="choice-answer" onClick={() => onChoice(choice.id)}>{choice.label}</button>
            {allowChoiceAudio && (
              <SpeakerButton text={choice.label} onSpeak={onSpeak} label={`Hear choice ${choice.label}`} />
            )}
          </div>
        ))}
      </div>
    );
  }

  if (interaction === "match") {
    return <MatchingInteraction item={item} onSubmit={onStructuredAnswer} onSpeak={onSpeak} simpleMode={simpleMode} />;
  }

  if (interaction === "build") {
    return <BuildInteraction item={item} onSubmit={onStructuredAnswer} onSpeak={onSpeak} simpleMode={simpleMode} />;
  }

  if (interaction === "spell") {
    return <SpellInteraction item={item} onSubmit={onStructuredAnswer} onSpeak={onSpeak} simpleMode={simpleMode} />;
  }

  return <SequenceInteraction item={item} onSubmit={onStructuredAnswer} onSpeak={onSpeak} simpleMode={simpleMode} />;
}

function shuffleDeterministic<T>(items: T[], seed: string): T[] {
  // Deterministic order so QA and learners get a stable pool without true RNG.
  const scored = items.map((value, index) => ({
    value,
    key: [...`${seed}:${index}`].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7),
  }));
  scored.sort((a, b) => a.key - b.key);
  return scored.map((entry) => entry.value);
}

function BuildInteraction({
  item,
  onSubmit,
  onSpeak,
  simpleMode = false,
}: {
  item: TeachingPracticeItem;
  onSubmit: (correct: boolean) => void;
  onSpeak?: (text: string) => void;
  simpleMode?: boolean;
}) {
  const target = item.buildTarget;
  const [built, setBuilt] = useState<number[]>([]);
  const pool = useMemo(() => {
    const graphemes = target?.graphemes ?? [];
    const distractors = target?.distractors ?? [];
    const tiles = [
      ...graphemes.map((label, index) => ({ label, tileId: `g${index}`, correctIndex: index })),
      ...distractors.map((label, index) => ({ label, tileId: `d${index}`, correctIndex: -1 })),
    ];
    return shuffleDeterministic(tiles, item.id);
  }, [item.id, target]);

  useEffect(() => {
    setBuilt([]);
  }, [item.id]);

  if (!target) return null;

  const add = (poolIndex: number) => {
    if (built.includes(poolIndex)) return;
    setBuilt((current) => [...current, poolIndex]);
  };
  const removeLast = () => setBuilt((current) => current.slice(0, -1));

  const builtWord = built.map((index) => pool[index].label).join("");
  const complete = built.length >= (target.graphemes.length ?? 0) && built.length > 0;
  const correct = builtWord.toLowerCase() === target.word.toLowerCase();

  return (
    <div className="build-interaction" data-interaction="build">
      <p className={`interaction-help ${simpleMode ? "pre-reader-action-cue" : ""}`}>
        <span aria-hidden="true">🧱</span> {simpleMode ? "Tap the letters to build the word." : "Build the word by choosing each letter sound in order."}
        <SpeakerButton text={target.audioText ?? item.audioText ?? target.word} onSpeak={onSpeak} label={`Hear the word ${target.word}`} />
      </p>
      <div className="build-answer" aria-live="polite" aria-label="Word you are building">
        {built.length === 0 ? <span className="build-placeholder">Your word appears here.</span> : (
          <strong className="build-word">{builtWord}</strong>
        )}
      </div>
      <div className="build-pool" aria-label="Letter tiles">
        {pool.map((tile, index) => (
          <div className="build-tile-wrap" key={tile.tileId}>
            <button
              type="button"
              className="build-tile"
              disabled={built.includes(index)}
              onClick={() => add(index)}
            >
              {tile.label}
            </button>
            <SpeakerButton text={`/${tile.label}/`} onSpeak={onSpeak} label={`Hear the sound ${tile.label}`} />
          </div>
        ))}
      </div>
      <div className="interaction-actions">
        <button type="button" className="secondary" onClick={removeLast} disabled={built.length === 0}>Undo letter</button>
        <button type="button" className="secondary" onClick={() => setBuilt([])} disabled={built.length === 0}>Clear</button>
        <button type="button" className="primary" disabled={!complete} onClick={() => onSubmit(correct)}>Check my word</button>
      </div>
    </div>
  );
}

function SpellInteraction({
  item,
  onSubmit,
  onSpeak,
  simpleMode = false,
}: {
  item: TeachingPracticeItem;
  onSubmit: (correct: boolean) => void;
  onSpeak?: (text: string) => void;
  simpleMode?: boolean;
}) {
  const target = item.spellTarget;
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [item.id]);

  if (!target) return null;

  const accepted = (target.accept ?? [target.word]).map((word) => word.trim().toLowerCase());
  const correct = accepted.includes(value.trim().toLowerCase());

  return (
    <div className="spell-interaction" data-interaction="spell">
      <p className={`interaction-help ${simpleMode ? "pre-reader-action-cue" : ""}`}>
        <span aria-hidden="true">⌨️</span> {simpleMode ? "Type the word you hear." : "Type the word."}
        <SpeakerButton text={target.audioText ?? item.audioText ?? target.word} onSpeak={onSpeak} label={`Hear the word to spell`} />
      </p>
      {target.hint && <p className="spell-hint">{target.hint}</p>}
      <label className="spell-field">
        <span className="visually-hidden">Type the word</span>
        <input
          type="text"
          className="spell-input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </label>
      <div className="interaction-actions">
        <button type="button" className="secondary" onClick={() => setValue("")} disabled={value.length === 0}>Clear</button>
        <button type="button" className="primary" disabled={value.trim().length === 0} onClick={() => onSubmit(correct)}>Check my spelling</button>
      </div>
    </div>
  );
}

function MatchingInteraction({
  item,
  onSubmit,
  onSpeak,
  simpleMode = false,
}: {
  item: TeachingPracticeItem;
  onSubmit: (correct: boolean) => void;
  onSpeak?: (text: string) => void;
  simpleMode?: boolean;
}) {
  const pairs = item.matchPairs ?? [];
  const [activeLeft, setActiveLeft] = useState<string>();
  const [matches, setMatches] = useState<Record<string, string>>({});
  const rightOptions = useMemo(() => [...pairs].reverse(), [pairs]);

  useEffect(() => {
    setActiveLeft(undefined);
    setMatches({});
  }, [item.id]);

  const assignRight = (rightId: string) => {
    if (!activeLeft) return;
    setMatches((current) => ({ ...current, [activeLeft]: rightId }));
    setActiveLeft(undefined);
  };

  const complete = pairs.length > 0 && pairs.every((pair) => Boolean(matches[pair.id]));
  const correct = complete && pairs.every((pair) => matches[pair.id] === pair.id);

  return (
    <div className="matching-interaction" data-interaction="match">
      <p className={`interaction-help ${simpleMode ? "pre-reader-action-cue" : ""}`}><span aria-hidden="true">👆</span> {simpleMode ? "Pick one. Find its match." : "Choose a clue on the left, then choose its match on the right."}</p>
      <div className="matching-columns">
        <div className="match-column" aria-label="Clues to match">
          <strong>Clues</strong>
          {pairs.map((pair) => (
            <div className={`match-row ${activeLeft === pair.id ? "active" : ""}`} key={pair.id}>
              <button
                type="button"
                className="match-card"
                aria-pressed={activeLeft === pair.id}
                onClick={() => setActiveLeft(pair.id)}
              >
                {pair.left}
                {matches[pair.id] && <span className="match-status">Matched ✓</span>}
              </button>
              <SpeakerButton text={pair.leftAudioText} onSpeak={onSpeak} label={`Hear ${pair.left}`} />
            </div>
          ))}
        </div>
        <div className="match-column" aria-label="Possible matches">
          <strong>Matches</strong>
          {rightOptions.map((pair) => {
            const usedBy = Object.entries(matches).find(([, value]) => value === pair.id)?.[0];
            return (
              <div className={`match-row ${usedBy ? "used" : ""}`} key={pair.id}>
                <button
                  type="button"
                  className="match-card"
                  disabled={!activeLeft}
                  onClick={() => assignRight(pair.id)}
                >
                  {pair.right}
                </button>
                <SpeakerButton text={pair.rightAudioText} onSpeak={onSpeak} label={`Hear ${pair.right}`} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="interaction-actions">
        <button type="button" className="secondary" onClick={() => { setMatches({}); setActiveLeft(undefined); }}>Reset matches</button>
        <button type="button" className="primary" disabled={!complete} onClick={() => onSubmit(correct)}>Check my matches</button>
      </div>
    </div>
  );
}

function SequenceInteraction({
  item,
  onSubmit,
  onSpeak,
  simpleMode = false,
}: {
  item: TeachingPracticeItem;
  onSubmit: (correct: boolean) => void;
  onSpeak?: (text: string) => void;
  simpleMode?: boolean;
}) {
  const tokens = item.sequenceTokens ?? [];
  const [sequence, setSequence] = useState<string[]>([]);
  const pool = useMemo(() => [...tokens].reverse(), [tokens]);
  const expected = tokens.map((token) => token.id);

  useEffect(() => {
    setSequence([]);
  }, [item.id]);

  const complete = sequence.length === tokens.length && tokens.length > 0;
  const correct = complete && expected.every((id, index) => sequence[index] === id);

  const add = (id: string) => {
    if (sequence.includes(id)) return;
    setSequence((current) => [...current, id]);
  };

  return (
    <div className="sequence-interaction" data-interaction="sequence">
      <p className={`interaction-help ${simpleMode ? "pre-reader-action-cue" : ""}`}><span aria-hidden="true">👉</span> {simpleMode ? "Tap them in order." : "Choose each clue in the order it belongs."}</p>
      <div className="sequence-answer" aria-label="Your sequence">
        {sequence.length === 0 && <span className="sequence-placeholder">Your ordered clues will appear here.</span>}
        {sequence.map((id, index) => {
          const token = tokens.find((candidate) => candidate.id === id)!;
          return (
            <span className="sequence-slot" key={id}>
              <small>{index + 1}</small>{token.label}
            </span>
          );
        })}
      </div>
      <div className="sequence-pool" aria-label="Available clues">
        {pool.map((token) => (
          <div className="sequence-token-wrap" key={token.id}>
            <button type="button" className="sequence-token" disabled={sequence.includes(token.id)} onClick={() => add(token.id)}>
              {token.label}
            </button>
            <SpeakerButton text={token.audioText} onSpeak={onSpeak} label={`Hear ${token.label}`} />
          </div>
        ))}
      </div>
      <div className="interaction-actions">
        <button type="button" className="secondary" onClick={() => setSequence([])}>Reset order</button>
        <button type="button" className="primary" disabled={!complete} onClick={() => onSubmit(correct)}>Check the order</button>
      </div>
    </div>
  );
}
