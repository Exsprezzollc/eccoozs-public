import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

function safeMessage(status: number, message: string) {
  return NextResponse.json(
    {
      ok: false,
      message,
    },
    { status }
  );
}

export async function GET() {
  return safeMessage(405, "Method not allowed.");
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("WAITLIST_ENV_MISSING");

      return safeMessage(
        500,
        "The waitlist is temporarily unavailable. Please try again later."
      );
    }

    const body = await readBody(request);

    const email = cleanEmail(body.email);

    if (!email) {
      return safeMessage(400, "Please enter a valid email address.");
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
      return safeMessage(400, "Please confirm that you are 18 or older.");
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
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!supabaseResponse.ok) {
      const responseText = await supabaseResponse.text();

      console.error("WAITLIST_INSERT_ERROR", {
        status: supabaseResponse.status,
        statusText: supabaseResponse.statusText,
        body: responseText,
      });

      if (supabaseResponse.status === 409) {
        return NextResponse.json(
          {
            ok: true,
            message: "You are already on the ECCOOZS waitlist.",
          },
          { status: 200 }
        );
      }

      return safeMessage(
        500,
        "Could not save waitlist signup. Please try again."
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "You are on the ECCOOZS waitlist.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("WAITLIST_ROUTE_ERROR", error);

    return safeMessage(
      500,
      "Could not save waitlist signup. Please try again."
    );
  }
}
