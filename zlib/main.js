import { createReadStream, createWriteStream } from 'fs';
import { createGzip, createGunzip } from 'zlib'; // a method that return transform stream
import { pipeline } from 'stream/promises';

// createGzip() -> for compression 
// createGunzip() -> for decompression 

// Not asynchronous;

const gZip = createGzip(); // return transform stream , means compressing

// const sourceStream = createReadStream('src.txt');
// const desStream = createWriteStream('dest.txt');


// sourceStream.pipe(gZip)
//             .pipe(desStream); // this automatic end here by default

// how do you achieve sure close writing in piping? Answer end by default 

// how to logs them if end by default | invoke finish when end() or when all has been flushed
// desStream.on('finish', () => console.log('end'))

// know to zip, unzip, 



// Asynchronous 
// await pipeline(sourceStream, gZip, desStream);

// console.log('After');


const dest = createWriteStream('dec.txt');
// Decompresing a file
await pipeline(createReadStream('dest.txt'), createGunzip(), dest);

dest.on('finish', () => console.log('End'))