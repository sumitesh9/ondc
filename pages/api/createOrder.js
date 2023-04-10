import {
  createOrderAPI,
  createOrderRequestBody,
  db,
} from '../../constants/config';
import axios from 'axios';
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const docRef = db.collection('ondcOrder').doc(req.body.order_id);
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

    const cartDocument = db.collection('ondcCart').doc(req.body.cart_id);
    const cartDetails = await cartDocument.get();

    if (!cartDetails.exists)
      res.status(400).json({ msg: 'No cart found with given cart id' });

    // Copy cost object
    const cost = cartDetails.data().cost;
    console.log('cost = ', cost);
    const newData = { cost: cost };
    await docRef.update(newData);

    const data = {
      ...createOrderRequestBody,
      cart_id: req.body.cart_id,
      order_id: req.body.order_id,
    };

    const headers = {
      'Content-Type': 'application/json',
      apid: process.env.APID,
    };

    console.log('calling API with data = ', data);
    const resp = await axios.post(createOrderAPI, data, { headers });
    if (resp.data.message.ack.status === 'ACK')
      res.status(201).json({ msg: 'Ordered successfully' });
    else res.status(400).json({ msg: 'Failed to order' });

    res.status(201).json({ msg: 'Order created successfully' });
  } else
    res
      .status(405)
      .json({ msg: `Invalid Request Method. Expected GET got ${req.method}` });
}
