import { corsHeaders } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/http.ts";
import { createServiceClient } from "../_shared/supabaseClient.ts";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("users").select("id").limit(1);
    if (error) throw error;
    return jsonResponse(200, { status: "ok", time: new Date().toISOString() }, corsHeaders);
  } catch (err) {
    console.error("health: unhandled error", err);
    return jsonResponse(503, { status: "error", time: new Date().toISOString() }, corsHeaders);
  }
});
