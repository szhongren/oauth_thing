import { redirect } from "next/navigation";
import Redis from "ioredis";
import { NextRequest } from "next/dist/server/web/spec-extension/request";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  const data = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/api/oauth/google/callback",
    grant_type: "authorization_code",
  };

  const response = await fetch(process.env.GOOGLE_ACCESS_TOKEN_URL!, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const access_token_data: any = await response.json();
  const redis = new Redis();

  const { id_token } = access_token_data;
  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );
  const body = await token_info_response.json();

  await redis.set(
    "session",
    JSON.stringify({
      email: body.email,
      name: body.name,
      picture: body.picture,
      access_token: access_token_data.access_token,
      refresh_token: access_token_data.refresh_token,
    }),
    "EX",
    access_token_data.expires_in
  );

  return redirect("/#");
}
