import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const ROUTE_VERSION = "waitlist-debug-2026-06-12-v4";

type WaitlistBody = Record<string, unknown>;

function cleanText(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned.length > 0 ? cleaned : null;
}

function cleanEmail(value: unknown): string | null {
  const email = cleanText(value)?.toLowerCase() ?? null;

  if (!email) return null;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email) ? email : null;
}

function toBoolean(value: unknown): boolean {
  if (value === true) return true;

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return ["true", "1", "yes", "on", "checked"].includes(normalized);
  }

  return false;
}

async function readBody(request: Request): Promise<WaitlistBody> {
  try {
    return (await request.json()) as WaitlistBody;
  } catch {
    return {};
  }
}

function jsonResponse(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(
    {
      routeVersion: ROUTE_VERSION,
      ...body,
    },
    {
      status,
      headers: {
        "x-waitlist-route-version": ROUTE_VERSION,
      },
    }
  );
}

export async function GET() {
  return jsonResponse({
    ok: true,
    message: "ECCOOZS waitlist API route is live.",
    hasSupabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  });
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse(
        {
          ok: false,
          message: "Waitlist is not configured in Vercel.",
          hasSupabaseUrl: Boolean(supabaseUrl),
          hasServiceRoleKey: Boolean(serviceRoleKey),
        },
        500
      );
    }

    if (
      serviceRoleKey.startsWith("Bearer ") ||
      serviceRoleKey.includes("\n") ||
      serviceRoleKey.includes("\r") ||
      serviceRoleKey.startsWith('"') ||
      serviceRoleKey.endsWith('"')
    ) {
      return jsonResponse(
        {
          ok: false,
          message:
            "SUPABASE_SERVICE_ROLE_KEY is formatted incorrectly in Vercel. Use one raw JWT with no Bearer prefix, quotes, spaces, or line breaks.",
        },
        500
      );
    }

    const body = await readBody(request);
    const email = cleanEmail(body.email);

    if (!email) {
      return jsonResponse(
        {
          ok: false,
          message: "Please enter a valid email address.",
          receivedKeys: Object.keys(body),
        },
        400
      );
    }

    const ageConfirmed =
      toBoolean(body.age_confirmed) ||
      toBoolean(body.ageConfirmed) ||
      toBoolean(body.is_18_or_over) ||
      toBoolean(body.is18OrOver) ||
      toBoolean(body.over18) ||
      toBoolean(body.confirmAge) ||
      toBoolean(body.confirm_age);

    if (!ageConfirmed) {
      return jsonResponse(
        {
          ok: false,
          message: "Please confirm that you are 18 or older.",
          receivedKeys: Object.keys(body),
          receivedBody: body,
        },
        400
      );
    }

    const fullName = cleanText(
      body.full_name ?? body.fullName ?? body.name ?? body.displayName
    );

    const payload = {
      email,
      full_name: fullName,
      is_18_or_over: true,
      age_confirmed: true,
    };

    const supabaseResponse = await fetch(
      `${supabaseUrl}/rest/v1/eccoozs_waitlist`,
      {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      }
    );

    const responseText = await supabaseResponse.text();

    let responseBody: unknown = responseText;

    try {
      responseBody = responseText ? JSON.parse(responseText) : null;
    } catch {
      responseBody = responseText;
    }

    if (!supabaseResponse.ok) {
      console.error("WAITLIST_SUPABASE_REST_ERROR", {
        status: supabaseResponse.status,
        statusText: supabaseResponse.statusText,
        body: responseBody,
      });

      return jsonResponse(
        {
          ok: false,
          message: `Supabase rejected the waitlist insert. Status ${supabaseResponse.status}: ${supabaseResponse.statusText}`,
          supabaseStatus: supabaseResponse.status,
          supabaseStatusText: supabaseResponse.statusText,
          supabaseError: responseBody,
        },
        500
      );
    }

    return jsonResponse({
      ok: true,
      message: "You are on the ECCOOZS waitlist.",
      data: responseBody,
    });
  } catch (error) {
    console.error("WAITLIST_ROUTE_ERROR", error);

    return jsonResponse(
      {
        ok: false,
        message: "Waitlist route crashed before completing.",
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
              }
            : {
                message: "Unknown error.",
              },
      },
      500
    );
  }
}
