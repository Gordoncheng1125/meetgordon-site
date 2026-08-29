import { SAY_PROMPT, sayUserMsg } from '../../lib/prompts.js';
import { deepseek } from '../../lib/deepseek.js';

export async function onRequestPost({ request, env }) {
  const bad = (c, m) => new Response(JSON.stringify({ error: m }), {
    status: c, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  if (!env.DEEPSEEK_API_KEY) return bad(500, 'not configured');
  try {
    const b = await request.json();
    const reply = await deepseek(env.DEEPSEEK_API_KEY, SAY_PROMPT, sayUserMsg(b),
      { temperature: 0.7, max_tokens: 160 });
    return new Response(JSON.stringify({ reply: reply.trim() }), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch { return bad(502, 'upstream'); }
}
