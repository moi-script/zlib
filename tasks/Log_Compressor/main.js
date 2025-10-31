import zlib from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { appendFile } from 'fs/promises';
import { pipeline, Writable } from 'stream';

const _filename = process.argv[2];


// Expirement on how it wont work when forcing custumized writable stream for compression
// this will become zlib compressed block chunk by chunks and limited by high watermark


class WritableCompressStream extends Writable {
    constructor(_read, _filename, options) {
        super({...options, objectMode : true});

        this.path = _filename;
        this._read = _read;
        this.limit = options.highWaterMark;
    }

    deflateHeader(chunks) {
        const compress = zlib.deflateSync(chunks);
        const header = Buffer.alloc(4);

        header.writeUInt32BE(compress.length);

        return Buffer.concat([header, compress]);
    }


    // recieved buffered 
    _write(_bufs, encoding, cb) { // write will only be called once and should trigger the cb to finish
        // let endLine = _bufs.toString().match(/\n/g);
        // if (endLine) console.log('endline');

        const compressedBuffs = zlib.deflateSync(Buffer.from(_bufs)); // this becomes standalone zlib-compressed block.
        appendFile(this.path, compressedBuffs);
        // console.log(_bufs);
        cb();
    }

}

// const readStream = createReadStream('source.txt', {highWaterMark : 16});
// const writableStream = new WritableCompressStream(readStream, _filename, {highWaterMark : 16});
// // const writeStream = createWriteStream(_filename, {highWaterMark : 16});

// // no backpressure or threshold limit
// readStream.on('data', chunks => {
//     // console.log('data :: ', chunks);
//     writableStream.write(chunks);
//     // console.log(chunks)
// })

// readStream.on('end', () => writableStream.end())
// writableStream.on('close', () => console.log('Done writing'));

const readCompressStream = createReadStream('source.txt', { highWaterMark : 16}); // stream cannot read the binary 
                                                                              //  type after compress





// pipeline(               readCompressStream,
//                         zlib.createDeflate(), 
//                         createWriteStream('output.txt',
//                         {highWaterMark : 16}),
//                         (err, result) => console.log(result))

pipeline(createReadStream('output.txt'), zlib.createInflate(), createWriteStream('log.txt'), (err, result) =>  console.log(result))