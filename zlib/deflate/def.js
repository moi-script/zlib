import zlib from 'zlib';


// needs to convert the param into promise 
function promisify(...args) {
    return function (param) {
        return new Promise((resolve, reject) => {
            let [ fn ] = args;
            // resolve(fn(param));
            fn(param, (err, result) =>{
                if(err) reject(err)
                resolve(result);
            })
        })
    }
}

const promiseDeflate = promisify(zlib.deflate);
const resolve = await promiseDeflate('Hello world')
// console.log(resolve);


function fn1(...args){
    console.log('Test call ::', args); // [ 1, 2, 3, 4 ]
}
// fn1(1, 2, 3, 4);





// const compressTrey = zlib.deflate('hello world', (err, result) => console.log(result));
const compress = zlib.deflateSync(Buffer.from('Hello world'));

// console.log('Result :: ', compress); // <Buffer 78 9c f3 48 cd c9 c9 57 28 cf 2f ca 49 01 00 18 ab 04 3d>s

//  <Buffer 78 9c this is the header

const header = compress.subarray(0, 2) // a buffer method to slice 
const binArray = [...header].map(h => h.toString(2).padStart(8, "0")) // To pad a number, convert the number to a string first.s

// console.log(binArray); // [ '01111000', '10011100' ]

// let num = 5;
// console.log(num.toString('2').padStart(8, '0')) // base 2 bin -> then convert into 8 bits binary

// 01111000 -> CMF
    // CM (Compression method): bits 0–3 = 8 → means Deflate
    // CINFO (bits 4–7): 7 → means 32K window size
    
//    | 01111000 = Deflate with 32K window.

// 10011100 -> FLG (second byte = 0x9C)

    // Check bits (CMF * 256 + FLG) must be divisible by 31 → a validation check.
    // Bits 5–7: Compression level hint (2 = default compression)
    // Bits 0–4: Checksum bits for header verification.

//  All means - “Deflate stream, 32KB window, default compression level.”




