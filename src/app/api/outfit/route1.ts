// Import necessary modules from Next.js
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';
import invariant from 'tiny-invariant';
import { outfitImagesPath, walkSpeeds } from '@/components/aimations/config';
import { OutfitData, loadData, outfit } from '@/components/aimations/outfits';



// Define the path to the cache file
const CACHE_FILE_PATH = './cache.generated.txt';

async function getFilesSync(dir: string): Promise<string[]> {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.relative('.', path.resolve(dir, dirent.name));
      return dirent.isDirectory() ? getFilesSync(res) : res;
    })
  );

  return files.flat();
}

async function generateCacheIfNeeded(): Promise<boolean> {
  try {
    //@ts-ignore
    if (!(await fs.access(CACHE_FILE_PATH))) {
      const dirIterator = await getFilesSync(outfitImagesPath);
      const outfits: { [outfitId: string]: OutfitData } = {};
      const frameNumbers = Array(10).fill(0);

      for (const filePath of dirIterator) {
        const normalizedFilePath = filePath.replaceAll('\\', '/');
        const outfitIdData = path.dirname(normalizedFilePath).split('/');
        const outfitId = outfitIdData[outfitIdData.length - 1];

        if (!outfits[outfitId]) {
          outfits[outfitId] = {
            files: [],
            framesNumber: 0,
            mountFramesNumber: 0,
          };
        }

        const fileName = path.basename(normalizedFilePath);
        outfits[outfitId].files.push(normalizedFilePath);

        const currentFramesNumber = parseInt(fileName.charAt(0));
        if (Number.isNaN(currentFramesNumber)) {
          continue;
        }
        outfits[outfitId].framesNumber = Math.max(
          outfits[outfitId].framesNumber,
          currentFramesNumber
        );
      }

      for (const outfitId in outfits) {
        const outfit = outfits[outfitId];
        const serializedOutfit = JSON.stringify(outfit);
        const outfitDataFilePath = path.join(
          outfitImagesPath,
          outfitId,
          'outfit.data.json'
        );

        try {
          await fs.writeFile(outfitDataFilePath, serializedOutfit);
        } catch (err) {
          console.error(
            `Node.js cannot write to: "${outfitDataFilePath}", check directory access rights`
          );
        }

        frameNumbers[outfit.framesNumber]++;
      }

      const cacheGeneratedFilePath = CACHE_FILE_PATH;
      try {
        await fs.writeFile(cacheGeneratedFilePath, 'cache generated');
      } catch (err) {
        console.log(
          `Node.js cannot write to: "${cacheGeneratedFilePath}", check directory access rights`
        );
        process.exit(1);
      }

      console.log('FILE SYSTEM CACHE GENERATED');
      console.log('Animation frames count in loaded outfits:', frameNumbers);

      return true;
    }
  } catch (error) {
    console.error('Error generating cache:', error);
  }
  return false;
}

function parseIntWithDefault(value: unknown, def = 0): number {
  if (!value) return def;

  invariant(
    typeof value === 'string' || typeof value === 'number',
    'value must be a string or number found ' + typeof value + ' instead'
  );
  if (typeof value === 'number') return value;

  return parseInt(value as string) ?? def;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await generateCacheIfNeeded();

  const headers = {
    'Cache-Control': `max-age=${60 * 60 * 24 * 365}`,
    Expires: new Date(Date.now() + 60 * 60 * 24 * 365 * 1000).toUTCString(),
    'Last-Modified': new Date(1337).toUTCString(),
  };

  if (req.headers.host) {
    const ifModifiedSince = req.headers['if-modified-since'];
    if (ifModifiedSince) {
      res.writeHead(304, headers);
      res.end();
      return;
    }
  }

  const looktype = parseIntWithDefault(req.query.looktype, 0);
  let outfitData = loadData(looktype, outfitImagesPath, false);
  if (!outfitData) {
    res.json({});
    return;
  }
  let mount = parseIntWithDefault(req.query.mount);

  if (mount > 0) {
    const mountOutfitData = loadData(mount, outfitImagesPath, true, outfitData);
    if (mountOutfitData) {
      outfitData = mountOutfitData;
    } else {
      mount = 0;
    }
  }

  if (!outfitData) {
    res.status(404).json({ error: 'Outfit not found' });
    return;
  }

  const head = parseIntWithDefault(req.query.lookhead);
  const body = parseIntWithDefault(req.query.lookbody);
  const legs = parseIntWithDefault(req.query.looklegs);
  const feet = parseIntWithDefault(req.query.lookfeet);
  const addons = parseIntWithDefault(req.query.lookaddons);
  const direction = parseIntWithDefault(req.query.direction, 3);
  const resize = parseIntWithDefault(req.query.resize, 0);

  const frames: CanvasRenderingContext2D[] = [];
  const durations: number[] = [];

  const moveAnimFrames: number = outfitData?.framesNumber;

  for (let moveAnimFrame = 1; moveAnimFrame <= moveAnimFrames; ++moveAnimFrame) {
    const frame = await outfit(
      outfitData,
      outfitImagesPath,
      looktype,
      addons,
      head,
      body,
      legs,
      feet,
      mount,
      direction,
      moveAnimFrame,
      resize === 1
    );
    if (!frame) {
      res.status(500).json({ error: 'Failed to create canvas frame' });
      return;
    }
    frames.push(frame as unknown as CanvasRenderingContext2D);
    durations.push(walkSpeeds[moveAnimFrames]);
  }

  res.json({
    frames: frames.map((frame, index) => ({
      image: frame.canvas.toDataURL(),
      duration: durations[index],
    })),
  });
};

export { handler as GET };
