# Reading Detective — Phoneme / Phonics Audio Asset Manifest (v1.4.4)

**Status: 0 of 30 approved recordings exist. 30 assets are PENDING.** No recordings were generated or fabricated.

This checklist is generated from `src/content/audio/phonicsManifest.ts` (the single source of truth) by `scripts/generate-phonics-manifest-doc.cjs`. Until an asset is recorded, the app never presents browser text-to-speech as the authoritative pronunciation: it voices a clearly labelled approximation and shows "Approximate sound — final recording coming soon."

## How to add a recording

1. Record to the spec below and export as mono MP3 (44.1 kHz, about 128 kbps, peak-normalized to about -3 dBFS, no more than 150 ms of leading or trailing silence).
2. Save it at `public/assets/audio/phonics/<filename>`.
3. In `phonicsManifest.ts`, change that asset's `status` from `"pending"` to `"recorded"`.
4. Run `npm run qa:production`. No lesson logic changes are required.

## General recording notes

- Use one consistent adult voice, recorded in a quiet room with a close microphone.
- Continuant sounds (/m/, /s/, /f/, /l/, /n/, /r/, /sh/) are held about one second with no added vowel.
- Stop sounds (/p/, /t/, /d/, /g/, /k/) are clipped; say /p/, never "puh."
- Short vowels use the short-vowel sound (/a/ as in map, /e/ as in red, /i/ as in bin, /o/ as in fog, /u/ as in sun).
- Decoding sequences: each sound with a brief pause (about half a second), then the blended word at a natural, unhurried pace.
- Have each file reviewed by a reading specialist before switching it to `recorded`.

## Asset checklist

| Done | Asset ID | Kind | Sound / word | Filename | Curriculum use | Recording note |
|---|---|---|---|---|---|---|
| ☐ | `phoneme.a` | phoneme | /a/ | `phoneme-a.mp3` | TEACH.CODE.CVC (young-investigator, together); TEACH.CODE.CVC (young-investigator, supported) | Short-vowel sound as in 'map', held briefly; not the letter name. |
| ☐ | `phoneme.d` | phoneme | /d/ | `phoneme-d.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Clipped stop sound with no added vowel (say /d/, not 'duh'). |
| ☐ | `phoneme.e` | phoneme | /e/ | `phoneme-e.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Short-vowel sound as in 'red', held briefly; not the letter name. |
| ☐ | `phoneme.f` | phoneme | /f/ | `phoneme-f.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Continuant sound held about one second with no added vowel (say /f/, not 'fuh'). |
| ☐ | `phoneme.g` | phoneme | /g/ | `phoneme-g.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Clipped stop sound with no added vowel (say /g/, not 'guh'). |
| ☐ | `phoneme.i` | phoneme | /i/ | `phoneme-i.mp3` | TEACH.PHON.SEGMENT (young-investigator, supported); TEACH.PHON.SEGMENT (investigator, supported); TEACH.PHON.SEGMENT (lead-investigator, supported) | Short-vowel sound as in 'bin', held briefly; not the letter name. |
| ☐ | `phoneme.k` | phoneme | /k/ | `phoneme-k.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Clipped stop sound with no added vowel (say /k/, not 'kuh'). |
| ☐ | `phoneme.l` | phoneme | /l/ | `phoneme-l.mp3` | TEACH.PHON.SEGMENT (young-investigator, supported); TEACH.PHON.SEGMENT (investigator, supported); TEACH.PHON.SEGMENT (lead-investigator, supported) | Continuant sound held about one second with no added vowel (say /l/, not 'luh'). |
| ☐ | `phoneme.m` | phoneme | /m/ | `phoneme-m.mp3` | TEACH.PHON.BEGINNING (young-investigator, together); TEACH.PHON.BEGINNING (investigator, together); TEACH.PHON.BEGINNING (lead-investigator, together); TEACH.CODE.LETTER_SOUND (young-investigator, together) (+3 more) | Continuant sound held about one second with no added vowel (say /m/, not 'muh'). |
| ☐ | `phoneme.n` | phoneme | /n/ | `phoneme-n.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Continuant sound held about one second with no added vowel (say /n/, not 'nuh'). |
| ☐ | `phoneme.o` | phoneme | /o/ | `phoneme-o.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Short-vowel sound as in 'fog', held briefly; not the letter name. |
| ☐ | `phoneme.p` | phoneme | /p/ | `phoneme-p.mp3` | TEACH.PHON.SEGMENT (young-investigator, supported); TEACH.PHON.SEGMENT (investigator, supported); TEACH.PHON.SEGMENT (lead-investigator, supported) | Clipped stop sound with no added vowel (say /p/, not 'puh'). |
| ☐ | `phoneme.r` | phoneme | /r/ | `phoneme-r.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Continuant sound held about one second with no added vowel (say /r/, not 'ruh'). |
| ☐ | `phoneme.s` | phoneme | /s/ | `phoneme-s.mp3` | TEACH.PHON.BEGINNING (young-investigator, together); TEACH.PHON.BEGINNING (investigator, together); TEACH.PHON.BEGINNING (lead-investigator, together); TEACH.CODE.LETTER_SOUND (young-investigator, together) (+3 more) | Continuant sound held about one second with no added vowel (say /s/, not 'suh'). |
| ☐ | `phoneme.t` | phoneme | /t/ | `phoneme-t.mp3` | TEACH.PHON.BEGINNING (young-investigator, together); TEACH.PHON.BEGINNING (investigator, together); TEACH.PHON.BEGINNING (lead-investigator, together); TEACH.CODE.LETTER_SOUND (young-investigator, together) (+4 more) | Clipped stop sound with no added vowel (say /t/, not 'tuh'). |
| ☐ | `phoneme.u` | phoneme | /u/ | `phoneme-u.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Short-vowel sound as in 'sun', held briefly; not the letter name. |
| ☐ | `phoneme.sh` | blend | /sh/ | `phoneme-sh.mp3` | phonemic-awareness, decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Continuant sound held about one second with no added vowel (say /sh/, not 'shuh'). |
| ☐ | `sequence.map` | decoding-sequence | /m/ ... /a/ ... /p/ -> map | `sequence-map.mp3` | TEACH.PHON.BLEND (young-investigator, together); TEACH.PHON.BLEND (young-investigator, model); TEACH.PHON.BLEND (investigator, together); TEACH.PHON.BLEND (investigator, model) (+2 more) | Sound each phoneme, then blend into the whole word 'map'. |
| ☐ | `sequence.red` | decoding-sequence | /r/ ... /e/ ... /d/ -> red | `sequence-red.mp3` | TEACH.PHON.BLEND (young-investigator, together); TEACH.PHON.BLEND (young-investigator, transfer); TEACH.PHON.BLEND (investigator, together); TEACH.PHON.BLEND (investigator, transfer) (+2 more) | Sound each phoneme, then blend into 'red'. |
| ☐ | `sequence.sun` | decoding-sequence | /s/ ... /u/ ... /n/ -> sun | `sequence-sun.mp3` | TEACH.PHON.BLEND (young-investigator, together); TEACH.PHON.BLEND (investigator, together); TEACH.PHON.BLEND (lead-investigator, together) | Sound each phoneme, then blend into 'sun'. |
| ☐ | `sequence.fog` | decoding-sequence | /f/ ... /o/ ... /g/ -> fog | `sequence-fog.mp3` | TEACH.PHON.BLEND (young-investigator, independent); TEACH.PHON.BLEND (investigator, independent); TEACH.PHON.BLEND (lead-investigator, independent) | Sound each phoneme, then blend into 'fog'. |
| ☐ | `sequence.lid` | decoding-sequence | /l/ ... /i/ ... /d/ -> lid | `sequence-lid.mp3` | TEACH.PHON.BLEND (young-investigator, supported); TEACH.PHON.BLEND (investigator, supported); TEACH.PHON.BLEND (lead-investigator, supported) | Sound each phoneme, then blend into 'lid'. |
| ☐ | `sequence.bin` | decoding-sequence | b ... i ... n -> bin | `sequence-bin.mp3` | decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Sound each phoneme, then blend into 'bin'. |
| ☐ | `word.map` | decodable-word | map | `word-map.mp3` | TEACH.PHON.BEGINNING (young-investigator, together); TEACH.PHON.BEGINNING (investigator, together); TEACH.PHON.BEGINNING (lead-investigator, together); TEACH.PHON.SEGMENT (young-investigator, model) (+6 more) | Say the whole word once at a natural, unhurried pace. |
| ☐ | `word.sun` | decodable-word | sun | `word-sun.mp3` | TEACH.PHON.BEGINNING (young-investigator, together); TEACH.PHON.BEGINNING (young-investigator, supported); TEACH.PHON.BEGINNING (investigator, supported); TEACH.PHON.BEGINNING (lead-investigator, supported) (+7 more) | Say the whole word once at a natural, unhurried pace. |
| ☐ | `word.red` | decodable-word | red | `word-red.mp3` | TEACH.PHON.BLEND (young-investigator, together); TEACH.PHON.BLEND (investigator, together); TEACH.PHON.BLEND (lead-investigator, together) | Say the whole word once at a natural, unhurried pace. |
| ☐ | `word.sat` | decodable-word | sat | `word-sat.mp3` | TEACH.CODE.CVC (young-investigator, together) | Say the whole word once at a natural, unhurried pace. |
| ☐ | `word.bin` | decodable-word | bin | `word-bin.mp3` | decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Say the whole word once at a natural, unhurried pace. |
| ☐ | `word.cat` | decodable-word | cat | `word-cat.mp3` | decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Say the whole word once at a natural, unhurried pace. |
| ☐ | `word.pin` | decodable-word | pin | `word-pin.mp3` | decoding: appears in on-screen phoneme labels and decoding sequences; standalone audio reserved for expansion | Say the whole word once at a natural, unhurried pace. |

**Totals:** 30 assets (16 phonemes, 1 digraph, 6 decoding sequences, 7 decodable words). 16 are referenced by current teaching content; the rest appear in on-screen phoneme labels, decoding sequences, or encoding/connected-text words and are ready for standalone audio as content expands.
