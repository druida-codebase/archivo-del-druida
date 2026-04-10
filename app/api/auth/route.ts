import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();
const SESSION_DURATION = 21600; 

export async function GET() {
  const active = (await redis.get('unlockedAt')) !== null;
  return Response.json({ active });
}

export async function POST(req: Request) {
  const { user, password } = await req.json();
  const ok =
    user === process.env.EVENT_USER &&
    password === process.env.EVENT_PASSWORD;

  if (ok) {
    await redis.set('unlockedAt', Date.now(), { ex: SESSION_DURATION });
  }

  return Response.json({ ok });
}