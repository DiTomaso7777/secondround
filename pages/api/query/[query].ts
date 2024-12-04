import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { parseXmlData } from '@/app/utils/parseXml'; // Adjust the import path if necessary

interface ParsedData {
  stocklevels?: {
    stocklevel: any[];
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const response = await fetch(process.env.API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `key=${process.env.API_KEY}&what=stocklevel&get=1`,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const xmlData = await response.text();
    console.log('Raw XML Data:', xmlData);

    const parsedData: ParsedData = await parseXmlData(xmlData) as ParsedData;
    console.log('Parsed Data:', JSON.stringify(parsedData, null, 2));

    const stockLevels = parsedData?.stocklevels?.stocklevel;
    console.log('Stock Levels:', stockLevels);

    if (!Array.isArray(stockLevels)) {
      throw new Error('Invalid data structure');
    }

    const filteredData = stockLevels.filter((item: any) => {
      const itemName = item?.$?.name;
      console.log('Item Name:', itemName);
      return (
        typeof itemName === 'string' &&
        itemName.toLowerCase().includes((query as string).toLowerCase())
      );
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const result = paginatedData.map((item: any) => item.$);
    console.log('Filtered Result:', result);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching stock data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
}