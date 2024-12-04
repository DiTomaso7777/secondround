import { parseString } from 'xml2js';

export const parseXmlData = (xmlData: string) => {
  return new Promise((resolve, reject) => {
    parseString(xmlData, { explicitArray: false }, (err, result) => {
      if (err) {
        console.error('Error parsing XML:', err);
        reject(`Error parsing XML: ${err}`);
      } else {
    
        resolve(result);
      }
    });
  });
};