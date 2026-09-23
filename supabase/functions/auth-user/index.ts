import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/http.ts";
import { readBearerToken } from "../_shared/session.ts";
import { verifyAccessToken } from "../_shared/jwt.ts";
import { createServiceClient } from "../_shared/supabaseClient.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const token = readBearerToken(req);
    const userId = token ? await verifyAccessToken(token) : null;
    if (!userId) return jsonResponse(401, { error: "Not authenticated." }, corsHeaders);

    const supabase = createServiceClient();
    const [{ data: user, error }, { data: profile, error: profileError }] = await Promise.all([
      supabase
        .from("users")
        .select("id, first_name, last_name, email_id, verified, active")
        .eq("id", userId)
        .maybeSingle(),
      supabase.from("profiles").select("full_name, company_name, website_url").eq("id", userId).maybeSingle(),
    ]);

    if (error || profileError) {
      console.error("auth-user: lookup failed", error ?? profileError);
      return jsonResponse(500, { error: "Something went wrong." }, corsHeaders);
    }
    if (!user || !user.active) return jsonResponse(401, { error: "Not authenticated." }, corsHeaders);

    // Display name: prefer the editable profile name, else first+last, else the
    // first two words of first_name (covers a full name stored in that single field),
    // else the email's local part. Kept here so header/profile stay in sync everywhere.
    const fullName = profile?.full_name?.trim() || null;
    const nameFromParts = user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : null;
    const nameFromFirst = user.first_name?.trim().split(/\s+/).slice(0, 2).join(" ") || null;
    const name = fullName || nameFromParts || nameFromFirst || user.email_id.split("@")[0];

    return jsonResponse(
      200,
      {
        user: {
          id: String(user.id),
          name,
          email: user.email_id,
          verified: user.verified,
          fullName: profile?.full_name ?? "",
          companyName: profile?.company_name ?? "",
          websiteUrl: profile?.website_url ?? "",
        },
      },
      corsHeaders,
    );
  } catch (err) {
    console.error("auth-user: unhandled error", err);
    return jsonResponse(500, { error: "Something went wrong." }, corsHeaders);
  }
});
