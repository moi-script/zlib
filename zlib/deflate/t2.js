import zlib from 'zlib';
import { compressTxt } from './t1.js';
import { writeFile }  from 'fs/promises';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';

const filePath = process.argv[2];
const input = process.argv[3];

export function saveCompress(dest, compress) {
    let deflated = compressTxt(compress);
    try {
        writeFile(dest, deflated);
        console.log(chalk.green('Succesfully saved.'));
    } catch (err) {
        console.log(err)
    }
}

const pathFile = new URL(import.meta.url);
const validFile = fileURLToPath(pathFile);
const dir = path.dirname(validFile);

saveCompress(dir + '/'+ filePath, input);

