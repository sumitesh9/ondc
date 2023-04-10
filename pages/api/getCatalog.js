// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../constants/config';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const collectionRef = db.collection('ondcCatalog');
    try {
      const snapshot = await collectionRef.get();
      const documents = snapshot.docs.map((doc) => doc.data());
      console.log('Documents data:', documents);
      res.status(200).json({ data: documents });
    } catch (error) {
      console.error('Error getting documents:', error);
      res.status(400).json({ msg: 'Unable to get data' });
    }
    res.status(200).json({ products: productList });
  } else
    res
      .status(405)
      .json({ msg: `Invalid Request Method. Expected GET got ${req.method}` });
}
