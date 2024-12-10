import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(process.env.DIRECTO_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `key=${process.env.DIRECTO_API_KEY}&what=order&limit=10`,
    });

    if (!response.ok) {
      throw new Error('Error fetching orders data');
    }

    const xmlData = await response.text();
    console.log('Raw XML Data:', xmlData); // Log the raw XML data

    const parsedData = await parseStringPromise(xmlData);
    console.log('Parsed Data:', JSON.stringify(parsedData, null, 2)); // Log the parsed JSON data

    res.status(200).json(parsedData);
  } catch (error) {
    console.error('Error fetching orders data:', error);
    res.status(500).json({ error: 'Error fetching orders data' });
  }
}