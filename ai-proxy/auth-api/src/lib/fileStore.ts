import { readFile as fsReadFile, writeFile as fsWriteFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const DATA_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '../../data');

export function getDataPath(filename: string): string {
  return resolve(DATA_DIR, filename);
}

export async function readFile(path: string): Promise<string> {
  try {
    return await fsReadFile(path, 'utf-8');
  } catch {
    return '[]';
  }
}

export async function writeFile(path: string, data: string): Promise<void> {
  const dir = dirname(path);
  mkdirSync(dir, { recursive: true });
  await fsWriteFile(path, data, 'utf-8');
}
