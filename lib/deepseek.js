// DeepSeek 是 OpenAI 相容介面。key 由呼叫端傳入——這個檔案不知道 key 從哪來。
export async function deepseek(key, system, user, opts = {}){
  const r = await fetch('https://api.deepseek.com/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + key },
    body: JSON.stringify({
      model: opts.model || 'deepseek-chat',
      messages: [{ role:'system', content: system }, { role:'user', content: user }],
      temperature: opts.temperature ?? 0.8,
      max_tokens: opts.max_tokens ?? 300,
      ...(opts.json ? { response_format: { type: 'json_object' } } : {})
    })
  });
  if (!r.ok) throw new Error('deepseek ' + r.status);
  const j = await r.json();
  return j.choices?.[0]?.message?.content ?? '';
}
