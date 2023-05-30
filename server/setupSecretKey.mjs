import crypto from 'crypto';
import fs from "fs";

function generateSecretKey() {
  return crypto.randomBytes(32).toString('hex');
}

let secretKey = generateSecretKey();
fs.appendFileSync('.env', `\n\n# Key für Verschlüsselungsservice\nSECRET_KEY=${secretKey}\nALGORITHM=aes-256-ctr`);


console.log('Neuer Secret Key:', secretKey);