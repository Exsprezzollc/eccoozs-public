import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WaitlistPayload = {
  email?: unknown;
  full_name?: unknown;
  audience_type?: unknown;
  business_name?: unknown;
  website?: unknown;
  city?: unknown;
  state_region?: unknown;
  region?: unknown;
  age_confirmed?: unknown;
  is_18_or_over?: unknown;
  source?: unknown;
  utm_source?: unknown;
  utm_medium?: unknown;
  utm_campaign?: unknown;
  referrer?: unknown;
  user_agent?: unknown;
};

function textOrNull(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function envText(value: string | undefined): string | null {
  if (!value) return null;
  const cleaned = value.trim().replace(/^["']|["']$/g, "").trim();
  return cleaned.length ? cleaned : null;
}

function cleanServiceRoleKey(value: string | undefined): string | null {
  if (!value) return null;

  let cleaned = value.trim();
  cleaned = cleaned.replace(/^["']|["']$/g, "").trim();
  cleaned = cleaned.replace(/^Bearer\s+/i, "");
  cleaned = cleaned.replace(/\s+/g, "");

  return cleaned.length ? cleaned : null;
}

function boolValue(value: unknown): boolean {
  return value === true || value === "true" || value === "on" || value === "1" || value === 1;
}

function redact(value: string): string {
  return value.replace(
    /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
    "[redacted-jwt]"
  );
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "waitlist" });
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json().catch(() => ({}))) as WaitlistPayload;

    const email = textOrNull(payload.email)?.toLowerCase() || null;
    const ageConfirmed = boolValue(payload.age_confirmed) || boolValue(payload.is_18_or_over);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!ageConfirmed) {
      return NextResponse.json(
        { ok: false, message: "Age confirmation is required." },
        { status: 400 }
      );
    }

    const supabaseUrl = envText(process.env.NEXT_PUBLIC_SUPABASE_URL)?.replace(/\/+$/, "");
    const serviceRoleKey = cleanServiceRoleKey(process.env.SUPABASE_SERVICE_ROLE_KEY);
    const tableName =
      envText(process.env.SUPABASE_WAITLIST_TABLE)?.replace(/^public\./i, "") ||
      "eccoozs_waitlist";

    if (!supabaseUrl || !serviceRoleKey || !tableName) {
      console.error("WAITLIST_CONFIG_ERROR", {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
        hasTableName: Boolean(tableName),
      });

      return NextResponse.json(
        { ok: false, message: "Waitlist is not configured yet." },
        { status: 500 }
      );
    }

    const row = {
      email,
      full_name: textOrNull(payload.full_name),
      audience_type: textOrNull(payload.audience_type) || "founding_member",
      business_name: textOrNull(payload.business_name),
      website: textOrNull(payload.website),
      city: textOrNull(payload.city),
      state_region: textOrNull(payload.state_region) || textOrNull(payload.region),
      age_confirmed: true,
source: textOrNull(payload.source) || "welcome",
      utm_source: textOrNull(payload.utm_source),
      utm_medium: textOrNull(payload.utm_medium),
      utm_campaign: textOrNull(payload.utm_campaign),
      referrer: textOrNull(payload.referrer),
      user_agent: textOrNull(payload.user_agent),
    };

    const insertResponse = await fetch(
      `${supabaseUrl}/rest/v1/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(row),
        cache: "no-store",
      }
    );

    if (insertResponse.status === 409) {
      return NextResponse.json(
        { ok: true, message: "You're already on the founding waitlist." },
        { status: 200 }
      );
    }

    if (!insertResponse.ok) {
      const errorText = await insertResponse.text().catch(() => "");

      console.error("WAITLIST_INSERT_ERROR", {
        status: insertResponse.status,
        statusText: insertResponse.statusText,
        tableName,
        body: redact(errorText).slice(0, 1200),
      });

      return NextResponse.json(
        { ok: false, message: "Could not save waitlist signup." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "You're on the founding waitlist. We'll be in touch.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("WAITLIST_ROUTE_ERROR", {
      message: redact(error instanceof Error ? error.message : String(error)),
    });

    return NextResponse.json(
      { ok: false, message: "Could not save waitlist signup." },
      { status: 500 }
    );
  }
}

