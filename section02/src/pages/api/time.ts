import type { NextApiRequest, NextApiResponse } from "next"; // 약간의 디테일로 "type"을 추가함

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const date = new Date();
  res.json({ time: date.toLocaleString() });
}
