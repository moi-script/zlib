
import fs from 'fs';
import zlib from 'zlib';
import { appendFile } from 'fs/promises';
import console from 'console';

// {
//   "file1.txt": "<base64 content>",
//   "file2.txt": "<base64 content>"
// }
const arr = ['one.txt', 'two.txt'];

export function fileListToJsonZip(arr) {
    const readFiles = (fileName) => {
        const fileData = fs.readFileSync(fileName)
        return zlib.deflateSync(fileData)
    }

    return [...arr].map((val, _) => {
        const fileContents = readFiles(val);
        return {[val] : fileContents.toString()}
    }).flat();

} 

// console.log(fileListToJsonZip(arr))

// for(const num of arr.entries()){ 
//     console.log('NUms :: ', num);
// }
// NUms ::  [ 0, 'one' ]
// NUms ::  [ 1, 'two' ]


// to list all files via dir and poppulate it with json zip

// console.table([{ a: 1, b: 'Y' }, { a: 1, b: 2 }]);



// let a  = appendFile('hello.txt', 'new1\n');