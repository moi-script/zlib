import zlib from 'zlib';
import { createReadStream } from 'fs';
import chalk from 'chalk';


function showSize(input) {
    const compressed = zlib.deflateSync(input);
    const compressSize = compressed.length;

    const orgSize = Buffer.byteLength(input);

    console.log(chalk.green('Compressed size :: ' + compressSize))
    console.log(chalk.blue('Org size :: ' + orgSize))
}

const streams = createReadStream('lorem.txt');

let input = '';

streams.on('data', chunks => {
    input += chunks.toString();
})

streams.on('end', () => {
    showSize(input);
})

// C:\GrindBuffer\zlib\zlib\dec.txt