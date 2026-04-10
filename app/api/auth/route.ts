let unlockedAt: number | null = null;

export async function POST(req: Request) {
  const { user, password } = await req.json();
  const ok =
    user === process.env.EVENT_USER &&
    password === process.env.EVENT_PASSWORD;

  if (ok) unlockedAt = Date.now();

  return Response.json({ ok });
}

export async function GET() {
  const active = unlockedAt !== null && Date.now() - unlockedAt < 21600000;
  return Response.json({ active });
}