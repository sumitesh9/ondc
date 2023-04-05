// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '../../constants/config';
import { collection, getDocs } from 'firebase/firestore/lite';
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const productsCol = collection(db, 'ondcCatalog');
    const productSnapshot = await getDocs(productsCol);
    const productList = productSnapshot.docs.map((doc) => doc.data());
    res.status(200).json({products: productList});
  } else res.status(405).json({"msg": `Invalid Request Method. Expected GET got ${req.method}`});
}
