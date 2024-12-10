import type { NextApiRequest, NextApiResponse } from 'next';
import { parseStringPromise } from 'xml2js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orderNumber } = req.query;

  if (!orderNumber) {
    return res.status(400).json({ error: 'Order number is required' });
  }

  // Static order data
  const staticOrderData = `<?xml version="1.0" encoding="utf-8"?>
<orders><order number="999" customercode="1036" customername="Test" date="2024-12-09T08:45:58.53" paymentterm="7">
<rows>
<row item="IP13M128AB" price="1000" sn="350971743286377" quantity="1" rn="1"/>
</rows>
</order>
</orders>`;

  try {
    console.log('Raw XML Data:', staticOrderData); // Log the raw XML data

    const parsedData = await parseStringPromise(staticOrderData);
    console.log('Parsed Data:', JSON.stringify(parsedData, null, 2)); // Log the parsed JSON data

    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error parsing order data:', error);
    res.status(500).json({ error: 'Error parsing order data' });
  }
}