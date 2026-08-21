import { NextResponse } from "next/server";

import {
  ECCOOZS_VOICE_ALIASES,
  type EccoozsLearningVoiceRequest,
  type EccoozsVoiceAlias,
} from "@/lib/eccoozs-voice/voice-config";
import { ECCOOZS_PROVIDER_VOICE_IDS } from "@/lib/eccoozs-voice/voice-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_TEXT_LENGTH = 700;
const ALLOWED_PURPOSES = new Set([
  "teach",
  "model",
  "guided-practice",
  "assessment",
  "feedback",
  "ui",
]);
const ALLOWED_MODES = new Set([
  "teaching",
  "guided-practice",
  "narration",
  "investigation",
  "professional",
  "encouragement",
]);

function jsonError(status: number, error: string) {
  return NextResponse.json({ ok: false, error }, { status });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.host === requestUrl.host;
  } catch {
    return false;
  }
}

function leaksProtectedAnswer(text: string, answers?: string[]) {
  if (!answers?.length) return false;
  const haystack = text.toLocaleLowerCase();

  return answers.some((answer) => {
    const candidate = String(answer ?? "").trim().toLocaleLowerCase();
    return candidate.length > 0 && haystack.includes(candidate);
  });
}

function isVoiceAlias(value: unknown): value is EccoozsVoiceAlias {
  return (
    typeof value === "string" &&
    (ECCOOZS_VOICE_ALIASES as readonly string[]).includes(value)
  );
}

export async function GET() {
  return jsonError(405, "Method not allowed.");
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return jsonError(403, "Cross-origin voice requests are not allowed.");
  }

  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  if (!apiKey) {
    console.error("ECCOOZS_VOICE_ENV_MISSING");
    return jsonError(503, "Voice service is not configured.");
  }

  let body: EccoozsLearningVoiceRequest;
  try {
    body = (await request.json()) as EccoozsLearningVoiceRequest;
  } catch {
    return jsonError(400, "Invalid JSON.");
  }

  if (!isVoiceAlias(body.voice)) {
    return jsonError(400, "Invalid voice.");
  }

  const text = String(body.text ?? "").trim();
  if (!text || text.length > MAX_TEXT_LENGTH) {
    return jsonError(400, "Invalid text length.");
  }

  if (!ALLOWED_MODES.has(body.mode)) {
    return jsonError(400, "Invalid narration mode.");
  }

  if (!ALLOWED_PURPOSES.has(body.purpose)) {
    return jsonError(400, "Invalid narration purpose.");
  }

  if (
    body.purpose === "assessment" &&
    leaksProtectedAnswer(text, body.answerProtectedText)
  ) {
    return jsonError(
      422,
      "Assessment narration would reveal a protected answer."
    );
  }

  const voiceId = ECCOOZS_PROVIDER_VOICE_IDS[body.voice];

  try {
    const upstream = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(
        voiceId
      )}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
        }),
        cache: "no-store",
      }
    );

    if (!upstream.ok) {
      const detail = await upstream.text();
      console.error("ECCOOZS_VOICE_UPSTREAM_ERROR", {
        status: upstream.status,
        body: detail.slice(0, 500),
      });
      return jsonError(502, "Voice generation failed.");
    }

    const audio = await upstream.arrayBuffer();

    return new NextResponse(audio, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, max-age=0, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("ECCOOZS_VOICE_ROUTE_ERROR", error);
    return jsonError(502, "Voice generation failed.");
  }
}
