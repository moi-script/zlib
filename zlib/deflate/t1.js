import zlib from 'zlib';
import process from 'process';

// const input = process.argv[2];

export function compressTxt(txt) {
    if(typeof txt !== 'string' ) txt.toString();
    return zlib.deflateSync(txt);
}
export function inflateTxt(compressed) {
    if(typeof compressed !== 'string' ) compressed.toString();
    return zlib.inflateSync(compressed);
}

export function validateDeflate(compressed, decoded) {
    return (zlib.inflateSync(compressed).toString() === decoded) ? true : false
}


// const compressed = compressTxt(input);
// const decoded = inflateTxt(compressed);
// console.log(validateDeflate(compressed, decoded));

// process.stdout.write('Compressed :: ' + compressed + backspace.padStart(parseInt(backspace), '\b'));
// process.stdout.write('decoded :: ' + decoded);

// const length = '5'
// const backspace = length.padStart(5, '\t');
// console.log('Hellowolrd' + backspace + 'hi');