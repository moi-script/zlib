import crypto from 'crypto';


// create simple hash 

const passKey = 'secret123';

const hashed = crypto.createHash('md5').update(passKey).digest('hex');

// createHash() 
// .update()
// .digest()

// console.log(hashed);

// with how keys protect hashed 
const importantMessage = 'hello world';
const hmac = crypto.createHmac('sha256', passKey).update(importantMessage).digest('hex');
// console.log(hmac);

// createHmac()
// update()
// digest()


// Using random bytes


const tokens = crypto.randomBytes(16).toString('hex');
// console.log('Token', tokens);

// Encrypt and Decrypt 


const algo = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//   const key = crypto.scryptSync(password, salt, 32); // 256-bit key

const cipher = crypto.createCipheriv(algo, key, iv);
let encrypted = cipher.update('Importand data', 'utf8', 'hex');



encrypted += cipher.final('hex');


// console.log('Encrypted :: ', encrypted);

const deciper = crypto.createDecipheriv(algo, key, iv);
let decrypted = deciper.update(encrypted, 'hex', 'utf8');
decrypted += deciper.final('utf8');

// console.log('Result ::', decrypted);

// Summary 

// createHash()
// createHmac() 
// createCipheriv()
// createDecipheriv
// update('data') -> make update to hashing algo to provide more interal to hash
// digest('encoding') -> finalize the hash and return 
// final() -> this is only for createCipheriv and createDecipheriv

// what is .update(), .digest(), .final()




// Digital signatures 

const { generateKeyPairSync, sign, verify } = crypto;

const {publicKey, privateKey } = generateKeyPairSync('rsa', {modulusLength : 2048});
console.log(publicKey);
console.log(privateKey);


const mostImportantData = 'Hello world';
const signature = sign('sha256', Buffer.from(mostImportantData), privateKey);

const isValid = verify('sha256', Buffer.from(mostImportantData), publicKey, signature);

// console.log('Is valid? ::', isValid);