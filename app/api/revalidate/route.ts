import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();
  const secret = request.nextUrl.searchParams.get("secret") || body.secret;

  // Check if the secret matches your Environment Variable
  if (secret !== process.env.PRISMIC_REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // This clears the cache for all Prismic data
  revalidateTag("prismic");

  return NextResponse.json({ revalidated: true, now: Date.now() });
}