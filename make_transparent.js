import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/images/purple_star.png';
const outputPath = 'public/images/purple_star_transparent.png';

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        
        // Calculate max channel value and luminance
        const maxVal = Math.max(r, g, b);
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;

        // Cutoff threshold for pure black background
        if (maxVal <= 12) {
          this.data[idx] = 0;
          this.data[idx + 1] = 0;
          this.data[idx + 2] = 0;
          this.data[idx + 3] = 0;
        } else if (maxVal < 60) {
          // Soft edge / glow transition
          const alphaFactor = (maxVal - 12) / (60 - 12);
          const alpha = Math.round(alphaFactor * 255);
          this.data[idx] = Math.min(255, Math.round(r / Math.max(alphaFactor, 0.2)));
          this.data[idx + 1] = Math.min(255, Math.round(g / Math.max(alphaFactor, 0.2)));
          this.data[idx + 2] = Math.min(255, Math.round(b / Math.max(alphaFactor, 0.2)));
          this.data[idx + 3] = alpha;
        } else {
          this.data[idx + 3] = 255;
        }
      }
    }

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log('Saved transparent image to ' + outputPath);
    });
  });
