export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = req.body;

  // AICI apar în Vercel Logs
  console.log("💖 Valentine click:", {
    choice: data.choice,
    noCount: data.noCount,
    path: data.path,
    at: data.at,
  });

  res.status(200).json({ ok: true });
}
