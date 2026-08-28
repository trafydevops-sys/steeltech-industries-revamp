import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { name, contactInfo, message } = req.body ?? {};
  console.log("New contact enquiry:", { name, contactInfo, message });

  return res.status(200).json({ success: true });
}
