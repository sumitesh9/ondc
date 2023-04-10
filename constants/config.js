// Import the functions you need from the SDKs you need
import * as admin from 'firebase-admin';
import serviceAccountKey from '../constants/serviceAccountKey.json';
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
// const firebase_app =
//   getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const createCartRequestBody = {
  cart_id: 'fdgdfhgbjdfigkjjhewuiruwtdfss',
  bpp_uri: 'https://api.test.esamudaay.com/ondc/sdk/bpp/retail/esamudaay',
  bpp_id: 'api.test.esamudaay.com/ondc/sdk/bpp/retail/esamudaay',
  city_code: 'std:080',
  business_id: '0635ecff-8fde-4185-8cd8-167efda42bbc',
  fulfillment_type: 'DA_DELIVERY',
  business_location_ids: ['75e4363f-001b-4519-ace5-28b1f448a0bb'],
  billing_info: {
    name: 'Jay',
    email: 'Jay@mail',
    phone: '9880013139',
    address: {
      name: 'JW Mariott',
      door: 'B005 aspire heights',
      locality: '33rd Cross Road, Vinayaka Layout',
      city: 'Bengaluru',
      state: 'Karnataka',
      country: 'IND',
      area_code: '560038',
    },
  },
};

export const createOrderRequestBody = {
  city_code: 'std:080',
  payment_info: {
    uri: 'https://ondc.transaction.com/payment',
    tl_method: 'http/get',
    params: {
      currency: 'INR',
      transaction_id: '0125836177',
      transaction_status: 'captured',
      amount: '389.84',
    },
  },
};

const HOST = 'https://api.test.esamudaay.com/';
export const createCartAPI = `${HOST}api/v1/ondc/sdk/buyer/carts`;
export const createOrderAPI = `${HOST}api/v1/ondc/sdk/buyer/orders`;
export const firebase_app =
  admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccountKey),
        name: 'adminApp',
      })
    : admin.app();
export const db = firebase_app.firestore();
