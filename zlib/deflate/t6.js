import zlib from 'zlib';
// just test the erorr in inflate Sync;

console.log(zlib.inflateSync('hello')); // Error: incorrect header check



