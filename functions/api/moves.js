// Cloudflare Pages Function — key 來自 CF 的加密環境變數，永遠不進 repo。
import { MOVE_PROMPT, moveUserMsg } from '../../lib/prompts.js';
import { deepseek } from '../../lib/deepseek.js';

export async function onRequestPost({ request, env }) {
  const bad = (c, m) => new Response(JSON.stringify({ error: m }), {
    status: c, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  if (!env.DEEPSEEK_API_KEY) return bad(500, 'not configured');
  try {
    const b = await request.json();
    const raw = await deepseek(env.DEEPSEEK_API_KEY, MOVE_PROMPT, moveUserMsg(b),
      { json: true, temperature: 0.9, max_tokens: 200 });
    const m = JSON.parse(raw);
    if (!m.name || !m.note) return bad(502, 'shape');
    return new Response(JSON.stringify(m), {
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
  } catch { return bad(502, 'upstream'); }
}
