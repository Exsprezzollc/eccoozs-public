import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WaitlistPayload = {
  email?: string;
  fullName?: string;
  full_name?: string;
  name?: string;
  joinAs?: string;
  join_as?: string;
  businessName?: string;
  business_name?: string;
  website?: string;
  city?: string;
  stateRegion?: string;
  state_region?: string;
  ageConfirmed?: boolean;
  age_confirmed?: boolean;
};

function clean(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const tableName = process.env.SUPABASE_WAITLIST_TABLE || "eccoozs_waitlist";

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("Missing Supabase server environment variables", {
        hasUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
        tableName,
      });

      return NextResponse.json(
        { ok: false, error: "Server configuration is missing." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as WaitlistPayload;

    const email = clean(body.email)?.toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "A valid email is required." },
        { status: 400 }
      );
    }

    const ageConfirmed =
      body.ageConfirmed === true || body.age_confirmed === true;

    if (!ageConfirmed) {
      return NextResponse.json(
        { ok: false, error: "Age confirmation is required." },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const payload = {
      email,
      full_name: clean(body.fullName ?? body.full_name ?? body.name),
      join_as: clean(body.joinAs ?? body.join_as),
      business_name: clean(body.businessName ?? body.business_name),
      website: clean(body.website),
      city: clean(body.city),
      state_region: clean(body.stateRegion ?? body.state_region),
      age_confirmed: ageConfirmed,
      source: "welcome",
    };

    const { data, error } = await supabase
      .from(tableName)
      .insert(payload)
      .select("id,email,created_at")
      .single();

    if (error) {
      console.error("Supabase waitlist insert failed", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      });

      return NextResponse.json(
        { ok: false, error: "Could not save waitlist signup." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, signup: data }, { status: 200 });
  } catch (error) {
    console.error("Waitlist route crashed", error);

    return NextResponse.json(
      { ok: false, error: "Unexpected waitlist error." },
      { status: 500 }
    );
  }
}
