import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Error getting user", userError.message);
        return NextResponse.redirect(`${origin}/error`);
      }

      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", data?.user?.email)
        .limit(1)
        .single();

      if (!existingUser) {
        const { error: dbError } = await supabase.from("user_profiles").insert({
          email: data?.user?.email,
          username: data?.user?.user_metadata?.user_name,
        });
        if (dbError) {
          console.error(
            "Error inserting user into the database:",
            dbError.message
          );
          return NextResponse.redirect(`${origin}/error`);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
