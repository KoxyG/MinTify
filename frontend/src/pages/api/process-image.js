// pages/api/process-image.js
import sharp from 'sharp';
import { IncomingForm } from 'formidable';
import { promises as fs } from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function extractDominantColor(image) {
  const { dominant } = await image.stats();
  return dominant;
}

function getContrastColor(r, g, b) {
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? 'black' : 'white';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      return res.status(500).json({ error: 'Failed to process form' });
    }

    const imageFile = files.file[0];
    const userName = fields.userName[0];

    try {
      const imageBuffer = await fs.readFile(imageFile.filepath);
      const image = sharp(imageBuffer);

      // Get image metadata and dominant color
      const [metadata, dominantColor] = await Promise.all([
        image.metadata(),
        extractDominantColor(image)
      ]);

      const width = metadata.width;
      const height = metadata.height;

      // Fixed font size of 30px
      const fontSize = 70;

      // Determine text color based on contrast with dominant color
      const textColor = getContrastColor(dominantColor.r, dominantColor.g, dominantColor.b);

      // Create an SVG with centered text
      const svgText = `
        <svg width="${width}" height="${height}">
          <style>
            .username { 
              fill: ${textColor}; 
              font-size: ${fontSize}px; 
              font-family: Arial, Helvetica, sans-serif;
              font-style: italic;
            }
          </style>
          <text 
            x="50%" 
            y="50%" 
            text-anchor="middle" 
            dominant-baseline="middle" 
            class="username">${userName}</text>
        </svg>
      `;

      const processedImageBuffer = await image
        .composite([
          {
            input: Buffer.from(svgText),
            top: 0,
            left: 0,
          },
        ])
        .toBuffer();

      res.setHeader('Content-Type', `image/${metadata.format}`);
      res.send(processedImageBuffer);
    } catch (error) {
      console.error('Error processing image:', error);
      res.status(500).json({ error: 'Failed to process image' });
    }
  });
}
