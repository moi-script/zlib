import chalk from "chalk";
import { compressTxt, inflateTxt } from "../../zlib/deflate/t1.js";
import fs from 'fs';

const type = process.argv[2];
const file = process.argv[3];


// node compressor.js compress notes.txt
// node compressor.js decompress notes.txt.deflate


function compressContents(source) {
    const contents = fs.readFileSync(source);
    const compressData = compressTxt(contents);
    console.log(chalk.green('Compress Done.'));

    return fs.writeFileSync('compressed.txt.deflate', compressData);
}

function decompressedFile(filename) {
    const compressedData = fs.readFileSync(filename);
    const decoded = inflateTxt(compressedData);
    console.log(decoded.toString());
    return decoded.toString();
}

export function compressor(file, type) {
    return ((typeof type === 'string') && (type.toString().toLowerCase() === 'compressed'))? 
                        compressContents(file) : decompressedFile(file);
}

compressor(file, type);

