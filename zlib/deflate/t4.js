import zlib from 'zlib';
import { promisify } from '../../util/promisify.js';
import { convertCSVtoJSON } from "../../../stream/test/tasks/task7_CsvParser/parser.js";
import { validateDeflate } from './t1.js';

// convertCSVtoJSON(source, dest); // without dest, default is null
const promiseParser = promisify(convertCSVtoJSON);

// promiseParser('lorem.txt', null).then(val => console.log(val)).catch(err => console.error(err));

const jsonLorem = await promiseParser('lorem.txt', null);
const compressedJson = zlib.deflateSync(jsonLorem);

// validateDeflate(compressed, org);
console.log(validateDeflate(compressedJson, jsonLorem));


// console.log('Result :: ',  compressedJson);

// const compressedJson = zlib.deflateSync(jsonLorem);



