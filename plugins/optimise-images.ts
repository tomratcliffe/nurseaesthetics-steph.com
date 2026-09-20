import sharp from 'sharp';
import type { Plugin } from 'vite';

type Options = {
  /** Longest edge, in pixels. Nothing is enlarged to reach it. */
  maxEdge?: number;
  /** JPEG quality. 78 is visually indistinguishable here at a third the size. */
  quality?: number;
  /** Log a warning for any image still above this, in KB. */
  warnAboveKb?: number;
};

const RASTER = /\.(jpe?g|png)$/i;
const kb = (bytes: number) => Math.round(bytes / 1024);

/**
 * Resizes and re-encodes the photographs Vite emits into dist/.
 *
 * The originals are straight off a camera — several are 5-8MB at 3000px+ on
 * the long edge, rendered into slots a few hundred pixels wide — and committing
 * optimised copies instead would mean the repository no longer holds the
 * masters. So the source files are left alone and only the build output is
 * touched, which keeps dist/ the only place that has to be disposable.
 *
 * Runs on build only: the dev server keeps serving originals, so editing a
 * photo does not pay for a resize on every reload.
 */
export function optimiseImages({
  maxEdge = 1600,
  quality = 78,
  warnAboveKb = 500,
}: Options = {}): Plugin {
  return {
    name: 'optimise-images',
    apply: 'build',

    async generateBundle(_options, bundle) {
      const images = Object.values(bundle).filter(
        (file) => file.type === 'asset' && RASTER.test(file.fileName),
      );
      if (images.length === 0) return;

      let before = 0;
      let after = 0;

      await Promise.all(
        images.map(async (file) => {
          if (file.type !== 'asset') return;

          const input = Buffer.from(file.source as Uint8Array);
          const image = sharp(input);
          const { width = 0, height = 0, format } = await image.metadata();

          // rotate() with no argument applies the EXIF orientation. Resizing
          // drops that metadata, so without this a phone photo that browsers
          // render upright would come out of the build on its side.
          let pipeline = image
            .rotate()
            .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true });

          pipeline =
            format === 'png'
              ? pipeline.png({ compressionLevel: 9 })
              : pipeline.jpeg({ quality, mozjpeg: true });

          const output = await pipeline.toBuffer();

          before += input.byteLength;

          // Keep whichever is smaller: a small, already-optimised file can come
          // out of a re-encode bigger than it went in.
          if (output.byteLength < input.byteLength) {
            file.source = output;
            after += output.byteLength;
            const resized = Math.max(width, height) > maxEdge ? ` ${width}x${height} ->` : '';
            this.info(
              `${file.fileName}:${resized} ${kb(input.byteLength)}KB -> ${kb(output.byteLength)}KB`,
            );
          } else {
            after += input.byteLength;
          }

          const finalKb = kb((file.source as Uint8Array).byteLength);
          if (finalKb > warnAboveKb) {
            this.warn(`${file.fileName} is still ${finalKb}KB, above the ${warnAboveKb}KB budget`);
          }
        }),
      );

      const saved = before - after;
      if (saved > 0) {
        const percent = Math.round((saved / before) * 100);
        this.info(
          `optimised ${images.length} images: ${kb(before)}KB -> ${kb(after)}KB (${percent}% smaller)`,
        );
      }
    },
  };
}
