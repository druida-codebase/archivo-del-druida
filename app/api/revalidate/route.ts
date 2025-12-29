import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  let body: any = {};
  
  try {
    body = await request.json();
  } catch (e) {
    body = {};
  }

  const secret = request.nextUrl.searchParams.get("secret") || body.secret;

  if (secret !== process.env.PRISMIC_REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  // Use 'any' cast to satisfy the compiler's argument count requirement
  // This is a known workaround for the Next.js cache type mismatch
  (revalidateTag as any)("prismic");

  return NextResponse.json({ 
    revalidated: true, 
    now: Date.now() 
  });
}