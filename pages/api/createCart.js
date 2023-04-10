// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createCartRequestBody, createCartAPI, db } from '../../constants/config';
import axios from 'axios';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Get a reference to the Firestore database

    // Define the document to update
    const docRef = db.collection('ondcCart').doc(req.body.cart_id);
    try {
      const doc = await docRef.get();
      if (!doc.exists) {
        await docRef.create({});
        console.log('Document created successfully');
      } else {
        console.log('Document already exists');
      }
    } catch (error) {
      console.error('Error creating document:', error);
      res.status(400).json({ msg: 'Failed to add' });
    }
    const data = {
      ...createCartRequestBody,
      items: req.body.items,
      delivery_info: req.body.delivery_info,
      cart_id: req.body.cart_id,
      customer_info: req.body.customer_info,
    };

    const headers = {
      'Content-Type': 'application/json',
      apid: process.env.APID,
    };

    console.log('calling API with data = ', data);
    const resp = await axios.post(createCartAPI, data, { headers });
    if (resp.data.message.ack.status === 'ACK')
      res.status(201).json({ msg: 'Added to cart successfully' });
    else res.status(400).json({ msg: 'Failed to add' });
  } else
    res
      .status(405)
      .json({ msg: `Invalid Request Method. Expected POST got ${req.method}` });
}
