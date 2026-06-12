import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WaitlistPayload = {
  email?: string;
  full_name?: string | null;
  audience_type?: string | null;
  business_name?: string | null;
  website?: string | null;
  city?: string | null;
  region?: string | null;
  state_region?: string | null;
  age_confirmed?: boolean | string | null;
  is_18_or_over?: boolean | string | null;
  source?: string | null;
};

function clean(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function isTrue(value: unknown) {
  return value === true || value === "true" || value === "on" || value === "1";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as WaitlistPayload;

    const email = clean(body.email)?.toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const ageConfirmed = isTrue(body.age_confirmed) || isTrue(body.is_18_or_over);

    if (!ageConfirmed) {
      return NextResponse.json(
        { message: "Age confirmation is required." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const tableName = process.env.SUPABASE_WAITLIST_TABLE || "eccoozs_waitlist";

    if (!supabaseUrl || !serviceRoleKey) {
      console.error("WAITLIST_CONFIG_ERROR", {
        hasSupabaseUrl: Boolean(supabaseUrl),
        hasServiceRoleKey: Boolean(serviceRoleKey),
        tableName,
      });

      return NextResponse.json(
        { message: "Waitlist is not configured yet." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const row = {
      email,
      full_name: clean(body.full_name),
      audience_type: clean(body.audience_type) || "founding_member",
      business_name: clean(body.business_name),
      website: clean(body.website),
      city: clean(body.city),
      state_region: clean(body.state_region) || clean(body.region),
      age_confirmed: true,
      source: clean(body.source) || "eccoozs.com",
    };

    const { error } = await supabase.from(tableName).insert(row);

    if (error) {
      console.error("WAITLIST_INSERT_ERROR", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
        tableName,
        row,
      });

      if (error.code === "23505") {
        return NextResponse.json(
          { message: "You're already on the founding waitlist." },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { message: "Could not save waitlist signup." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "You're on the founding waitlist. We'll be in touch." },
      { status: 200 }
    );
  } catch (error) {
    console.error("WAITLIST_ROUTE_ERROR", error);

    return NextResponse.json(
      { message: "Could not save waitlist signup." },
      { status: 500 }
    );
  }
}
