import zlib from 'zlib';
import crypto, { randomBytes } from 'crypto';
import {cpSync, readFileSync} from 'fs';


const _filename = process.argv[2];

const key = randomBytes(32);
const iv = randomBytes(16);

// hash data first before compress

function compressData(_filename){
    const fileData = readFileSync(_filename);
    return zlib.deflateRawSync(fileData)
}

function hashDataHash(compressData, key, iv) {
    const algo = 'aes-256-cbc';
    const cipher = crypto.createCipheriv(algo, key, iv); 

    // use buffer 
    const concatBuff = Buffer.concat([cipher.update(compressData), cipher.final()]);

    // let encrypted = cipher.update(compressData, 'utf8', 'hex') // never use binary type to encoding type such utf or hex
    return concatBuff;

}

const compressFileData = compressData(_filename);
const hashFile = hashDataHash(compressFileData, key, iv);




// compress → encrypt → save
// decrypt → decompress → use




// cannot be decompress

function decrypt(data, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decryptBuff = Buffer.concat([decipher.update(data), decipher.final()]);
    // let decrypted = decipher.update(data, 'hex', 'utf8'); // do not use encoding for binary type
    // decrypted += decipher.final('utf8');
    
    return decryptBuff;
}

const decoded = decrypt(hashFile, key, iv); 

const inflated = zlib.inflateRawSync(decoded)// you cant inflate it since it wont match the buffers

// const compressChunks = compressData(hashFile);

console.log('Result :: ', hashFile)
console.log('Decoded :: ' , inflated.toString())


// The right method would be hashit first then compress it
