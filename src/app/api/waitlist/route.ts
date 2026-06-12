import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type WaitlistPayload = {
  email?: string;
  full_name?: string | null;
  audience_type?: string | null;
  business_name?: string | null;
  website?: string | null;
  city?: string | null;
  region?: string | null;
  is_18_or_over?: boolean;
  source?: string | null;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
  referrer?: string | null;
  user_agent?: string | null;
};

function clean(value: unknown) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export async function POST(request: Request) {
  let body: WaitlistPayload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = clean(body.email)?.toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (!body.is_18_or_over) {
    return NextResponse.json(
      { error: "Please confirm that you are 18 or older to continue." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      preview: true,
      message: "Preview mode: Supabase environment variables are not configured yet.",
    });
  }

  const table = process.env.SUPABASE_WAITLIST_TABLE || "eccoozs_waitlist";

  const record = {
    email,
    full_name: clean(body.full_name),
    audience_type: clean(body.audience_type) || "founding_member",
    business_name: clean(body.business_name),
    website: clean(body.website),
    city: clean(body.city),
    region: clean(body.region),
    is_18_or_over: true,
    source: clean(body.source) || "eccoozs.com",
    utm_source: clean(body.utm_source),
    utm_medium: clean(body.utm_medium),
    utm_campaign: clean(body.utm_campaign),
    referrer: clean(body.referrer),
    user_agent: clean(body.user_agent),
  };

  const { error } = await supabase
    .from(table)
    .upsert(record, { onConflict: "email", ignoreDuplicates: false });

  if (error) {
    return NextResponse.json(
      { error: "Something went wrong while saving your spot." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: "You're on the founding waitlist. We'll be in touch.",
  });
}
