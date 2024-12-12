import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

export const Directions = Object.freeze([
  [-1, 0],
  [0, +1],
  [1, 0],
  [0, -1],
]);

export function readFileLine(path, callback) {
  return new Promise((resolve) => {
    const stream = createReadStream(path, 'utf8');
    const lines = createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    let count = 0;
    lines.on('line', (line) => callback(line, count++));
    lines.on('close', resolve);
  });
}

export async function getFileLines(path, parse) {
  const lines = [];
  await readFileLine(path, (line) => {
    lines.push(parse ? parse(line, lines.length) : line);
  });
  return lines;
}

export function isInBound(val, min, max = null) {
  if (max === null) {
    max = min;
    min = 0;
  }

  return val >= min && val < max;
}

export const getMapSize = (map) => {
  const rows = map.length;
  const cols = map[0].length;

  return [rows, cols];
};

export const cloneMap = (map) => {
  const newMap = [];
  for (const row of map) {
    newMap.push([...row]);
  }
  return newMap;
};
