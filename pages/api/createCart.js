// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function handler(req, res) {
  if (req.method === 'POST') {
    res.status(201).json({ msg: 'Cart created successfully' });
  } else
    res
      .status(405)
      .json({ msg: `Invalid Request Method. Expected GET got ${req.method}` });
}
