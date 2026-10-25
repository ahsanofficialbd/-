import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Function to compute CRC32
function makeCrcTable() {
  let c;
  const crcTable = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[n] = c;
  }
  return crcTable;
}

const crcTable = makeCrcTable();
function crc32(buf) {
  let crc = 0 ^ -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ -1) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = Buffer.alloc(4 + len);
  chunk.copy(typeAndData, 0, 4, 8 + len);
  const crcVal = crc32(typeAndData);
  chunk.writeUInt32BE(crcVal, 8 + len);
  return chunk;
}

function generatePNG(width, height, isMaskable = false) {
  // RGBA buffer: filter byte (0) per scanline + width * 4 bytes
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineLength * height);

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (isMaskable ? 0.38 : 0.44);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // Filter 0 (None)

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Background: Deep dark slate (#0f172a = 15, 23, 42)
      let r = 15;
      let g = 23;
      let b = 42;
      let a = 255;

      // Outer gold glowing border
      if (dist <= radius + 6 && dist >= radius - 4) {
        // Gold / Amber border (#f59e0b)
        r = 245;
        g = 158;
        b = 11;
        a = 255;
      } else if (dist < radius - 4) {
        // Inner circle background: Gradient dark navy to emerald
        const grad = (y / height);
        r = Math.floor(16 + grad * 12);
        g = Math.floor(28 + grad * 40);
        b = Math.floor(48 + grad * 30);
        
        // Center emblem: Golden star/diamond book mark
        const dCenter = Math.sqrt(dx * dx + (dy + 15) * (dy + 15));
        const diamondDist = Math.abs(dx) + Math.abs(dy);
        if (diamondDist < width * 0.18) {
          // Gold center (#fbbf24 to #f59e0b)
          r = 251;
          g = 191;
          b = 36;
        } else if (Math.abs(dy - width * 0.12) < 8 && Math.abs(dx) < width * 0.22) {
          // Bottom bar base of book / crest (#38bdf8)
          r = 56;
          g = 189;
          b = 248;
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Signature
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // Color type 6 (RGBA)
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT
  const idatChunk = createChunk('IDAT', deflated);

  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate Icons
console.log('Generating PWA icons...');
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePNG(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePNG(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePNG(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePNG(180, 180, false));

// Generate SVG Icon
const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="128" fill="#0f172a"/>
  <circle cx="256" cy="256" r="220" fill="#090d16" stroke="#f59e0b" stroke-width="14"/>
  <circle cx="256" cy="256" r="190" fill="url(#bgGrad)"/>
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <!-- Bengali "জ্ঞ" (Jnankosh) with open book / quiz motif -->
  <text x="256" y="320" font-family="'Hind Siliguri', system-ui, sans-serif" font-size="210" font-weight="bold" fill="url(#goldGrad)" text-anchor="middle" filter="drop-shadow(0px 8px 16px rgba(245, 158, 11, 0.4))">জ্ঞ</text>
  <path d="M160 380 Q 256 360 352 380 Q 256 410 160 380 Z" fill="#38bdf8"/>
</svg>`;
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgIcon);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgIcon);

console.log('Icons generated successfully in /public!');
